/* eslint-disable @typescript-eslint/no-floating-promises */
import { Button, Checkbox, Form, Input, Modal } from "antd";
import Head from "next/head";
import Link from "next/link";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useEffect } from "react";
import App from "./sampleUpload";
import Image from "next/image";
import { IoIosPaper } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoMdSchool } from "react-icons/io";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className=" flex h-screen  w-full items-center justify-center">
        <div
          id="bg1"
          className="    relative  h-screen w-full   scale-100  items-center   justify-center    bg-cover bg-center blur-md brightness-50  invert md:filter-none

        "
        ></div>

        <div
          className=" absolute  top-40   flex   flex-col  justify-center gap-5     rounded-lg bg-white "
          style={{ width: "430px", height: "350px" }}
        >
          <div className=" mt-2    flex items-center  justify-center gap-2 ">
            <img
              src="https://www.onlinekiosk.nwssu.edu.ph/img/nwssulogo.png"
              alt="NWSSU Logo"
              className="  h-16 w-16 "
            />
            <div className=" mt-2 flex  flex-col ">
              <h2
                className="  text-[#44444b ] font-bold
tracking-wider"
              >
                Northwest Samar State University
              </h2>
              <small
                className=" text-[#44444b   ] text-center text-xs
font-bold"
              >
                Resiliency • Integrity • Service • Excellence
              </small>
            </div>
          </div>
          <div className=" flex h-full  w-full flex-1   flex-col items-center  justify-start  gap-10 rounded-lg bg-[#ebeef1] px-6 pt-10 ">
            <h1
              className="   animate-bounce    bg-slate-200 text-xl
               font-extrabold
tracking-widest text-[#f85412] "
            >
              RESEARCH MANAGEMENT
            </h1>
            <div className="flex   gap-5 text-gray-200">
              <div className=" flex h-14 w-14 items-center justify-center  rounded-lg   bg-gray-400 p-2">
                {" "}
                <IoIosPaper size={50} className=" " />
              </div>

              <div className=" flex h-14  w-14 items-center justify-center  rounded-lg bg-gray-400 p-2">
                {" "}
                <MdOutlineFileDownload size={50} />
              </div>

              <div className=" flex h-14  w-14 items-center justify-center  rounded-lg  bg-gray-400 p-2">
                {" "}
                <IoMdSchool size={50} />
              </div>
            </div>

            <div
              className=" ]  flex h-10 w-full cursor-pointer
items-center justify-center rounded-xl  bg-[#3b9778]  hover:brightness-150 "
            >
              <p
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => router.push("/capstone")}
                className=" animate-pulse text-xl  font-extrabold tracking-widest
               text-white   hover:text-yellow-200"
              >
                {" "}
                VIEW STUDIES{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
