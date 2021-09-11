import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Component/Home/Home';
import ErrPage from './Component/ErrPage/ErrPage';
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer';
import NewsDetail from "./Component/NewsDetail/NewsDetail";
import Login from "./Component/Login/Login";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";
import AddNews from "./Component/AddNews/AddNews";
import AllNewsList from "./Component/AllNewsList/AllNewsList";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header />
        <main>
          <Switch>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <PrivateRoute exact path="/news/:id">
              <NewsDetail></NewsDetail>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/addnews">
              <AddNews></AddNews>
            </PrivateRoute>
            <Route path="*">
              <ErrPage></ErrPage>
            </Route>
          </Switch>
        </main>

        <Footer />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
