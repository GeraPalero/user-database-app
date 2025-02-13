import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ToastNotification from "./ToastNotification";
import "./Styles/ToastDisplay.css";

const ToastsDisplay = () => {
  const { queue, quantity } = useSelector((state: RootState) => state.toasts);

  return (
    <div className="toasts-display">
      {queue.map((toast) => (
        <ToastNotification key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default ToastsDisplay;
