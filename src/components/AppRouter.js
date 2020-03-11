import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "../routes/Main";
import Auth from "../routes/Auth";
import AuthorProfile from "../routes/AuthorProfile";
import BookProfile from "../routes/BookProfile";
import BookList from "../routes/BookList";
import UploadBook from "../routes/UploadBook";
import UserProfile from "../routes/UserProfile";

function AppRouter() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/auth" component={Auth} />
      <Route path="/book/list" component={BookList} />
      <Route path="/author/:authorName" component={AuthorProfile} />
      <Route path="/book/upload" component={UploadBook} />
      <Route path="/book/:bookName" component={BookProfile} />
      <Route path="/user/:userName" component={UserProfile} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}

export default AppRouter;
