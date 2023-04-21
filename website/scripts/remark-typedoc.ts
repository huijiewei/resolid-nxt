import { name as isIdentifierName } from 'estree-util-is-identifier-name';
import fg from 'fast-glob';
import { Project } from 'ts-morph';
import { visit } from 'unist-util-visit';

const internalProject = new Project({
  tsConfigFilePath: 'tsconfig.json',
});

type RemarkTypedocOptions = {
  sourceRootPath: string;
  propsTablesName?: string;
  sourcePathName?: string;
};

type ComponentProps = {
  name: string;
  type: string;
  description: string;
  defaultValue?: string;
  required: boolean;
};

const getComponentProps = (sourceRootPath: string, componentName: string) => {
  const files = fg.sync(`${sourceRootPath}/**/${componentName}.tsx`);

  const typeExports: ComponentProps[] = [];

  const project = internalProject;

  files.forEach((file) => {
    const sourceFile = project.getSourceFile(file);

    if (sourceFile) {
      sourceFile.getTypeAliases().forEach((declaration) => {
        if (declaration.getName() == `${componentName}Props`) {
          declaration
            .getType()
            .getProperties()
            .forEach((prop) => {
              let typeText = prop.isOptional()
                ? prop.getTypeAtLocation(declaration).getNonNullableType().getText()
                : prop.getTypeAtLocation(declaration).getText();

              if (typeText.startsWith('NonNullable<')) {
                typeText = typeText.slice(12, -1);
                typeText = typeText.replace(' | null', '');
                typeText = typeText.replace(' | undefined', '');
              }

              const typeDescription = prop
                .getDeclarations()[0]
                .getLeadingCommentRanges()[0]
                .getText()
                .replace(/\r\n/g, '\n')
                .split('\n')
                .map((line) => {
                  let str = line.trim();

                  if (str.length == 0) {
                    return undefined;
                  }

                  if (str == '/**' || str == '*/') {
                    return undefined;
                  }

                  if (str[0] == '*') {
                    str = str.slice(1).trim();
                  }

                  return str.length > 0 && !str.startsWith('@default') ? str : undefined;
                })
                .filter(Boolean)
                .join('\n');

              const defaultValue = prop.getJsDocTags().find((tag) => {
                return tag.getName() == 'default';
              });

              typeExports.push({
                name: prop.getName(),
                type: typeText,
                description: typeDescription,
                defaultValue: defaultValue?.getText()[0].text ?? '',
                required: !prop.isOptional(),
              });
            });
        }
      });
    }
  });

  return typeExports;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAttributeValue = (elem: any, attribute: string): string => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const attr = elem.attributes.find((attr: any) => 'name' in attr && attr['name'] == attribute);

  if (!attr) {
    return '';
  }

  if (typeof attr.value == 'string') {
    return attr.value as string;
  }

  return attr.value?.value.slice(1, -1) || '';
};

const remarkTypedoc = (options: RemarkTypedocOptions) => {
  const propsTablesName = options.propsTablesName || 'propsTables';
  const sourcePathName = options.sourcePathName || 'sourcePath';

  if (!isIdentifierName(propsTablesName)) {
    throw new Error(`Invalid name for an identifier: ${propsTablesName}`);
  }

  if (!isIdentifierName(sourcePathName)) {
    throw new Error(`Invalid name for an identifier: ${sourcePathName}`);
  }

  if (!options?.sourceRootPath) {
    throw new Error(`Please set sourceRootPath.`);
  }

  const componentPropsCache = new Map<string, ComponentProps[]>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (ast: any) => {
    visit(ast, 'mdxJsxFlowElement', (node) => {
      if (node.name == 'PropsTable') {
        const componentName = getAttributeValue(node, 'component');

        if (componentName == '') {
          throw new Error(`Invalid component for PropsTable.`);
        }

        let componentProps = componentPropsCache.get(componentName);

        if (!componentProps) {
          componentProps = getComponentProps(options.sourceRootPath, componentName);

          componentPropsCache.set(componentName, componentProps);
        }

        node.attributes.push({
          type: 'mdxJsxAttribute',
          name: 'componentProps',
          value: {
            type: 'mdxJsxAttributeValueExpression',
            data: {
              estree: {
                type: 'Program',
                sourceType: 'module',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'ArrayExpression',
                      elements: componentProps.map((prop) => {
                        return {
                          type: 'ObjectExpression',
                          properties: [
                            {
                              type: 'Property',
                              method: false,
                              shorthand: false,
                              computed: false,
                              kind: 'init',
                              key: { type: 'Identifier', name: 'name' },
                              value: { type: 'Literal', value: prop.name },
                            },
                            {
                              type: 'Property',
                              method: false,
                              shorthand: false,
                              computed: false,
                              kind: 'init',
                              key: { type: 'Identifier', name: 'type' },
                              value: { type: 'Literal', value: prop.type },
                            },
                            {
                              type: 'Property',
                              method: false,
                              shorthand: false,
                              computed: false,
                              kind: 'init',
                              key: { type: 'Identifier', name: 'defaultValue' },
                              value: { type: 'Literal', value: prop.defaultValue },
                            },
                            {
                              type: 'Property',
                              method: false,
                              shorthand: false,
                              computed: false,
                              kind: 'init',
                              key: { type: 'Identifier', name: 'required' },
                              value: { type: 'Literal', value: prop.required },
                            },
                            {
                              type: 'Property',
                              method: false,
                              shorthand: false,
                              computed: false,
                              kind: 'init',
                              key: { type: 'Identifier', name: 'description' },
                              value: { type: 'Literal', value: prop.description },
                            },
                          ],
                        };
                      }),
                    },
                  },
                ],
              },
            },
          },
        });
      }
    });
  };
};

export default remarkTypedoc;
