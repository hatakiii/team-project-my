import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="w-full h-150 bg-red-600 overflow-hidden">
      <Image src={"/globe.svg"} alt="" width={100} height={100} />
      <div>
        <div>Your Hair, Our Passion</div>
        <div>
          Experience luxury hair care with our expert stylists. From cuts to
          color, we bring your vision to life in our modern, welcoming salon.
        </div>
        <div className="flex gap-4">
          <Button>Book appointment</Button>
          <Button>See our services</Button>
        </div>
      </div>
    </div>
  );
};
