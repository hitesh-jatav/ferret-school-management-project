import './App.css';
import { RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './routes';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const checkUserSession = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        if (['/login', '/signup', '/verify-school'].includes(window.localStorage.pathname)) {
          window.location.href = "/dashboard";
        }
      } else {
        localStorage.clear();
        if (!window.location.pathname) {
          window.location.href = "/login";
          return
        } else if (['/login', '/signup', '/verify-school'].includes(window.location.pathname)) return
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error checking user session:", error);
    }
  };

  useEffect(() => {
    checkUserSession()
  }, []);

  return (<>
    <RouterProvider router={routes} />
    <ToastContainer />
  </>);
}

export default App;
