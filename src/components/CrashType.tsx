interface CrashTypeProps {
  selectedOption: string;
  handleOptionClick: (option: string) => void;
}

const CrashType = ({ selectedOption, handleOptionClick }: any) => {
  return (
    <div className="flex flex-wrap">
      <button
        className={`flex-grow px-4 py-2 border rounded-l ${
          selectedOption === "CAR"
            ? "bg-blue-500 text-white focus:shadow-blue-900"
            : "bg-white hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => handleOptionClick("CAR")}
      >
        CAR
      </button>
      <button
        className={`flex-grow px-4 py-2 border ${
          selectedOption === "PEDESTRIAN"
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => handleOptionClick("PEDESTRIAN")}
      >
        PEDESTRIANS
      </button>
      <button
        className={`flex-grow px-4 py-2 border ${
          selectedOption === "BICYCLIST"
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => handleOptionClick("BICYCLIST")}
      >
        BIKE
      </button>
      <button
        className={`flex-grow px-4 py-2 border rounded-r ${
          selectedOption === "ALL"
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => handleOptionClick("ALL")}
      >
        ALL
      </button>
    </div>
  );
};

export default CrashType;
