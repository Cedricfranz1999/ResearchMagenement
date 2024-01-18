/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Button, Image, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataType } from "../dataType/types";
import { BsDownload } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";

export const capstoneApprovalColumn: any = (
  setApproveModal: any,
  setCapstoneData: any,
  setAbstract: any,
) => {
  return [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: any) => <a>{text}</a>,
    },

    {
      title: "Course",
      dataIndex: "studentCourse",
      key: "studentCourse",
      render: (text: any) => <a>{text}</a>,
    },

    {
      title: "adviser",
      dataIndex: "adviser",
      key: "adviser",
    },

    {
      title: "date",
      dataIndex: "date",
      key: "date",
    },

    {
      title: <></>,
      key: "action",
      render: (_: any, record: any) => (
        <div className=" flex  items-start justify-end gap-4">
          <Button
            href={_.url}
            size="middle"
            className=" flex w-fit flex-row gap-2  rounded bg-blue-300 px-4"
          >
            <BsDownload />
            <a> Dowload </a>
          </Button>
          <Space
            size="middle"
            className=" mr-24 flex w-fit cursor-pointer  gap-2 rounded bg-blue-600 px-4 py-1"
            onClick={() => {
              setApproveModal(true);
              setCapstoneData(record.id);
            }}
          >
            <BsCheckCircleFill className="  text-white" />
            <p className=" text-white"> APPROVE CAPSTONE </p>
          </Space>
        </div>
      ),
    },
  ];
};
