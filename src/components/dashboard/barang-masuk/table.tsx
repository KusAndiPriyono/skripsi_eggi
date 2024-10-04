"use client";

import React from "react";

interface Barang {
  id: number;
  nama_barang: string;
  nama_supplier: string;
  jumlah_keluar: number;
  satuan: string;
  date: string;
  nama_brand: string;
}

interface TableProps {
  data: Barang[];
  onDelete: (id: number) => void;
}

const BarangMasukTable: React.FC<TableProps> = ({ data, onDelete }) => {
  const handleDelete = (id: number) => {
    if (onDelete) {
      onDelete(id);
    } else {
      console.error("onDelete function is not provided");
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
              Tanggal
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Nama Barang
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Nama Brand
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Nama Supplier
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Jumlah Barang Masuk
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Satuan
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item.id} className="border-t">
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.nama_barang}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.nama_brand}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.nama_supplier}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.jumlah_keluar}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.satuan}</td>
              <td className="px-6 py-4 whitespace-nowrap flex">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 mx-2"
                >
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.1359 20.9177H4.46546C3.23335 20.9177 2.22974 20.0237 2.22974 18.9262V5.06177H18.3697V18.9262C18.3715 20.0237 17.3679 20.9177 16.1358 20.9177H16.1359ZM6.54047 18.2097C6.04504 18.2097 5.6411 17.8498 5.6411 17.4085V7.63474C5.6411 7.19343 6.04504 6.8336 6.54047 6.8336C7.03773 6.8336 7.43984 7.19343 7.43984 7.63474V17.4069C7.44168 17.8498 7.0376 18.2097 6.54047 18.2097ZM10.3008 18.2097C9.80547 18.2097 9.40139 17.8498 9.40139 17.4085V7.63474C9.40139 7.19343 9.80534 6.8336 10.3008 6.8336C10.798 6.8336 11.2001 7.19343 11.2001 7.63474V17.4069C11.2001 17.8498 10.7979 18.2097 10.3008 18.2097ZM14.061 18.2097C13.5656 18.2097 13.1617 17.8498 13.1617 17.4085V7.63474C13.1617 7.19343 13.5656 6.8336 14.061 6.8336C14.5565 6.8336 14.9604 7.19343 14.9604 7.63474V17.4069C14.9604 17.8498 14.5563 18.2097 14.0609 18.2097H14.061Z"
                      fill="#FF0000"
                      fill-opacity="0.81"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M20.0424 4.59286H0.558897C0.412666 4.59286 0.295654 4.48863 0.295654 4.35837V2.95305C0.295654 2.71199 0.51691 2.51501 0.787392 2.51501H19.8139C20.0845 2.51501 20.3057 2.71211 20.3057 2.95305V4.35837C20.3057 4.48863 20.1868 4.59286 20.0424 4.59286Z"
                      fill="#FF0000"
                      fill-opacity="0.81"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.8507 2.98556H7.75055C7.60432 2.98556 7.4873 2.88133 7.4873 2.75107V1.34575C7.4873 1.10469 7.70856 0.907715 7.97904 0.907715H12.6241C12.8947 0.907715 13.1158 1.10481 13.1158 1.34575V2.75107C13.114 2.87968 12.997 2.98556 12.8507 2.98556Z"
                      fill="#FF0000"
                      fill-opacity="0.81"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BarangMasukTable;
