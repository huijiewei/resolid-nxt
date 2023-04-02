import type { RouteObject } from 'react-router-dom';

import siteRoutes from './portals/site/routes';
import adminRoutes from './portals/admin/routes';

const routes: RouteObject[] = [...siteRoutes, ...adminRoutes];

export default routes;
