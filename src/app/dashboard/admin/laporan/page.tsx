'use client';

import DateRangePicker from '@/components/dashboard/laporan/datepicker';
import React, { useEffect, useState } from 'react';

const DashboardPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const saveToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken); // Update the state
  };

  return (
    <div className='bg-white h-full w-full p-6 font-sans flex flex-col'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold underline'>Dashboard</h1>
        <p className='text-xl'>
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
      {/* Optionally display the current token */}
      {token && <p>Current Token: {token}</p>}
    </div>
  );
};

export default DashboardPage;
