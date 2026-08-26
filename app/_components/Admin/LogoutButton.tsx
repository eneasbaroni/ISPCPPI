"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-1/2 text-md uppercase bg-white outline outline-gray-300 px-4 h-10 mobile:w-full hover:bg-gray-100 cursor-pointer transition-colors"
    >
      Cerrar sesión
    </button>
  );
}