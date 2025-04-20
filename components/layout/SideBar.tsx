"use client"
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { navLinks } from "@/lib/constants";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-white shadow-xl max-lg:hidden">
      <Image src="/logo.png" alt="Logo" width={150} height={70} />

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            className={`flex gap-4 text-body-medium ${
              pathname === link.url ? "text-blue-1" : "text-grey-1"
            }`}
            href={link.url}
            key={link.label}
          >
            {link.icon}
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 text-body-medium items-center">
        <UserButton />
        <p>Edit Profile</p>
      </div>
    </div>
  );
};

export default SideBar;
