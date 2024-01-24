/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useRef, useState } from "react";
import { storage } from "~/config/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Form } from "antd";

import { ImCancelCircle } from "react-icons/im";
function AppUploaded({
  setImageUploadUpdate,
  clickUpdateUrl,
  setClickUpdateUrl,
}: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div
        className={`flex   items-center gap-2  ${
          clickUpdateUrl ? "" : "hidden"
        } `}
      >
        <ImCancelCircle
          size={15}
          className=" rounded-3xl bg-red-200 text-red-500  hover:bg-red-400 "
          onClick={() => setClickUpdateUrl(false)}
        />
        <div></div>

        <input
          className=""
          type="file"
          onChange={(event) => {
            setImageUploadUpdate(event.target.files?.[0]);
          }}
        />
      </div>
    </div>
  );
}

export default AppUploaded;
