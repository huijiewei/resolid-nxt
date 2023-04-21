import { mdxComponents as shared } from '~/common/mdx/mdxComponents';
import { MdxPropsTable } from '~/modules/ui/components/MdxPropsTable';
import { MdxColorPalette } from './components/MdxColorPalette';
import { MdxDemo } from './components/MdxDemo';

export const mdxComponents = {
  ...shared('UI'),
  ColorPalette: MdxColorPalette,
  Demo: MdxDemo,
  PropsTable: MdxPropsTable,
};
