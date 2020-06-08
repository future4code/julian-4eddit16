import { Switch, Route, BrowserRouter } from 'react-router-dom';

import LoginPage from '../LoginPage';
import SignUpPage from '../SignUpPage';
import FeedPage from '../FeedPage';
import PostPage from '../PostPage';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login">
                    <LoginPage />
                </Route>
                <Route exact path="signup">
                    <SignUpPage />
                </Route>
                <Route exact path="feed">
                    <FeedPage />
                </Route>
                <Route exact path="post">
                    <PostPage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;