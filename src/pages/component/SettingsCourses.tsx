/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button, ConfigProvider, Modal, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { BiSolidAddToQueue } from "react-icons/bi";
import { ref } from "firebase/storage";
import { title } from "process";
import { TiEdit } from "react-icons/ti";

function SettingsCourses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseValue, setCourseValue] = useState<any>("");
  const [courseName, setCourseName] = useState<any>("");

  useEffect(() => {
    setCourseName(courseValue?.coursename || "");
  }, [isModalOpen]);

  console.log("COURSE COURSE ", courseName);

  const column = [
    { title: "Course Name", dataIndex: "coursename" },
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
  const { data: departmentData, refetch: refetchData } =
    api.settings.getListOfDepartment.useQuery();

  const [departmentId, setDepartmentId] = useState(
    departmentData?.[0]?.id ?? "",
  );

  const [filterDepartmentId, setFilterDepartmentId] = useState(
    departmentData?.[0]?.id ?? "",
  );

  const { mutate } = api.settings.createCourse.useMutation({
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      refetch();
    },
  });

  const { mutate: updateCourseMutate } = api.settings.updateCourse.useMutation({
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      refetch();
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const { data, refetch } = api.settings.getListOfCourses.useQuery({
    departmentId: departmentId,
  });

  const addDeparment = () => {
    if (departmentName !== "" ?? null ?? undefined) {
      setDepartmentName("");
      mutate({
        name: departmentName,
        departmentId: departmentId,
      });
    }
  };

  const fiterDepartmentValue = (value: string) => {
    setFilterDepartmentId(value);
  };

  const DepartmentValue = (value: string) => {
    setDepartmentId(value);
  };

  const handleUpdateCourse = () => {
    updateCourseMutate({
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
        <div className=" flex flex-col items-end  justify-end   gap-1">
          <div className=" flex items-center justify-center gap-3">
            <small>Department Name:</small>
            <Select
              size="small"
              defaultValue={departmentData?.[0]?.id ?? ""}
              style={{ width: 144 }}
              onChange={fiterDepartmentValue}
              options={[
                ...(departmentData?.map((data) => ({
                  value: data.id,
                  label: data.depeartName,
                })) ?? []),
              ]}
            />
          </div>

          <div className=" flex items-center justify-center gap-3">
            <small>Course Name:</small>

            <input
              onChange={(e) => setDepartmentName(e.target.value)}
              className="  h-6  w-36   rounded-sm border  border-[#3b9783] pl-2 "
              value={departmentName}
            />
          </div>
          <div
            onClick={addDeparment}
            className=" bg   float-right my-2   flex  w-36 cursor-pointer  items-center  justify-center  gap-3 rounded   bg-orange-400  p-1 hover:bg-orange-600 "
          >
            <p className="text-xs  font-extrabold  text-[#fff] "> ADD COURSE</p>
            <BiSolidAddToQueue className=" h-4 w-4 text-white" />
          </div>
        </div>

        <div className=" mb-2    flex items-center gap-3">
          <small className=" ml-2">FILTER:</small>
          <Select
            className=""
            size="small"
            value={departmentId}
            style={{ width: 120 }}
            onChange={DepartmentValue}
            options={[
              ...(departmentData?.map((data) => ({
                value: data.id,
                label: data.depeartName,
              })) ?? []),
            ]}
          />
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

export default SettingsCourses;
