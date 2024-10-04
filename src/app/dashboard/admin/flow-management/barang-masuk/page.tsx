"use client";

import BarangMasukTable from "@/components/dashboard/barang-masuk/table";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Item } from "@radix-ui/react-accordion";

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
  const [barang, setBarang] = useState<any[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jumlah: 0,
      barang_id: 0,
      // jumlah_stok:0,
    },
  });

  useEffect(() => {
    const fetchBarang = async () => {
      try {
        const token = localStorage.getItem("token");
        const [responseBarangIn, responseBarang] = await Promise.all([
          axios.get(
            "https://smpadang-main-production.up.railway.app/api/admin/barangin",
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
          setBarang(responseBarang.data.data);
        } else {
          console.error("Unexpected status code:", responseBarangIn.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBarang();
  }, []);

  console.log(barang);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://smpadang-main-production.up.railway.app/api/admin/barangin?id=${id}`,
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
                          const selectedBarang = barang.find((item) => item.id === Number(value));
                          field.onChange(Number(value)); // Convert value to number

                          // Update the jumlah field value when barang changes
                          if (selectedBarang) {
                            form.setValue("jumlah", selectedBarang.jumlah); // Set jumlah value to the selected barang's jumlah
                          }
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

                {/* Disabled form field to show jumlah */}
                <FormField
                  control={form.control}
                  name="jumlah"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Jumlah Masuk</FormLabel>
                      <FormControl>
                        <input
                          type="number"
                          {...field}
                          className="w-full p-2 border border-gray-300 rounded"
                          disabled
                          value={field.value || ""} // Display the jumlah value
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                

                <FormField
                  control={form.control}
                  name="jumlah"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Jumlah Masuk</FormLabel>
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
      {/* Render BarangMasukTable or other components here */}
      <BarangMasukTable data={barangIn} onDelete={handleDelete} />
    </div>
  );
};

export default UsersPage;
