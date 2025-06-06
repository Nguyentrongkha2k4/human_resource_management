import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { TabSlider } from "@/components/SliderTab/TabSlider";
import Image from "next/image";

interface DetailStaffProps {
  onClose: () => void;
  dataInitial: any;
  reload: any;
}

const DetailStaff: React.FC<DetailStaffProps> = ({ onClose, dataInitial, reload }) => {
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [data, setData] = useState<any>(dataInitial);
  const [updateData, setupdateData] = useState<any>({});
  const filterData = [
    { id: 0, name: "Giao dịch", value: "details" },
    { id: 1, name: "Sinh viên", value: "students" },
  ];
  const [filter, setFilter] = useState<"details" | "students">("details");

  const handleUpdateData = (e, key: string, input: string = "string") => {
    if (input === "number")
      setupdateData({ ...updateData, [key]: parseInt(e.target.value) });
    else
      setupdateData({ ...updateData, [key]: e.target.value });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 300);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const ToggleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const traverse = (obj, isEditing, filter) => {
    const editableElements = [];
    const nonEditableElements = [];

    obj &&
      Object.keys(obj).forEach((key) => {
        if (obj[key] && typeof obj[key] === "object") {
          traverse(obj[key], isEditing, filter);
        } else {
          // Bỏ qua không render imageUrl khi filter là "details"
          if (key === "imageUrl" && filter === "details") {
            return;
          }

          const formattedValue = obj[key] ? obj[key] : "No info";
          const element = (
            <div
              key={key}
              id="order_id"
              className="bg-gray-100 p-3 rounded-xl shadow-inner dark:text-black"
            >
              <div className="font-bold text-base text-black dark:text-black">
                {key.replace(/([A-Z])/g, " $1")}
              </div>
              {isEditing ? (
                <input
                  className={`text-gray-500 w-fit inline-block break-all dark:text-black ${!(
                      key === "id" ||
                      key === "orderId" ||
                      key === "requestId" ||
                      key === "imageUrl" ||
                      key === ""
                    )
                      ? "border-b-2"
                      : ""
                    }`}
                  type="text"
                  value={obj[key]}
                  onChange={(e) => {
                    setData({ ...obj, [key]: e.target.value });
                    handleUpdateData(e, key);
                  }}
                  disabled={
                    key === "id" ||
                    key === "orderId" ||
                    key === "requestId" ||
                    key === "imageUrl" ||
                    key === "password"
                  }
                />
              ) : (
                <div className="text-gray-500 w-fit inline-block break-all dark:text-black">
                  {formattedValue}
                </div>
              )}
            </div>
          );
          if (true && key !== "imageUrl" && key !== "password") {
            editableElements.push(element);
          }
        }
      });
    return (
      <div className="flex flex-col">
        <div className="grid-cols-2 grid lg:grid-cols-3 p-10 gap-4">
          {editableElements}
        </div>
        <div className="grid-cols-2 grid lg:grid-cols-3 p-10 gap-4">
          {nonEditableElements}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50 text-[#545e7b]`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
      style={{
        backdropFilter: "blur(12px)",
      }}
    >
      <motion.div
        ref={notificationRef}
        className={`relative w-11/12 bg-white dark:bg-[#14141a] h-5/6 rounded-xl p-4 ${isShaking ? "animate-shake" : ""
          }`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-black dark:text-white w-full text-center">
            Thông tin chi tiết
          </div>

          <IoMdClose
            className="absolute right-0 w-8 h-8 cursor-pointer rounded-full mb-2 text-black dark:text-white hover:bg-gray-400 hover:text-black"
            onClick={handleClose}
          />
        </div>
        <TabSlider allTabs={filterData} onSelectOption={setFilter} />
        <div className="w-full h-4/6 border border-[#545e7b] mt-4 no-scrollbar justify-center flex flex-wrap gap-5 bg-gray-100 dark:bg-[#14141a] rounded-md dark:text-white text-black overflow-y-scroll">
          {
            <div className="flex gap-5">
              <div className="flex justify-center items-center w-[300px] h-[300px] rounded-lg overflow-hidden bg-gray-200 mt-10">
                <Image
                  alt="avatar"
                  src={data.student.imageUrl}
                  className="object-cover"
                  width={300}
                  height={300}
                />
              </div>
              {filter === "students" && traverse(data.student, isEditing, filter)}
            </div>
          }
          {filter === "details" && traverse(data, isEditing, filter)}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailStaff;
