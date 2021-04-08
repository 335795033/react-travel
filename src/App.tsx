import React, { useEffect } from 'react';
import styles from './App.module.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { HomePage, RegisterPage, SignInPage, DetailPage, SearchPage, ShoppingCartPage,PlaceOrderPage } from './pages'
import { Redirect } from 'react-router-dom'
import { useSelector } from './redux/hooks'
import { useDispatch } from 'react-redux'
import { getShoppingCart } from './redux/shoppingCart/slice'


const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  const routeComponent = (props) => {
    return isAuthenticated ? (
      React.createElement(component, props) // 若有权限，则返回本身
    ) : (
      <Redirect to={{ pathname: '/signIn' }}></Redirect> // 没权限则从定向
    )
  }
  return <Route render={routeComponent} {...rest} />
}


function App() {
  const jwt = useSelector(s => s.user.token)
  const dispatch = useDispatch()
  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt))
    }
  }, [jwt])

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signIn" component={SignInPage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Route path="/detail/:touristRouteId" component={DetailPage}></Route>
          <Route path="/search/:keywords?" component={SearchPage}></Route>
          <PrivateRoute isAuthenticated={jwt !== null} path='/shoppingCart' component={ShoppingCartPage} ></PrivateRoute>
          <PrivateRoute isAuthenticated={jwt !== null} path='/placeOrder' component={PlaceOrderPage} ></PrivateRoute>
          <Route render={() => <h1>404 not found 页面去火星了</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
