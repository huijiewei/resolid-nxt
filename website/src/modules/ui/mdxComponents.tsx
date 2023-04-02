import { mdxComponents as shared } from '~/common/mdx/mdxComponents';
import { MdxColorPalette } from './components/MdxColorPalette';

export const mdxComponents = {
  ...shared('UI'),
  ColorPalette: MdxColorPalette,
};
