interface CrashTypeProps {
  selectedOption: string;
  handleOptionClick: (option: string) => void;
}

const CrashType = (props: CrashTypeProps) => {
  return (
    <div className="flex flex-wrap">
      <button
        className={`flex-grow px-4 py-2 border rounded-l ${
          props.selectedOption === "CAR"
            ? "bg-blue-500 text-white focus:shadow-blue-900"
            : "bg-white hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => props.handleOptionClick("CAR")}
      >
        CAR
      </button>
      <button
        className={`flex-grow px-4 py-2 border ${
          props.selectedOption === "PEDESTRIANS"
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => props.handleOptionClick("PEDESTRIANS")}
      >
        PEDESTRIANS
      </button>
      <button
        className={`flex-grow px-4 py-2 border ${
          props.selectedOption === "BIKE"
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => props.handleOptionClick("BIKE")}
      >
        BIKE
      </button>
      <button
        className={`flex-grow px-4 py-2 border rounded-r ${
          props.selectedOption === "ALL"
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => props.handleOptionClick("ALL")}
      >
        ALL
      </button>
    </div>
  );
};

export default CrashType;
