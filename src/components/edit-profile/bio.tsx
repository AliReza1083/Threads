import React, { useEffect, useRef, useState } from "react";
import Panel from "../panel";
import PageNavControl from "../page-nav-control";
import { useEditProfileDataStore } from ".";

type Props = {
  onClose: () => void;
};

export default function Bio({ onClose }: Props) {
  const { data, changeUserValue } = useEditProfileDataStore();

  const [inputField, setInputField] = useState(data.user?.bio || "");

  const onDoneHandler = () => {
    changeUserValue(inputField, "bio");
    onClose();
  };

  const textareaRef = useRef<null | HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "80px";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [inputField]);

  return (
    <Panel
      onClose={onClose}
      className=""
      title="Edit bio"
      panelDoneClick={onDoneHandler}
    >
      <PageNavControl
        title="Edit bio"
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

      <textarea
        ref={textareaRef}
        value={inputField}
        placeholder="write a bio"
        onChange={(event) => setInputField(event.target.value)}
        className="max-h-[400px] w-full resize-none bg-transparent text-[15px] outline-none"
      />
    </Panel>
  );
}
