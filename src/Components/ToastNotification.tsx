import { Toast } from "../app/features/toasts/toastsSlice";
import { useAppDispatch } from "../app/hooks";
import { toastsActions } from "../app/features/toasts/toastsSlice";
import { useEffect, useState } from "react";
import "./Styles/ToastNotification.css";
import greenCheck from "../assets/green_checkmark.png";
import errorCross from "../assets/error_mark.png";
import warningSign from "../assets/warning_sign.webp";

const { removeToast, setTimeOutID } = toastsActions;
type ToastNotificationProps = {
  toast: Toast;
};

const ToastNotification = ({ toast }: ToastNotificationProps) => {
  const [toastImage, setToastImage] = useState("");
  const dispatch = useAppDispatch();

  //Check if the toast has already a remover timer asigned, this way it wont create another
  useEffect(() => {
    if (!toast.timeOutId) {
      const timerId = setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, toast.duration);

      dispatch(setTimeOutID({ id: toast.id, timeOutId: timerId }));
    }

    switch (toast.type) {
      case "successfull":
        setToastImage(greenCheck);
        break;
      case "warning":
        setToastImage(warningSign);
        break;
      case "error":
        setToastImage(errorCross);
        break;
    }
  }, []);

  const deleteToast = () => {
    toast.timeOutId && clearTimeout(toast.timeOutId);
    dispatch(removeToast(toast.id));
  };

  return (
    <div className="toast-notification">
      <img className="toast-image" src={toastImage} alt="" height={"30px"} />
      <div>{toast.message}</div>
      <button className="toast-cancel_button" onClick={deleteToast}>
        X
      </button>
    </div>
  );
};

export default ToastNotification;
