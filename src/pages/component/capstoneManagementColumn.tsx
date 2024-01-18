/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Button, Image, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataType } from "../dataType/types";
import { BsDownload } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoDocumentTextSharp } from "react-icons/io5";

export const capstoneManagementColumn = (
  setIsModalOpenAbstract: any,
  isModalOpenAbstract: any,
  setAbstract: any,
) => {
  return [
    {
      title: "Department",
      dataIndex: "Students",
      key: "course",
      render: (_: any, record: any) => {
        return (
          <Space size="middle">
            <span>{record.topic}</span>
          </Space>
        );
      },
    },

    {
      title: "Course",
      key: "course",
      render: (_: any, record: any) => {
        return (
          <Space size="middle">
            <span className=" flex gap-3">{record.studentCourse}</span>
          </Space>
        );
      },
    },

    {
      title: " Research  Type",
      dataIndex: "status",
      key: "status",
      render: (text: any) => <a>{text}</a>,
    },

    {
      title: " Research Title",
      dataIndex: "title",
      key: "title",
      render: (text: any) => <a>{text}</a>,
    },

    {
      title: "adviser",
      dataIndex: "adviser",
      key: "adviser",
    },

    {
      title: "Abstract",
      dataIndex: "abstract",
      key: "abstract",

      render: (_: any, record: any) => {
        return (
          <span
            onClick={() => {
              setIsModalOpenAbstract(true);
              setAbstract(_);
            }}
            className=" flex  w-fit  items-center gap-3 rounded-lg  bg-orange-400 px-2 py-1 font-bold  text-white hover:bg-orange-500 "
          >
            <IoDocumentTextSharp /> <small>Show Abtract </small>
          </span>
        );
      },
    },
    {
      title: " Published date",
      dataIndex: "date",
      key: "date",
    },

    {
      title: <></>,
      key: "action",
      width: "25%",
      render: (_: any, record: any) => (
        <div className=" flex  items-start justify-center gap-4">
          <Button
            href={_.url}
            size="middle"
            className=" flex w-fit flex-row gap-2  rounded bg-blue-300 px-4"
          >
            <BsDownload />
            <a> Dowload </a>
          </Button>
        </div>
      ),
    },
  ];
};

export default capstoneManagementColumn;
