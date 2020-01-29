import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'; 
//will make the props available to nested components
import Signin from './user/Signin';
import Signup from './user/Signup';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProdduct from './admin/AddProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';
import Orders from './admin/Orders';





// it is about Switch and Route, not normal Router and Link. don't get confused. 

const Routes = () =>{
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/product/:productId" exact component={Product} />
        <Route path="/cart" exact component={Cart} />

        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProdduct} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
      </Switch>
    </BrowserRouter>

    // <div>
    //   <Switch>
    //     <Route path="/signin" exact={Signin} />
    //     <Route path="/signup" exact={Signin} />
    //   </Switch>
    // </div>
  );
}

export default Routes; 
 