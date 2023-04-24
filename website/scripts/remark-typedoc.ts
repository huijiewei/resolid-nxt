import { name as isIdentifierName } from 'estree-util-is-identifier-name';
import fg from 'fast-glob';
import { withCustomConfig, type ComponentDoc, type PropItem } from 'react-docgen-typescript';
import { visit } from 'unist-util-visit';

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

const tsParser = withCustomConfig('tsconfig.json', {
  savePropValueAsString: false,
  skipChildrenPropWithoutDoc: false,
  shouldExtractLiteralValuesFromEnum: true,
  shouldExtractValuesFromUnion: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop: PropItem) => {
    if (['as', 'ref', 'style', 'className'].includes(prop.name)) {
      return false;
    }

    if (prop.description.includes('@ignore')) {
      return false;
    }

    if (prop.declarations && prop.declarations.length > 0) {
      return prop.declarations.find((declaration) => !declaration.fileName.includes('node_modules')) != undefined;
    }

    return true;
  },
});

const getComponentProps = (sourceRootPath: string, componentName: string) => {
  const files = fg.sync(`${sourceRootPath}/**/${componentName}.tsx`);

  const typeExports: ComponentProps[] = [];

  files.forEach((file) => {
    const componentDoc = tsParser.parse(file).find((item: ComponentDoc) => {
      return item.displayName == componentName;
    });

    if (componentDoc) {
      Object.entries(componentDoc.props).forEach(([key, value]) => {
        let typeText = '';

        if (value.type.name == 'enum') {
          if (!value.type.raw) {
            typeText = value.type.name;
          } else if (
            value.type.raw.includes(' | ') ||
            ['string', 'number', 'boolean', 'ReactNode'].includes(value.type.raw)
          ) {
            typeText = value.type.raw;
          } else {
            typeText = value.type.value.map((item: { value: string }) => item.value).join(' | ');
          }
        }

        if (!value.required) {
          typeText = typeText.replace(' | undefined', '');
        }

        if (typeText.startsWith('NonNullable<')) {
          typeText = typeText.slice(12, -1);
          typeText = typeText.replace(' | null', '');
          typeText = typeText.replace(' | undefined', '');
        }

        typeText = typeText.replace('React.', '').replace(/ReactElement<.*>/g, 'ReactElement');

        const typeExport = {
          name: key,
          type: typeText,
          required: value.required,
          description: value.description,
          defaultValue: value.defaultValue?.value ?? '',
        };

        typeExports.push(typeExport);
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
