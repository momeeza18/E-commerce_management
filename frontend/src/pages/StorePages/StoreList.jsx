import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axiosInstance from "../../components/ApiAxios";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState();

  const getAllStores = async () => {
    try {
      const response = await axiosInstance.get("/api/stores");
      // console.log(response.data);
      setStores(response.data.Stores);
      setLoading(false);
    } catch (err) {
      err.response?.data?.message || "Failed to load stores";
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllStores();
  }, []);

  if (loading) return <p>Loading!...</p>;
  return (
    <>
      <div className="p-3">
        <h3 className="mb-4 ">Stores List</h3>
        <Table responsive striped bordered hover>
          <thead className="bg-dark">
            <tr>
              <th>#</th>
              <th>Store Name</th>
              <th>Location</th>
              <th>Created By</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{store.name}</td>
                <td>{store.location}</td>
                <td>{store.created_by.role}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default StoreList;
