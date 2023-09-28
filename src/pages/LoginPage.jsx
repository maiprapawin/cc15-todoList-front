import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginPage() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const ctx = useContext(AuthContext); // useContext = ไปดึงค่าใน context มา
  // ctx = {user, setUser}

  const navigate = useNavigate();

  // {username: "", password: ""}
  // {username: "", password: "", username: "a"} => {username: "a", password: ""}

  const handleChangeInput = (event) =>
    setInput({ ...input, [event.target.name]: event.target.value });
  // ...คือโคลนมาใหม่

  const handleSubmitForm = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5555/auth/login", input)
      //ก้อน input คือ obj {username: "", password: ""} ตอนที่เรา setstate ด้านบน
      .then((res) => {
        console.log(res.data.accessToken); //คำว่า accessToken ต้องตรงกับในไฟล์ auth-controller ของไฟล์ backend
        localStorage.setItem("accessToken", res.data.accessToken); //เก็บ accessToken ไว้ใน local storage
        ctx.setUser(true); //หลังจากนี้ถ้าเราลอคอินสำเร็จ ตัว context provider state ตรงนี้จาก false จะเป็น true
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        window.alert("Login failed");
      });
  };

  return (
    <form
      className="flex flex-col gap-4 bg-white p-4 rounded-md"
      onSubmit={handleSubmitForm}
    >
      <div>
        <label htmlFor="" className="block mb-1 font-semibold">
          Username
        </label>
        <input
          type="text"
          className="w-full border outline-none px-3 py-1.5 rounded-md focus:ring-2 focus:ring-blue-600"
          name="username"
          value={input.username}
          onChange={handleChangeInput}
        />
      </div>
      <div>
        <label htmlFor="" className="block mb-1 font-semibold">
          Password
        </label>
        <input
          type="text"
          className="w-full border outline-none px-3 py-1.5 rounded-md focus:ring-2 focus:ring-blue-600"
          name="password"
          value={input.password}
          onChange={handleChangeInput}
        />
      </div>
      <button className="bg-blue-800 px-3 py-1.5 text-white rounded-md">
        Sign In
      </button>
    </form>
  );
}
