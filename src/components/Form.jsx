import { useState } from "react";
import axios from "axios";

export default function Form({ setTodos }) {
  const [input, setInput] = useState(""); //ค่าเริ่มต้นคือสิ่งที่ user พิมพ์
  const handleSubmitForm = (e) => {
    e.preventDefault();
    //validatation ... พอทำเสร็จแล้วก็
    axios
      .post(
        "http://localhost:5555/todo", //para1 คือ path ที่เราจะยิงไปที่ server ที่เราจะ send request ไป
        { title: input }, //para2 = req body ที่มี key ชื่อ title ตามที่เราดีไซน์ไว้ที่ back
        {
          //para3 = obj
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        // เราจะเอา todo ที่เพิ่งถูกสร้างใน todo-controller ในฝั่ง back ส่งมาให้ เอามาใช้ เค้าส่งมาเป็น res
        console.log("success");
        setInput("");
        /* อัพเดท state แบบนี้ ทำให้ duplicate code ไม่ดี = server ทำงานหนัก = ต้องอัพเกรด server = แพงขึ้น
        // ควรเขียนฟังชั่นที่แม่ ส่งเป็น props มาให้ลูกแทน
        // axios
        //   .get("http://localhost:5555/todo", {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        //     },
        //   })
        //   .then((res) => {
        //     setTodos(res.data.todos);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
         */

        /* แบบนี้ดีกว่า Server ไม่ต้องไป fetch ข้อมูลมาใหม่ */
        // new Todo Obj => res.data.todo
        setTodos((prev) => [...prev, res.data.todo]); // clone element เก่า และเพิ่ม todo ใหม่
      })
      .catch((err) => console.log(err));
  };
  return (
    <form className="flex gap-2" onSubmit={handleSubmitForm}>
      <input
        type="text"
        className="outline-none px-3 py-1.5 border rounded-md flex-grow"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <button className="bg-blue-800 px-3 py-1.5 text-white rounded-md">
        Create
      </button>
    </form>
  );
}
