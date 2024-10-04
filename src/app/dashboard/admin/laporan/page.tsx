import DateRangePicker from '@/components/dashboard/laporan/datepicker';
import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="bg-white h-full w-full p-6 font-sans flex flex-col">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold underline">Dashboard</h1>
        <p className="text-xl">
          Selamat Datang di Sistem Inventory Aset SIPlah
        </p>
      </div>

      <div className='flex flex-col gap-6 mt-6'>
        <DateRangePicker 
          onDateRangeChange={(startDate, endDate) => {
            console.log('Date range changed:', startDate, endDate);
          }} 
          onPrint={() => {
            console.log('Print action triggered');
          }} 
        />
      </div>
    </div>
  );
};

export default DashboardPage;
