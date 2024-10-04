'use client';

import BarangTable from '@/components/dashboard/data-barang/table';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';

interface Barang {
  id: number;
  nama_barang: string;
  brand: number;
  satuan: number;
  supplier?: number;
}

interface Brand {
  id: number;
  nama: string;
}

interface Satuan {
  id: number;
  nama: string;
}

interface Supplier {
  id: number;
  nama_supplier: string;
  alamat: string;
  nomor_kontak: string;
}

const formSchema = z.object({
  nama_barang: z.string().optional(),
  brand: z.number().optional(),
  supplier: z.number().optional(),
  satuan: z.number().optional(),
});

const UsersPage: React.FC = () => {
  const [barang, setBarang] = useState<Barang[]>([]);
  const [brand, setBrand] = useState<Brand[]>([]);
  const [satuan, setSatuan] = useState<Satuan[]>([]);
  const [supplier, setSupplier] = useState<Supplier[]>([]);

  const [selectedBarang, setSelectedBarang] = useState<Barang | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_barang: '',
      brand: undefined,
      satuan: undefined,
      supplier: undefined,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [
          responseBarang,
          responseBrand,
          responseSatuan,
          responseSupplier,
        ] = await Promise.all([
          axios.get(
            'https://smpadang-main-production.up.railway.app/api/admin/barang',
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'ngrok-skip-browser-warning': '69420',
              },
            }
          ),
          axios.get(
            'https://smpadang-main-production.up.railway.app/api/admin/brand',
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'ngrok-skip-browser-warning': '69420',
              },
            }
          ),
          axios.get(
            'https://smpadang-main-production.up.railway.app/api/admin/satuan',
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'ngrok-skip-browser-warning': '69420',
              },
            }
          ),
          axios.get(
            'https://smpadang-main-production.up.railway.app/api/admin/supplier',
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'ngrok-skip-browser-warning': '69420',
              },
            }
          ),
        ]);

        if (responseBarang.status === 200) {
          setBarang(responseBarang.data.data);
          setBrand(responseBrand.data.data);
          setSatuan(responseSatuan.data.data);
          setSupplier(responseSupplier.data.data);
        } else {
          console.error('Unexpected status code:', responseBarang.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `https://smpadang-main-production.up.railway.app/api/admin/barang?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );
      setBarang(barang.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem('token');
    toast.promise(
      axios
        .post(
          'https://smpadang-main-production.up.railway.app/api/admin/barang',
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': '69420',
            },
          }
        )
        .then((response) => {
          setBarang((prev) => [...prev, response.data.data]);
        })
        .catch((error) => {
          console.error('Error:', error);
          throw new Error('Add supplier failed. Please try again.');
        }),
      {
        loading: 'Loading...',
        success: 'Add supplier successful!',
        error: 'Add supplier failed. Please try again.',
      }
    );
    form.reset(); // Reset form after successful submission
  };

  const handleUpdate = async (values: z.infer<typeof formSchema>) => {
    if (!selectedBarang?.id) return;

    const token = localStorage.getItem('token');
    toast.promise(
      axios
        .put(
          `https://smpadang-main-production.up.railway.app/api/admin/barang?id=${selectedBarang.id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': '69420',
            },
          }
        )
        .then((response) => {
          setBarang((prev) =>
            prev.map((item) =>
              item.id === selectedBarang.id ? response.data.data : item
            )
          );
        })
        .catch((error) => {
          console.error('Error:', error);
          throw new Error('Update failed. Please try again.');
        }),
      {
        loading: 'Loading...',
        success: 'Update Supplier successful!',
        error: 'Update supplier failed. Please try again.',
      }
    );

    setIsUpdateModalOpen(false); // Close modal after update
    form.reset(); // Reset form after successful update
  };

  useEffect(() => {
    if (selectedBarang) {
      form.reset({
        nama_barang: selectedBarang.nama_barang,
        brand: selectedBarang.brand,
        satuan: selectedBarang.satuan,
        supplier: selectedBarang.supplier,
      });
    }
  }, [form, selectedBarang]);

  return (
    <div className='bg-white h-full w-full font-sans flex flex-col p-4'>
      <div className='w-full flex justify-between items-center'>
        <Link
          href={'/dashboard'}
          className='flex items-center justify-center gap-2'
        >
          <p className='font-bold'>Dashboard</p>
        </Link>

        <Dialog>
          <DialogTrigger asChild>
            <div className='flex gap-2 cursor-pointer'>
              <p className='font-bold underline'>New Brand</p>
            </div>
          </DialogTrigger>
          <DialogContent className='sm:max-w-2xl bg-[#D0D9EB]'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='w-full flex flex-col gap-4'
              >
                <FormField
                  control={form.control}
                  name='nama_barang'
                  render={({ field }) => (
                    <FormItem className='relative'>
                      <p className='font-semibold text-lg translate-y-2'>
                        Nama Barang
                      </p>
                      <FormControl>
                        <div className='relative flex items-center'>
                          <Input
                            placeholder='Name'
                            type='text'
                            {...field}
                            className='p-6 bg-[#C6DBE0] placeholder:text-xl placeholder:text-zinc-600 text-primary text-xl rounded-full'
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='brand'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Masukan Brand</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(Number(value)); // Convert to number
                        }}
                        value={field.value?.toString() || ''}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Pilih brand' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {brand.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()} // Use ID as string for value
                            >
                              {item.nama}
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
                  name='satuan'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Masukan Satuan</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(Number(value)); // Convert to number
                        }}
                        value={field.value?.toString() || ''}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Pilih Satuan' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {satuan.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()} // Use ID as string for value
                            >
                              {item.nama}
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
                  name='supplier'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Masukan Supplier</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(Number(value)); // Convert to number
                        }}
                        value={field.value?.toString() || ''}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Pilih Supplier' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {supplier.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()} // Use ID as string for value
                            >
                              {item.nama_supplier}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='flex justify-between mt-4'>
                  <button
                    type='button'
                    className='bg-red-500 text-white py-2 px-4 rounded'
                    onClick={() => setIsUpdateModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='bg-green-500 text-white py-2 px-4 rounded'
                  >
                    Save
                  </button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <BarangTable
        data={barang}
        onUpdate={(item: Barang) => {
          setSelectedBarang(item);
          setIsUpdateModalOpen(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UsersPage;
