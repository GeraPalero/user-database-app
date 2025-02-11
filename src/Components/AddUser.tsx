import { useEffect, useState } from "react";
import "./Styles/AddUser.css";
import { useAppDispatch } from "../app/hooks";
import { postUser } from "../app/features/users/usersSlice";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { PostResponse } from "../app/features/users/usersSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  profilePic: "", // This will store the Base64 string for the image
};

const AddUser = () => {
  const [formError, setFormError] = useState<string[]>([]);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useAppDispatch();
  // const { loading, error } = useSelector((state: RootState) => state.users);
  const [serverResponse, setServerResponse] = useState<PostResponse | undefined>(undefined);

  useEffect(() => {
    if (serverResponse) {
      window.alert(serverResponse.message);
    }
  }, [serverResponse]);

  const firstNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, firstName: value.trim() });
    //first name must contain only letters
    // if (!value.match(/\d/)) {
  };

  const lastNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, lastName: value.trim() });
    //second name must contain only letters
    // if (!value.match(/\d/)) {
  };

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, email: value.trim() });
    //email must be valid @
  };

  const phoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, phoneNumber: value.trim() });
    //phone must be 10 numbers
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result as string });
      };
      reader.readAsDataURL(file); // Convert image to Base64
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isFormValid = true;
    const errorsArray = [];

    if (formData.firstName.match(/\d/)) {
      isFormValid = false;
      errorsArray.push("First name must contain only letters");
      console.log("Numeros");
    }
    if (formData.lastName.match(/\d/)) {
      isFormValid = false;
      errorsArray.push("Second name must contain only letters");
      console.log("Numeros");
    }
    if (formData.phoneNumber.match(/\D/)) {
      isFormValid = false;
      errorsArray.push("Phone number must contain only numbers");
    }
    if (formData.firstName === "") {
      isFormValid = false;
      errorsArray.push("First name cannot be empty");
    }
    if (formData.lastName === "") {
      isFormValid = false;
      errorsArray.push("Second name cannot be empty");
    }
    if (formData.email === "") {
      isFormValid = false;
      errorsArray.push("Email cannot be empty");
    }
    if (formData.phoneNumber === "") {
      isFormValid = false;
      errorsArray.push("Phone number cannot be empty");
    }

    if (errorsArray.length != 0) {
      setFormError(errorsArray);
    } else {
      setFormError([]);
    }

    if (isFormValid) {
      const result = await dispatch(postUser(formData));
      console.log(result.payload);

      if (result.payload) {
        if (result.payload.status === 1) {
          setFormData(initialState);
        }
        setServerResponse(result.payload);
      }
    }
  };

  // const deleteUserThree = async () => {
  //   await axios.delete(`http://localhost:5000/api/users/3`);
  // };

  return (
    <>
      <h2>Add user</h2>
      <div className="add-user">
        <div>
          <h3 className="form-title">Enter user info</h3>

          <form action="" className="add-user_form" onSubmit={handleSubmit}>
            <label className="input-label">First name</label>
            <input className="input" type="text" value={formData.firstName} onChange={firstNameHandler} />
            <label className="input-label">Last name</label>
            <input className="input" type="text" value={formData.lastName} onChange={lastNameHandler} />
            <label className="input-label">Email adress</label>
            <input className="input" type="email" value={formData.email} onChange={emailHandler} />
            <label className="input-label">Phone number</label>
            <input className="input" type="phone" value={formData.phoneNumber} onChange={phoneHandler} />
            <label className="input-label">Profile photo</label>
            <div className="file-input-container">
              <input type="file" onChange={handleFileChange} />
            </div>
            <button className="submit-button">Add user</button>
          </form>
        </div>
        {formError && formError.map((errorMessage) => <div key={errorMessage}>{errorMessage}</div>)}
        {/* <button onClick={deleteUserThree}>DEelete 3</button> */}
      </div>
    </>
  );
};

export default AddUser;
