import * as Babel from '@babel/core';
import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const traverse = _traverse.default;

export const transformRouteComponent = (
  code: string,
  id: string,
  ssr: boolean,
  root: string,
  rootEntry: string,
  serverEntry: string,
  addComponentId: (componentId: string) => void
) => {
  if (ssr && (id.includes('.tsx') || id.includes('.mdx')) && id != rootEntry && id != serverEntry) {
    const componentId = id.replace(root + '/', '');

    const ast = parse(code, {
      sourceType: 'module',
      attachComment: false,
      plugins: ['typescript', 'jsx'],
    });

    let componentPath:
      | Babel.NodePath<
          Babel.types.ArrowFunctionExpression | Babel.types.FunctionDeclaration | Babel.types.FunctionExpression
        >
      | undefined;
    let hasComponentsContext = false;

    // noinspection JSUnusedGlobalSymbols
    traverse(ast, {
      ImportDeclaration(path: Babel.NodePath<Babel.types.ImportDeclaration>) {
        if (path.node.source.value === '@resolid/run') {
          hasComponentsContext =
            path.node.specifiers.findIndex((specifier) => {
              return (
                specifier.type == 'ImportSpecifier' &&
                specifier.imported &&
                specifier.imported.type == 'Identifier' &&
                specifier.imported.name === 'components$'
              );
            }) >= 0;
        }
      },
      ExportNamedDeclaration(path: Babel.NodePath<Babel.types.ExportNamedDeclaration>) {
        const declaration = path.get('declaration');

        if (
          declaration.isFunctionDeclaration() &&
          declaration.node.id?.name == 'Component' &&
          isReturnJsx(declaration.node.body)
        ) {
          componentPath = declaration;
        }

        if (declaration.isVariableDeclaration()) {
          for (const declarator of declaration.get('declarations')) {
            if (declarator.node.id.type == 'Identifier' && declarator.node.id.name == 'Component') {
              const init = declarator.get('init') as Babel.NodePath<
                Babel.types.ArrowFunctionExpression | Babel.types.FunctionExpression
              >;

              if (
                init &&
                (init.isArrowFunctionExpression() || init.isFunctionExpression()) &&
                isReturnJsx(init.node.body)
              ) {
                componentPath = init;
                break;
              }
            }
          }
        }
      },
      ExportDefaultDeclaration(path: Babel.NodePath<Babel.types.ExportDefaultDeclaration>) {
        const declaration = path.get('declaration');

        if (declaration.isFunctionDeclaration() && isReturnJsx(declaration.node.body)) {
          componentPath = declaration;
        }

        if (declaration.isIdentifier()) {
          const binding = path.scope.getBinding(declaration.node.name);

          if (binding) {
            if (binding.path.isVariableDeclarator()) {
              const init = binding.path.get('init') as Babel.NodePath<
                Babel.types.ArrowFunctionExpression | Babel.types.FunctionExpression
              >;

              if (
                init &&
                (init.isArrowFunctionExpression() || init.isFunctionExpression()) &&
                isReturnJsx(init.node.body)
              ) {
                componentPath = init;
              }
            }

            if (
              binding.path.isFunctionDeclaration() &&
              (binding.path.node.id?.name == 'MDXContent' || isReturnJsx(binding.path.node.body))
            ) {
              componentPath = binding.path;
            }
          }
        }
      },
    });

    if (componentPath) {
      addComponentId(componentId);

      const importStatement = hasComponentsContext ? '' : 'import { components$ } from "@resolid/nxt-run/server";';
      const injectionCode = `components$.addComponent(${JSON.stringify(componentId)});`;

      const injectionPoint = componentPath.node.body.start ?? 0;

      return importStatement + code.slice(0, injectionPoint + 1) + injectionCode + code.slice(injectionPoint + 1);
    }
  }
};

const isJSX = (type: string | undefined) => {
  return type == 'JSXFragment' || type == 'JSXElement';
};

const isReturnJsx = (nodeBody: Babel.types.BlockStatement | Babel.types.Expression): boolean => {
  if (nodeBody.type != 'BlockStatement') {
    return false;
  }

  if (nodeBody.body.length == 0) {
    return false;
  }

  return (
    nodeBody.body.findIndex((body) => {
      if (body.type != 'ReturnStatement') {
        return false;
      }

      if (isJSX(body.argument?.type)) {
        return true;
      }

      if (body.argument?.type == 'ConditionalExpression') {
        if (isJSX(body.argument.consequent.type) || isJSX(body.argument.alternate.type)) {
          return true;
        }
      }

      return false;
    }) >= 0
  );
};
