import Create from "../pages/Create/Create";
import Discover from "../pages/Discover/Discover";
import Edit from "../pages/Edit/Edit";
import Error from "../pages/Error/Error";
import Frequently from "../pages/Frequently/Frequently";
import Home from "../pages/Home/Home";
import Upload from "../pages/Upload/Upload";
import OneItem from "../pages/OneItem/OneItem";
import Register from "../pages/Register/Register";
import Login from "../pages/Register/Login";
import EditNft from "../pages/EditNft/EditNft";
import RequireAuth from "../components/RequireAuth"; // ⬅️ Import the wrapper

const routes = [
  { path: "/", element: <Home /> },
  { path: "/frequently", element: <Frequently /> },
  { path: "/discover", element: <Discover /> },
  {
    path: "/editProfile",
    element: (
     
        <Edit />
      
    ),
  },
  {
    path: "/uploadItem",
    element: (
      
        <Upload />
      
    ),
  },
  {
    path: "/create",
    element: (
     
        <Create />
     
    ),
  },
  {
    path: "/editNft/:id",
    element: (
     
        <EditNft />
      
    ),
  },
  { path: "/nft/:id", element: <OneItem /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <Error /> },
];

export default routes;



//  import Create from "../pages/Create/Create"
// import Discover from "../pages/Discover/Discover"
// import Edit from "../pages/Edit/Edit"
// import Error from "../pages/Error/Error"
// import Frequently from "../pages/Frequently/Frequently"
// import Home from "../pages/Home/Home"
// import Upload from "../pages/Upload/Upload"
// import OneItem from "../pages/OneItem/OneItem"
// import Register from "../pages/Register/Register"
// import Login from "../pages/Register/Login"
// import EditNft from "../pages/EditNft/EditNft"

// const routes = [
//     {
//         path: "/",
//         element: <Home />
//     },
//     {
//         path: "/frequently",
//         element: <Frequently />
//     },
//     {
//         path: "/discover",
//         element: <Discover />
//     },
//     {
//         path: "/editProfile",
//         element: <Edit />
//     },
//     {
//         path: "/uploadItem",
//         element: <Upload />
//     },
//     {
//         path: "*",
//         element: <Error />
//     },
//     {
//         path: "/create",
//         element: <Create />
//     },

//     {
//         path: "/login",
//         element: <Login />
//     },
//     {
//         path: "/nft/:id",
//         element: <OneItem />
//     },
//     {
//         path: "/editNft/:id",
//         element: <EditNft />
//     },
//     {
//         path: "/register",
//         element: <Register />
//     }
// ]

// export default routes