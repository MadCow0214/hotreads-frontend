import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "../routes/Main";
import SignIn from "../routes/SignIn";
import AuthorProfile from "../routes/AuthorProfile";
import BookProfile from "../routes/BookProfile";
import BookList from "../routes/BookList";
import UploadBook from "../routes/UploadBook";
import UserProfile from "../routes/UserProfile";
import Search from "../routes/Search";
import SignUp from "../routes/SignUp";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route path="/book/list" component={BookList} />
    <Route path="/author/:authorName" component={AuthorProfile} />
    <Route path="/book/upload" component={UploadBook} />
    <Route path="/book/:bookTitle" render={props => <BookProfile {...props} isLoggedIn={true} />} />
    <Route path="/search" component={Search} />
    <Route path="/user/:nickName" component={UserProfile} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/book/list" component={BookList} />
      <Route path="/author/:authorName" component={AuthorProfile} />
      <Route path="/book/:bookName" component={BookProfile} />
      <Route path="/search" component={Search} />
      <Route path="/user/:nickName" component={UserProfile} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

const AppRouter = ({ isLoggedIn }) => <>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</>;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;
