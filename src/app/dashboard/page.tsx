"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/dashboard/card";
import axios from "axios";
import BarangDashboardTable from "./table";

interface Barang {
  id: number;
  nama_user: string;
  tanggal_request: string;
  status: string;
  nama_barang: string;
  jumlah: number;
  satuan: string;
}

const DashboardPage: React.FC = () => {
  const [barang, setBarang] = useState<Barang[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBarang = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/request`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      if (response.status === 200) {
        console.log("Response data from fetchBarang:", response.data.data);
        setBarang(response.data.data);
      } else {
        console.error("Unexpected status code:", response.status);
      }
    } catch (error) {
      setError("Error fetching data. Please try again later.");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBarang();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  // if (!barang) return <div>Tidak ada data</div>;

  return (
    <div className="bg-white h-full w-full p-6 font-sans flex flex-col">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold underline">Dashboard</h1>
        <p className="text-xl">
          Selamat Datang di Sistem Inventory Aset SIPlah
        </p>
      </div>
      <Card />

      {barang ? (
        <BarangDashboardTable data={barang} fetchBarang={fetchBarang} />
      ) : (
        <div className="w-full h-full mt-24 flex justify-center items-center">
          <p>Tidak ada data</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
