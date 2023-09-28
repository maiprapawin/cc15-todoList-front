import Item from "./Item";

export default function List({ todos }) {
  // List รับค่า props todos มาจาก HomePage
  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <Item key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

/* <Item key={todo.id} todo={todo} />
      - key เป็นตัวช่วยในการ optimize ใน React ใส่ค่า unique key
      - ส่ง props ไปให้ Item
*/
