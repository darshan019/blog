import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Login from "./Login";
import Signup from "./Signup";
import Container from "./Container";
import ViewPost from "./ViewPost";
import About from "./About";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/blog",
      element: <App />,
      children: [
        { index: true, element: <Container /> },
        { path: "/blog/post/:id", element: <ViewPost /> },
        { path: "/blog/login", element: <Login /> },
        { path: "/blog/signup", element: <Signup /> },
        { path: "/blog/about", element: <About /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
