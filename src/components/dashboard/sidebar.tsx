/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Home, Calculator } from "lucide-react"; // Import the required icons
import MenuLink from "./navigation-menu";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  assetManagement,
  flowManegement,
  home,
  logout,
  report,
  user,
} from "../../../public/icons";

interface MenuItem {
  title: string;
  route?: string;
  icon: React.ReactNode;
  subtitle?: {
    title: string;
    route: string;
    icon: React.ReactNode;
  }[];
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: <Image src={home} alt="home" width={32} height={32} />,
  },
  {
    title: "User",
    route: "/dashboard/user",
    icon: <Image src={user} alt="home" width={32} height={32} />,
  },
  {
    route: "/dashboard",
    title: "Asset Management",
    icon: <Image src={assetManagement} alt="home" width={32} height={32} />,
    subtitle: [
      {
        title: "Data Barang",
        route: "/dashboard/asset-management/data-barang",
        icon: <Calculator size={20} />,
      },
      {
        title: "Data Brand",
        route: "/dashboard/asset-management/data-brand",
        icon: <Calculator size={20} />,
      },
      {
        title: "Data Satuan",
        route: "/dashboard/asset-management/data-satuan",
        icon: <Calculator size={20} />,
      },
      {
        title: "Data Supplier",
        route: "/dashboard/asset-management/data-supplier",
        icon: <Calculator size={20} />,
      },
    ],
  },
  {
    title: "Flow Management",
    icon: <Image src={flowManegement} alt="home" width={32} height={32} />,

    subtitle: [
      {
        title: "Barang Masuk",
        route: "/dashboard/flow-management/barang-masuk",
        icon: <Calculator size={20} />,
      },
      {
        title: "Barang Keluar",
        route: "/dashboard/flow-management/barang-keluar",
        icon: <Calculator size={20} />,
      },
    ],
  },
  {
    title: "Laporan",
    route: "/dashboard/laporan",
    icon: <Image src={report} alt="home" width={32} height={32} />,
  },
];

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear localStorage and cookies
    localStorage.removeItem("token");
    localStorage.removeItem("nama");
    localStorage.removeItem("username");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    document.cookie =
      "role_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";

    // Redirect to sign-in page
    router.push("/sign-in");
  };
  return (
    <div className="h-full relative">
      <div className="flex flex-col gap-6 justify-center items-center h-full">
        <h1 className="text-2xl font-semibold">SMKS Era Pembangunan</h1>

        <div className="max-w-max">
          <img
            src="/logo/logo-transparent.webp"
            alt="logo"
            className="h-[30vh] w-auto"
          />
        </div>

        <div className="bg-white w-full overflow-y-auto p-6 h-full rounded-xl">
          <Accordion type="multiple" className="animate-none ">
            {menuItems.map((item) => (
              <AccordionItem value={item.title} key={item.title}>
                {item.subtitle ? (
                  <AccordionTrigger>
                    <div className="flex items-center space-x-2 cursor-pointer text-base font-semibold w-full px-4">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                  </AccordionTrigger>
                ) : (
                  <MenuLink item={item} />
                )}

                {item.subtitle && (
                  <AccordionContent>
                    <div className="ml-6 space-y-2">
                      {item.subtitle.map((subItem) => (
                        <MenuLink key={subItem.title} item={subItem} />
                      ))}
                    </div>
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
            <button type="submit" className="flex gap-2 mt-4 ml-[12px]" onClick={handleLogout}>
              <Image src={logout} alt="home" width={32} height={32} />, Logout
            </button>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
