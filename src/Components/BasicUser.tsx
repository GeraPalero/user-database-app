import { useAppDispatch } from "../app/hooks";
import "./Styles/FullUser.css";
import { deleteUser, PostResponse } from "../app/features/users/usersSlice";
import { useEffect, useState } from "react";
import { Toast, toastsActions } from "../app/features/toasts/toastsSlice";

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
  const [serverResponse, setServerResponse] = useState<PostResponse | undefined>(undefined);

  type ToastType = "successfull" | "error" | "warning";

  const createToast = (tType: ToastType, tMessage: string, tDuration = 3000) => {
    const newToast: Toast = {
      id: Date.now(),
      type: tType,
      message: tMessage,
      duration: tDuration,
      timeOutId: null,
    };

    dispatch(toastsActions.addToast(newToast));
  };

  useEffect(() => {
    if (serverResponse) {
      const { status, message } = serverResponse;
      createToast(status, message);
    }
  }, [serverResponse]);

  const deleteUserHandler = async (userID: number) => {
    const response = await dispatch(deleteUser(userID));
    setServerResponse(response.payload);
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
