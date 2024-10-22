import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { DateRange } from "react-day-picker";

interface MyDatePickerProps {
  setCheckIn: (date: Date | undefined) => void;
  setCheckOut: (date: Date | undefined) => void;
  // setShowDatePicker:React.Dispatch<React.SetStateAction<boolean>>
}

function MyDatePicker({ setCheckIn, setCheckOut }: MyDatePickerProps) {
  const [range, setRange] = useState<DateRange | undefined>(undefined);


  const handleSelect = (selectedRange: DateRange | undefined) => {
    setRange(selectedRange)
    if (selectedRange?.from) {
      setCheckIn(selectedRange.from)
    }
    if (selectedRange?.to) {
      setCheckOut(selectedRange.to)
    }
  };

  return (
    <div className="">
      <DayPicker
        mode="range"
        selected={range}
        onSelect={handleSelect}
        numberOfMonths={2}
        disabled={{ before: new Date() }}
      />
    </div>
  );
}

export default MyDatePicker;