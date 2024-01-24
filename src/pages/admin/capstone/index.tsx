/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState, useRef } from "react";
import DashboardLayout from "~/pages/component/DashboardLayout";
import PageHeader from "~/pages/component/PageHeader";
import {
  Card,
  Input,
  Table,
  Modal,
  Form,
  Button,
  Upload,
  message,
  DatePicker,
  Select,
  ConfigProvider,
} from "antd";
import { IoArrowForwardCircle } from "react-icons/io5";
import { useReactToPrint } from "react-to-print";

import { BiSolidAddToQueue } from "react-icons/bi";
import { useRouter } from "next/router";
import { DataType } from "~/pages/dataType/types";
import { capstoneApprovalColumn } from "~/pages/component/capstoneApprovalColumn";
import { capstoneManagementColumn } from "~/pages/component/capstoneManagementColumn";
import { UploadOutlined } from "@ant-design/icons";

import { api } from "~/utils/api";
import App from "~/pages/sampleUpload";
import { storage } from "~/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import dayjs from "dayjs";
import PageHeaderAdmin from "~/pages/component/pageHeaderAdmin";
import AppUploaded from "~/pages/sampleUploadUpdated";
import { eventNames } from "process";
import { any } from "zod";

const { Search } = Input;

const tabList = [
  {
    key: "tab1",
    tab: "Capstone Approval",
  },
  {
    key: "tab2",
    tab: "Capstone Management",
  },
];

export function AdminCapstone() {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAbstract, setIsModalOpenAbstract] = useState(false);
  const [abstract, setAbstract] = useState<any>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [capstoneData, setCapstoneData] = useState<string>();
  const [pickerDate, setPickerDate] = useState<any>("");
  const [searchValue, setSearchValue] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [clickUpdateUrl, setClickUpdateUrl] = useState(false);
  const [handledepartmentId1, setHandleDepartmentId] = useState("");

  const [label, setLabel] = useState("");
  const [capstoneType, setCapstoneType] = useState("");
  const [updateCapstoneData, setUpdateCapstoneData] = useState<any>([]);

  const { data: courseData } = api.example.courseData.useQuery();
  const [courseState, setCourseState] = useState<any>(null);
  const [approvalModal, setApproveModal] = useState(false);

  const [activeTabKey1, setActiveTabKey1] = useState<string>("tab1");
  const { data, refetch } = api.capstone.notApprovedCapstoneDetails.useQuery();

  const { data: approveData, refetch: refetchApprovedCapstone } =
    api.capstone.ApprovedCapstoneDetails.useQuery();

  const { data: departmentData, refetch: refetchData } =
    api.settings.getListOfDepartment.useQuery();

  const { data: FilterCourse, refetch: refetchFilterData } =
    api.settings.FilterCourseByDepartment.useQuery({ id: departmentId });

  const { data: FilterCourseUpdated, refetch: refetchFilterDataUpdated } =
    api.settings.UpdateFilterCourseByDepartment.useQuery({
      id: handledepartmentId1,
    });

  const { data: dataCourses, refetch: refetchCourses } =
    api.settings.getListOfCourses.useQuery(
      {
        departmentId: departmentId,
      },

      { enabled: !!departmentId },
    );

  const [filterCourse, setFilterCourse] = useState(
    FilterCourse?.[0]?.Course[0]?.id,
  );

  const departmentOptions = [
    {
      label: "Select Department",
      options:
        departmentData?.map((data) => ({
          value: data.id,
          label: data.depeartName,
        })) || [],
    },
  ];

  useEffect(() => {
    if (departmentData) {
      setDepartmentId(departmentData[0]?.id ?? "");
    }
  }, [departmentData]);

  const { mutate: mutateApprovalCapstone } =
    api.capstone.approveCapstone.useMutation({
      onSuccess: () => {
        refetch();
        refetchApprovedCapstone();
      },
    });

  const [modalCapstone, setModalCapstone] = useState(false);
  const [updateModalCapstone, setUpdateModalCapstone] = useState(false);

  const [imageUpload, setImageUpload] = useState<any>(null);
  const [imageUploadUpdate, setImageUploadUpdate] = useState<any>(null);

  const adminCapstonTab: Record<string, React.ReactNode> = {
    tab1: (
      <div className="  flex  w-full flex-nowrap">
        <Table
          className=" w-full"
          columns={capstoneApprovalColumn(
            setApproveModal,
            setCapstoneData,
            setAbstract,
          )}
          dataSource={data?.filter((item: any) => {
            return (
              item.abstract.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.date.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.adviser.toLowerCase().includes(searchValue.toLowerCase()) ||
              item?.Students?.[0]?.Course?.coursename
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            );
          })}
        ></Table>
      </div>
    ),
    tab2: (
      <div className="  flex  w-full flex-nowrap">
        <Table
          className=" w-full"
          columns={capstoneManagementColumn(
            setIsModalOpenAbstract,
            isModalOpenAbstract,
            setAbstract,
            setUpdateModalCapstone,
            setCapstoneData,
          )}
          dataSource={approveData?.filter((item: any) => {
            return (
              item.studentCourse
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              item.topic.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.status.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.abstract.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.date.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.adviser.toLowerCase().includes(searchValue.toLowerCase()) ||
              item?.Students?.[0]?.Course?.coursename
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            );
          })}
        ></Table>
      </div>
    ),
  };

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const capstoneModalOk = () => {
    setModalCapstone(false);
  };
  const capstoneModalCancel = () => {
    setModalCapstone(false);
  };

  const approvalModalOkay = (values: any) => {
    mutateApprovalCapstone({
      id: capstoneData ?? "",
    });

    setApproveModal(false);
  };

  const approvalModalCancel = () => {
    setApproveModal(false);
    setCapstoneData(undefined);
  };
  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };
  const { mutate } = api.capstone.createAdminCapstone.useMutation({
    onSuccess: (data) => {
      if (!data) {
        window.alert("Student not Registered or Already submitted a Capstone");

        form.setFields([
          {
            name: "capstoneLeader",
            errors: ["Student not Registered or Already submitted a Capstone"],
          },
        ]);
      } else {
        form.resetFields();
        setModalCapstone(false);
      }
      refetch();
      refetchApprovedCapstone();
    },
  });

  const { mutate: updateMutate } = api.capstone.updateCapstone.useMutation({
    onSuccess: (data) => {
      setUpdateModalCapstone(false);

      if (!data) {
        window.alert("Student not Registered or Already submitted a Capstone");

        form.setFields([
          {
            name: "capstoneLeader",
            errors: ["Student not Registered or Already submitted a Capstone"],
          },
        ]);
      } else {
        form.resetFields();
        setModalCapstone(false);
      }
      refetch();
      refetchApprovedCapstone();
    },
  });

  const uploadImage = (e: any) => {
    if (!imageUpload) {
      form.setFields([
        {
          name: "capstoneFile",
          errors: ["Capstone File Required"],
        },
      ]);
    } else {
      const imageRef = ref(storage, `files/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload).then((data: any) => {
        getDownloadURL(data.ref).then((d) => {
          const course = courseData?.find((data) => data.id === e.course);
          mutate({
            studentNo: e.capstoneLeader,

            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            course: course?.id || "",

            studentMembers: e.studentMembers,
            title: e.title,
            topic: label,
            abstract: e.abstract,
            adviser: e.adviser,
            url: d,
            date: pickerDate,
            status: capstoneType,
            courseId: course?.id || "",
          });
        });
      });
    }
  };
  const onFinishCapstoneForm = (values: any) => {
    if (!imageUpload) {
      form.setFields([
        {
          name: "capstoneFile",
          errors: ["Capstone File Required"],
        },
      ]);
    }
  };

  const fiterDepartmentValue = (value: string, option: any) => {
    setLabel(value);
    setDepartmentId(value);

    form.setFieldValue("course", filterCourse);
  };

  const handleCapstoneType = (value: string, option: any) => {
    setCapstoneType(option.label);

    form.setFieldValue("course", filterCourse);
  };
  const onFinishFailedCapstoneForm = (errorInfo: any) => {
    console.log();
  };
  const showCapstoneModal = () => {
    setModalCapstone(true);
  };

  const uploadProps = {
    action: "https://www.example.com/upload",
    accept: ".pdf,.doc,.docx",
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      router.push("/admin/login");
    }
  });

  const [nwssuDepartment, setNwssuDepartment] = useState(
    updateCapstoneData?.Course?.id,
  );

  const [nwssuCourse, setNwssuCourse] = useState(null);

  useEffect(() => {
    form2.setFieldsValue({
      capstoneTypeUpdated: updateCapstoneData.status,
      studentMembersUpdated: updateCapstoneData.studentMembers,
      departmentUpdated: updateCapstoneData?.Course?.Departments?.depeartName,
      courseUpdated: updateCapstoneData?.Course?.coursename,
      titleUpdated: updateCapstoneData.title,
      abstractUpdated: updateCapstoneData.abstract,
      adviserUpdated: updateCapstoneData.adviser,
      dateUpdated: dayjs(updateCapstoneData.date, "MM/DD/YYYY"),
    });
    setNwssuCourse(updateCapstoneData?.Course?.id);
    setNwssuDepartment(updateCapstoneData?.Course?.id);
  }, [updateModalCapstone]);

  console.log("NWSSU COURSE ", nwssuCourse);
  console.log("NWSSU DEPARTMEN ", nwssuDepartment);

  const handleDateChange = (date: any, dateString: any) => {
    const formattedDate = dayjs(dateString).format("MM/DD/YYYY");
    setPickerDate(formattedDate);
  };

  const filteredApproveData =
    approveData?.filter((item: any) => {
      return (
        item.Course.coursename
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        item.Course.Departments.depeartName
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        item.status.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.abstract.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.date.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.adviser.toLowerCase().includes(searchValue.toLowerCase()) ||
        item?.Students?.[0]?.Course?.coursename
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    }) || [];

  // Get the length of filteredApproveData
  const filteredApproveDataLength = filteredApproveData.length;

  const UpdateOnFinish = (e: any) => {
    console.log("EEEEEEE", e);

    const imageRef = imageUploadUpdate
      ? ref(storage, `files/${imageUploadUpdate.name + v4()}`)
      : null;
    if (imageRef) {
      uploadBytes(imageRef, imageUploadUpdate).then((data: any) => {
        getDownloadURL(data.ref).then((d) => {
          const course = courseData?.find((data) => data.id === e.course);
          updateMutate({
            id: updateCapstoneData.id,
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            course: nwssuCourse || "",
            studentMembers: e.studentMembersUpdated,
            title: e.titleUpdated,
            topic: nwssuDepartment || "",
            abstract: e.abstractUpdated,
            adviser: e.adviserUpdated,
            url: d || null,
            date: dayjs(e.dateUpdated).format("MM/DD/YYYY"),
            status: e.capstoneTypeUpdated,
            courseId: nwssuCourse || "",
          });
        });
      });
    } else {
      updateMutate({
        id: updateCapstoneData.id,
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        course: nwssuCourse || "",
        studentMembers: e.studentMembersUpdated,
        title: e.titleUpdated,
        topic: e.departmentUpdated,
        abstract: e.abstractUpdated,
        adviser: e.adviserUpdated,
        url: updateCapstoneData.url,
        date: dayjs(e.dateUpdated).format("MM/DD/YYYY"),
        status: e.capstoneTypeUpdated,
        courseId: nwssuCourse || "",
      });
    }
  };

  const handleDepartmentId = (event: any) => {
    setNwssuDepartment(event);
    setHandleDepartmentId(event);
    form2.setFieldsValue("");
    const course: any = departmentData?.find((data) => {
      return data.id === event;
    })?.Course;
    form2.setFieldValue("courseUpdated", course[0] ? course[0].id : null);
    setNwssuCourse(course[0] ? course[0].id : null);
  };

  return (
    <div>
      <>
        <Modal
          onCancel={() => setIsModalOpenAbstract(false)}
          open={isModalOpenAbstract}
          width={700}
          centered
          footer={[]}
          title="ABSTRACT"
        >
          <div className="  min-h-96  h-96 overflow-scroll bg-gray-200  px-10 pt-5">
            {abstract}
          </div>
        </Modal>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#3b9783",
                rowHoverBg: "#4c4d58",
                colorBgContainer: "#dbdbdb",
                rowExpandedBg: "#dbdbdb",
                footerBg: "red",
              },
            },
          }}
        >
          <div className="flex flex-col  overflow-hidden   bg-[#ecf0f6]  ">
            <div className="    mb-6 flex  justify-between   px-16 py-5 shadow-md ">
              <div className=" flex  items-center justify-center gap-5">
                {" "}
                <img
                  src="https://www.onlinekiosk.nwssu.edu.ph/img/nwssulogo.png"
                  alt="NWSSU Logo"
                  className="  h-16 w-16 "
                />
                <h1 className="  text-3xl font-extrabold  tracking-wider">
                  {" "}
                  <span className=" text-[#4a9284]"> NWSSU </span> |{" "}
                  <span className=" text-[#f86e1e]">RESEARCH RECORDS</span>
                </h1>
              </div>
              <div>
                <PageHeaderAdmin />
              </div>
            </div>
            <div
              className="   overflow-hidden rounded-lg bg-[#ecf0f6] px-6 shadow-lg  "
              style={{ minHeight: "100vh" }}
            >
              <div className="  mb-2 flex  justify-between ">
                <div>
                  <Search
                    placeholder="search keywords"
                    className=" rounded border border-solid border-gray-500 "
                    style={{ width: 200 }}
                    onChange={handleSearchChange}
                  />
                </div>

                <div
                  onClick={showCapstoneModal}
                  className={` bg  flex cursor-pointer items-center  justify-center  gap-3  rounded   bg-orange-400  p-2 hover:bg-orange-600  ${
                    router.asPath === "/capstone" ? "hidden" : ""
                  }`}
                >
                  <p className="font-extrabold  text-[#fff] "> ADD CAPSTONE</p>
                  <BiSolidAddToQueue className=" h-6 w-6 text-white" />
                </div>
              </div>{" "}
              <div className=" flex items-center justify-between ">
                <p className=" my-2  ml-1  mt-10 rounded-lg bg-orange-400 p-2  font-bold  text-white hover:bg-orange-600 ">
                  {" "}
                  Total Studies: {filteredApproveDataLength}
                </p>
                <button
                  onClick={handlePrint}
                  className="  text-bold rounded-md  bg-blue-400 p-1 text-white hover:bg-blue-500"
                >
                  EXPORT DATA
                </button>
              </div>
              <div ref={componentRef}>
                <Table
                  className=" w-full"
                  columns={
                    capstoneManagementColumn(
                      setIsModalOpenAbstract,
                      isModalOpenAbstract,
                      setAbstract,
                      setUpdateModalCapstone,
                      setUpdateCapstoneData,
                    ) as any
                  }
                  dataSource={filteredApproveData}
                ></Table>
              </div>
            </div>
          </div>
        </ConfigProvider>
      </>
      <div className="hidden">
        <Modal
          title="Basic Modal"
          open={approvalModal}
          onOk={approvalModalOkay}
          onCancel={approvalModalCancel}
          footer={
            <div>
              <Button key="Cancel" onClick={approvalModalCancel}>
                Cancel
              </Button>
              <Button className=" bg-blue-300" onClick={approvalModalOkay}>
                OK
              </Button>
            </div>
          }
        >
          Are you sure you want to approve this capstone?
        </Modal>
        <Modal
          title="ADD CAPSTONE"
          open={modalCapstone}
          onOk={capstoneModalOk}
          onCancel={capstoneModalCancel}
          centered
          width={600}
          footer={[]}
        >
          <Form
            name="basic"
            onFinish={uploadImage}
            onFinishFailed={onFinishFailedCapstoneForm}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              name="capstoneLeader"
              rules={[
                {
                  required: true,
                  message: " Input  student leader",
                },
              ]}
            >
              <Select
                size="small"
                className="h-8 min-w-full flex-1 "
                placeholder="Research Type"
                style={{ width: 200 }}
                options={[
                  { value: "Capstone ", label: " Capstone" },
                  { value: "Thesis", label: "Thesis" },
                ]}
                onChange={handleCapstoneType}
              />
            </Form.Item>

            <Form.Item
              name="studentMembers"
              rules={[
                {
                  required: true,
                  message: " Input  Student  members",
                },
              ]}
            >
              <textarea
                placeholder="Student Members"
                className="  h-32   w-full border border-gray-200 p-4 "
                defaultValue={updateCapstoneData.studentMembers}
              />
            </Form.Item>

            <div className=" flex w-full   items-start justify-center gap-12">
              <Form.Item
                name="topic"
                rules={[
                  { required: true, message: "Please input Department  " },
                ]}
              >
                <Select
                  className=" min-h-12    mt-1 w-full flex-1"
                  size="small"
                  placeholder="Select Department"
                  style={{ width: 200 }}
                  onChange={fiterDepartmentValue}
                  options={departmentOptions}
                />
              </Form.Item>
              <Form.Item
                name="course"
                rules={[{ required: true, message: "Please Choose Course" }]}
                className="w-full flex-1"
              >
                {courseData && (
                  <Select
                    placeholder="Select Course"
                    defaultActiveFirstOption={true}
                    size="small"
                    className="h-8 min-w-full flex-1 "
                    style={{ width: 200 }}
                    options={[
                      {
                        label: "Select Course",
                        options: FilterCourse
                          ? FilterCourse?.[0]?.Course.map((data) => ({
                              label: data.coursename,
                              value: data.id,
                            }))
                          : [],
                      },
                    ]}
                  />
                )}
              </Form.Item>
            </div>

            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your Capstone title",
                },
              ]}
            >
              <Input
                placeholder="Capstone Title"
                value={updateCapstoneData.title}
              />
            </Form.Item>

            <Form.Item
              name="topic"
              rules={[{ required: true, message: "Please input Topic Name  " }]}
            ></Form.Item>

            <Form.Item
              name="abstract"
              rules={[{ required: true, message: "Please input Abstract  " }]}
            >
              <textarea
                className="  h-32   w-full border border-gray-200 p-4"
                placeholder="Input Abstract  "
              />
            </Form.Item>

            <Form.Item
              name="adviser"
              rules={[
                { required: true, message: "Please input Adviser Name  " },
              ]}
            >
              <Input placeholder=" Adviser Name" />
            </Form.Item>

            <Form.Item
              name="date"
              rules={[{ required: true, message: "Please  Select date  " }]}
              label="Date of Submission"
            >
              <DatePicker onChange={handleDateChange} />
            </Form.Item>
            <App
              imageUpload={imageUpload}
              setImageUpload={setImageUpload}
              form={form}
            />
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                className="flex items-end bg-[#3b9783]  "
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="UPDATE CAPSTONE"
          open={updateModalCapstone}
          onOk={() => setUpdateModalCapstone(false)}
          onCancel={() => setUpdateModalCapstone(false)}
          centered
          width={600}
          footer={[]}
        >
          <Form
            onFinish={UpdateOnFinish}
            // onFinishFailed={onFinishFailedCapstoneForm}
            autoComplete="off"
            form={form2}
          >
            <Form.Item
              name="capstoneTypeUpdated"
              rules={[
                {
                  required: true,
                  message: " Input  student leader",
                },
              ]}
            >
              <Select
                size="small"
                className="h-8 min-w-full flex-1 "
                placeholder="Research Type"
                options={[
                  { value: "Capstone ", label: " Capstone" },
                  { value: "Thesis", label: "Thesis" },
                ]}
                onChange={handleCapstoneType}
              />
            </Form.Item>

            <Form.Item
              name="studentMembersUpdated"
              rules={[
                {
                  required: true,
                  message: " Input  Student  members",
                },
              ]}
            >
              <textarea
                placeholder="Student Members"
                className="  h-32   w-full border border-gray-200 p-4 "
              />
            </Form.Item>

            <div className=" flex w-full   items-start justify-center gap-12">
              <Form.Item
                name="departmentUpdated"
                rules={[
                  { required: true, message: "Please input Department  " },
                ]}
              >
                <Select
                  className=" min-h-12    mt-1 w-full flex-1"
                  size="small"
                  style={{ width: 200 }}
                  options={departmentOptions}
                  defaultActiveFirstOption={true}
                  placeholder={" Update Department"}
                  onChange={handleDepartmentId}
                />
              </Form.Item>
              <Form.Item
                name="courseUpdated"
                rules={[{ required: true, message: "Please Choose Course" }]}
                className="w-full flex-1"
              >
                {courseData && (
                  <Select
                    placeholder="Update Course"
                    size="small"
                    className="h-8 min-w-full flex-1 "
                    style={{ width: 200 }}
                    // defaultActiveFirstOption
                    options={[
                      {
                        label: "Select Course",
                        options: !!FilterCourseUpdated?.length
                          ? FilterCourseUpdated?.[0]?.Course.map((data) => ({
                              label: data.coursename,
                              value: data.id,
                            }))
                          : [],
                      },
                    ]}
                  />
                )}
              </Form.Item>
            </div>

            <Form.Item
              name="titleUpdated"
              rules={[
                {
                  required: true,
                  message: "Please input your Capstone title",
                },
              ]}
            >
              <Input placeholder="Capstone Title" />
            </Form.Item>

            <Form.Item
              name="abstractUpdated"
              rules={[{ required: true, message: "Please input Abstract  " }]}
            >
              <textarea
                className="  h-32   w-full border border-gray-200 p-4"
                placeholder="Input Abstract"
              />
            </Form.Item>

            <Form.Item
              name="adviserUpdated"
              rules={[
                { required: true, message: "Please input Adviser Name  " },
              ]}
            >
              <Input placeholder=" Adviser Name" />
            </Form.Item>

            <Form.Item
              name="dateUpdated"
              rules={[{ required: true, message: "Please  Select date  " }]}
              label="Date of Submission"
            >
              <DatePicker onChange={handleDateChange} />
            </Form.Item>

            <AppUploaded
              clickUpdateUrl={clickUpdateUrl}
              imageUpload={imageUploadUpdate}
              setImageUploadUpdate={setImageUploadUpdate}
              setClickUpdateUrl={setClickUpdateUrl}
              form={form}
            />
            <div className={` flex gap-3 ${clickUpdateUrl ? "hidden" : ""} `}>
              <button
                type="button"
                onClick={() => setClickUpdateUrl(true)}
                className="w-40 rounded-lg  bg-yellow-400 px-1 py-0 text-white  hover:bg-yellow-500"
              >
                Update File
              </button>
              <p>
                {updateCapstoneData.url &&
                  decodeURIComponent(
                    updateCapstoneData.url.split("files%2F")[1].split("?")[0],
                  ).substring(0, 50)}
              </p>
            </div>
            <Form.Item className="mt-5" wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                className="flex items-end bg-[#3b9783]  "
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default AdminCapstone;
