"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
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
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="hamburger"
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
          <Link href="/" className=" flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              width={32}
              height={32}
              alt="Yoom logo"
              className=" max-sm:size-10"
            />
            <p className=" text-[26px] font-extrabold text-white">Yoom</p>
          </Link>
          <div className=" flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose>
              <section className=" flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks?.map((link) => {
                  const isActive =
                    pathname === link.route;
                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        href={link.route}
                        key={link.lable}
                        className={cn(
                          "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                          { "bg-blue-1": isActive }
                        )}
                      >
                        <Image
                          src={link.imgUrl}
                          alt={link.lable}
                          width={20}
                          height={20}
                        />
                        <p className="font-smibold">{link.lable}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
