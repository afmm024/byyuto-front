import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import PrivateRoutes from './PrivateNavigation';
import LoginPage from '../pages/Login';
import HomePage from '../pages/Home';


const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route element={<PrivateRoutes />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Route>
    )
  );


  export default router;