import { useEffect, useState } from "react";
import { RootState } from "../app/store";
import "./Styles/UserList.css";
import { useAppDispatch } from "../app/hooks";
import { fetchUsers } from "../app/features/users/usersSlice";
import { useSelector } from "react-redux";
import BasicUser from "./BasicUser";
import { ToastPayload, toastsActions } from "../app/features/toasts/toastsSlice";

const RemoveUser = () => {
  const { error, users } = useSelector((state: RootState) => state.users);
  const [updateUsers, setUpdateUsers] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const useEffectFetching = async () => {
      const response = await dispatch(fetchUsers());
      if (response.payload === "Error fetching users") {
        const newToast: ToastPayload = {
          type: "error",
          message: "Error fetching users",
          duration: 5000,
        };

        dispatch(toastsActions.addToast(newToast));
      }
    };

    useEffectFetching();
  }, [updateUsers]);

  return (
    <>
      <h2>Remove users</h2>
      <div className="user-list">
        <div className="user-scroll">{users.length > 0 ? users.map((user) => <BasicUser key={user.id} user={user} setUpdateUser={setUpdateUsers} />) : <div>No users to display</div>}</div>
      </div>
    </>
  );
};

export default RemoveUser;
