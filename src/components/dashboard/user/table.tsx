"use client";

import React, { useState } from "react";
import { edit, hapus } from "../../../../public/icons";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  nama: string;
  username: string;
  password: string;
  role: string;
}

interface TableProps {
  data: User[];
  onDelete: (id: number) => void;
  onUpdate: (user: User) => void;
}

const UserTable: React.FC<TableProps> = ({ data, onDelete, onUpdate }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setSelectedUserId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUserId !== null && onDelete) {
      onDelete(selectedUserId);
      setIsDeleteModalOpen(false);
    }
  };

  const handleUpdate = (user: User) => {
    if (onUpdate) {
      onUpdate(user);
    } else {
      console.error("onUpdate function is not provided");
    }
  };

  return (
    <div className="mt-10">
      <table className="min-w-full bg-white border rounded-xl">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              No
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Username
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Password
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Role
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="border-t">
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.nama}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{'*'.repeat(item.password.length)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.role}</td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                <button onClick={() => handleUpdate(item)}>
                  <Image src={edit} alt="edit" width={24} height={24} />
                </button>
                <button onClick={() => handleDelete(item.id)}>
                  <Image src={hapus} alt="delete" width={24} height={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog
        open={isDeleteModalOpen}
        onOpenChange={() => setIsDeleteModalOpen(false)}
      >
        <DialogContent>
          <DialogTitle>Konfirmasi Hapus</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak
            dapat dibatalkan.
          </DialogDescription>
          <DialogFooter>
            <Button variant="destructive" onClick={confirmDelete}>
              Hapus
            </Button>
            <DialogClose asChild>
              <Button variant="secondary">Batal</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserTable;
