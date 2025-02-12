import { useEffect, useState } from "react";
import { RootState } from "../app/store";
import FullUser from "./FullUser";
import "./Styles/UserList.css";
import { useAppDispatch } from "../app/hooks";
import { fetchUsers } from "../app/features/users/usersSlice";
import { useSelector } from "react-redux";

const UserList = () => {
  const { loading, error, users } = useSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <h2>View users</h2>
      <div className="user-list">
        <div className="user-scroll">{users.length > 0 ? users.map((user) => <FullUser key={user.id} user={user} />) : <div>No users to display</div>}</div>
      </div>
    </>
  );
};

export default UserList;
