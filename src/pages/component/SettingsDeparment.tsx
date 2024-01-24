/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Button, ConfigProvider, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { BiSolidAddToQueue } from "react-icons/bi";
import { ref } from "firebase/storage";
import { TiEdit } from "react-icons/ti";

function SettingsDeparment() {
  const { data, refetch } = api.settings.getListOfDepartment.useQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseName, setCourseName] = useState<any>("");
  const [courseValue, setCourseValue] = useState<any>("");

  console.log(courseValue);

  useEffect(() => {
    setCourseName(courseValue?.depeartName || "");
  }, [isModalOpen]);

  console.log("COURSENAME COURSENAME ", courseName);

  const column = [
    { title: "Department Name", dataIndex: "depeartName" },
    {
      title: "Action",
      key: "course",
      render: (_: any, record: any) => {
        return (
          <div
            className="flex items-center justify-center gap-4"
            onClick={() => {
              setIsModalOpen(true);
              setCourseValue(_);
            }}
          >
            <Button className="flex w-fit flex-row items-center justify-center gap-2 rounded bg-yellow-300 px-4">
              <TiEdit />
              <a> Update </a>
            </Button>
          </div>
        );
      },
    },
  ];

  const [departmentName, setDepartmentName] = useState("");

  const { mutate: updateCourseMutate } =
    api.settings.updateDepartment.useMutation({
      onSuccess: () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        refetch();
      },
    });

  const { mutate } = api.settings.createDepartment.useMutation({
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      refetch();
    },
  });

  const addDeparment = () => {
    if (departmentName !== "" ?? null ?? undefined) {
      setDepartmentName("");
      mutate({
        name: departmentName,
      });
    }
  };

  const handleUpdateCourse = () => {
    updateCourseMutate({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      id: courseValue.id,
      name: courseName,
    });
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
        <Modal
          open={isModalOpen}
          centered
          footer={[]}
          className="px-4"
          onCancel={() => setIsModalOpen(false)}
        >
          <div className="  flex  items-center justify-start  gap-3  pr-5">
            <p> COURSE: </p>
            <input
              onChange={(event) => setCourseName(event.target.value)}
              value={courseName}
              className="  w-full rounded-lg  border border-black pl-5 "
            ></input>
            <button
              onClick={handleUpdateCourse}
              className=" rounded-lg bg-yellow-500  p-1"
            >
              {" "}
              UPDATE
            </button>
          </div>
        </Modal>
        <div className=" flex items-center justify-end     gap-3">
          <small>Department name:</small>
          <input
            onChange={(e) => setDepartmentName(e.target.value)}
            className="  h-6  w-40   rounded-sm border  border-[#3b9783] "
            value={departmentName}
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
