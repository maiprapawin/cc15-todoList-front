import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const router =
  // createBrowserRouter = fn ที่ import มาจาก react router dom
  createBrowserRouter([
    {
      path: "/",
      // root path จะ render ก้อน element
      element: (
        // Layout
        <div className="bg-gray-200 h-screen">
          <Header />
          <div className="p-8 max-w-xl mx-auto">
            <Outlet />
          </div>
          {/* Outlet ถูกแทนที่ด้วย children เสมอ มันจะขึ้นอยู่กับว่าเป็น url ไหน path อะไร */}
          {/* ถ้า path เป็น root path ("/") => Outlet = <h1>Home Page</h1> */}
          {/* ถ้า path เป็น /login => Outlet = <h1>Login Page</h1> */}
          {/* ถ้า path เป็น /register => Outlet = <h1>Register Page</h1> */}
        </div>
      ),
      children: [
        /* เขียนแบบ absolute path = ตัว prefix path จะต้องเขียนแบบเต็มๆเลย
        { path: "/", element: <h1>Home Page</h1> }, 
        { path: "/login", element: <h1>Login Page</h1> },
        { path: "/register", element: <h1>Register Page</h1> },
        */
        /* เขียนแบบ relative path ก็คือ relative กับแม่ที่ระบุ path: "/" ไว้ข้างบน */
        // { path: "", element: <h1>Home Page</h1> },
        // { path: "login", element: <h1>Login Page</h1> },
        // { path: "register", element: <h1>Register Page</h1> },

        { path: "", element: <HomePage /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
      ],
    },
  ]);

export default function Router() {
  return <RouterProvider router={router}></RouterProvider>;
}
