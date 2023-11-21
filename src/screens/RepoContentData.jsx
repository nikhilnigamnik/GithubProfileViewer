import React, { useEffect, useState } from "react";
import { apiURL } from "../utils/api";
import { useParams } from "react-router-dom";
import axios from "axios";
import { decode } from "base-64";

const RepoContentData = () => {
  let { path, id, repoName } = useParams();
  const [data, setData] = useState([]);
  if (path === undefined) {
    path = "";
  }
  const getRepoData = async () => {
    try {
      const res = await axios.get(
        `${apiURL}/repos/${id}/${repoName}/contents/${path || ""}`
      );
      console.log(res.data);
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
  console.log(decodedContent);

  return <pre className="p-4">{decodedContent}</pre>;
};

export default RepoContentData;
