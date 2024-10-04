'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { z } from 'zod';
import UserTable from '@/components/dashboard/user/table';
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
import { toast } from 'react-hot-toast';

interface User {
  id: number;
  nama: string;
  username: string;
  password: string;
  role: string;
}

const formSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  role: z.number().nonnegative(),
});

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
      role: 0,
    },
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      form.reset({
        name: selectedUser.nama,
        username: selectedUser.username,
        password: selectedUser.password,
        role: selectedUser.role === 'admin' ? 1 : 2,
      });
    }
  }, [form, selectedUser]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://smpadang-main-production.up.railway.app/api/admin/user',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );
      if (response.status === 200) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `https://smpadang-main-production.up.railway.app/api/admin/user?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user. Please try again.');
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'https://smpadang-main-production.up.railway.app/api/admin/user',
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );
      if (response.status === 201) {
        fetchUsers(); // Refresh user list
        toast.success('User added successfully!');
        setIsAddUserModalOpen(false); // Close modal
      }
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Add user failed. Please try again.');
    }
  };

  const handleUpdate = async (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `https://smpadang-main-production.up.railway.app/api/admin/user?id=${selectedUser?.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );
      if (response.status === 200) {
        fetchUsers(); // Refresh user list
        toast.success('User updated successfully!');
        setSelectedUser(null); // Clear selected user
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Update user failed. Please try again.');
    }
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

        <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
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
                  d='M13.8678 2.34973C7.52554 2.34973 2.37817 7.55006 2.37817 13.9576C2.37817 20.3652 7.52554 25.5655 13.8678 25.5655C20.2101 25.5655 25.3575 20.3652 25.3575 13.9576C25.3575 7.55006 20.2101 2.34973 13.8678 2.34973ZM18.4637 15.1184H15.0168V18.6008C15.0168 19.2392 14.4998 19.7616 13.8678 19.7616C13.2359 19.7616 12.7189 19.2392 12.7189 18.6008V15.1184H9.27207C8.64009 15.1184 8.12314 14.596 8.12314 13.9576C8.12314 13.3192 8.64009 12.7968 9.27207 12.7968H12.7189V9.31546C12.7189 8.67613 13.2359 8.15376 13.8678 8.15376C14.4998 8.15376 15.0168 8.67613 15.0168 9.31546V12.7968H18.4637C19.0957 12.7968 19.6126 13.3192 19.6126 13.9576C19.6126 14.596 19.0957 15.1184 18.4637 15.1184Z'
                  fill='black'
                />
              </svg>
              <p className='font-semibold'>Add User</p>
            </div>
          </DialogTrigger>
          <DialogContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(
                  selectedUser ? handleUpdate : handleSubmit
                )}
                className='flex flex-col space-y-4'
              >
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter username' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter password'
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select {...field} value={String(field.value)}>
                        <SelectTrigger>
                          <SelectValue placeholder='Select role' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='1'>Admin</SelectItem>
                          <SelectItem value='2'>User</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button type='submit' className='btn'>
                  {selectedUser ? 'Update User' : 'Add User'}
                </button>
                <DialogClose asChild>
                  <button type='button' className='btn'>
                    Close
                  </button>
                </DialogClose>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <UserTable
        data={users}
        onUpdate={setSelectedUser}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UsersPage;
