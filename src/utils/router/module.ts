/**
 * 权限路由排序
 * @param routes - 权限路由
 */
function sortRoutes(routes: AuthRoute.Route[]) {
  return routes.sort((next, pre) => Number(next.meta?.order) - Number(pre.meta?.order));
}

/**
 * 处理全部导入的路由模块
 * @param modules - 路由模块
 */
export function handleModuleRoutes(modules: AuthRoute.Route[]) {
  const routes: AuthRoute.Route[] = modules;

  return sortRoutes(routes);
}
