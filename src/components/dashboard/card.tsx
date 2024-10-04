import { Home } from "lucide-react";
import Image from "next/image";
import React from "react";
import { barang, keluar, masuk, toko, user } from "../../../public/icons";
import Link from "next/link";

const DashboardCard = [
  {
    title: "Data User",
    icon: <Image src={user} alt="home" width={32} height={32} />,

    color: "#C7FFFF",
    href: "/dashboard/user",
  },
  {
    title: "Data Barang",
    icon: <Image src={barang} alt="home" width={32} height={32} />,
    color: "#FBE9DC",
    href: "/dashboard/asset-management/data-barang",
  },
  {
    title: "Data Supplier",
    icon: <Image src={toko} alt="home" width={32} height={32} />,

    color: "#E9E1B6",
    href: "/dashboard/asset-management/data-supplier",
  },
  {
    title: "Barang Masuk",
    icon: <Image src={masuk} alt="home" width={32} height={32} />,
    color: "#BAEBB3",
    href: "/dashboard/flow-management/barang-masuk",
  },
  {
    title: "Barang Keluar",
    icon: <Image src={keluar} alt="home" width={32} height={32} />,
    color: "#F0C1C1",
    href: "/dashboard/flow-management/barang-keluar",
  },
];

function Card() {
  return (
    <div className="grid grid-cols-5 gap-4 mt-4">
      {DashboardCard.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className="flex gap-2 p-4 rounded-xl text-2xl items-center justify-center"
          style={{ backgroundColor: item.color }}
        >
          {item.title}
          {item.icon}
        </Link>
      ))}
    </div>
  );
}

export default Card;
