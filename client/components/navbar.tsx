import logo from "@/public/images/icon.jpg";
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import { BiUser } from "react-icons/bi";

const Navbar = () => {
  return (
    <section className="container mx-auto p-4 flex items-center justify-between">
      <Image
        src={logo}
        width={40}
        height={40}
        alt="logo"
        priority
        quality={50}
        className="rounded-3xl cursor-pointer"
      />
      <div className="flex items-center gap-2">
        <div className="flex items-center border rounded-full px-3 py-2 bg-white shadow-sm">
          <AiOutlineSearch className="text-xl text-gray-800" />
          <input
            type="text"
            placeholder="Search products"
            className="outline-none px-2 w-36 md:w-48"
          />
        </div>
        <button className="bg-black text-white p-2.5 rounded-full hover:bg-gray-950">
          <BiUser className="text-xl" />
        </button>
      </div>
    </section>
  );
};

export default Navbar;
