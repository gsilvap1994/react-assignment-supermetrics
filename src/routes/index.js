import { Redirect, Route, Switch } from 'react-router-dom';
import { useAuth } from '../contexts/auth.context';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Posts from '../pages/Posts';

const PrivateRoute = (props) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Route {...props} /> : <Redirect to="/" />;
};

const Routes = ({ props }) => (
    <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <Route component={NotFound} />
    </Switch>
);

export default Routes;