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
      <div className=" flex h-screen w-full flex-col items-center justify-center    bg-green-50  ">
        <p className="   pb-6  font-bold  text-gray-600 ">
          {" "}
          Thesis Management System{" "}
        </p>

        <div className=" bg-yellow-200 p-5  "  style={{height:'400px', width:'500px'}}>
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
                      className="  w flex w-full  items-center justify-center p-4     py-1 text-center"
                      style={{ backgroundColor: "#7AC8AE" }}
                    >
                      {" "}
                      Login As Administrator{" "}
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
