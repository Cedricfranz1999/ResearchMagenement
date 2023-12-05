/* eslint-disable @typescript-eslint/no-floating-promises */
import { Button, Checkbox, Form, Input } from "antd";
import Head from "next/head";
import Link from "next/link";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useEffect } from "react";
import App from "./sampleUpload";

export default function Home() {
  const router = useRouter();
  const [form] = Form.useForm();

  const { mutate } = api.example.loginStudent.useMutation({
    onSuccess: (data) => {
      if (data) {
        router.push("/capstone");
        localStorage.setItem("username", data.username);
        localStorage.setItem("id", data.id);
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

  useEffect(() => {
    if (localStorage.getItem("username")) {
      router.push("/capstone");
    }
  });

  return (
    <>
      <div className=" flex h-screen w-full flex-col items-center justify-center    bg-green-50  ">
        <p className="   pb-6  font-bold  text-gray-600 ">
          {" "}
          Thesis Management System{" "}
        </p>

        <div className="bg-yellow-200 p-5  "  style={{height:'400px', width:'500px'} }>
          <div className=" flex  h-full w-full  flex-col items-center bg-zinc-100 pt-10 ">
            <img className="  my-4 h-10  w-14 " src="/ccis-logo.png " />
            <p className=" pb-10  text-xs  text-gray-600  ">
              {" "}
              College Of Computing and Information Technology{" "}
            </p>
            <div className=" flex flex-col items-center justify-center">
              <Form
                name="normal_login"
                className="login-form"
                form={form}
                onFinish={onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your student ID!",
                    },
                  ]}
                  className=" items-center"
                >
                  <input
                    className=" flex h-8  w-full border-2   border-gray-400 text-center"
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
                    className=" flex   h-8 w-72 border-2     border-gray-400 text-center"
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item className="  ">
                  <div className=" flex  justify-center gap-5">
                    <button
                      className="      p-4 py-1"
                      style={{ backgroundColor: "#7AC8AE" }}
                    >
                      Login
                    </button>
                    <button
                      className="       p-4 py-1"
                      style={{ backgroundColor: "#36D7A1" }}
                      onClick={() => {
                        router.push("/signup");
                      }}
                    >
                      Signup
                    </button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
