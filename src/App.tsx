import React, { Component, Suspense, lazy } from "react";
import "./App.css";
import { NavBar } from "./components/navBar/NavBar";
import { News } from "./components/news/News";
import { Music } from "./components/music/Music";
import { Settings } from "./components/settingsPage/Settings";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { ProfileContainer } from "./features/profile/ui/ProfileContainer";
import { compose } from "redux";
import { Provider, connect } from "react-redux";
import { setInitializeAppTC } from "./redux/app-reducer";
import { AppRootStateType, store } from "./redux/redux-store";
import { Preloader } from "./components/common/preloader/Preloader";
import { PageNotFount } from "./components/404/PageNotFount";
import { LoginPage } from "./components/login/Login";
import { Header } from "./components/header/Header";
import { Breadcrumb, ConfigProvider } from 'antd';
import { menuItems } from "./utils/validators/menuItems";
import { BreadcrumbComponent } from "./components/breadCrumb/BreadCrumb";

const UsersContainer = lazy(() => import("./features/users/ui/UsersPage"));
const Dialogs = lazy(() => import("./features/dialog/ui/dialogs/Dialogs"));

type MapDispatchToPropsType = {
  setInitializeApp: () => void;
};

type MapStateToPropsType = {
  isInitialized: boolean;
};


type AppPropsType = MapDispatchToPropsType & MapStateToPropsType;

class App extends Component<AppPropsType> {
  handleUncatchedErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
    alert(promiseRejectionEvent);
  };

  componentDidMount(): void {
    this.props.setInitializeApp();
    window.addEventListener("unhandledrejection", this.handleUncatchedErrors);
  }

  componentWillUnmount(): void {
    window.removeEventListener(
      "unhandledrejection",
      this.handleUncatchedErrors
    );
  }


  render(): React.ReactNode {
    if (!this.props.isInitialized) {
      return <Preloader />;
    }

    return (
      <ConfigProvider theme={
        {token: {},
        components: {
          Button: {
            colorPrimary: '#ffffff',
            colorPrimaryHover: '#FCBF30',
            colorPrimaryActive: '#FCBF30',
            primaryColor: '#151920',
            controlHeight: 25,
            paddingInline: 15,
            borderRadius: 5,
            defaultBg: 'transparent',
            defaultColor: '#ffffff',
            defaultHoverBorderColor: '#ffffff',
            defaultHoverColor: '#151920'
          },
        },
        } }>
        <BrowserRouter>
          <div className="appWrapper">
            <Header />
            <NavBar />
            <Switch>
              <Route
                path="/profile/:userId?"
                render={() => <ProfileContainer />}
              />
              <Route
                path={"/messages"}
                render={() => {
                  return (
                    <Suspense fallback={<Preloader />}>
                      <Dialogs />
                    </Suspense>
                  );
                }}
              />
              <Route path="/news" component={News} />
              <Route path="/music" component={Music} />
              <Route path="/settings" component={Settings} />
              <Route
                path="/users"
                render={() => {
                  return (
                    <Suspense fallback={<Preloader />}>
                      <UsersContainer />
                    </Suspense>
                  );
                }}
              />
              <Route path="/login" component={LoginPage} />
              <Route path="/profile" render={() => <ProfileContainer />} />
              <Route path="/" render={() => <Redirect to="/profile" />} />
              <Route path="*" render={() => <PageNotFount />} />
            </Switch>
          </div>
        </BrowserRouter>
    </ConfigProvider>

    );
  }
}

const MapStateToProps = (state: AppRootStateType) => {
  return { isInitialized: state.app.isInitialized };
};

const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(MapStateToProps, { setInitializeApp: setInitializeAppTC })
)(App);

const MainApp = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
      ,
    </BrowserRouter>
  );
};

export default MainApp;
