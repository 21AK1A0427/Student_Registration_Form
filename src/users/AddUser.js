import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    motherName: "",
    fatherName: "",
    mobileNumber: "",
    alternateMobileNumber: "",
    email: "",
    password: "",
    gender: "",
    colleges: "",
    branch: "",
    courseDuration: "",
    startDate: "",
    endDate: ""
  });

  const {
    firstName,
    middleName,
    lastName,
    motherName,
    fatherName,
    mobileNumber,
    alternateMobileNumber,
    email,
    password,
    gender,
    colleges,
    branch,
    courseDuration,
    startDate,
    endDate
  } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/User", user);
    navigate("/");
  };

  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      <div className="col-md-8 offset-md-2 border rounded p-4 mt-4 shadow">
        <h2 className="text-center mb-4">Register User</h2>
        <form onSubmit={onSubmit}>
          {[
            { label: "First Name", name: "firstName", value: firstName },
            { label: "Middle Name", name: "middleName", value: middleName },
            { label: "Last Name", name: "lastName", value: lastName },
            { label: "Mother's Name", name: "motherName", value: motherName },
            { label: "Father's Name", name: "fatherName", value: fatherName },
            { label: "Mobile Number", name: "mobileNumber", value: mobileNumber },
            { label: "Alternate Mobile Number", name: "alternateMobileNumber", value: alternateMobileNumber },
            { label: "Email", name: "email", value: email, type: "email" },
            { label: "Password", name: "password", value: password, type: "password" },
            { label: "Gender", name: "gender", value: gender },
            { label: "Colleges ", name: "colleges", value: colleges },
            { label: "Branch", name: "branch", value: branch },
            { label: "Start Date", name: "startDate", value: startDate, type: "date" },
            { label: "End Date", name: "endDate", value: endDate, type: "date" },
            { label: "Course Duration", name: "courseDuration", value: courseDuration }
          ].map((field, i) => (
            <div className="row mb-3 align-items-center" key={i}>
              <div className="col-sm-4" style={{ textAlign: 'left', fontWeight: 'bold' }}>
                {field.label.replace(/ /g, '')}
              </div>
              <div className="col-sm-1 text-center">
                :
              </div>
              <div className="col-sm-7" style={{ textAlign: 'left' }}>
                <input
                  type={field.type || "text"}
                  className="form-control"
                  name={field.name}
                  value={field.value}
                  onChange={onInputChange}
                  required
                />
              </div>
            </div>
          ))}
          <div className="text-center">
            <button type="submit" className="btn btn-outline-primary mx-2">
              Submit
            </button>
            <Link to="/" className="btn btn-outline-danger mx-2">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

