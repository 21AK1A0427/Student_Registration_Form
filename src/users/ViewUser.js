import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const ViewUser = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/User/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8080/User/${id}`);
      navigate('/'); // Use navigate instead of history.push
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`User Details`, 10, 10);
    
    const content = [
      `First Name: ${user.firstName}`,
      `Middle Name: ${user.middleName}`,
      `Last Name: ${user.lastName}`,
      `Mother's Name: ${user.motherName}`,
      `Father's Name: ${user.fatherName}`,
      `Mobile Number: ${user.mobileNumber}`,
      `Alternate Number: ${user.alternateMobileNumber}`,
      `Email: ${user.email}`,
      `Password: ${user.password}`,
      `Gender: ${user.gender}`,
      `Colleges: ${user.colleges}`,
      `Branch: ${user.branch}`,
      `Course Duration: ${user.courseDuration}`,
      `Start Date: ${user.startDate}`,
      `End Date: ${user.endDate}`,
    ];

    let yPosition = 20;
    content.forEach((line) => {
      doc.text(line, 10, yPosition);
      yPosition += 10;
    });

    doc.save(`${user.firstName}_${user.lastName}_details.pdf`);
  };

  return (
    <div>
      {user && (
        <div className="container" style={{ maxWidth: '750px', paddingTop: '20px' }}>
          <div className="py-4">
            <div className="card mb-3" id="user-details">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5>User Details - {user.id}</h5>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={deleteUser}
                >
                  Delete
                </button>
              </div>
              <div className="card-body">
                <div className="text-center mb-4">
                  <img 
                    src={`${process.env.PUBLIC_URL}/aitsclglogo1.png`} 
                    alt="College Logo" 
                    style={{ 
                      width: '150px', 
                      height: '150px', 
                      filter: 'brightness(1.5)', 
                    }} 
                  />
                </div>
                {[
                  { label: "First Name", value: user.firstName },
                  { label: "Middle Name", value: user.middleName },
                  { label: "Last Name", value: user.lastName },
                  { label: "Mother's Name", value: user.motherName },
                  { label: "Father's Name", value: user.fatherName },
                  { label: "Mobile Number", value: user.mobileNumber },
                  { label: "Alternate Number", value: user.alternateMobileNumber },
                  { label: "Email", value: user.email },
                  { label: "Password", value: user.password },
                  { label: "Gender", value: user.gender },
                  { label: "Colleges", value: user.colleges },
                  { label: "Branch", value: user.branch },
                  { label: "Course Duration", value: user.courseDuration },
                  { label: "Start Date", value: user.startDate },
                  { label: "End Date", value: user.endDate },
                ].map((field, i) => (
                  <div className="row mb-2 align-items-center" key={i} style={{ marginBottom: '10px' }}>
                    <div className="col-sm-4" style={{ textAlign: 'left', fontWeight: 'bold', paddingLeft: '90px' }}>
                      {field.label}
                    </div>
                    <div className="col-sm-1 text-center">
                      :
                    </div>
                    <div className="col-sm-7" style={{ textAlign: 'left', paddingLeft: '90px' }}>
                      {field.value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="card-footer d-flex justify-content-end">
                <Link className="btn btn-primary mx-2" to="/">
                  Back to Home
                </Link>
                <button className="btn btn-success mx-2" onClick={handlePrint}>
                  Print PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewUser;
