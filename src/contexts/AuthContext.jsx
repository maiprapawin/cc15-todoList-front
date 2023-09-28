import { createContext, useState } from "react";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("accessToken") ? true : false
  );
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
  // ตอนเริ่มต้น = โยนค่า user = null ไป และส่ง setUser ไปให้คนอื่นใช้ได้ (เช่นตอนหลังลอคอิน)
}
export { AuthContext };
