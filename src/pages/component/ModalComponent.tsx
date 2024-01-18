/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Radio,
  Select,
  Image,
  Upload,
  Button,
  message,
} from "antd";
import { RadioChangeEvent } from "antd/lib/radio/interface";
import { api } from "~/utils/api";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import type { UploadChangeParam } from "antd/es/upload";
interface StudentType {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  gender: string;
  studentNo: string;
  image: string;
  address: string;
  courseId: string;
}

const ModalComponent = ({
  isModalOpen,
  handleOk,
  handleCancel,
  onFinish,
  handleChange,
  refetch: refetchStudent,
}: any) => {
  let id: any = null;

  if (typeof window !== "undefined") {
    id = localStorage.getItem("id");
  }

  const [form] = Form.useForm();

  const { data: studentData, refetch } = api.example.studentDetails.useQuery({
    id: id,
  });

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState("");

  const { mutate } = api.example.editProfilepicture.useMutation({
    onSuccess: () => {
      handleCancel;
      refetchStudent();
    },
  });

  useEffect(() => {
    form.setFieldsValue(studentData);
    form.setFieldsValue({
      courseId: studentData?.Course?.coursename,
    });

    setImageUrl(studentData?.image || "");
  }, [studentData]);

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  const courseChange = (e: any) => {
    console.log("radio checked", e);
    setCourse(e);
  };

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: studentData?.image || "",
    },
  ]);
  const handleChanges: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    console.log(info.file.status);
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

  const editProfilepicture = (values: StudentType) => {
    mutate({
      id: studentData?.id || "",
      firstname: values.firstname,
      lastname: values.lastname,
      username: values.username,
      password: values.password,
      gender: values.gender,
      studentNo: values.studentNo,
      image: imageUrl,
      address: values.address,
      courseId: values.courseId,
    });

    form.setFieldsValue(values);
    handleCancel(false);
    refetch();
  };

  return (
    <Modal
      centered
      title="EDIT PROFILE"
      open={isModalOpen}
      onOk={handleOk}
      footer={[]}
      className=" p-5   "
      bodyStyle={{ height: "500px" }}
      width={1000}
      onCancel={handleCancel}
    >
      <div className=" flex   h-full  w-full  flex-row p-5  ">
        <div className=" flex h-full flex-1  flex-col items-center justify-start ">
          <Image src={imageUrl} width={380} height={265} className="pt-2 " />
          <Upload
            maxCount={1}
            className=" mt-6 flex   flex-row bg-orange-200 "
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
            onChange={handleChanges}
          >
            <Button className="" icon={<UploadOutlined />}>
              Upload png only
            </Button>
          </Upload>
        </div>
        <div className="  flex  h-full flex-1 flex-col p-3 ">
          <Form
            name="normal_login"
            className="login-form"
            onFinish={editProfilepicture}
            form={form}
          >
            <div className=" flex flex-row gap-2">
              <Form.Item
                name="firstname"
                rules={[
                  { required: true, message: "Please input your First Name!" },
                ]}
                className=" w-full"
              >
                <input className=" flex h-8  w-full border border-solid border-gray-500 bg-white text-center" />
              </Form.Item>
              <Form.Item
                name="lastname"
                rules={[
                  { required: true, message: "Please input your Lastname!" },
                ]}
                className=" w-full"
              >
                <input className=" flex h-8  w-full border border-solid border-gray-500 bg-white text-center" />
              </Form.Item>
            </div>
            <div className=" flex flex-row gap-2">
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
                className=" w-full"
              >
                <input className=" flex h-8  w-full border border-solid border-gray-500 bg-white text-center" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                className=" w-full"
              >
                <input className=" flex h-8  w-full border border-solid border-gray-500 bg-white text-center" />
              </Form.Item>
            </div>
            <Form.Item
              name="address"
              rules={[
                { required: true, message: "Please input your Full Address!" },
              ]}
              className=" items-center"
            >
              <input className=" flex h-8  w-full border border-solid border-gray-500 bg-white text-center" />
            </Form.Item>

            <div className=" flex flex-row gap-2">
              <Form.Item
                name="gender"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                className=" w-full"
              >
                <Select
                  onChange={handleChange}
                  options={[
                    {
                      options: [
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                      ],
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                className=" w-full"
                name="studentNo"
                rules={[
                  { required: true, message: "Please input your Student-ID!" },
                ]}
              >
                <input className=" flex h-8  w-full  border border-solid border-gray-500 bg-white text-center" />
              </Form.Item>
            </div>
            <Form.Item
              name="courseId"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
              className=" items-center"
            >
              <Select
                className=" flex h-8  min-w-full pl-0  text-center"
                style={{ width: 200 }}
                onChange={courseChange}
                options={[
                  {
                    label: "List Of Course",
                    options: [
                      {
                        label: "Bachelor Science in Information Technology",
                        value: "clnlf94e10001mwkinbhz3gzq",
                      },
                      {
                        label: "Bachelor Science in Computer  Science",
                        value: "clnlfa8hz0002mwkibgzcd6a9",
                      },
                      {
                        label: "Bachelor Science in Information  System",
                        value: "clnlf85st0000mwkimbhrtgjh",
                      },
                      {
                        label:
                          "Bachelor of Science in Entertainment and Multimedia Computing",
                        value: "clnlfbhye0003mwkivh5l1960",
                      },
                    ],
                  },
                ]}
              />
            </Form.Item>

            <Form.Item className=" mt-36 flex items-end justify-center  rounded  bg-orange-300 p-0 text-2xl  ">
              <button type="submit"> Edit Changes</button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
