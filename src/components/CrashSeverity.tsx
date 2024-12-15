interface CrashTypeProps {
  selectedOption: string;
  handleOptionClick: (option: string) => void;
}
import { Button } from "@/components/ui/button";

const CrashSeverity = (props: CrashTypeProps) => {
  return (
    <div className="flex flex-wrap gap-1">
      <Button
        className={`flex-grow px-4 py-2 ${
          props.selectedOption === "CRASH"
            ? "bg-blue-500 text-white"
            : "bg-white text-black hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => props.handleOptionClick("CRASH")}
      >
        CRASHES
      </Button>
      <Button
        className={`flex-grow px-4 py-2 ${
          props.selectedOption === "FATAL"
            ? "bg-blue-500 text-white"
            : "bg-white text-black hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => props.handleOptionClick("FATAL")}
      >
        FATALITIES
      </Button>
    </div>
  );
};

export default CrashSeverity;
