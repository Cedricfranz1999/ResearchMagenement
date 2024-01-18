/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect } from "react";
import DashboardLayout from "../component/DashboardLayout";
import {
  Dropdown,
  Form,
  Modal,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Space,
  Table,
  Button,
  Upload,
  message,
  ConfigProvider,
} from "antd";
import { IoArrowForwardCircle } from "react-icons/io5";

import { DownOutlined } from "@ant-design/icons";
import type { RadioChangeEvent } from "antd";
import { useState } from "react";
import ModalComponent from "../component/ModalComponent";
import { DataType } from "../dataType/types";
import { Input } from "antd";
import { BiSolidAddToQueue } from "react-icons/bi";
import { UploadOutlined } from "@ant-design/icons";
import PageHeader from "../component/PageHeader";
import { studentsViewColumn } from "../component/studentViewColumns";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "~/config/firebase";
import { v4 } from "uuid";
import App from "../sampleUpload";
import AdminCapstone from "../admin/capstone";
const { Search } = Input;

function Capstone() {
  const [form] = Form.useForm();
  let id: any = null;
  if (typeof window !== "undefined") {
    id = localStorage.getItem("id");
  }
  const { data: studentData, refetch } = api.example.studentDetails.useQuery({
    id: id,
  });

  const { data: approvedCapstone } =
    api.capstone.ApprovedCapstoneDetails.useQuery();
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCapstone, setModalCapstone] = useState(false);
  const router = useRouter();

  const [value, setValue] = useState(1);
  const [course, setCourse] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const handleChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const showCapstoneModal = () => {
    setModalCapstone(true);
  };

  const capstoneModalOk = () => {
    setModalCapstone(false);
  };

  const capstoneModalCancel = () => {
    setModalCapstone(false);
  };

  const onFinishCapstoneForm = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailedCapstoneForm = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    form.setFieldValue("capstoneLeader", studentData?.studentNo);
    form.setFieldValue("studentCourse", studentData?.Course?.coursename);
  });

  // Search functionality
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };
  const { mutate } = api.capstone.notApprovedCapstone.useMutation({
    onSuccess: (data) => {
      console.log(data);
      if (!data) {
        form.setFields([
          {
            name: "capstoneLeader",
            errors: ["Student Id not Found"],
          },
        ]);
      } else {
        form.resetFields();
        setModalCapstone(false);
      }
    },
  });
  const uploadImage = (e: any) => {
    if (!imageUpload) {
      form.setFields([
        {
          name: "capstoneFile",
          errors: ["Capstone File Required"],
        },
      ]);
    } else {
      const imageRef = ref(storage, `files/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload).then((data: any) => {
        getDownloadURL(data.ref).then((d) => {
          mutate({
            studentCourse: e.studentCourse,
            title: e.title,
            abstract: e.abstract,
            topic: e.topic,
            adviser: e.adviser,
            url: d,
            studentMembers: e.studentMembers,
            studentNo: e.capstoneLeader,
          });
        });
      });
    }
  };
  return (
    <>
      <AdminCapstone />
    </>
  );
}

export default Capstone;
