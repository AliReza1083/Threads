import React, { useState } from "react";
import Panel from "../panel";
import PageNavControl from "../page-nav-control";
import { useEditProfileDataStore } from ".";
import { isValidLink } from "@/utils";
import { ErrorMessageInput } from "../error-message";

type Props = {
  onClose: () => void;
};

export default function Link({ onClose }: Props) {
  const { data, changeUserValue } = useEditProfileDataStore();

  const [inputField, setInputField] = useState(data.user?.link || "");
  const [error, setError] = useState<any>(null);

  const onDoneHandler = () => {
    if (!isValidLink(inputField)) {
      return setError("Choose a valid link");
    }

    changeUserValue(inputField, "link");
    onClose();
  };

  return (
    <Panel
      onClose={onClose}
      className="flex-col"
      title="Edit link"
      panelDoneClick={onDoneHandler}
    >
      <PageNavControl
        title="Edit link"
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
        placeholder="write a link"
        onChange={(event) => setInputField(event.target.value)}
        className="w-full bg-transparent text-[15px] outline-none"
      />

      {error && (
        <ErrorMessageInput
          error={error}
          message={error}
          className="mt-4 [&>p]:px-0 [&>p]:text-blue"
        />
      )}
    </Panel>
  );
}
