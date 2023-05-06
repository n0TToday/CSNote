import { handleModuleRoutes } from '@/utils';
import allRoute from './AllRoute';

const modules = allRoute;

export const routes = handleModuleRoutes(modules);
