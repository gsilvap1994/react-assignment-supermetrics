import AuthContext, { useAuth } from '../contexts/auth.context';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const Routes = ({ props }) => {
    const { isAuthenticated } = useAuth(AuthContext);
    return isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Routes;
