import React from "react";
import { processData } from "@/assets/dummyData";

type TCardProps = {
  process: {
    title: string;
    description: string;
    icon: any;
  };
};

export default function Process() {
  return (
    <section className="container mx-auto py-8 hidden md:block">
      {/* <h2 className="text-center mb-10">How It Works</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {processData.map((process) => (
          <ProcessCard process={process} key={process.title} />
        ))}
      </div>
    </section>
  );
}

const ProcessCard = ({ process }: TCardProps) => {
  return (
    <div className="text-center px-6 py-3 bg-[#f6f6f6] space-y-2 rounded-xl hover:shadow-lg hover:scale-105 duration-300 ">
      <>
        <process.icon className="size-6 w-fit mx-auto text-secondary" />
      </>
      <h4 className="text-center font-semibold text-primary">{process.title}</h4>
      <p className="text-slate-600">{process.description}</p>
    </div>
  );
};
