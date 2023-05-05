import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import LoginLayout from "../layout/LoginLayout";
import Root from "../layout/Root";
import SignIn from "../pages/Login/SignIn/SignIn";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route path='login' element={<LoginLayout />}>
        <Route path='' element={<SignIn />} />
      </Route>
    </Route>,
  ),
);

export default router;
