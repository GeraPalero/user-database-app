import "./Styles/FullUser.css";

type FullUserProps = {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
};

const FullUser = ({ user }: FullUserProps) => {
  const fullUserName = user.firstName + " " + user.lastName;

  return (
    <div className="full-user">
      <div className="outer-container">
        <div className="left-container">Aqui va la foto</div>
        <div className="right-container">
          <label className="label">Full name</label>
          <div className="user-info">
            <div>{fullUserName}</div>
            <button
              className="clipboard-button"
              onClick={() => {
                navigator.clipboard.writeText(`${fullUserName}`);
              }}
            >
              🗐
            </button>
          </div>
          <label className="label">Email adress</label>
          <div className="user-info">
            <div>{user.email}</div>
            <button
              className="clipboard-button"
              onClick={() => {
                navigator.clipboard.writeText(`${user.email}`);
              }}
            >
              🗐
            </button>
          </div>
          <label className="label"> Phone number</label>
          <div className="user-info">
            <div>{user.phoneNumber}</div>
            <button
              className="clipboard-button"
              onClick={() => {
                navigator.clipboard.writeText(`${user.phoneNumber}`);
              }}
            >
              🗐
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullUser;
