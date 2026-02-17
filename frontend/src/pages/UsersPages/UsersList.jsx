import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axiosInstance from "../../components/ApiAxios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState();

  const getAllusers = async () => {
    try {
      const response = await axiosInstance.get("/api/users");
      // console.log(response.data);
      setUsers(response.data.users);
      setLoading(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllusers();
  }, []);

  if (loading) return <p>Loading!...</p>;
  return (
    <>
      <div className="p-3">
        <h3 className="mb-4 ">Users List</h3>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Role</th>
              <th>Store Manage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.city}</td>
                <td>{user.role}</td>
                <td>{user?.store?.name || "null"}</td>
                <td>
                  <button
                    className="btn btn-outline-none btn-outline-primary btn-sm "
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default UsersList;
