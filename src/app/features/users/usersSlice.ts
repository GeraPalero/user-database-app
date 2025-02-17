import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

type UserState = {
  loading: boolean;
  users: User[];
  error: string;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profilePic: string; // This will store the Base64 string for the image
};

export type PostResponse = {
  status: "successfull" | "error";
  message: string;
};

const initialState: UserState = {
  loading: false,
  users: [],
  error: "",
};

//Return type, the parameter received type and the rejected action type
export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:5000/api/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return rejectWithValue("Error fetching users");
  }
});

//Return type, the parameter received type and the rejected action type
export const postUser = createAsyncThunk<PostResponse, FormData, { rejectValue: PostResponse }>("users/postUser", async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:5000/api/users", formData);
    // return response.data;
    return {
      status: "successfull",
      message: "User created successfully",
    };
  } catch (error) {
    console.error("Error posting user:", error);
    return rejectWithValue({
      status: "error",
      message: "Error creating user",
    });
  }
});

//Return type, the parameter received type and the rejected action type
export const deleteUser = createAsyncThunk<PostResponse, number, { rejectValue: PostResponse }>("users/deleteUser", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/users/${id}`);
    // return response.data;
    return {
      status: "successfull",
      message: "User deleted successfully",
    };
  } catch (error) {
    console.error("Error posting user:", error);
    return rejectWithValue({
      status: "error",
      message: "Error deleting user",
    });
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    //   logIn: (state, action) => {
    //     //
    //   },
    //   logOut: (state) => {
    //     state;
    //   },
  },
  extraReducers: (builder) => {
    //Fetching users
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.payload || "Something went wrong"; //This operator is used when action.payload could be undefined
      state.loading = false;
    });

    //Creating a user
    builder.addCase(postUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(postUser.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(postUser.rejected, (state, action) => {
      state.error = action.payload?.message || "Something went wrong"; //This operator is used when action.payload could be undefined
      state.loading = false;
    });

    //Deleting a user
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.error = action.payload?.message || "Something went wrong"; //This operator is used when action.payload could be undefined
      state.loading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;
