import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Link } from "react-router-dom";


const HomePage = () => {

  const [user, token] = useAuth();
  const [temperatures, setTemperature] = useState([]);

  useEffect(() => {
    const fetchTemperatures = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/temperatures/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setTemperature(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchTemperatures();
  }, [token]);
  console.log(user)


  return (
    <div className="container">
      <div className='col-sm'>
      <Link to="/temperature">Record New Temperature!</Link>
      <table>
        <thead>
          <tr>
            <th>Temperature History</th>
          </tr>
        </thead>
        <tbody>
          {temperatures.map((temperature, index) => {
            return (
              <tr>
                <id>{index + 1}</id>
                <td>{temperature.temperature}</td>
                <td>{temperature.created_at}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>

    </div>
  );
};

export default HomePage;
