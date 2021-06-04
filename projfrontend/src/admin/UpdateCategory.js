// import React, { useState, useEffect } from "react";
// import Base from "../core/Base";
// import { Link } from "react-router-dom";
// import {
//   getCategories,
//   updateCategory,
//   getCategory,
// } from "./helper/adminapicall";
// import { isAuthenticated } from "../auth/helper/index";
// const UpdateCategory = ({ match }) => {
//   const { user, token } = isAuthenticated();

//   const [values, setValues] = useState({
//     name: "",
//     formData: "",
//   });

//   const { name, createdCategory, formData } = values;
//   const preload = (categoryId) => {
//     getCategory(categoryId).then((data) => {
//       //console.log(data);
//       if (data?.error) {
//         setValues({ ...values, error: data?.error });
//       } else {
//         preload();
//         setValues({
//           ...values,
//           name: data.name,
//           formData: new FormData(),
//         });
//       }
//     });
//   };
//   useEffect(() => {
//     preload(match.params.productId);
//   }, []);

//   const onSubmit = (event) => {
//     event.preventDefault();
//     setValues({ ...values, error: "", loading: true });
//   };
//   const handleChange = (event) => {
//     setValues(...values, event.target.value);
//   };
//   const successMessage = () => (
//     <div
//       className="alert alert-success mt-3"
//       style={{ display: createdCategory ? "" : "none" }}
//     >
//       <h4>{createdCategory} updated successfully</h4>
//     </div>
//   );
//   updateCategory(match.params.categoryId, user._id, token, formData).then(
//     (data) => {
//       if (data?.error) {
//         setValues({ ...values, error: data?.error });
//       } else {
//         setValues({
//           ...values,
//           createdCategory: data?.name,
//         });
//       }
//     }
//   );
//   const myCategoryForm = () => (
//     <form>
//       <div className="form-group">
//         <p className="lead" className="h2">
//           {" "}
//           Enter the category{" "}
//         </p>
//         <input
//           type="text"
//           className="form-control my-3"
//           autoFocus
//           onChange={handleChange}
//           value={name}
//         />
//         <button onClick={onSubmit} className="btn btn-info">
//           {" "}
//           Update Category
//         </button>
//       </div>
//     </form>
//   );

//   return (
//     <Base
//       title="Update a category here"
//       description="Update"
//       className="container bg-info p-4"
//     >
//       <div className="row bg-white rounded">
//         <div className="col-md-12 text-white bg-dark">{myCategoryForm()}</div>
//       </div>
//     </Base>
//   );
// };
// export default UpdateCategory;

// import React, { useState, useEffect } from "react";
// import Base from "../core/Base";
// import { isAuthenticated } from "../auth/helper";
// import { Link } from "react-router-dom";
// import { updateCategory, getCategory } from "./helper/adminapicall";

// const UpdateCategories = ({ match }) => {
//   const [name, setName] = useState("");
//   const [error, setError] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const [values, setValues] = useState({ getRedirected: false });
//   const { getRedirected } = values;

//   const { user, token } = isAuthenticated();

//   const goBack = () => (
//     <div className=" mt-4 d-flex justify-content-end">
//       <Link className="btn btn-md btn-secondary mb-3" to="/admin/dashboard">
//         Admin Home{" "}
//       </Link>
//     </div>
//   );

//   const preload = (categoryId) => {
//     getCategory(categoryId).then((data) => {
//       if (data?.error) {
//         setError("true");
//       } else {
//         setName(data?.name);
//       }
//     });
//   };

//   useEffect(() => {
//     preload(match.params.categoryId);
//   }, []);

//   const handleChange = (event) => {
//     setError("");
//     setName(event.target.value);
//   };

//   const onSubmit = (event) => {
//     event.preventDefault();
//     setError("");
//     setSuccess(false);

//     //backend request fired
//     updateCategory(match.params.categoryId, user._id, token, name).then(
//       (data) => {
//         if (data?.error) {
//           setError(true);
//         } else {
//           setError("");
//           setSuccess(true);
//           setName("");
//           setValues({ ...values, getRedirected: true });
//         }
//       }
//     );
//   };

//   const sucessMessage = (err) => (
//     <div
//       className="alert alert-success mt-3"
//       style={{ display: success ? "" : "none" }}
//     >
//       <h4> Category Created Successfully</h4>
//     </div>
//   );

//   const warningMessage = (error) => (
//     <div
//       className="alert alert-danger mt-3"
//       style={{ display: error ? "" : "none" }}
//     >
//       <h4>{error} Failed to create Category</h4>
//     </div>
//   );

//   const performRedirect = () => {
//     if (getRedirected) {
//       setTimeout(() => {
//         window.history.back();
//       }, 2000);
//     }
//   };

//   const myCategoryForm = () => (
//     <form>
//       <div className="form-group">
//         <p className="lead" className="h2">
//           {" "}
//           Enter the category{" "}
//         </p>
//         <input
//           type="text"
//           className="form-control my-3"
//           autoFocus
//           onChange={handleChange}
//           value={name}
//         />
//         <button onClick={onSubmit} className="btn btn-info">
//           {" "}
//           Update Category
//         </button>
//       </div>
//     </form>
//   );

//   return (
//     <Base
//       title="Update a category here"
//       description="Update"
//       className="container bg-info p-4"
//     >
//       <div className="row bg-white rounded">
//         <div className="col-md-12 text-white bg-dark">
//           {sucessMessage()}
//           {warningMessage()}
//           {myCategoryForm()}
//           {goBack()}
//           {performRedirect()}
//         </div>
//       </div>
//     </Base>
//   );
// };

// export default UpdateCategories;
import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateCategory } from "./helper/adminapicall";

const UpdateCategory = () => {
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
    updateCategory(user._id, token, { name }).then((data) => {
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
          Update
        </button>
      </div>
    </form>
  );
  return (
    <Base
      title="Update A Category"
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
export default UpdateCategory;
