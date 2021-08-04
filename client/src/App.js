import "./App.css";
import "./markdown.css"
import React, { useEffect, useState } from "react";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import app, { githubAuthProvider, googleAuthProvider } from "./firebase";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BlogEditor from "./components/BlogEditor";
import Blog from "./components/Blog";
const auth = app.auth();
const url = process.env.NODE_ENV === "production" ? "https://dew-nerdlog.herokuapp.com" : "";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return unsubscribe;
  }, []);

  // useEffect(() => console.log(user), [user]);

  function login(type) {
    switch (type) {
      case "google":
        return auth.signInWithPopup(googleAuthProvider);
        break;
      case "github":
        return auth.signInWithPopup(githubAuthProvider);
        break;
      default:
        console.log("invalid login type");
    }
  }

  function logout() {
    auth.signOut();
  }

  return (
    <>
      <Router>
        <Header user={user} />
        <div className="container">
          <Switch>
            <Route exact path="/login">
              <Login login={login} />
            </Route>
            <Route exact path="/">
              <Home user={user} logout={logout} url={url} />
            </Route>
            <Route exact path="/blog/new">
              <BlogEditor user={user} method="new" url={url} />
            </Route>
            <Route exact path="/blog/:id">
              <Blog user={user} url={url} />
            </Route>
            <Route exact path="/blog/edit/:id">
              <BlogEditor user={user} method ="update" url={url} />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
