import React from "react";
import { useEffect, useState } from 'react';

function DashboardHeader() {
  const username = localStorage.getItem("username")
  const role = localStorage.getItem("role")

  const [initials, setInitials] = useState('XY');
  useEffect(() => { 
    const username = localStorage.getItem("username");
    if (username) {
      const userInitials = username.split(' ').map(word => word[0]).join('');
      setInitials(userInitials);
    }
  }, []);
  return (
    <div className="w-full flex justify-between items-center ">
      <div className="flex items-center justify-end gap-4 w-full">
        <div className="bg-black h-16 w-2 mr-6" />
        <div className="text-4xl font-bold p-4 px-5 rounded-full max-h-max max-w-max bg-[#9CC2E5]">
          {initials}
        </div>

        <div className="w-[15vw]">
          <h1 className="text-2xl font-poppins font-bold">
            {username}
          </h1>
          <p className="text-xl">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
