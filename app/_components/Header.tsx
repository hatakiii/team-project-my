import React from "react";
import { Button } from "@/components/ui/button";
import { FaPhone } from "react-icons/fa6";

export const Header = () => {
  return (
    <div className="w-full h-20 bg-gray-200 flex justify-between items-center px-4">
      <header>Luxe Hair Studio</header>

      <div className="flex gap-2">
        <div>Home</div>
        <div>Services</div>
        <div>Our Team</div>
        <div>Gallery</div>
        <div>Contact</div>
      </div>

      <div className="flex flex-nowrap">
        <button className="flex bg-transparent  px-4 py-2 rounded gap-2 items-center justify-center">
          <FaPhone />
          (555) 123-4567
        </button>
        <Button>Book Now</Button>
      </div>
    </div>
  );
};
