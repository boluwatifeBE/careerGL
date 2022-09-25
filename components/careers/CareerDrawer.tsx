import React from "react";
import {
  HiCheck as CheckIcon,
  HiRefresh as RepeatIcon,
} from "react-icons/hi";
import {
  convertNameToUrl,
  getFromLocalStorage,
  queryPathElementsById,
} from "./RenderFunctions";
import CareerDrawerContent from "pages/careers/CareerDrawerContent";
import { IconButton } from "@/components/Drawer";

type ContentDrawerProps = {
  path?: string;
  name?: string;
  onClose?: () => void;
};

export function CareerDrawer(props: ContentDrawerProps) {
  const { onClose, path, name } = props;

  const nameUrl = convertNameToUrl(name);
  const isDone = getFromLocalStorage(nameUrl) === "done";

  if (!name) {
    return null;
  }

  return (
    <>
      <div className="z-10 mt-[20px] mb-10 flex items-center justify-between">
        {!isDone && (
          <IconButton
            onClick={() => {
              localStorage.setItem(nameUrl, "done");
              queryPathElementsById(nameUrl).forEach((item) =>
                item?.classList?.add("done")
              );
              onClose();
            }}
            className="flex cursor-pointer items-center space-x-1 rounded  bg-green-700 px-2 py-1"
          >
            <CheckIcon size={18} color="white" />
            <span className="text-sm text-white">Mark as Done</span>
          </IconButton>
        )}
        {isDone && (
          <IconButton
            onClick={() => {
              localStorage.removeItem(nameUrl);
              queryPathElementsById(nameUrl).forEach((item) =>
                item?.classList?.remove("done")
              );
              onClose();
            }}
            className="flex cursor-pointer items-center space-x-1 rounded  bg-red-700 px-2 py-1"
          >
            <RepeatIcon size={18} color="white" />
            <span className="text-sm text-white">Mark as Pending</span>
          </IconButton>
        )}
      </div>

      <CareerDrawerContent path={path} />
    </>
  );
}
