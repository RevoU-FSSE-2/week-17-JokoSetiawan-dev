import React, { useState, useEffect } from "react";
import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";
import { AddDataButton } from "../../components";

interface IDataItem {
  id: number;
  user_id: number;
  type: string;
  amount: number;
}

interface DataTableProps {
  data: IDataItem[];
}

const HomePage: React.FC<DataTableProps> = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<IDataItem[]>([]);

  const fetchData = async () => {
    const apiUrl = "https://week-15-jokosetiawan-dev-production.up.railway.app/";
    try {
      const response = await fetch(apiUrl, {
        method: "GET"
      });
      const data = await response.json();
      setData(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteTransaction = async (id: number) => {
    const apiUrl = `https://week-15-jokosetiawan-dev-production.up.railway.app/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh the data after deleting if needed.
        fetchData();
      } else {
        console.log("Failed to delete category.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`container pt-4 ${styles.homeContainer}`}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">User_id</th>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dataItem) => (
            <tr>
              <td>{dataItem.id}</td>
              <td>{dataItem.user_id}</td>
              <td>{dataItem.type}</td>
              <td>{dataItem.amount}</td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate(`/category/update`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleDeleteTransaction(dataItem.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <AddDataButton
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;
