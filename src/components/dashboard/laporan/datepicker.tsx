"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void;
  onPrint: () => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateRangeChange, onPrint }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const today = new Date();

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    onDateRangeChange(date, endDate);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    onDateRangeChange(startDate, date);
  };

  return (
    <div className="flex flex-col gap-6">
      <label className="text-lg">Silahkan pilih tanggal untuk data yang dibutuhkan.</label>
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="start-date" className="text-md font-semibold">Dari Tanggal</label>
          <DatePicker
            id="start-date"
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="yyyy-MM-dd"
            className="px-4 py-2 border rounded-md"
            placeholderText="Pilih Tanggal"
            maxDate={today} // Disable dates after today
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="end-date" className="text-md font-semibold">Hingga Tanggal</label>
          <DatePicker
            id="end-date"
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="yyyy-MM-dd"
            className="px-4 py-2 border rounded-md"
            placeholderText="Pilih Tanggal"
            maxDate={today} // Disable dates after today
            minDate={startDate ?? undefined} // Disable dates before startDate
          />
        </div>
        <button
          onClick={onPrint}
          className="bg-green-200 text-black font-semibold px-4 py-2 rounded-md mt-6"
        >
          PRINT
        </button>
      </div>
    </div>
  );
};

export default DateRangePicker;
