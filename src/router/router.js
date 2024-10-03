import { createBrowserRouter } from "react-router-dom";
import HomePage from "../components/HomePage";
import MainLayout from "../layouts/MainLayout";
import ExplorePage from "./../components/ExplorePage/index";
import MyPostsPage from "./../components/MyPostsPage/index";
import BookMarkPage from "./../components/BookMarkPage/index";
import CreatePost from "../components/CreatePost/index";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "/explore",
        element: <ExplorePage />,
      },
      {
        path: "/bookmark",
        element: <BookMarkPage />,
      },
      {
        path: "/myposts",
        element: <MyPostsPage />,
      },
      {
        path: "/myposts/create",
        element: <CreatePost />,
      },
    ],
  },
]);
