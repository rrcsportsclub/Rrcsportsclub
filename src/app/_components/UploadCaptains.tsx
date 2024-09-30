"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  MdDeleteOutline,
  MdOutlineEdit,
  MdOutlineFileUpload,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import { setCaptainsList } from "../GlobalRedux/features/captainsSlice";
import { useFormik } from "formik";

interface Player {
  name: string;
  image: string;
  bid: number;
  baseprice: number;
}

interface Captain {
  srNo: number;
  name: string;
  teamColor: string;
  image: string;
  teamName: string;
  totalAmt: number;
  players: Player[];
}

export default function UploadCaptains() {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const captainsList = useSelector(
    (state: RootState) => state.captains.captainsList
  );

  const dispatch = useDispatch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      // setIsLoading(true);
      const response = await axios.post(`/api/image`, formData);
      // if (response.status === 200) {
      if (response.data.url !== "") {
        setUploadStatus("File uploaded successfully.");
        formik.setFieldValue("imageUrl", response.data.url);

        setPreview(null);
        setSelectedFile(null);
      } else {
        setUploadStatus("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file.");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      bidingAmt: 0,
      teamName: "",
      teamColor: "",
      imageUrl: "",
    },
    onSubmit: (values) => {
      uploadCaptainDetail(values);
      formik.resetForm({
        values: {
          name: "",
          bidingAmt: 0,
          teamName: "",
          teamColor: "",
          imageUrl: "",
        },
      });
    },
  });

  const uploadCaptainDetail = async (values: typeof formik.initialValues) => {
    const lastCaptain = captainsList[captainsList.length - 1];
    const serialNoValue = Number(lastCaptain?.srNo) + 1;
    const srNo = lastCaptain ? serialNoValue : 1;

    const captainDetails = {
      newData: [
        srNo,
        values.name,
        values.teamName,
        values.teamColor,
        values.bidingAmt,
        values.imageUrl,
        // "https://www.kasandbox.org/programming-images/avatars/old-spice-man.png",
      ],
    };
    try {
      await axios
        .post("/api/listofCaptain", captainDetails)
        .then(() => initCaptain());
    } catch (error) {
      console.error(error, "Failed to upload captain");
    }
  };

  const initCaptain = async () => {
    try {
      await axios.get<Captain[]>("/api/listofCaptain").then((data) => {
        dispatch(setCaptainsList(data.data));
      });
    } catch (error) {
      console.error(error, "Failed to fetch player data");
    }
  };

  useEffect(() => {
    initCaptain();
  }, []);

  //   console.log(captainsList);

  return (
    <div className="z-50 flex flex-col justify-between items-center gap-12">
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-white flex flex-col items-center p-[24px] gap-[30px] sm:w-[597px] h-[500px] rounded-[30px] shadow-md shadow-[#000000]">
          <h1 className="font-semibold text-2xl">CAPTAINS</h1>
          <div className="flex flex-col gap-[26px] w-full">
            <div className="flex gap-[42px] justify-center w-full">
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="rounded-[4px] border border-[#79747E] text-[#49454F] p-3 w-[60%]"
                placeholder="CAPTAIN NAME"
              />
              <input
                id="bidingAmt"
                name="bidingAmt"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.bidingAmt}
                className="rounded-[4px] border border-[#79747E] text-[#49454F] p-3 w-[40%]"
                placeholder="BIDING AMOUNT"
              />
            </div>
            <div className="flex gap-[42px] justify-center w-[100%]">
              <div className="relative">
                <label className="absolute px-1 bg-white left-[10px] top-[-5px] text-[#49454F] text-xs">
                  TEAM NAME
                </label>
                <input
                  id="teamName"
                  name="teamName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.teamName}
                  className="rounded-[4px] border border-[#79747E] text-[#49454F] p-3"
                />
              </div>
              <div className="relative">
                <label className="absolute px-1 bg-white left-[10px] top-[-5px] text-[#49454F] text-xs">
                  TEAM COLOR
                </label>
                <input
                  id="teamColor"
                  name="teamColor"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.teamColor}
                  className="rounded-[4px] border border-[#79747E] text-[#49454F] p-3"
                />
              </div>
            </div>
          </div>

          <div className="w-[100%] h-full flex justify-around p-1 items-center rounded-[30px] bg-[#E3E3E3] border-[2px] border-[#79747E] border-dashed">
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              className="w-[45%] h-[30%]"
              onChange={handleFileChange}
            />
            <div className="flex flex-col justify-between items-center gap-1">
              {preview && (
                <div>
                  <Image
                    src={preview}
                    alt="Player Image"
                    width={100}
                    height={100}
                    className="size-[100px]"
                  />
                </div>
              )}
              {uploadStatus && (
                <p
                  className={`${
                    uploadStatus === "File uploaded successfully."
                      ? "text-black"
                      : "text-red-500"
                  } text-xs`}
                >
                  {uploadStatus}
                </p>
              )}
              <button
                className="bg-black text-white rounded-xl py-1 px-3"
                type="button"
                onClick={handleFileUpload}
              >
                Add Image
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={
              uploadStatus === "File uploaded successfully." ? false : true
            }
            className={` ${
              uploadStatus === "File uploaded successfully." ? "" : "opacity-50"
            } w-[100%] h-fullrounded-[30px] bg-black text-center text-[#E3E3E3]  border-[2px] border-[#79747E] p-2 rounded-[10px]`}
          >
            <p>UPLOAD DETAILS</p>
          </button>
        </div>
      </form>

      <div className="flex flex-col items-center gap-[52px] sm:w-[597px] h-[500px] shadow-md shadow-[#000000]  rounded-[30px] py-[24px]">
        <h1 className="font-semibold text-2xl">LIST OF CAPTAINS</h1>
        <div className="w-full overflow-y-auto">
          <table className="text-xs w-full">
            <thead className="bg-[#F3EDF7] sticky top-0">
              <tr>
                <th className="w-[20%] py-3 px-2 text-center">CAPTAIN NAME</th>
                <th className="w-[20%] py-3 px-2 text-center">AMOUNT</th>
                <th className="w-[20%] py-3 px-2 text-center">TEAM NAME</th>
                <th className="w-[20%] py-3 px-2 text-center">TEAM COLOR</th>
                <th className="w-[20%] py-3 px-2 text-center">IMAGE</th>
                <th className="w-[20%] py-3 px-2 text-center">EDIT</th>
                <th className="w-[20%] py-3 px-2 text-center">DELETE</th>
              </tr>
            </thead>
            <tbody>
              {captainsList.map((captainsList) => (
                <tr key={captainsList.srNo}>
                  <td className="w-[20%] p-2 text-center">
                    {captainsList.name}
                  </td>
                  <td className="w-[20%] p-2 text-center">
                    {captainsList.totalAmt}
                  </td>
                  <td className="w-[20%] p-2 text-center">
                    {captainsList.teamName}
                  </td>
                  <td className="w-[20%] p-2 text-center">
                    {captainsList.teamColor}
                  </td>
                  <td className="w-[20%] p-2">
                    <div className="flex justify-center">
                      <Image
                        src={captainsList.image}
                        width={20}
                        height={20}
                        alt={captainsList.name}
                      />
                    </div>
                  </td>
                  <td className="w-[20%] p-2 text-center">
                    <div className="flex justify-center">
                      <MdOutlineEdit />
                    </div>
                  </td>

                  <td className="w-[20%] p-2 text-center">
                    <div className="flex justify-center">
                      <MdDeleteOutline />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
