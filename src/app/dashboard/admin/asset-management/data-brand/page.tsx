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
import { z } from 'zod';
import SatuanTable from '@/components/dashboard/data-satuan/table';
import BrandTable from '@/components/dashboard/data-brand/table';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';

interface Brand {
  id: number;
  nama: string;
}

const formSchema = z.object({
  nama: z.string().optional(),
});

const UsersPage: React.FC = () => {
  const [brand, setBrand] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: selectedBrand?.nama || '',
    },
  });

  // Fetch token from localStorage after the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
  }, []);

  // Fetch brands from the API after getting the token
  useEffect(() => {
    const fetchBarang = async () => {
      if (!token) return;

      try {
        const response = await axios.get(
          'https://smpadang-main-production.up.railway.app/api/admin/brand',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': '69420',
            },
          }
        );

        if (response.status === 200) {
          setBrand(response.data.data);
        } else {
          console.error('Unexpected status code:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBarang();
  }, [token]);

  const handleDelete = async (id: number) => {
    if (!token) return;
    try {
      await axios.delete(
        `https://smpadang-main-production.up.railway.app/api/admin/brand?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );
      setBrand(brand.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!token) return;

    toast.promise(
      axios
        .post(
          'https://smpadang-main-production.up.railway.app/api/admin/brand',
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': '69420',
            },
          }
        )
        .then((response) => {
          console.log('Response:', response.data);
          setBrand((prev) => [...prev, response.data]);
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
  };

  const handleUpdate = async (values: z.infer<typeof formSchema>) => {
    if (!selectedBrand?.id || !token) return;

    toast.promise(
      axios
        .put(
          `https://smpadang-main-production.up.railway.app/api/admin/brand?id=${selectedBrand.id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': '69420',
            },
          }
        )
        .then((response) => {
          console.log('Response:', response.data);
          setBrand((prev) =>
            prev.map((item) =>
              item.id === selectedBrand.id ? response.data : item
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
                  d='M13.8678 2.34973C7.52554 2.34973 2.37817 7.55006 2.37817 13.9576C2.37817 20.3652 7.52554 25.5655 13.8678 25.5655C20.2101 25.5655 25.3575 20.3652 25.3575 13.9576C25.3575 7.55006 20.2101 2.34973 13.8678 2.34973ZM18.4637 15.1184H15.0168V18.6008C15.0168 19.2392 14.4998 19.7616 13.8678 19.7616C13.2359 19.7616 12.7189 19.2392 12.7189 18.6008V15.1184H9.27196C8.64003 15.1184 8.123 14.596 8.123 13.9576C8.123 13.3192 8.64003 12.7968 9.27196 12.7968H12.7189V9.31442C12.7189 8.67506 13.2359 8.15266 13.8678 8.15266C14.4998 8.15266 15.0168 8.67506 15.0168 9.31442V12.7968H18.4637C19.0956 12.7968 19.6127 13.3192 19.6127 13.9576C19.6127 14.596 19.0956 15.1184 18.4637 15.1184Z'
                  fill='black'
                />
              </svg>
              <p className='font-bold'>Tambah</p>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogClose>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) => {
                    if (selectedBrand) {
                      handleUpdate(data);
                    } else {
                      handleSubmit(data);
                    }
                    setIsUpdateModalOpen(false);
                  })}
                >
                  <FormField
                    control={form.control}
                    name='nama'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                          <Input placeholder='Nama' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <button
                      type='button'
                      className='bg-red-600 text-white px-4 py-2 rounded-md'
                      onClick={() => setIsUpdateModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      className='bg-blue-600 text-white px-4 py-2 rounded-md'
                    >
                      {selectedBrand ? 'Update' : 'Add'}
                    </button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>

      <div className='mt-4'>
        <h1 className='font-bold text-xl'>Brand</h1>
        <BrandTable
          data={brand}
          onUpdate={setSelectedBrand}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default UsersPage;
