"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import BarangDashboardTable from "./table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogTitle,
  DialogDescription,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

// Zod schema expecting numbers
const formSchema = z.object({
  barang_id: z.number().int().min(1, "Please select a valid barang ID"),
  jumlah: z.number().int().min(1, "Jumlah must be at least 1"),
});

const DashboardPage: React.FC = () => {
  const [request, setRequest] = useState<Barang[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [barang, setBarang] = useState<Barang[]>([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // State for the confirmation modal
  const [formValues, setFormValues] = useState<z.infer<typeof formSchema>>(); // State to hold form values

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fetchRequest = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/request`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      if (response.status === 200) {
        console.log("Response data from fetchRequest:", response.data.data);
        setRequest(response.data.data);
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

  const fetchBarang = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/barang`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      console.log("barang", response);
      if (response.status === 200) {
        console.log("Response data from fetchRequest:", response.data.data);
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

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    setFormValues(values);
    setIsConfirmationOpen(true);
  };

  const handleConfirmSubmit = async () => {
    if (!formValues) return;

    const token = localStorage.getItem("token");
    setIsConfirmationOpen(false); // Close the confirmation modal
    toast.promise(
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/request`,
          {
            barang_id: Number(formValues.barang_id), // Ensure barang_id is a number
            total_request: Number(formValues.jumlah), // Ensure jumlah is a number
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
          fetchRequest(); // Optionally, fetch the data again after submission
        })
        .catch((error) => {
          console.error("Error:", error);
          throw new Error("Add request failed. Please try again.");
        }),
      {
        loading: "Loading...",
        success: "Request added successfully!",
        error: "Add request failed. Please try again.",
      }
    );
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  useEffect(() => {
    fetchBarang();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white h-full w-full p-6 font-sans flex flex-col">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold underline">Dashboard</h1>
        <p className="text-xl">
          Selamat Datang di Sistem Inventory Aset SIPlah
        </p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex gap-2 cursor-pointer">
            <p className="font-bold underline">New Request</p>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl bg-[#D0D9EB]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="w-full flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="barang_id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Pilih Barang</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value)); // Convert to number
                      }}
                      value={field.value?.toString() || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih barang" />
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
                name="jumlah"
                render={({ field }) => (
                  <FormItem className="relative">
                    <p className="font-semibold text-lg translate-y-2">
                      Jumlah Request
                    </p>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          placeholder="Jumlah"
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="p-6 bg-[#C6DBE0] placeholder:text-xl placeholder:text-zinc-600 text-primary text-xl rounded-full"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-center gap-4">
                <button
                  type="submit"
                  className="px-8 py-2 bg-[#B9FF99] rounded-md font-sans font-bold"
                >
                  Request
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
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent className="bg-[#F1B9B9]">
          <DialogTitle>Konfirmasi Barang</DialogTitle>
          <DialogDescription>
            Pastikan nama barang sudah sesuai Pastikan kembali jumlah barang
            yang akan di request
          </DialogDescription>
          <DialogFooter>
            <div
              className="px-4 py-2 rounded-md bg-[#B9FF99]"
              onClick={handleConfirmSubmit}
            >
              Tambah Barang
            </div>
            <DialogClose asChild>
              <div className="px-4 py-2 rounded-md bg-[#FBF8B3]">Batal</div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BarangDashboardTable data={request} />
    </div>
  );
};

export default DashboardPage;
