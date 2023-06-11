import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import LoginLayout from "../layout/LoginLayout";
import Root from "../layout/Root";
import SignIn from "../pages/Login/SignIn/SignIn";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route path='login' element={<LoginLayout />}>
        <Route path='' element={<SignIn />} />
      </Route>
      <Route path='home' element={<MainLayout/>} >
        <Route path='' element={<Home/>} />
        <Route path='shop/:id' element={<Shop/>} >
          <Route path='category/:id' element={<Shop/>} />
        </Route>
      </Route>
    </Route>,
  ),
);

export default router;
