import Image from "next/image";
import React from "react";

type HomeCardProps = {
    title:string,
    discription:string,
    image:string,
    bgColor:string,
    handleClick:()=>void
};

const HomeCard = ({bgColor,title,discription,image , handleClick}:HomeCardProps) => {
  return (
    <div
      className={`${bgColor} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer`}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]" onClick={handleClick}>
        <Image
          src={image}
          width={27}
          height={27}
          alt="Add meeting"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{discription}</p>
      </div>
    </div>
  );
};

export default HomeCard;
