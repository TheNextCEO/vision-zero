interface CrashTypeProps {
  selectedOption: string;
  handleOptionClick: (option: string) => void;
}

const CrashSeverity = (props: CrashTypeProps) => {
  return (
    <div className="flex flex-wrap">
      <button
        className={`flex-grow px-4 py-2 border rounded-l ${
          props.selectedOption === "CRASHES"
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => props.handleOptionClick("CRASHES")}
      >
        CRASHES
      </button>
      <button
        className={`flex-grow px-4 py-2 border rounded-r ${
          props.selectedOption === "FATALITIES"
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => props.handleOptionClick("FATALITIES")}
      >
        FATALITIES
      </button>
    </div>
  );
};

export default CrashSeverity;
