import React from "react";

interface TableData {
  id: number;
  nama_barang: string;
  nama_supplier: string;
  jumlah_keluar: number;
  satuan: string;
  date: String;
  nama_brand: string;
  nama_user: string;
}

interface TableProps {
  data: TableData[];
}

const BarangKeluarTable: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="mt-10 ">
      <table className="min-w-full bg-white border rounded-xl">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              NO
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Tanggal Keluar
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Nama User
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Nama Barang
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Brand
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Jumlah
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Satuan
            </th>
            
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item.id} className="border-t">
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.nama_user}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.nama_barang}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.nama_brand}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.jumlah_keluar}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.satuan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BarangKeluarTable;
