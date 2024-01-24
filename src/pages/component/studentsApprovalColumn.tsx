/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Image, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { BsDownload } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";

export const studentsApprovalColumn: any = (
  setOpenModal: any,
  setStudentsData: any,
) => {
  return [
    {
      title: "student No.",
      key: "studentNo",
      render: (_: any, record: any) => {
        return (
          <div>
            {" "}
            <p className=" bg-red">{_.studentNo}</p>
          </div>
        );
      },
    },
    {
      title: "      StudentName",
      key: "name",
      render: (_: any, record: any) => {
        return (
          <div>
            {" "}
            <p className=" bg-red">
              {_.firstname} {_.lastname}
            </p>
          </div>
        );
      },
    },
    {
      title: "course",
      key: "course",
      render: (_: any, record: any) => {
        return (
          <Space size="middle">
            <p> {_.Course?.coursename} </p>
          </Space>
        );
      },
    },

    {
      title: "images",
      key: "image",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Image src={record.image} width={50} height={50} />
        </Space>
      ),
    },

    {
      title: <></>,
      key: "action",
      render: (_: any, record: any) => (
        <div className=" flex  items-start justify-end gap-4">
          <Space
            size="middle"
            className=" mr-24 flex w-fit cursor-pointer  gap-2 rounded   bg-blue-600 px-4 py-1"
            onClick={() => {
              setOpenModal(true);
              setStudentsData(record.id);
            }}
          >
            <BsCheckCircleFill className="  text-white" />
            <p className=" text-white"> APPROVE STUDENT </p>
          </Space>
        </div>
      ),
    },
  ];
};
