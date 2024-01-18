/* eslint-disable @typescript-eslint/no-floating-promises */
import { Button, Checkbox, Form, Input } from "antd";
import Head from "next/head";
import Link from "next/link";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useEffect } from "react";
import { BsWindowSidebar } from "react-icons/bs";

export default function AdminLogin() {
  const router = useRouter();
  const [form] = Form.useForm();

  const { mutate } = api.example.loginAdmin.useMutation({
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("id", data.id);

        router.push("/admin/capstone");
      } else {
        alert("Invalid Credentials");
      }
    },
  });

  const onFinish = (values: any) => {
    mutate({
      username: form.getFieldValue("username"),
      password: form.getFieldValue("password"),
    });
  };

  return (
    <>
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
            <div className=" mt-10    flex items-center  justify-center gap-2 ">
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
              <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
                form={form}
              >
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "Please input your Username!" },
                  ]}
                  className=" items-center"
                >
                  <input
                    className=" flex h-8  w-full rounded-lg   border-2  border-gray-400 text-center"
                    placeholder="Username"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}
                >
                  <input
                    className=" flex  h-8  w-72 rounded-lg border-2     border-gray-400 text-center"
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item className="  ">
                  <div
                    className=" ]  flex h-10 w-full cursor-pointer
items-center justify-center rounded-xl  bg-[#3b9778]  hover:brightness-150 "
                  >
                    <button className="  w flex w-full  items-center justify-center p-4     py-1 text-center font-extrabold text-white">
                      {" "}
                      Login As Administrator{" "}
                    </button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
