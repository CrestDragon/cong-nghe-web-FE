import Home from "../pages/Home";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import HotelList from "../pages/HotelList";
import HotelDetail from "../pages/HotelDetail";
import ProfileChangePassword from "../components/Profile/ProfileChangePassword";
import Register from "../pages/Auth/Register";
import OrderList from "../pages/OrderList";
import Login from "../pages/Auth/Login";

const routes = [
  { path: "/", element: <Home />, children: [] },
  {
    path: "/profile",
    element: <Profile />,
    children: [{ path: "password", element: <ProfileChangePassword /> }],
  },
  { path: "*", element: <NotFound /> },
  { path: "/hotels", element: <HotelList /> },
  { path: "/hotels/:hotelId", element: <HotelDetail /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/order", element: <OrderList /> },
];

export default routes;
