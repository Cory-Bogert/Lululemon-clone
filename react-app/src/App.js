import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Landing from './components/LandingPage';
import { authenticate } from './store/session';
import SingleItemPage from './components/SingleItemPage';
import CartPage from './components/Carts';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Navigation />
      <Switch>

        <Route path='/cart' exact={true}>
          <CartPage />
        </Route>

        <Route path='/items/:id' exact={true}>
          <SingleItemPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

        <Route path='/soon' exact={true}>
          <h1>This Feature is coming soon!</h1>
        </Route>
        <Route path='/' exact={true}>
          <Landing />
        </Route>
        <Route>
          <h1>404 Error</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
