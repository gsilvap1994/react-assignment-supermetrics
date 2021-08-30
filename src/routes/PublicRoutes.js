
import Login from '../pages/Login';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../pages/NotFound';

const PublicRoutes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route compo={NotFound} />
        </Switch>
    );
};

export default PublicRoutes;