import { ConfigProvider, Modal, Table } from "antd";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { BiSolidAddToQueue } from "react-icons/bi";
import { ref } from "firebase/storage";

function SettingsDeparment() {
  const { data, refetch } = api.settings.getListOfDepartment.useQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const column = [{ title: "Department Name", dataIndex: "depeartName" }];
  const [departmentName, setDepartmentName] = useState("");

  const { mutate } = api.settings.createDepartment.useMutation({
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      refetch();
    },
  });

  const addDeparment = () => {
    if (departmentName !== "" ?? null ?? undefined) {
      mutate({
        name: departmentName,
      });
    }
  };
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#3b9783",
              rowHoverBg: "#4c4d58",
              colorBgContainer: "#dbdbdb",
              rowExpandedBg: "#dbdbdb",
            },
            Pagination: {},
          },
        }}
      >
        <div className=" flex items-center justify-end     gap-3">
          <small>Department name:</small>
          <input
            onChange={(e) => setDepartmentName(e.target.value)}
            className="  h-6  w-40   rounded-sm border  border-[#3b9783] "
          />
          <div
            onClick={addDeparment}
            className=" bg   float-right my-2   flex w-44 cursor-pointer  items-center  justify-center  gap-3 rounded   bg-orange-400  p-1 hover:bg-orange-600 "
          >
            <p className="text-xs  font-extrabold  text-[#fff] ">
              {" "}
              ADD DEPARTMENT
            </p>
            <BiSolidAddToQueue className=" h-4 w-4 text-white" />
          </div>
        </div>
        <Table
          dataSource={data}
          columns={column}
          pagination={{ pageSize: 3 }}
        ></Table>
      </ConfigProvider>
    </div>
  );
}

export default SettingsDeparment;
