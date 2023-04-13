import type { RouteObject } from 'react-router-dom';

import adminRoutes from './portals/admin/routes';
import siteRoutes from './portals/site/routes';

const routes: RouteObject[] = [...siteRoutes, ...adminRoutes];

export default routes;
