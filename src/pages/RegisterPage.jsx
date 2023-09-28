import { useState } from "react";
import Joi from "joi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//ประกาศ schema ของสิ่งที่เราจะ validate ด้วย joi
const schema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  // = username ต้องเป็น string อย่างต่ำ 30 ตัว ไม่เกิน 30 (chaining method max min สลับตำแหน่งกันได้)
  password: Joi.string().min(6).alphanum().required(),
  // alphanumeric = ต้องเป็นอักษรปกติไม่ใช่อักขระพิเศษ
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  // valid คือ method ที่หมายถึงค่าที่เป็นไปได้ = ก็คือจะต้องเท่ากับ Joi value ของ password
});

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmitForm = (event) => {
    //browser เป็นคนเรียกใช้ fn นี้ ทำงานเมื่อกด submit button ในฟอร์ม
    event.preventDefault(); //prevent default action ของ form คือบอกฟอร์มว่าไม่ต้องทำอะไร เดี๋ยวเราทำเอง

    const { value, error } = schema.validate(
      {
        username,
        password,
        confirmPassword,
      },
      { abortEarly: false }
    ); // false = validate ทุก key value
    // shorthand ของ {username: username, password: password, confirmPassword: confirmPassword}
    // มันจะ return ค่ามาเป็น obj ที่เป็น value และ error
    if (error) {
      console.dir(error);
      //{username: "\"username\" is not allowed to be empty",password: "\"password\" is not allowed to be empty", confirmPassword: ""}
      // setError()
      const nextError = { username: "", password: "", confirmPassword: "" };
      for (let item of error.details) {
        nextError[item.path[0]] = item.message; //nextError เป็น arr อ้างไปที่ key แล้ว .path ไป
      }
      return setError(nextError);
    }
    // ถ้าไม่ error, set ค่าเป็นเริ่มต้น
    setError({
      username: "",
      password: "",
      confirmPassword: "",
    });

    setIsLoading(true);
    axios
      .post("http://localhost:5555/auth/register", {
        username,
        password,
        confirmPassword,
      }) //อิงจาก design.txt file ของ back ที่เราเขียนไว้ {username: username} แต่ถ้าที่เราดีไซน์ไว้ใน backend เป็นคำอื่นเช่น uname ก็ต้องเป็น uname: username
      // axios.post จะ send req ไปหา server //อยากรู้ว่า res อะไรกลับมา ไปดูใน doc => data{}

      .then((res) => {
        //ถ้าทำสำเร็จ จะส่งเป็น response obj มาให้เรา ตามใน axios doc (res_schema page) เป็นค่า obj ที่มี key 6 ตัว ถ้าสำเร็จจะเป็นกุล่ม 200 ถ้า error มันจะ throw กลับมาให้เรา
        window.alert("success registration");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <form
      className="flex flex-col gap-4 bg-white p-4 rounded-md"
      onSubmit={handleSubmitForm} //ตอนที่เกิด event submit กับ form => browser executes handleSubmitForm(event) มันจะพาส event obj นี้เข้าไปใน fn handleSubmitForm
    >
      {/* Username */}
      <div>
        <label htmlFor="" className="block mb-1 font-semibold">
          Username
        </label>
        <input
          type="text"
          className={`w-full border outline-none px-3 py-1.5 rounded-md focus:ring-2 focus:ring-blue-600 ${
            error.username
              ? "border-red-600 focus:ring-red-600"
              : "focus:ring-blue-600"
          }`}
          value={username}
          // เมื่อเกิด change ที่กล่อง input = onChange fn นี้จะถูกเรียกใช้งาน ตอนเรียกใช้ browser จะพาส event obj เข้ามาใน fn
          // browser สร้าง event ให้เราเอง ว่าเกิดอะไรขึ้น ทำให้เราอ่านค่าที่ user พิมพ์เข้ามาได้
          // target คือ element, event.target = กล่อง input, อะไรก็ตามที่กรอกเข้ามาในกล่องนี้ คือ event.target.value
          onChange={(event) => {
            setUsername(event.target.value);
          }} //callback => browser execute cb(event)
        />
        {error.username && (
          <span className="text-red-600 text-xs">{error.username}</span>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="" className="block mb-1 font-semibold">
          Password
        </label>
        <input
          type="text"
          className={`w-full border outline-none px-3 py-1.5 rounded-md focus:ring-2 focus:ring-blue-600 ${
            error.password
              ? "border-red-600 focus:ring-red-600"
              : "focus:ring-blue-600"
          }`}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {error.password && (
          <span className="text-red-600 text-xs">{error.password}</span>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="" className="block mb-1 font-semibold">
          Confirm Password
        </label>
        <input
          type="text"
          className={`w-full border outline-none px-3 py-1.5 rounded-md focus:ring-2 focus:ring-blue-600 ${
            error.confirmPasswordassword
              ? "border-red-600 focus:ring-red-600"
              : "focus:ring-blue-600"
          }`}
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
        />
        {error.confirmPassword && (
          <span className="text-red-600 text-xs">{error.confirmPassword}</span>
        )}
      </div>

      {/* Button */}
      <button className="bg-blue-800 px-3 py-1.5 text-white rounded-md">
        Sign Up
      </button>
    </form>
  );
}
