import type { Node } from 'unist';
import { remove } from 'unist-util-remove';

export function removeImportsExportsPlugin() {
  return (tree: Node) => remove(tree, 'mdxjsEsm');
}
