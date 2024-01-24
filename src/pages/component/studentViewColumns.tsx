/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Button, Image, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataType } from "../dataType/types";
import { BsDownload } from "react-icons/bs";

export const studentsViewColumn: any = (studentData: any) => {
  return [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: any) => <a>{text}</a>,
    },

    {
      title: "Course",
      dataIndex: "Students",
      key: "course",
      render: (_: any, record: any) => {
        return (
          <Space size="middle">
            <span>{_?.[0]?.Course?.coursename}</span>
          </Space>
        );
      },
    },
    {
      title: "adviser",
      dataIndex: "adviser",
      key: "adviser",
    },

    {
      title: "published date",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          href={_.url}
          size="middle"
          className="flex w-fit flex-row gap-2 rounded bg-blue-300 px-4"
        >
          <>
            <div className=" flex gap-3">
              {" "}
              <BsDownload />
              <p> Download </p>
            </div>
          </>
        </Button>
      ),
    },
  ];
};
