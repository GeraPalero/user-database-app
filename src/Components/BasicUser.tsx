import { useAppDispatch } from "../app/hooks";
import "./Styles/FullUser.css";
import { deleteUser } from "../app/features/users/usersSlice";

type BasicUserProps = {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  setUpdateUser: React.Dispatch<React.SetStateAction<boolean>>;
};

const BasicUser = ({ user, setUpdateUser }: BasicUserProps) => {
  const fullUserName = user.firstName + " " + user.lastName;
  const dispatch = useAppDispatch();

  const deleteUserHandler = (userID: number) => {
    dispatch(deleteUser(userID));
    setUpdateUser((prev) => !prev);
  };

  return (
    <div className="full-user">
      <div className="outer-container">
        <div className="left-container">Aqui va la foto</div>
        <div className="right-container">
          <label className="label">Full name</label>
          <div className="user-info">
            <div>{fullUserName}</div>
          </div>
          <label className="label">Email adress</label>
          <div className="user-info">
            <div>{user.email}</div>
          </div>
          <button className="delete-user-button" onClick={() => deleteUserHandler(user.id)}>
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicUser;
