// src/app/dashboard/laporan/page.tsx
"use client";

import React, { useState } from 'react';
import DateRangePicker from '@/components/dashboard/laporan/datepicker';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DashboardPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<{ startDate: Date | null, endDate: Date | null }>({ startDate: null, endDate: null });
  const router = useRouter();

  const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
    setDateRange({ startDate, endDate });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handlePrint = async () => {
    if (dateRange.startDate && dateRange.endDate) {
      const formattedStartDate = formatDate(dateRange.startDate);
      const formattedEndDate = formatDate(dateRange.endDate);
      const url = `https://smpadang-main-production.up.railway.app/api/admin/laporan?start_date=${formattedStartDate}&end_date=${formattedEndDate}`;

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          },
          responseType: 'arraybuffer', // Ensure correct data format
        });
        
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = downloadUrl;
        a.download = 'laporan.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      console.error('Start date or end date is missing.');
    }
  };

  return (
    <div className="bg-white h-full w-full p-6 font-sans flex flex-col">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold underline">Dashboard</h1>
        <p className="text-xl">Selamat Datang di Sistem Inventory Aset SIPlah</p>
      </div>

      <div className='flex flex-col gap-6 mt-6'>
        <DateRangePicker
          onDateRangeChange={handleDateRangeChange}
          onPrint={handlePrint}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
