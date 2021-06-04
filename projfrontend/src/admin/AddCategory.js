import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-small btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );
  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend req fiired
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };
  const warningMessage = () => {
    if (error) {
      return <h4 className="text-alert"> Failed to create the category :(</h4>;
    }
  };
  const successMessage = () => {
    if (success) {
      return (
        <h4 className="text-success">Successfully created the category!</h4>
      );
    }
  };
  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter A Category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          vale={name}
          autoFocus
          required
          placeholder="EX..Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Category
        </button>
      </div>
    </form>
  );
  return (
    <Base
      title="Create A Category"
      description="Add a new category for t-shirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};
export default AddCategory;
