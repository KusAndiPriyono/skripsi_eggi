"use client";

import BarangMasukTable from "@/components/dashboard/barang-masuk/table";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

interface Barang {
  id: number;
  nama_barang: string;
  nama_supplier: string;
  jumlah_keluar: number;
  satuan: string;
  jumlah: number;
  date: string;
  nama_brand: string;
}

const formSchema = z.object({
  barang_id: z.number().optional(),
  jumlah: z.number().optional(),
});

const UsersPage: React.FC = () => {
  const [barangIn, setBarangIn] = useState<Barang[]>([]);
  // const [barang, setBarang] = useState<any[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jumlah: 0,
      barang_id: 0,
    },
  });

  useEffect(() => {
    const fetchBarang = async () => {
      try {
        const token = localStorage.getItem("token");
        const [responseBarangIn, responseBarang] = await Promise.all([
          axios.get(
            "https://smpadang-main-production.up.railway.app/api/admin/barangout",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420",
              },
            }
          ),
          axios.get(
            "https://smpadang-main-production.up.railway.app/api/admin/barang",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420",
              },
            }
          ),
        ]);
        console.log("response", responseBarangIn);
        if (responseBarangIn.status === 200) {
          setBarangIn(responseBarangIn.data.data);
          // setBarang(responseBarang.data.data);
        } else {
          console.error("Unexpected status code:", responseBarangIn.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBarang();
  }, []);

  // console.log(barang);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://smpadang-main-production.up.railway.app/api/admin/barangout?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      setBarangIn(barangIn.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem("token");
    toast.promise(
      axios
        .post(
          "https://smpadang-main-production.up.railway.app/api/admin/barangin",
          {
            ...values,
            jumlah: Number(values.jumlah), 
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        )
        .then((response) => {
          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
          throw new Error("Add item failed. Please try again.");
        }),
      {
        loading: "Loading...",
        success: "Add item successful!",
        error: "Add item failed. Please try again.",
      }
    );
  };

  return (
    <div className="bg-white h-full w-full font-sans flex flex-col p-4">
      <div className="w-full flex justify-between items-center">
        <Link
          href={"/dashboard"}
          className="flex items-center justify-center gap-2"
        >
          <svg
            width="32"
            height="33"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.9748 14.1407H8.79205L13.4079 9.47738C13.8015 9.07968 13.9874 8.60528 13.9874 8.08444C13.9874 7.0912 13.1751 6.06567 11.9892 6.06567C11.4586 6.06567 10.9961 6.26048 10.6104 6.65111L2.65957 14.6838C2.33187 15.0148 1.99817 15.4236 1.99817 16.1595C1.99817 16.8953 2.27692 17.2496 2.64359 17.6201L10.6104 25.6678C10.9961 26.0585 11.4586 26.2533 11.9892 26.2533C13.1761 26.2533 13.9874 25.2278 13.9874 24.2345C13.9874 23.7137 13.8015 23.2393 13.4079 22.8416L8.79205 18.1782H27.9748C29.0778 18.1782 29.973 17.2738 29.973 16.1595C29.973 15.0451 29.0778 14.1407 27.9748 14.1407Z"
              fill="black"
            />
          </svg>
          <p className="font-bold">Dashboard</p>
        </Link>
        {}
      </div>
      {/* Render BarangMasukTable or other components here */}
      <BarangMasukTable data={barangIn} onDelete={handleDelete} />
    </div>
  );
};

export default UsersPage;
