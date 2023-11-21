import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiURL } from "../utils/api";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import Loader from "../components/Loader";

const Repo = () => {
  const [repo, setRepo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 20;

  const getRepoData = async (page) => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiURL}/users/${id}/repos`, {
        params: { page, per_page: itemsPerPage },
      });
      setRepo(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRepoData(currentPage);
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo(0, 0);

  };

  return (
    <section className="flex flex-col gap-6  my-10">
      <Link to={"/"}>
        <button>Back</button>
      </Link>
      {loading && <Loader />}
      {repo.map((el) => (
        <div
          className="border border-[#343537] p-6 flex flex-col gap-1 rounded"
          key={el.id}
        >
          <Link to={`/repos/${id}/${el.name}`}>
            <h1 className="cursor-pointer hover:text-slate-400 w-fit transition-all duration-150">
              {el.name}
            </h1>
          </Link>
          <p>{el.description}</p>
          <div className="flex gap-4">
            <p>{el.language}</p>
            <p>{formatDate(el.created_at)}</p>
          </div>
        </div>
      ))}
      <div className="flex justify-center  items-center gap-10">
        <p>Total Repo : {repo.length}</p>
        {
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1 ? true : false}
            className="disabled:opacity-50"
          >
            Prev
          </button>
        }
        {repo.length === itemsPerPage && (
          <button onClick={handleNextPage}>Next</button>
        )}
      </div>
    </section>
  );
};

export default Repo;
