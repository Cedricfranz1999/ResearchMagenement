import { ConfigProvider, Modal, Select, Table } from "antd";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { BiSolidAddToQueue } from "react-icons/bi";
import { ref } from "firebase/storage";
import { title } from "process";

function SettingsCourses() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const column = [{ title: "Course Name", dataIndex: "coursename" }];
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

  const { data, refetch } = api.settings.getListOfCourses.useQuery({
    departmentId: departmentId,
  });

  const addDeparment = () => {
    if (departmentName !== "" ?? null ?? undefined) {
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
