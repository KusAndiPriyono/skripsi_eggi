'use client';

import BarangTable from '@/components/dashboard/data-barang/table';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import SatuanTable from '@/components/dashboard/data-satuan/table';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';

interface Satuan {
  id: number;
  nama: string;
}

const formSchema = z.object({
  nama: z.string().optional(),
});

const UsersPage: React.FC = () => {
  const [satuan, setSatuan] = useState<Satuan[]>([]);
  const [selectedSatuan, setSelectedSatuan] = useState<Satuan | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: selectedSatuan?.nama || '',
    },
  });

  useEffect(() => {
    if (selectedSatuan) {
      form.reset({
        nama: selectedSatuan.nama,
      });
    }
  }, [form, selectedSatuan]);

  const fetchBarang = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/satuan`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );
      if (response.status === 200) {
        console.log('Response data from fetchBarang:', response.data.data);
        setSatuan(response.data.data);
      } else {
        console.error('Unexpected status code:', response.status);
        toast.error('Failed to fetch data.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching data. Please try again.');
    }
  };

  useEffect(() => {
    fetchBarang(); // Fetch data on client-side
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/satuan?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );
      toast.success('Delete successful!');
      fetchBarang(); // Refetch data after delete
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Delete failed. Please try again.');
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem('token');
    toast.promise(
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/satuan`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420',
          },
        })
        .then(() => {
          fetchBarang(); // Refetch data after submit
        }),
      {
        loading: 'Loading...',
        success: 'Add supplier successful!',
        error: 'Add supplier failed. Please try again.',
      }
    );
  };

  const handleUpdate = async (values: z.infer<typeof formSchema>) => {
    if (!selectedSatuan?.id) return;

    const token = localStorage.getItem('token');
    toast.promise(
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admin/satuan?id=${selectedSatuan.id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': '69420',
            },
          }
        )
        .then(() => {
          fetchBarang(); // Refetch data after update
        }),
      {
        loading: 'Loading...',
        success: 'Update Supplier successful!',
        error: 'Update supplier failed. Please try again.',
      }
    );
  };

  return (
    <div className='bg-white h-full w-full font-sans flex flex-col p-4'>
      <div className='w-full flex justify-between items-center'>
        <Link
          href={'/dashboard'}
          className='flex items-center justify-center gap-2'
        >
          <svg
            width='32'
            height='33'
            viewBox='0 0 32 33'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M27.9748 14.1407H8.79205L13.4079 9.47738C13.8015 9.07968 13.9874 8.60528 13.9874 8.08444C13.9874 7.0912 13.1751 6.06567 11.9892 6.06567C11.4586 6.06567 10.9961 6.26048 10.6104 6.65111L2.65957 14.6838C2.33187 15.0148 1.99817 15.4236 1.99817 16.1595C1.99817 16.8953 2.27692 17.2496 2.64359 17.6201L10.6104 25.6678C10.9961 26.0585 11.4586 26.2533 11.9892 26.2533C13.1761 26.2533 13.9874 25.2278 13.9874 24.2345C13.9874 23.7137 13.8015 23.2393 13.4079 22.8416L8.79205 18.1782H27.9748C29.0778 18.1782 29.973 17.2738 29.973 16.1595C29.973 15.0451 29.0778 14.1407 27.9748 14.1407Z'
              fill='black'
            />
          </svg>
          <p className='font-bold'>Dashboard</p>
        </Link>

        <Dialog>
          <DialogTrigger asChild>
            <div className='flex gap-2 cursor-pointer'>
              <svg
                width='28'
                height='28'
                viewBox='0 0 28 28'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M13.8678 2.34973C7.52554 2.34973 2.37817 7.55006 2.37817 13.9576C2.37817 20.3652 7.52554 25.5655 13.8678 25.5655C20.2101 25.5655 25.3575 20.3652 25.3575 13.9576C25.3575 7.55006 20.2101 2.34973 13.8678 2.34973ZM18.4637 15.1184H15.0168V18.6008C15.0168 19.1545 14.6024 19.5694 14.0619 19.5694C13.5215 19.5694 13.1071 19.1545 13.1071 18.6008V15.1184H9.6629C9.11609 15.1184 8.70142 14.7046 8.70142 14.1643C8.70142 13.6239 9.11609 13.2091 9.6629 13.2091H13.1071V9.7853C13.1071 9.23063 13.5215 8.81577 14.0619 8.81577C14.6024 8.81577 15.0168 9.23063 15.0168 9.7853V13.2091H18.4637C19.0095 13.2091 19.4239 13.6239 19.4239 14.1643C19.4239 14.7046 19.0095 15.1184 18.4637 15.1184Z'
                  fill='black'
                />
              </svg>
              <p className='font-bold'>Tambah Satuan</p>
            </div>
          </DialogTrigger>
          <DialogContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='flex flex-col gap-2'
              >
                <FormField
                  control={form.control}
                  name='nama'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Satuan</FormLabel>
                      <FormControl>
                        <Input placeholder='Nama Satuan' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <button
                      type='button'
                      className='w-full rounded bg-red-500 px-4 py-2 text-white'
                    >
                      Batal
                    </button>
                  </DialogClose>
                  <button
                    type='submit'
                    className='w-full rounded bg-blue-500 px-4 py-2 text-white'
                  >
                    Simpan
                  </button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <SatuanTable
        data={satuan}
        onUpdate={(satuan) => {
          setSelectedSatuan(satuan);
          setIsUpdateModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      {/* Modal untuk update */}
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdate)}
              className='flex flex-col gap-2'
            >
              <FormField
                control={form.control}
                name='nama'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Satuan</FormLabel>
                    <FormControl>
                      <Input placeholder='Nama Satuan' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <button
                    type='button'
                    className='w-full rounded bg-red-500 px-4 py-2 text-white'
                  >
                    Batal
                  </button>
                </DialogClose>
                <button
                  type='submit'
                  className='w-full rounded bg-blue-500 px-4 py-2 text-white'
                >
                  Simpan
                </button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
