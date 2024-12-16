interface CrashTypeProps {
  selectedOption: string;
  handleOptionClick: (option: string) => void;
}

import { Button } from "@/components/ui/button";

const CrashType = (props: CrashTypeProps) => {
  return (
    <div className="flex flex-wrap gap-1">
      <Button
        className={`flex text-xs px-3 py-1 rounded-none h-7 ${
          props.selectedOption === "MOTOR VEHICLE"
            ? "bg-blue-500 text-white"
            : "bg-white text-black hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => props.handleOptionClick("MOTOR VEHICLE")}
      >
        Motor Vehicle
      </Button>
      <Button
        className={`flex text-xs px-3 py-1 rounded-none h-7 ${
          props.selectedOption === "PEDESTRIAN"
            ? "bg-blue-500 text-white"
            : "bg-white text-black hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => props.handleOptionClick("PEDESTRIAN")}
      >
        Pedestrian
      </Button>
      <Button
        className={`flex text-xs px-3 py-1 rounded-none h-7 ${
          props.selectedOption === "BICYCLIST"
            ? "bg-blue-500 text-white"
            : "bg-white text-black hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => props.handleOptionClick("BICYCLIST")}
      >
        Bicyclist
      </Button>
      <Button
        size="default"
        className={`flex text-xs px-3 py-1 rounded-none h-7 ${
          props.selectedOption === "ALL"
            ? "bg-blue-500 text-white"
            : "bg-white text-black hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => props.handleOptionClick("ALL")}
      >
        ALL
      </Button>
    </div>
  );
};

export default CrashType;
