import axios from "axios";
import React, { useState } from "react";
import { apiURL } from "../utils/api";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getUserData = async (username) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${apiURL}/users/${username}`);
      setData(res.data);
    } catch (error) {
      console.log(error);
      setData(null);
      setError("User Not Found");
    } finally {
      setLoading(false);
    }
  };
  console.log(data);
  const handleSearch = () => {
    const username = document.getElementById("username").value;
    getUserData(username);
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <h1>Search User</h1>
      <div>
        <input
          type="text"
          name="username"
          id="username"
          className="outline-none px-4 py-2 rounded my-4"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <Loader />}
      {error && (
        <div className="flex flex-col gap-2 items-center mt-10">
          <h1>User Not Found</h1>
          <p>Please Search Again!</p>
        </div>
      )}
      {data && (
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="border border-[#343537] rounded p-10 flex flex-col justify-center items-center gap-1">
            <img
              className="rounded-full w-28"
              src={data.avatar_url}
              alt={data.login}
            />
            <h3>{data.name}</h3>
            <p>{data.bio}</p>
            <div className="flex justify-between gap-3">
              <p>Follower : {data.followers}</p>
              <p>Following : {data.following}</p>
            </div>

            <p>{data.location}</p>
            <Link to={`/users/${data.login}/repos`}>
              <button>Repository</button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
