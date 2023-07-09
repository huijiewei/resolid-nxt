import type * as Babel from '@babel/core';

type PluginState = {
  filename: string;
  opts: {
    ssr: boolean;
    root: string;
    minify: boolean;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refs: Set<any>;
  servers: number;
};

const transformServer = ({ types: t, template }: typeof Babel): Babel.PluginObj<PluginState> => {
  const getIdentifier = (path: Babel.NodePath) => {
    const parentPath = path.parentPath;

    if (parentPath?.type === 'VariableDeclarator') {
      const name = parentPath.get('id') as Babel.NodePath;
      return name.node.type === 'Identifier' ? name : null;
    }

    if (parentPath?.type === 'AssignmentExpression') {
      const name = parentPath.get('left') as Babel.NodePath;
      return name.node.type === 'Identifier' ? name : null;
    }

    if (path.node.type === 'ArrowFunctionExpression') {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const node = path.node as any;

    return node.id && node.id.type === 'Identifier' ? path.get('id') : null;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isIdentifierReferenced = (ident: Babel.NodePath<any>): boolean => {
    const b = ident.scope.getBinding(ident.node.name);
    if (b && b.referenced) {
      if (b.path.type === 'FunctionDeclaration') {
        return !b.constantViolations.concat(b.referencePaths).every((ref) => ref.findParent((p) => p === b.path));
      }
      return true;
    }
    return false;
  };

  const markFunction = (path: Babel.NodePath, state: PluginState) => {
    const ident = getIdentifier(path) as Babel.NodePath<Babel.types.Identifier> | null;

    if (ident && ident.node && isIdentifierReferenced(ident)) {
      state.refs.add(ident);
    }
  };

  const markImport = (path: Babel.NodePath, state: PluginState) => {
    state.refs.add(path.get('local'));
  };

  const trackProgram = (path: Babel.NodePath, state: PluginState) => {
    state.refs = new Set();

    path.traverse(
      {
        VariableDeclarator(variablePath, variableState) {
          if (variablePath.node.id.type === 'Identifier') {
            const local = variablePath.get('id');
            if (isIdentifierReferenced(local)) {
              variableState.refs.add(local);
            }
          } else if (variablePath.node.id.type === 'ObjectPattern') {
            const pattern = variablePath.get('id');
            const properties = pattern.get('properties') as Babel.NodePath<Babel.types.Node>[];
            properties.forEach((p) => {
              const local = p.get(
                p.node.type === 'ObjectProperty'
                  ? 'value'
                  : p.node.type === 'RestElement'
                  ? 'argument'
                  : (function () {
                      throw new Error('invariant');
                    })()
              ) as Babel.NodePath<Babel.types.Node>;

              if (isIdentifierReferenced(local)) {
                variableState.refs.add(local);
              }
            });
          } else if (variablePath.node.id.type === 'ArrayPattern') {
            const pattern = variablePath.get('id');
            const elements = pattern.get('elements') as Babel.NodePath<Babel.types.Node>[];
            elements.forEach((e) => {
              let local: Babel.NodePath;

              if (e.node && e.node.type === 'Identifier') {
                local = e;
              } else if (e.node && e.node.type === 'RestElement') {
                local = e.get('argument') as Babel.NodePath;
              } else {
                return;
              }

              if (isIdentifierReferenced(local)) {
                variableState.refs.add(local);
              }
            });
          }
        },
        FunctionDeclaration: markFunction,
        FunctionExpression: markFunction,
        ArrowFunctionExpression: markFunction,
        ImportSpecifier: markImport,
        ImportDefaultSpecifier: markImport,
        ImportNamespaceSpecifier: markImport,
      },
      state
    );
  };

  const treeShake = (path: Babel.NodePath, state: PluginState) => {
    const refs = state.refs;

    let count = 0;

    const shouldRemove = (node: Babel.NodePath<Babel.types.Node>) => refs.has(node) && !isIdentifierReferenced(node);

    const sweepFunction = (sweepPath: Babel.NodePath<Babel.types.Function>) => {
      const ident = getIdentifier(sweepPath) as Babel.NodePath<Babel.types.Identifier>;

      if (ident && ident.node && shouldRemove(ident)) {
        ++count;
        if (t.isAssignmentExpression(sweepPath.parentPath.node) || t.isVariableDeclarator(sweepPath.parentPath.node)) {
          sweepPath.parentPath.remove();
        } else {
          sweepPath.remove();
        }
      }
    };

    const sweepImport = (
      sweepPath: Babel.NodePath<
        Babel.types.ImportSpecifier | Babel.types.ImportDefaultSpecifier | Babel.types.ImportNamespaceSpecifier
      >
    ) => {
      const local = sweepPath.get('local');

      if (shouldRemove(local)) {
        ++count;
        sweepPath.remove();
        if (!state.opts.ssr) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const parent = sweepPath.parent as any;
          if (parent.specifiers.length === 0) {
            sweepPath.parentPath.remove();
          }
        }
      }
    };

    do {
      path.scope.crawl();
      count = 0;
      path.traverse({
        VariableDeclarator(variablePath) {
          if (variablePath.node.id.type === 'Identifier') {
            const local = variablePath.get('id');
            if (shouldRemove(local)) {
              ++count;
              variablePath.remove();
            }
          } else if (variablePath.node.id.type === 'ObjectPattern') {
            const pattern = variablePath.get('id');
            const beforeCount = count;
            const properties = pattern.get('properties') as Babel.NodePath[];
            properties.forEach((p) => {
              const local = p.get(
                p.node.type === 'ObjectProperty'
                  ? 'value'
                  : p.node.type === 'RestElement'
                  ? 'argument'
                  : (function () {
                      throw new Error('invariant');
                    })()
              ) as Babel.NodePath;

              if (shouldRemove(local)) {
                ++count;
                p.remove();
              }
            });
            if (beforeCount !== count && (pattern.get('properties') as Babel.NodePath[]).length < 1) {
              variablePath.remove();
            }
          } else if (variablePath.node.id.type === 'ArrayPattern') {
            const pattern = variablePath.get('id');
            const beforeCount = count;
            const elements = pattern.get('elements') as Babel.NodePath[];
            elements.forEach((e) => {
              let local: Babel.NodePath;

              if (e.node && e.node.type === 'Identifier') {
                local = e;
              } else if (e.node && e.node.type === 'RestElement') {
                local = e.get('argument') as Babel.NodePath;
              } else {
                return;
              }
              if (shouldRemove(local)) {
                ++count;
                e.remove();
              }
            });
            if (beforeCount !== count && (pattern.get('elements') as Babel.NodePath[]).length < 1) {
              variablePath.remove();
            }
          }
        },
        FunctionDeclaration: sweepFunction,
        FunctionExpression: sweepFunction,
        ArrowFunctionExpression: sweepFunction,
        ImportSpecifier: sweepImport,
        ImportDefaultSpecifier: sweepImport,
        ImportNamespaceSpecifier: sweepImport,
      });
    } while (count);
  };

  const transformServer$ = (path: Babel.NodePath<Babel.types.CallExpression>, state: PluginState) => {
    const parentNodeIdName =
      path.parent.type == 'VariableDeclarator'
        ? ((path.parent as Babel.types.VariableDeclarator).id as Babel.types.Identifier).name
        : ((path.parent as Babel.types.ObjectProperty).key as Babel.types.Identifier).name;

    const isData = parentNodeIdName == 'loader' || parentNodeIdName == 'action';

    const serverFn = path.get('arguments')[0] as Babel.NodePath<Babel.types.Expression>;

    const program = path.findParent((p) => t.isProgram(p.node)) as Babel.NodePath<Babel.types.Program>;
    const statement = path.findParent((p) =>
      program.get('body').includes(p as Babel.NodePath<Babel.types.Statement>)
    ) as Babel.NodePath<Babel.types.Statement>;

    const serverIndex = state.servers++;

    if (serverFn.node.type === 'ArrowFunctionExpression') {
      const body = serverFn.get('body') as Babel.NodePath<Babel.types.Expression | Babel.types.BlockStatement>;

      if (body.node.type !== 'BlockStatement') {
        body.replaceWith(t.blockStatement([t.returnStatement(body.node)]));
      }

      serverFn.replaceWith(
        t.functionExpression(
          t.identifier('$$serverHandler' + serverIndex),
          serverFn.node.params,
          serverFn.node.body as Babel.types.BlockStatement,
          false,
          isData
        )
      );
    }

    if (state.opts.ssr) {
      statement.insertBefore(
        template(`
                      const $$server_module${serverIndex} = %%source%%;
                      `)({
          source: serverFn.node,
        })
      );
      path.replaceWith(t.identifier(`$$server_module${serverIndex}`));
    } else {
      if (isData) {
        statement.insertBefore(
          template(`const $$server_module${serverIndex} = server$.createFetcher();`, {
            syntacticPlaceholders: true,
          })(
            process.env.TEST_ENV === 'client'
              ? {
                  source: serverFn.node,
                }
              : {}
          )
        );

        path.replaceWith(t.identifier(`$$server_module${serverIndex}`));
      } else {
        path.parentPath.remove();
      }
    }
  };

  return {
    visitor: {
      Program: {
        enter(path, state) {
          state.servers = 0;

          trackProgram(path, state);

          path.traverse(
            {
              CallExpression: (path) => {
                if (path.node.callee.type === 'Identifier' && path.node.callee.name === 'server$') {
                  transformServer$(path, state);
                }
              },
            },
            state
          );

          treeShake(path, state);
        },
      },
    },
  };
};

export default transformServer;
