import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// HashRouter as BrowserRouter
// import SignIn from "../components/SignIn";

import history from "./history";
import { Users, NotFound,Doctor,Doctor_Sanaw,Drivers,Busses,Markets,YolHatyBermek,Mehanik,Mehanik_Sanaw,
   UlanyjyHereket, Garaz,UlanyjyGornush,Login,Ugurlar, Orders, OrderStatus, Slider, Config, Admin, SubCategory, GizliHarytlar, Hasabat, NewOrders, DoneOrders, DelOrders } from "../pages/index";
import Test from "../pages/test";
import ScrollIntoView from "./ScrollIntoView";
import { Loading } from "../components/loading";
import PrintComponent from "../components/PrintComponent";
 

const PrivateRoute = lazy(() => import("./PrivateRoute"));
const PublicRoute = lazy(() => import("./PublicRoute"));
// const AdminRoute = lazy(() => import("./AdminRoute"));
const App = () => {
  // history.listen((location, action) => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // });
  return (
    <BrowserRouter history={history}>
      <ScrollIntoView>
        <Suspense fallback={<Loading />}>
          <Switch>
            {/* <PublicRoute
              restricted={true}
              component={Login}
              path="/"
              exact
            /> */}

            <PublicRoute 
            restricted={false} 
            component={Login} 
            path="/" 
            exact 
            />
            
            <PrivateRoute
              restricted={false}
              component={Users}
              path="/users"
              exact
            />

 
             <PrivateRoute
              restricted={false}
              component={Doctor}
              path="/unit"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Doctor_Sanaw}
              path="/products"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={GizliHarytlar}
              path="/gizliHaryt"
              exact
            />
            
             
            <PrivateRoute
              restricted={false}
              component={YolHatyBermek}
              path="/marketCategory"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={SubCategory}
              path="/subCategory"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Markets}
              path="/brands"
              exact
            />
           
            
            <PrivateRoute
              restricted={false}
              component={UlanyjyHereket}
              path="/ulanyjy_hereket"
              exact
            />
             
             <PrivateRoute
              restricted={false}
              component={UlanyjyGornush}
              path="/users_type"
              exact
            />
            
            <PrivateRoute
              restricted={false}
              component={Orders}
              path="/orders"
              exact
            />
             <PrivateRoute
              restricted={false}
              component={NewOrders}
              path="/newOrders"
              exact
            />
             <PrivateRoute
              restricted={false}
              component={DoneOrders}
              path="/doneOrders"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={DelOrders}
              path="/delOrders"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={OrderStatus}
              path="/orderStatus"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Slider}
              path="/sliders"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Config}
              path="/config"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Admin}
              path="/admin"
              exact
            />

            <PrivateRoute
              restricted={false}
              component={Hasabat}
              path="/hasabat"
              exact
            />

          

           

            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </ScrollIntoView>
    </BrowserRouter>
  );
};

export default App;
