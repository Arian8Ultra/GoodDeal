import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import LoginLayout from "../layout/LoginLayout";
import Root from "../layout/Root";
import SignIn from "../pages/Login/SignIn/SignIn";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Admin from "../pages/Admin/Admin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route path='login' element={<LoginLayout />}>
        <Route path='' element={<SignIn />} />
      </Route>
      <Route path='home' element={<MainLayout/>} >
        <Route path='' element={<Home/>} />
        <Route path='shop/:shopId' element={<Shop/>} >
          <Route path='category/:categoryId' element={<Shop/>} />
        </Route>
        <Route path='admin' element={<Admin/>} />
      </Route>
    </Route>,
  ),
);

export default router;