import React, { useState } from "react";
import Panel from "../panel";
import PageNavControl from "../page-nav-control";
import { useEditProfileDataStore } from ".";

type Props = {
  onClose: () => void;
};

export default function Name({ onClose }: Props) {
  const { data, changeUserValue } = useEditProfileDataStore();

  const [inputField, setInputField] = useState(data.user?.name || "");

  const onDoneHandler = () => {
    changeUserValue(inputField, "name");
    onClose();
  };

  return (
    <Panel
      onClose={onClose}
      className=""
      title="Edit name"
      panelDoneClick={onDoneHandler}
    >
      <PageNavControl
        title="Edit name"
        className="dark:bg-transparent"
        leftElement={
          <button
            onClick={onClose}
            className="absolute left-4 text-[17px] font-light"
          >
            Cancel
          </button>
        }
        rightElement={
          <button
            className="absolute right-4 text-[17px] font-light text-blue"
            onClick={onDoneHandler}
          >
            Done
          </button>
        }
      />

      <input
        type="text"
        value={inputField}
        placeholder="write a name"
        onChange={(event) => setInputField(event.target.value)}
        className="w-full bg-transparent text-[15px] outline-none"
      />
    </Panel>
  );
}
