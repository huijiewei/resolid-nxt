import { type Menu } from '~/common/components/AsideLayoutMenu';

export const menus: Menu[] = [
  {
    label: 'menu.overview',
    children: [
      {
        label: 'menu.introduction',
        path: 'introduction',
      },
      {
        label: 'menu.started',
        path: 'getting-started',
      },
      {
        label: 'menu.theming',
        path: 'theming',
      },
      {
        label: 'menu.darkMode',
        path: 'dark-mode',
      },
      {
        label: 'menu.animation',
        path: 'animation',
      },
    ],
  },
  {
    label: 'menu.general',
    children: [
      {
        label: 'menu.button',
        path: 'components/button',
      },
      {
        label: 'menu.icon',
        path: 'components/icon',
      },
      {
        label: 'menu.image',
        path: 'components/image',
      },
      {
        label: 'menu.typography',
        path: 'components/typography',
      },
    ],
  },
  {
    label: 'menu.layout',
    children: [
      {
        label: 'menu.layout',
        path: 'components/layout',
      },
      {
        label: 'menu.flex',
        path: 'components/flex',
      },
      {
        label: 'menu.grid',
        path: 'components/grid',
      },
      {
        label: 'menu.table',
        path: 'components/table',
      },
      {
        label: 'menu.divider',
        path: 'components/divider',
      },
    ],
  },
  {
    label: 'menu.dataDisplay',
    children: [
      {
        label: 'menu.avatar',
        path: 'components/avatar',
      },
      {
        label: 'menu.badge',
        path: 'components/badge',
      },
    ],
  },
  {
    label: 'menu.dataInput',
    children: [
      {
        label: 'menu.input',
        path: 'components/input',
      },
      {
        label: 'menu.numberInput',
        path: 'components/number-input',
      },
      {
        label: 'menu.select',
        path: 'components/select',
      },
      {
        label: 'menu.slider',
        path: 'components/slider',
      },
      {
        label: 'menu.checkbox',
        path: 'components/checkbox',
      },
      {
        label: 'menu.radio',
        path: 'components/radio',
      },
      {
        label: 'menu.switch',
        path: 'components/switch',
      },
    ],
  },
  {
    label: 'menu.feedback',
    children: [
      {
        label: 'menu.alert',
        path: 'components/alert',
      },
      {
        label: 'menu.toast',
        path: 'components/toast',
      },
      {
        label: 'menu.tooltip',
        path: 'components/tooltip',
      },
      {
        label: 'menu.popover',
        path: 'components/popover',
      },
      {
        label: 'menu.modal',
        path: 'components/modal',
      },
      {
        label: 'menu.drawer',
        path: 'components/drawer',
      },
      {
        label: 'menu.progressBar',
        path: 'components/progress-bar',
      },
      {
        label: 'menu.spinner',
        path: 'components/spinner',
      },
      {
        label: 'menu.overlay',
        path: 'components/overlay',
      },
      {
        label: 'menu.spinnerOverlay',
        path: 'components/spinner-overlay',
      },
    ],
  },
  {
    label: 'menu.navigation',
    children: [
      {
        label: 'menu.breadcrumb',
        path: 'components/breadcrumb',
      },
      {
        label: 'menu.pagination',
        path: 'components/pagination',
      },
      {
        label: 'menu.dropdownMenu',
        path: 'components/dropdown-menu',
      },
      {
        label: 'menu.contextMenu',
        path: 'components/context-menu',
      },
    ],
  },
];
