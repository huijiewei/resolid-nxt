import type { RouteObject } from 'react-router-dom';

import adminRoutes from './portals/admin/routes';
import apiRoutes from './portals/api/routes';
import siteRoutes from './portals/site/routes';

const routes: RouteObject[] = [...adminRoutes, ...apiRoutes, ...siteRoutes];

export default routes;
