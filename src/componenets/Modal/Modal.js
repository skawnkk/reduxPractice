import "./style.css";
export default function Modal({ title, modalClose }) {
  return (
    <div className="Modal">
      <h1>{title}</h1>
      <button onClick={modalClose}>닫기</button>
    </div>
  );
}
