import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const ctx = useContext(AuthContext); //อ่านค่า context จาก AuthContext
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center p-4 bg-white">
      <h1 className="font-bold text-2xl">Todo List App</h1>
      <ul className="flex gap-5">
        {ctx.user ? (
          // ถ้าเป็น true = ให้ขึ้น Home และ Logout ที่ Header
          <>
            <li className="hover:cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li
              className="hover:cursor-pointer"
              onClick={() => {
                ctx.setUser(false);
                navigate("login");
                localStorage.removeItem("accessToken");
              }}
            >
              Logout
            </li>
          </>
        ) : (
          // ถ้าเป็น false = ให้ขึ้น Login และ Register ที่ Header

          <>
            <li className="hover:cursor-pointer">
              <Link to="/login">Login</Link>
            </li>
            <li className="hover:cursor-pointer">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
