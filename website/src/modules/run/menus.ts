import { type Menu } from '~/common/components/AsideLayoutMenu';

export const menus: Menu[] = [
  {
    label: 'menu.started',
    children: [
      {
        label: 'menu.introduction',
        path: 'introduction',
      },
      {
        label: 'menu.projectSetup',
        path: 'project-setup',
      },
    ],
  },
  {
    label: 'menu.coreConcepts',
    children: [
      {
        label: 'menu.routing',
        path: 'core-concepts/routing',
      },
      {
        label: 'menu.routeData',
        path: 'core-concepts/route-data',
      },
      {
        label: 'menu.formActions',
        path: 'core-concepts/form-actions',
      },
    ],
  },
];
