import React, {lazy,Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import Body from './components/Body';
import RestaurantMenu from './components/RestaurantMenu';
//import Grocery from './components/Grocery';

const Grocery = lazy(() => import('./components/Grocery'))
const appRouter = createBrowserRouter(
  [
    {
      path : "/",
      element: <App/>,
      errorElement: <Error/>,
      children: [
        {
          path : "/",
          element: <Body/>
        },
        {
          path : "/about",
          element: <About/>
        },
        {
          path : "/contact",
          element: <Contact/>
        },
        {
          path: "/grocery",
          element: <Suspense fallback={<h1>Loading...</h1>}><Grocery/></Suspense>
        },
        {
          path : "/restaurants/:resId",
          element: <RestaurantMenu/>
        }
      ]
    },
   
  ]
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter}/>);

