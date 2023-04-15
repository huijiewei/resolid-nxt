import { mdxComponents as shared } from '~/common/mdx/mdxComponents';
import { MdxColorPalette } from './components/MdxColorPalette';
import { MdxDemo } from './components/MdxDemo';

export const mdxComponents = {
  ...shared('UI'),
  ColorPalette: MdxColorPalette,
  Demo: MdxDemo,
};
