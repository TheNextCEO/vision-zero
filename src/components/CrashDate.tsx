interface CrashDateProps {
  toDate: Date;
  fromDate: Date;
  handleToDateChange: (date: Date) => void;
  handleFromDateChange: (date: Date) => void;
}

const CrashDate = (props: CrashDateProps) => {
  console.log();

  return (
    <div className="flex flex-col">
      <label htmlFor="from_date" className="font-bold mb-2">
        FROM DATE:
      </label>
      <input
        type="date"
        value={props.toDate.toISOString().substr(0, 10)}
        onChange={(event) =>
          props.handleToDateChange(new Date(event.target.value))
        }
        className="border rounded px-2 py-2 mb-2"
      />
      <label htmlFor="to_date" className="font-bold mb-2">
        TO DATE:
      </label>
      <input
        type="date"
        value={props.fromDate.toISOString().substr(0, 10)}
        onChange={(event) =>
          props.handleFromDateChange(new Date(event.target.value))
        }
        className="border rounded px-2 py-2"
      />
    </div>
  );
};

export default CrashDate;
