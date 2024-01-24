/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button, Form, Radio, Select, Upload, message } from "antd";
import Head from "next/head";
import Link from "next/link";
import { LockOutlined, UserOutlined, UploadOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

import type { UploadChangeParam } from "antd/es/upload";

import { useRouter } from "next/router";
import type { MenuProps, RadioChangeEvent } from "antd";

import { api } from "~/utils/api";

import { useState } from "react";
const items: MenuProps["items"] = [
  {
    key: "1",
    label: <p>College Of Computing Of Information Technology</p>,
  },
  {
    key: "2",
    label: <p>College Of Computing Of Computer Science</p>,
  },
  {
    key: "3",
    label: <p>College Of Computing Of Information System</p>,
  },
];

interface StudentType {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  gender: string;
  studentNo: string;
  image: string;
  address: string;
  course: string;
  // courseId: string | null;
  // capstoneId: string | null;
}

export default function Home() {
  const [form] = Form.useForm();
  const [value, setValue] = useState(1);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { mutate } = api.example.signupStudent.useMutation({
    onSuccess: (data) => {
      if (data && data.success) {
        form.resetFields();
        window.alert("Successfully Registered");
        router.push("/");
      } else {
      }
    },
  });

  const { data: courseData } = api.example.courseData.useQuery();

  const onFinish = (values: StudentType) => {
    console.log(values);
    mutate({
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      password: values.password,
      gender: values.gender,
      studentNo: values.studentNo,
      image: imageUrl,
      address: values.address,
      course: values.course,
    });
  };
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const handleChange = (value: string) => {
    console.log("hello");
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChanges: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const props: UploadProps = {
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png";
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    // onChange: {handleChange}
  };
  return (
    <>
      <div className=" flex h-screen w-full flex-col items-center justify-center   bg-green-50  ">
        <div className=" mb-10  flex flex-row items-center  justify-center">
          <img className="  my-4 h-8  w-10 " src="/ccis-logo.png  " />
          <p className="   font-semi-bold    pt  text-gray-600">
            {" "}
            Thesis Management System{" "}
          </p>
        </div>

        <div
          className=" h-3/4    bg-yellow-100 p-4   shadow-2xl  shadow-orange-300 "
          style={{ width: "600px" }}
        >
          <div className=" flex  h-full w-full  flex-col items-center bg-yellow-100  ">
            <p className=" font-semi-bold  pb-10  text-xl  text-gray-600  ">
              {" "}
              Signup Page{" "}
            </p>
            <div className=" flex flex-col items-center justify-center">
              <Form
                form={form}
                // initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <div className=" flex flex-row gap-2">
                  <Form.Item
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your First Name!",
                      },
                    ]}
                    className=" w-full  items-center"
                  >
                    <input
                      className=" flex h-8  w-full text-center"
                      placeholder="Your Firstname"
                    />
                  </Form.Item>
                  <Form.Item
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Lastname!",
                      },
                    ]}
                    className=" w-full  items-center"
                  >
                    <input
                      className=" flex h-8  w-full  bg-gray-100 text-center"
                      placeholder="Input Your Lastname"
                    />
                  </Form.Item>
                </div>
                <div className=" flex flex-row gap-2">
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Username!",
                      },
                    ]}
                    className=" w-full  items-center"
                  >
                    <input
                      className=" flex h-8  w-full bg-gray-100 text-center"
                      placeholder="Username"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                    className=" w-full  items-center"
                  >
                    <input
                      className=" flex h-8    w-full bg-gray-100  text-center  text-black"
                      placeholder="Input Password"
                      type="password"
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Full Address!",
                    },
                  ]}
                  className=" items-center"
                >
                  <input
                    className=" flex h-8  w-full bg-gray-100  text-center text-black"
                    placeholder="Please Input Your Full Address"
                  />
                </Form.Item>
                <div className=" flex flex-row gap-2">
                  <Form.Item
                    name="gender"
                    rules={[{ required: true, message: "Choose Your Gender!" }]}
                    className=" w-full  items-center"
                  >
                    <Radio.Group onChange={onChange} value={value}>
                      <Radio value={"Male"}>Male</Radio>
                      <Radio value={"Female"}>Female</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    name="studentNo"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Student-ID!",
                      },
                    ]}
                    className=" w-full  items-center"
                  >
                    <input
                      className=" flex h-8  w-full bg-gray-100 text-center"
                      placeholder=" Student Number"
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  name="course"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}
                  className=" items-center"
                >
                  {courseData && (
                    <Select
                      className="flex h-8 min-w-full text-center"
                      defaultValue="Choose Your Course"
                      style={{ width: 200 }}
                      onChange={handleChange}
                      options={[
                        {
                          label: "List Of Course",
                          options: courseData.map((data: any) => ({
                            label: data.coursename,
                            value: data.id,
                          })),
                        },
                      ]}
                    />
                  )}
                </Form.Item>

                <Form.Item
                  name="image"
                  rules={[
                    { required: true, message: "Please input your Photo" },
                  ]}
                  className=" w-full  items-center"
                >
                  <Upload
                    className="flex flex-row bg-orange-200"
                    beforeUpload={(file) => {
                      const isImage =
                        file.type === "image/png" ||
                        file.type === "image/jpeg" ||
                        file.type === "image/jpg" ||
                        file.type === "image/jfif";
                      if (!isImage) {
                        message.error(
                          `${file.name} is not a valid image file (png, jpeg, jpg, or jfif)`,
                        );
                      }
                      return isImage ? true : Upload.LIST_IGNORE;
                    }}
                    maxCount={1}
                    onChange={handleChanges}
                  >
                    <Button icon={<UploadOutlined />}>Upload Images</Button>
                  </Upload>
                </Form.Item>

                <div
                  className=" flex flex-col gap-0  "
                  style={{ marginTop: -15 }}
                >
                  <Button
                    className="      p-4 py-1"
                    style={{ backgroundColor: "#36D7A1" }}
                    htmlType="submit"
                  >
                    {" "}
                    Register{" "}
                  </Button>
                  <div className=" flex items-center justify-center">
                    <span> Already Registered? </span>{" "}
                    <span
                      className=" cursor-pointer  p-4 py-1 font-bold text-green-500"
                      onClick={() => {
                        router.push("/");
                      }}
                    >
                      {" "}
                      Login{" "}
                    </span>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
