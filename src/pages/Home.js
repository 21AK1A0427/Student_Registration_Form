import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [showInfoCard, setShowInfoCard] = useState(false); // State to toggle info card

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/User");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/User/${id}`);
    loadUsers();
  };

  const toggleInfoCard = () => {
    setShowInfoCard(!showInfoCard);
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", paddingBottom: "150px" }}>
      <div className="container py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">FirstName</th>
              <th scope="col">MiddleName</th>
              <th scope="col">LastName</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.firstName}</td>
                <td>{user.middleName}</td>
                <td>{user.lastName}</td>
                <td>
                  <Link className="btn btn-primary mx-2" to={`/viewuser/${user.id}`}>
                    View
                  </Link>
                  <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.id}`}>
                    Edit
                  </Link>
                  <button className="btn btn-danger mx-2" onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info Card */}
      {showInfoCard && (
        <div className="position-fixed top-50 start-50 translate-middle p-3" style={{ zIndex: 5, width: '400px' }}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Important Notice</h5>
              <p className="card-text">
                <b>AITT © </b> 
                2024 | All rights reserved<hr></hr>

                This material is the intellectual property of 
                Annamarcharya. It may not be reproduced, distributed, or used in any manner without 
                prior written permission from <br></br>
                 <b>AITS</b>

              </p>
              <button type="button" className="btn-close" aria-label="Close" onClick={toggleInfoCard}></button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="footer fixed-bottom bg-dark text-white py-3">
        <div className="container-fluid text-center">
          <p className="mb-0" onClick={toggleInfoCard} style={{ cursor: 'pointer' }}>
            &copy; {new Date().getFullYear()} Student Application | All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
