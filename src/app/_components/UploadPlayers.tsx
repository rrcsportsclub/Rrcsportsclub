"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
import {
  MdDeleteOutline,
  MdOutlineEdit,
  MdOutlineFileUpload,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import { setPlayersList } from "../GlobalRedux/features/playersSlice";
import { useFormik } from "formik";
// import * as Yup from "yup";

interface Player {
  srNo: number;
  basePrice: number;
  imageUrl: string;
  name: string;
  speciality: string;
  usp: string;
}

export default function UploadPlayers() {
  //   const [preview, setPreview] = useState<string | null>(null);
  //   const fileInputRef = useRef<HTMLInputElement | null>(null);

  const playersList = useSelector(
    (state: RootState) => state.players.playersList
  );

  const dispatch = useDispatch();

  //   const validationSchema = Yup.object({
  //     name: Yup.string()
  //       .min(2, "Name must be at least 2 characters")
  //       .required("Name is required"),
  //     basePrice: Yup.number()
  //       .typeError("Price must be a number")
  //       .positive("Price must be positive")
  //       .required("Price is required"),
  //     speciality: Yup.string()
  //       .min(2, "Name must be at least 2 characters")
  //       .required("Name is required"),
  //     usp: Yup.string()
  //       .min(2, "Name must be at least 2 characters")
  //       .required("Name is required"),
  //     imageUrl: Yup.string()
  //       .url("Invalid URL format")
  //       .required("Image URL is required"),
  //   });

  const formik = useFormik({
    initialValues: {
      name: "",
      basePrice: 0,
      speciality: "",
      usp: "",
      imageUrl: "",
      //   imageUrl: null as File | null,
    },
    onSubmit: (values) => {
      //   console.log(values);
      uploadPlayerDetail(values);
      formik.resetForm({
        values: {
          name: "",
          basePrice: 0,
          speciality: "",
          usp: "",
          imageUrl: "",
          //   imageUrl: null,
        },
      });
      //   setPreview(null);
      //   if (fileInputRef.current) {
      //     fileInputRef.current.value = "";
      //   }
    },
  });

  const uploadPlayerDetail = async (values: typeof formik.initialValues) => {
    const lastPlayer = playersList[playersList.length - 1];
    const serialNoValue = Number(lastPlayer?.srNo) + 1;
    const srNo = lastPlayer ? serialNoValue : 1;

    const playerDetail = {
      newData: [
        srNo,
        values.name,
        values.basePrice,
        values.speciality,
        values.usp,
        values.imageUrl,
        // "https://www.kasandbox.org/programming-images/avatars/old-spice-man.png",
      ],
    };
    try {
      await axios
        .post("http://localhost:3000/api/listofplayers", playerDetail)
        .then(() => initPlayers());
    } catch (error) {
      console.error(error, "Failed to upload player");
    }
  };

  const initPlayers = async () => {
    try {
      await axios
        .get<Player[]>("http://localhost:3000/api/listofplayers")
        .then((data) => {
          const filtredRes = data.data?.filter(
            (obj: any) => Object.keys(obj).length !== 0
          );
          dispatch(setPlayersList(filtredRes));
        });
    } catch (error) {
      console.error(error, "Failed to fetch player data");
    }
  };

  useEffect(() => {
    initPlayers();
  }, []);

  return (
    <div className="flex flex-col justify-between items-center z-50 gap-12">
      <form onSubmit={formik.handleSubmit}>
        <div className="z-50 bg-white flex flex-col items-center p-[24px] gap-[52px] sm:w-[597px] h-[500px] rounded-[30px] shadow-md shadow-[#000000]">
          <h1 className="font-semibold text-2xl">PLAYERS</h1>
          <div className="flex flex-col gap-[26px] w-full">
            <div className="flex gap-[42px] justify-center w-full">
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="rounded-[4px] border border-[#79747E] text-[#49454F] p-3 w-[60%]"
                placeholder="PLAYER NAME"
              />
              {/* <div className="relative">
                <label className="absolute px-1 bg-white left-[10px] top-[-5px] text-[#49454F] text-xs">
                  BASE PRICE{" "}
                </label>
              </div> */}
              <input
                id="basePrice"
                name="basePrice"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.basePrice}
                className="rounded-[4px] border border-[#79747E] text-[#49454F] p-3 w-[40%]"
                placeholder="BASE PRICE"
              />
            </div>
            <div className="flex gap-[42px] justify-center w-[100%]">
              <div className="relative">
                <label className="absolute px-1 bg-white left-[10px] top-[-5px] text-[#49454F] text-xs">
                  POSITION
                </label>
                <input
                  id="speciality"
                  name="speciality"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.speciality}
                  className="rounded-[4px] border border-[#79747E] text-[#49454F] p-3"
                />
              </div>
              <div className="relative">
                <label className="absolute px-1 bg-white left-[10px] top-[-5px] text-[#49454F] text-xs">
                  USP
                </label>
                <input
                  id="usp"
                  name="usp"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.usp}
                  className="rounded-[4px] border border-[#79747E] text-[#49454F] p-3"
                />
              </div>
            </div>
          </div>
          <div className="w-[100%] h-full flex justify-center items-center gap-2 rounded-[30px] bg-[#E3E3E3] border-[2px] border-[#79747E] border-dashed">
            {/* <label>
              <MdOutlineFileUpload />
            </label> */}
            <textarea
              id="imageUrl"
              name="imageUrl"
              //   type="file"
              className="w-[100%] h-[100%] rounded-[30px] p-4"
              //   ref={fileInputRef}
              onChange={formik.handleChange}
              value={formik.values.imageUrl}
              //   onChange={(event) => {
              //     const image = event.target.files?.[0];
              //     if (image) {
              //       formik.setFieldValue("imageUrl", image);
              //       const reader = new FileReader();
              //       reader.onloadend = () => {
              //         setPreview(reader.result as string);
              //       };
              //       reader.readAsDataURL(image);
              //     } else {
              //       setPreview(null);
              //     }
              //   }}
            />

            {/* {preview && (
              <div>
                <Image
                  src={preview}
                  alt="Player Image"
                  width={70}
                  height={70}
                  className="size-[85px]"
                />
              </div>
            )} */}
          </div>
          <button
            type="submit"
            className="w-[100%] h-fullrounded-[30px] bg-black text-center text-[#E3E3E3]  border-[2px] border-[#79747E] p-2 rounded-[10px]"
          >
            UPLOAD DETAILS
          </button>
        </div>
      </form>

      <div className="flex flex-col items-center gap-[52px] sm:w-[597px] h-[500px] shadow-md shadow-[#000000] rounded-[30px] py-[24px]">
        <h1 className="font-semibold text-2xl">LIST OF PLAYERS</h1>
        <div className="w-full overflow-y-auto">
          <table className="text-xs w-full">
            <thead className="bg-[#F3EDF7] sticky top-0">
              <tr>
                <th className="w-[20%] py-3 px-2 text-center">PLAYER NAME</th>
                <th className="w-[20%] py-3 px-2 text-center">BASE PRICE</th>
                <th className="w-[20%] py-3 px-2 text-center">POSITION</th>
                <th className="w-[20%] py-3 px-2 text-center">USP</th>
                <th className="w-[20%] py-3 px-2 text-center">IMAGE</th>
                <th className="w-[20%] py-3 px-2 text-center">EDIT</th>
                <th className="w-[20%] py-3 px-2 text-center">DELETE</th>
              </tr>
            </thead>
            <tbody>
              {playersList.map((playersList) => (
                <tr className="" key={playersList.srNo}>
                  <td className="w-[20%] p-2 text-center">
                    {playersList.name}
                  </td>
                  <td className="w-[20%] p-2 text-center">
                    {playersList.basePrice}
                  </td>
                  <td className="w-[20%] p-2 text-center">
                    {playersList.speciality}
                  </td>
                  <td className="w-[20%] p-2 text-center">{playersList.usp}</td>
                  <td className="w-[20%] p-2">
                    <div className="flex justify-center">
                      <Image
                        src={playersList.imageUrl}
                        width={20}
                        height={20}
                        alt={playersList.name}
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
