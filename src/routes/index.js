import AuthRouter from './auth/auth.routes';

const AppRoutes = (app) => {
    app.use(AuthRouter.routePrefix, AuthRouter.route());
}

export default AppRoutes;