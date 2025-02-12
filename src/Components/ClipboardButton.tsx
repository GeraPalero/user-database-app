import "./Styles/ClipboardButton.css";

type ClipboardButtonProps = {
  textToCopy: string;
};

const ClipboardButton = ({ textToCopy }: ClipboardButtonProps) => {
  return (
    <>
      <button
        className="clipboard-button"
        onClick={() => {
          navigator.clipboard.writeText(textToCopy);
        }}
      >
        <span className="tooltip_text">Copy to clipboard</span>
        🗐
      </button>
    </>
  );
};

export default ClipboardButton;
