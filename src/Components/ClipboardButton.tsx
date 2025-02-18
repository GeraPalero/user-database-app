import { useAppDispatch } from "../app/hooks";
import { ToastPayload, toastsActions } from "../app/features/toasts/toastsSlice";
import "./Styles/ClipboardButton.css";

type ClipboardButtonProps = {
  textToCopy: string;
};

const ClipboardButton = ({ textToCopy }: ClipboardButtonProps) => {
  const dispatch = useAppDispatch();
  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    const newToast: ToastPayload = {
      type: "successfull",
      message: "Text copied to clipboard",
      duration: 3000,
    };
    dispatch(toastsActions.addToast(newToast));
  };

  return (
    <>
      <button
        className="clipboard-button"
        onClick={() => {
          copyToClipboard(textToCopy);
        }}
      >
        <span className="tooltip_text">Copy to clipboard</span>
        🗐
      </button>
    </>
  );
};

export default ClipboardButton;
