import { redirect } from "next/navigation";
import React from "react";

function Page() {
  // Melakukan redirect ke halaman sign-in
  redirect("/sign-in");
  return null;
}

export default Page;
