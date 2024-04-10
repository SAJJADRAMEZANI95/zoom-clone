"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBar = () => {
  const sidebarLinks = [
    {
      lable: "Home",
      route: "/",
      imgUrl: "/icons/Home.svg",
    },
    {
      lable: "Upcoming",
      route: "/upcoming",
      imgUrl: "/icons/upcoming.svg",
    },
    {
      lable: "Previous",
      route: "/previous",
      imgUrl: "/icons/previous.svg",
    },
    {
      lable: "Recordings",
      route: "/recordings",
      imgUrl: "/icons/Video.svg",
    },
    {
      lable: "Personal Room",
      route: "/personal-room",
      imgUrl: "/icons/add-personal.svg",
    },
  ];
  const pathname = usePathname();
  return (
    <section
      className=" sticky left-0 top-0 flex h-screen w-fit justify-between flex-col
     bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]"
    >
      <div className=" flex flex-1 flex-col gap-6">
        {sidebarLinks?.map((link) => {
          const isActive =
            pathname === link.route
          return (
            <Link
              href={link.route}
              key={link.lable}

              className={cn(
                "flex gap-4 items-center p-4 rounded-lg justify-start",
                { "bg-blue-1": isActive }
              )}
            >
              <Image
                src={link.imgUrl}
                alt={link.lable}
                width={24}
                height={24}
              />
              <p className=" text-lg font-semibold max-lg:hidden">
                {link.lable}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SideBar;
