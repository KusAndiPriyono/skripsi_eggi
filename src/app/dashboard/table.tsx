"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { accept, reject } from "../../../public/icons";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Barang {
  id: number;
  nama_user: string;
  tanggal_request: string;
  status: string;
  nama_barang: string;
  jumlah: number;
  satuan: string;
}

interface TableProps {
  data: Barang[];
  fetchBarang: () => void;
}

const BarangDashboardTable: React.FC<TableProps> = ({ data, fetchBarang }) => {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleApprove = (id: number) => {
    const token = localStorage.getItem("token");

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/request/approve-reject?id=${id}&status=1`,
        { status: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((response) => {
        console.log("Approve response:", response.data);
        fetchBarang(); // Refresh data after approval
      })
      .catch((error) => {
        const backendMessage = error.response?.data?.message || "Approve error";
        setErrorMessage(backendMessage);
        setIsErrorModalOpen(true);
        console.error("Approve error:", backendMessage);
      });
  };

  const handleReject = (id: number) => {
    const token = localStorage.getItem("token");

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/request/approve-reject?id=${id}&status=2`,
        { status: 2 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((response) => {
        console.log("Reject response:", response.data);
        fetchBarang(); // Refresh data after rejection
      })
      .catch((error) => {
        const backendMessage = error.response?.data?.message || "Reject error";
        setErrorMessage(backendMessage);
        setIsErrorModalOpen(true);
        console.error("Reject error:", backendMessage);
      });
  };

  return (
    <div className="mt-10">
      <table className="min-w-full bg-white border rounded-xl">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">ID</th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">Tanggal Request</th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">Nama User</th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">Nama Barang</th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">Jumlah</th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">Satuan</th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="border-t">
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.tanggal_request}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.nama_user}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.nama_barang}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.jumlah}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.satuan}</td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                <button onClick={() => handleApprove(item.id)}>
                  <Image src={accept} alt="approve" width={24} height={24} />
                </button>
                <button onClick={() => handleReject(item.id)}>
                  <Image src={reject} alt="reject" width={24} height={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Error Modal */}
      <Dialog open={isErrorModalOpen} onOpenChange={() => setIsErrorModalOpen(false)}>
        <DialogContent>
          <DialogTitle>Error</DialogTitle>
          <DialogDescription>{errorMessage}</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="secondary"
                onClick={() => {
                  setIsErrorModalOpen(false);
                  fetchBarang(); // Call fetchBarang after closing the modal
                }}
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default BarangDashboardTable;
