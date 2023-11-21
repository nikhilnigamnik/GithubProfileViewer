import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiURL } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { formatTime } from "../utils/formatTime";

const Commit = () => {
  const { id, repoName } = useParams();
  const [commit, setCommit] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const getRepoCommit = async (page) => {
    try {
      const res = await axios.get(`${apiURL}/repos/${id}/${repoName}/commits`, {
        params: { page, per_page: itemsPerPage },
      });
      console.log(res.data);
      setCommit(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRepoCommit(currentPage);
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <section className="flex flex-col gap-6  my-10">
      <div className="flex justify-between items-center">
        <Link to={`/repos/${id}/${repoName}`}>
          <button>Back</button>
        </Link>
        <button>Total Commit : {commit.length}</button>
      </div>
      <div className="flex flex-col  gap-4 ">
        {commit.map((el) => (
          <div className="border-[#343537] border rounded py-1 px-4 flex flex-col gap-3">
            <p>Commits on {formatTime(el?.commit?.committer?.date)}</p>
            <h1>{el.commit.message}</h1>
            <div className="flex items-center gap-4">
              <p>{el.commit.author.name}</p>
              <p>comitted {formatDate(el.commit.author.date)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center  items-center gap-10">
        {
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1 ? true : false}
            className="disabled:opacity-50"
          >
            Prev
          </button>
        }
        {commit.length === itemsPerPage && (
          <button onClick={handleNextPage}>Next</button>
        )}
      </div>
    </section>
  );
};

export default Commit;
