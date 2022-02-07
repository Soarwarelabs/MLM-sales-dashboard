import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import { Login, ForgetPassword, ResetPassword } from "pages";
import {
  useNotificationRegisteration,
  useAxiosInterceptors,
} from "custom-hooks";
import { RootState } from "interfaces/redux/store";
import { AppRouter } from "./component/AppRouter";
import { useSelector } from "react-redux";

const ProtectedRouter = () => {
  const isTokenRegistering = useNotificationRegisteration();
  if (isTokenRegistering) {
    return null;
  } else {
    return (
      <BrowserRouter>
        <Switch>
          <AppRouter />
        </Switch>
      </BrowserRouter>
    );
  }
};

const AuthRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/forget-password" component={ForgetPassword} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

const Router = () => {
  const isAuthenticated = useSelector<RootState>(
    (state) => state.auth.isLoggedIn
  );
  useAxiosInterceptors();
  return <>{isAuthenticated ? <ProtectedRouter /> : <AuthRouter />}</>;
};

export default Router;
