import AuthRouter from './auth/auth.routes';
import PostRouter from './posts/posts.router';

const AppRoutes = (app) => {
    app.use(AuthRouter.routePrefix, AuthRouter.route());
    app.use(PostRouter.routePrefix, PostRouter.route());
}

export default AppRoutes;