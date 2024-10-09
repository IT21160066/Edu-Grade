import React, { useState } from "react";
import { File, Upload } from "lucide-react";
import { cn } from "../util/cn";

const DropZone = ({ onChange }) => {
  const [dragOver, setDragOver] = useState(false);
  const [fileInfo, setFileInfo] = useState("");

  const handleOnDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { files } = e.dataTransfer;
    const file = files[0];

    if (file) {
      const fileSize = Math.round(file.size / 1024);
      setFileInfo(`Uploaded file: ${file.name} (${fileSize} KB)`);
    }

    console.log(file);
    onChange(file);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
    e.stopPropagation();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
    e.stopPropagation();
  };

  const handleOnChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileSize = Math.round(file.size / 1024);
      setFileInfo(`Uploaded file: ${file.name} (${fileSize} KB)`);
    }

    onChange(file);
  };

  return (
    <div
      className={cn(
        "border border-dashed rounded-lg p-10 w-full flex flex-col justify-center items-center",
        dragOver && "bg-blue-50"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleOnDrop}
    >
      {fileInfo ? (
        <span className="flex flex-col justify-center items-center">
          <File size={24} className="text-gray-800" />
          <h3 className="text-sm font-bold text-gray-800 mt-4">{fileInfo}</h3>
        </span>
      ) : (
        <span className="flex flex-col justify-center items-center">
          <Upload size={24} className="text-gray-800" />
          <h3 className="text-sm font-bold text-gray-800 mt-4">
            Drag and drop or{" "}
            <label>
              {" "}
              <input
                type="file"
                className="hidden "
                onChange={handleOnChange}
                accept=".mp4"
              />
              <span className="underline cursor-pointer">
                Choose a Local File
              </span>
            </label>
          </h3>
        </span>
      )}
    </div>
  );
};

export default DropZone;
