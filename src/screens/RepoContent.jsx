import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { apiURL } from "../utils/api";
import { FaFolder } from "react-icons/fa";
import { CiFileOn } from "react-icons/ci";
import { IoMdCopy } from "react-icons/io";
import { CiStopwatch } from "react-icons/ci";
import RepoContentData from "./RepoContentData";
const RepoContent = () => {
  const [repoContent, setRepoContent] = useState([]);
  const [repoLink, setRepoLink] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(selectedFile);
  const { id, repoName } = useParams();
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const getRepoContent = async () => {
    try {
      const res = await axios.get(`${apiURL}/repos/${id}/${repoName}/contents`);
      setRepoContent(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getRepoDownloadLink = async () => {
    try {
      const res = await axios.get(`${apiURL}/repos/${id}/${repoName}`);
      setRepoLink(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRepoDownloadLink();
  }, []);

  const handleFileClick = async (file) => {
    if (file.type === "file") {
      try {
        const fileContentRes = await axios.get(file.download_url, {
          responseType: "arraybuffer",
        });
        const decodedContent = Buffer.from(
          fileContentRes.data,
          "binary"
        ).toString("base64");
        setSelectedFile({
          name: file.name,
          content: decodedContent,
        });
        console.log(decodedContent);
      } catch (error) {
        console.log(error);
      }
    } else if (file.type === "dir") {
      console.log("Directory clicked:", file.name);
    }
  };
  const handleDownloadZip = () => {
    window.open(`${repoLink.name}-main.zip`);
  };
  useEffect(() => {
    getRepoContent();
  }, []);
  return (
    <section className="flex flex-col gap-6  my-10">
      <Link to={"/"}>
        <button>Back</button>
      </Link>
      <div className="flex justify-between  gap-4 ">
        <div className="flex flex-col gap-2">
          {repoContent.map((el) => (
            <Link  key={el.name} to={`/repos/${id}/${repoName}/contents/${el?.path}`}>
              <div
                className="border border-[#343537] rounded py-1 px-4 flex justify-between items-center gap-4"
               
                onClick={() => handleFileClick(el)}
                style={{ cursor: "pointer" }}
              >
                <p>{el.name}</p>
                {el.type === "dir" ? <FaFolder /> : <CiFileOn />}
              </div>
            </Link>
          ))}
        </div>
        <div className="border border-[#343537] rounded w-full p-4">
          <div className="flex items-center gap-2 justify-between relative">
            <button>Main</button>
            <div className="flex items-center">
              <button onClick={handleOpen}>Code</button>
              {isOpen && (
                <div className="flex flex-col gap-2 absolute right-0 top-14">
                  <a
                    className="flex items-center justify-between bg-[#1a1a1a] p-1 rounded gap-4"
                    href={repoLink.clone_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p>{repoLink.clone_url}</p>
                    <IoMdCopy />
                  </a>
                  <p
                    onClick={handleDownloadZip}
                    className="bg-[#1a1a1a] p-1 rounded w-fit"
                    target="_blank"
                  >
                    Download Zip
                  </p>
                </div>
              )}
              <Link to={`/repos/${id}/${repoName}/commits`}>
                <div className="ml-4 flex justify-between items-center gap-2">
                  <CiStopwatch />
                  <p>Commit</p>
                </div>
              </Link>
            </div>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};
export default RepoContent;
