export default function Item({ todo }) {
  // ******* อย่าลืมวงเล็บปีกกา ไม่งั้นมันจะมองว่าก้อน todo นี้คือ obj ทั้งก้อน *******
  // ข้อมูล todo ถูกส่งมาจาก server เป็นข้อมูลที่มาจาก database เป็น obj ที่มีค่าต่างๆที่เราตั้งไว้ใน database (mysql)
  return (
    <li className="flex justify-between border items-center border-gray-200 bg-white px-3 py-4 rounded-md">
      <span>{todo.title}</span>
      <div className="flex gap-2">
        <button className="bg-green-800 px-3 py-1.5 text-white rounded-md">
          Edit
        </button>
        <button className="bg-red-800 px-3 py-1.5 text-white rounded-md">
          Del
        </button>
      </div>
    </li>
  );
}
