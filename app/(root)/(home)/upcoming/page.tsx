import CallList from "@/components/CallList";
import React from "react";

const UpComing = () => {
  return (
    <section className=" flex size-full flex-col gap-10 text-white">
      <h1 className=" text-3xl font-bold">UpComing</h1>
      <CallList type = "upcoming"/>
    </section>
  );
};

export default UpComing;
