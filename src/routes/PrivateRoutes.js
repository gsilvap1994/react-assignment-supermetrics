
import Posts from '../pages/Posts';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../pages/NotFound';

const PrivateRoutes = () => {
    return (
        <Switch>
            <Route exact path="/posts" component={Posts} />
            <Route exact path='/' component={Posts} />
            <Route component={NotFound} />
        </Switch>
    );
};

export default PrivateRoutes;