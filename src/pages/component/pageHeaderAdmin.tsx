/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from "react";
import { Dropdown, Image, Modal, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import SettingsDeparment from "./SettingsDeparment";
import SettingsCourses from "./SettingsCourses";
import SettingStaff from "./SettingsStaff";
import SettingsStaff from "./SettingsStaff";
import { FaCircleArrowRight } from "react-icons/fa6";

const PageHeaderAdmin = ({ showModal }: any) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  let id: any = null;
  if (typeof window !== "undefined") {
    id = localStorage.getItem("id");
  }

  const { data: studentData, refetch } = api.example.studentDetails.useQuery({
    id: id,
  });

  const removeStorage = () => {
    localStorage.clear();
    router.push("/admin/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "2",
      label: (
        <button className="  w-full px-12" onClick={() => setIsModalOpen(true)}>
          Settings
        </button>
      ),
    },
    {
      key: "1",
      label: (
        <button className="  w-full px-12  pt-2" onClick={removeStorage}>
          Logout
        </button>
      ),
    },
  ];

  const itemss: TabsProps["items"] = [
    {
      key: "1",
      label: <p>DEPARTMENT</p>,
      children: <SettingsDeparment />,
    },
    {
      key: "2",
      label: <p>COURSE</p>,
      children: <SettingsCourses />,
    },
    {
      key: "3",
      label: <p>STAFF</p>,
      children: <SettingStaff />,
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <>
      {router.asPath !== "/capstone" ? (
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <div className="flex flex-row items-center justify-center gap-4">
                <img
                  src="https://www.onlinekiosk.nwssu.edu.ph/img/nwssulogo.png"
                  className="h-6 w-6 rounded-2xl"
                  alt="logo"
                />
                <small className="font-mono text-xl font-bold text-gray-500">
                  Admin
                </small>
              </div>
              <DownOutlined className=" text-xs" />
            </Space>
          </a>
        </Dropdown>
      ) : (
        <FaCircleArrowRight size={40} className="text-[#4a9284]" />
      )}

      <Modal
        onCancel={() => setIsModalOpen(false)}
        open={isModalOpen}
        width={700}
        centered
        footer={[]}
        title="Configuration"
      >
        <div style={{ height: "460px" }} className="  bg-gray-200">
          <Tabs
            defaultActiveKey="1"
            tabBarGutter={200}
            items={itemss}
            onChange={onChange}
          />
        </div>
      </Modal>
    </>
  );
};

export default PageHeaderAdmin;
