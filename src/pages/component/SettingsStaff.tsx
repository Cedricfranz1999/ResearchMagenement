import { ConfigProvider, Modal, Table } from "antd";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { BiSolidAddToQueue } from "react-icons/bi";
import { ref } from "firebase/storage";

function SettingsStaff() {
  const { data, refetch } = api.settings.getListOfStaff.useQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const column = [{ title: "Staff Configuration", dataIndex: "username" }];
  const [firstname, setFirstname] = useState("");
  const [password, setpassword] = useState("");

  const { mutate } = api.settings.createAdmin.useMutation({
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      refetch();
    },
  });

  const addDeparment = () => {
    if (
      firstname !== "" ??
      null ??
      (undefined && password !== "") ??
      null ??
      undefined
    ) {
      mutate({
        name: firstname,
        password: password,
      });
    } else {
      alert("Please input not empty credentials");
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
        <div className=" flex flex-col  items-end  justify-end    gap-1">
          <div className=" flex gap-3">
            <small>Username:</small>
            <input
              onChange={(e) => setFirstname(e.target.value)}
              className="  h-6  w-40   rounded-sm border  border-[#3b9783] "
            />
          </div>
          <div className=" flex gap-3">
            <small>Password:</small>
            <input
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              className="  h-6  w-40   rounded-sm border  border-[#3b9783] "
            />
          </div>
          <div
            onClick={addDeparment}
            className=" bg   float-right my-2   flex w-40 cursor-pointer  items-center  justify-center  gap-3 rounded   bg-orange-400  p-1 hover:bg-orange-600 "
          >
            <p className="text-xs  font-extrabold  text-[#fff] "> ADD STAFF</p>
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

export default SettingsStaff;
