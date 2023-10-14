import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import DefaultLayout from "./components/Layout/DefaultLayout/DefaultLayout";
import Create from "./pages/blog/Create";
import Detail from "./pages/blog/Detail";
import Update from "./pages/blog/Update";


const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <DefaultLayout/>
      ),
      children: [
        {
          index: true,
          element: <App/>,
        }
      ]
    },
    {
      path: "/new-blog",
      element: <DefaultLayout/>,
      children: [{
        path: "",
        element: <Create/>
      }]
    },
    {
      path: "/detail/:id",
      element: <DefaultLayout/>,
      children: [{
        path: "",
        element: <Detail/>
      }]
    },
    {
      path: "/edit/:id",
      element: <DefaultLayout/>,
      children: [{
        path: "",
        element: <Update/>
      }]
    },
]);

export default router;