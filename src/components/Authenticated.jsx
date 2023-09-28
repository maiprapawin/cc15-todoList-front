import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function Authenticated({ children }) {
  const ctx = useContext(AuthContext);

  if (!ctx.user) {
    // ถ้า user เป็น false แปลว่าไม่ได้ลอคอินอยู่ ใน redirect ไปหน้า Login
    return <Navigate to="/login" />;
  }
  return children;
}
//เพื่อที่ว่าถ้า user ไม่ได้ลอคอินอยู่ เค้าจะไม่สามารถเข้าหน้า home ได้เลย
