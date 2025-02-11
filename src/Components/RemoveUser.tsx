import { useEffect, useState } from "react";
import { RootState } from "../app/store";
import "./Styles/UserList.css";
import { useAppDispatch } from "../app/hooks";
import { fetchUsers } from "../app/features/users/usersSlice";
import { useSelector } from "react-redux";
import BasicUser from "./BasicUser";

const RemoveUser = () => {
  const { users } = useSelector((state: RootState) => state.users);
  const [updateUsers, setUpdateUsers] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
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
