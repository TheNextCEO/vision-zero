interface CrashTypeProps {
  selectedOption: string;
  handleOptionClick: (option: string) => void;
}
import { Button } from "@/components/ui/button";

const CrashSeverity = (props: CrashTypeProps) => {
  return (
    <div className="flex flex-wrap gap-1">
      <Button
        className={`flex ${
          props.selectedOption === "INJURY"
            ? "bg-blue-500 text-white"
            : "bg-white text-black hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => props.handleOptionClick("INJURY")}
      >
        INJURY
      </Button>
      <Button
        className={`flex ${
          props.selectedOption === "FATAL"
            ? "bg-blue-500 text-white"
            : "bg-white text-black hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => props.handleOptionClick("FATAL")}
      >
        FATAL
      </Button>
      <Button
        className={`flex ${
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

export default CrashSeverity;
