import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Login from "./Login";
import Signup from "./Signup";
import Container from "./Container";
import ViewPost from "./ViewPost";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Container /> },
        { path: "post/:id", element: <ViewPost /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
