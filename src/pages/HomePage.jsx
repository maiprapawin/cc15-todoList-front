import { useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import List from "../components/List";

export default function HomePage() {
  const [todos, setTodos] = useState([]);
  // ในอนาคต state นี้จะเก็บข้อมูล todo ทั้งหมด เลยใส่เป็น [] arr เปล่าไว้ เพราะมันใช้ method map ได้ ถ้าเราใส่เป็น null หรือ str มันจะ err ได้ถ้าในอนาคตเราใช้ .map => web ณ จังหวะแรกจะพังทันทีถ้าไม่ใช้ [] กับการ map/filter

  // เก็บ Logic ไว้ใต้นี้ แล้วส่งไปให้คนอื่นในการเรียกใช้
  // ทำให้ Handle State ได้ง่าย
  const createTodo = () => {};

  // const updateTodo = () => {}

  useEffect(() => {
    //para1 = effect fn, para2 = dependencies ต้องอย่าลืมใส่
    axios
      .get("http://localhost:5555/todo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setTodos(res.data.todos); //res.data.todos = ตามที่ตกลงกับฝั่ง back ไว้ ว่าจะส่งเป็น {todos} เป็น obj (แต่ถ้าเป็นส่ง (todos) ตรงนี้เราก็จะเป็นแค่ res.todos)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <Form setTodos={setTodos} createTodo={createTodo} />
      {/* จริงๆไม่ควรส่ง setTodos แบบนี้ เพราะมันจะไปทำให้ Logic ไปอยู่ในหน้าของคนอื่นที่เอา props เราไปใช้ อาจสับสนได้ว่าในหน้านั้นมี todo อยู่, วิธีที่ดีกว่าคือไปใส่โลจิคเขียนฟังชั่นไว้ข้างบน แล้วส่ง fn นั้นเป็น props แทน
      แต่อันนี้เอาง่ายๆไว้ก่อนเพราะโปรเจคเล็ก เลยส่ง setTodos ไปให้ Form.jsx */}
      <List todos={todos} />
      {/* ส่ง props จาก Hompage ไปให้ List */}
    </section>
  );
}
