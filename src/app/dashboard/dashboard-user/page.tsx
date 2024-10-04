"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/dashboard/card";
import axios from "axios";
import BarangDashboardTable from "./table";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface Barang {
  id: number;
  nama_user: string;
  tanggal_request: string;
  status: string;
  nama_barang: string;
  jumlah: number;
  satuan: string;
  nama_brand: string;
}

const formSchema = z.object({
  barang_id: z.number().optional(),
  total_request: z.number().optional(),
});


const DashboardPage: React.FC = () => {
  const [barang, setBarang] = useState<Barang[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      total_request: 0,
      barang_id: 0,
    },
  });
  const fetchBarang = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://smpadang-main-production.up.railway.app/api/user/request",
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

  if (!barang) return <div>Tidak ada data</div>;
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem("token");
    toast.promise(
      axios
        .post(
          "https://smpadang-main-production.up.railway.app/api/user/request",
          {
            ...values,
            total_request: Number(values.total_request), 
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
    <div className="bg-white h-full w-full p-6 font-sans flex flex-col">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold underline">Dashboard</h1>
        <p className="text-xl">
          Selamat Datang di Sistem Inventory Aset SIPlah
        </p>
      </div>
      <div className="w-full flex justify-between">
        <p>Silahkan Request kebutuhan anda</p>

        <div className="px-4 py-3 rounded-full bg-[#A9D6FF]">Request Baru</div>
      
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex gap-2 cursor-pointer">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.8678 2.34973C7.52554 2.34973 2.37817 7.55006 2.37817 13.9576C2.37817 20.3652 7.52554 25.5655 13.8678 25.5655C20.2101 25.5655 25.3575 20.3652 25.3575 13.9576C25.3575 7.55006 20.2101 2.34973 13.8678 2.34973ZM18.4637 15.1184H15.0168V18.6008C15.0168 19.2392 14.4998 19.7616 13.8678 19.7616C13.2359 19.7616 12.7189 19.2392 12.7189 18.6008V15.1184H9.27196C8.64003 15.1184 8.123 14.596 8.123 13.9576C8.123 13.3192 8.64003 12.7968 9.27196 12.7968H12.7189V9.31446C12.7189 8.67603 13.2359 8.15367 13.8678 8.15367C14.4998 8.15367 15.0168 8.67603 15.0168 9.31446V12.7968H18.4637C19.0956 12.7968 19.6126 13.3192 19.6126 13.9576C19.6126 14.596 19.0956 15.1184 18.4637 15.1184Z"
                  fill="#1D1D1D"
                />
              </svg>
              <p className="font-bold underline">New Barang</p>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl  bg-[#D0D9EB]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-full flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="barang_id"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Masukan Barang</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(Number(value)); // Convert value to number
                        }}
                        value={field.value?.toString() || ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Barang" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {barang.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()} // Use ID as string for value
                            >
                              {item.nama_barang}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="total_request"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Jumlah</FormLabel>
                      <FormControl>
                        <input
                          type="number"
                          {...field}
                          className="w-full p-2 border border-gray-300 rounded"
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(Number(value)); // Convert input to number
                          }}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> 

                <DialogFooter className="">
                  <div className="w-full flex justify-center gap-4 ">
                    <button
                      type="submit"
                      className="px-8 py-2 bg-[#B9FF99] rounded-md font-sans font-bold"
                    >
                      Add
                    </button>
                    <DialogClose asChild>
                      <button
                        type="button"
                        className="px-6 py-2 bg-[#FFFCB6] rounded-md font-sans font-bold"
                      >
                        Close
                      </button>
                    </DialogClose>
                  </div>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        
      </div>
      <BarangDashboardTable data={barang} />
    </div>
  );
};

export default DashboardPage;
