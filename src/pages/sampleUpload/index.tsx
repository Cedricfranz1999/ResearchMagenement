/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useState } from "react";
import { storage } from "~/config/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Form } from "antd";

function App({ setImageUpload }: any) {
  return (
    <div>
      <Form.Item name={"capstoneFile"}>
        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files?.[0]);
          }}
        />
      </Form.Item>
    </div>
  );
}

export default App;
