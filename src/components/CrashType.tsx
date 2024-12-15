interface CrashTypeProps {
  selectedOption: string;
  handleOptionClick: (option: string) => void;
}

import { Button } from "@/components/ui/button";

const CrashType = ({ selectedOption, handleOptionClick }: any) => {
  return (
    <div className="flex flex-wrap gap-1">
      <Button
        className={`flex-grow px-4 py-2 ${
          selectedOption === "CAR"
            ? "bg-blue-500 text-white"
            : "bg-white text-black hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => handleOptionClick("CAR")}
      >
        CAR
      </Button>
      <Button
        className={`flex-grow px-4 py-2 ${
          selectedOption === "PEDESTRIAN"
            ? "bg-blue-500 text-white"
            : "bg-white text-black hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => handleOptionClick("PEDESTRIAN")}
      >
        PEDESTRIANS
      </Button>
      <Button
        className={`flex-grow px-4 py-2 ${
          selectedOption === "BICYCLIST"
            ? "bg-blue-500 text-white"
            : "bg-white text-black hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => handleOptionClick("BICYCLIST")}
      >
        BIKE
      </Button>
      <Button
        className={`flex-grow px-4 py-2 rounded-r ${
          selectedOption === "ALL"
            ? "bg-blue-500 text-white"
            : "bg-white text-black hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => handleOptionClick("ALL")}
      >
        ALL
      </Button>
    </div>
  );
};

export default CrashType;
