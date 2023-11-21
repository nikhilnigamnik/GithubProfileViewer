import React, { useEffect, useState } from "react";
import { apiURL } from "../utils/api";
import { useParams } from "react-router-dom";
import axios from "axios";
import { decode } from "base-64";
import { FaRegCopy } from "react-icons/fa";
import { IoIosCopy } from "react-icons/io";
import toast from "react-hot-toast";
const RepoContentData = () => {
  let { path, id, repoName } = useParams();
  const [copy, setCopy] = useState(false);
  const handleCopy = () => {
    setCopy(true);
    if (decodedContent) {
      navigator.clipboard
        .writeText(decodedContent)
        .then(() => {
          toast("Copied!", {
            position: "top-right",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        })
        .catch((err) => {
          console.error("Error copying content to clipboard:", err);
        });
    }
  };
  const [data, setData] = useState([]);
  if (path === undefined) {
    path = "";
  }
  const getRepoData = async () => {
    try {
      const res = await axios.get(
        `${apiURL}/repos/${id}/${repoName}/contents/${path || ""}`
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
 

  useEffect(() => {
    getRepoData();
  }, [path]);
  let decodedContent = null;
  if (data && data.content) {
    try {
      decodedContent = decode(data.content);
    } catch (error) {
      console.error("Error decoding content:", error);
    }
  }
  return (
    <div className="relative">
      <div
        onClick={handleCopy}
        className="absolute right-4 top-4 cursor-pointer"
      >
        {copy ? <IoIosCopy /> : <FaRegCopy />}
      </div>
      <pre className="p-4">{decodedContent}</pre>
    </div>
  );
};

export default RepoContentData;
