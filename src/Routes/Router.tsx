import { lazy } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LoginLayout from "../layout/LoginLayout";
import Root from "../layout/Root";
import SignIn from "../pages/Login/SignIn/SignIn";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
const Shop = lazy(() => import("../pages/Shop/Shop"));
import Admin from "../pages/Admin/Admin";
const Categories = lazy(() => import("../pages/Shop/Categories/Categories"));
import AdminLayout from "../layout/AdminLayout";
const ShopManager = lazy(() => import("../pages/Admin/ShopManager/ShopManager"));
const ProductManager = lazy(() => import("../pages/Admin/ProductManager/ProductManager"));
const LocationManager = lazy(() => import("../pages/Admin/LocationManager/LocationManager"));
const UserManager = lazy(() => import("../pages/Admin/UserManager/UserManager"));
const CategoryManager = lazy(() => import("../pages/Admin/CategoryManager/CategoryManager"));
import Category from "../pages/Shop/Categories/Category/Category";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="login" element={<LoginLayout />}>
        <Route path="" element={<SignIn />} />
      </Route>
      <Route path="" element={<LoginLayout />}>
        <Route path="" element={<SignIn />} />
      </Route>
      <Route path="home" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="shop/:shopId" element={<Shop />}>
          <Route path="" element={<Categories />} />
          <Route
            path="category/:categoryId"
            element={<Category />}
          />
        </Route>
      </Route>
      <Route path="admin" element={<AdminLayout />} >
        <Route path="" element={<Admin />} />
        <Route path="shopManager" element={<ShopManager />}/>
        <Route path="productManager" element={<ProductManager />}/>
        <Route path="locationManager" element={<LocationManager />}/>
        <Route path="userManager" element={<UserManager />}/>
        <Route path="categoryManager" element={<CategoryManager />}/>

      </Route>
    </Route>
  )
);

export default router;
