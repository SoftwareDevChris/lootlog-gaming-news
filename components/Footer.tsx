import Link from "next/link";

import { FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";

import { ROUTES } from "@/utils/routes";

export const Footer: React.FC = () => {
  return (
    <footer className=" bg-gray-900 px-4 py-8 text-white md:h-60">
      <div className="mx-auto grid max-w-1300 space-y-8 px-4 sm:px-0 md:grid-cols-3 md:grid-rows-1">
        {/* Logo and mission text */}
        <div className="items-center pb-4 md:pb-0">
          <h3 className="pb-4 text-center font-PressStart text-lg font-normal uppercase md:text-start">
            Loot
            <span className="text-custom-amber-800">Log</span>
          </h3>
          <p className="mx-auto max-w-80 pr-4 text-center text-xs font-normal md:mx-0 md:text-start">
            Loot Log is a website dedicated to providing gamers with the most
            relevant and engaging content about the world of video games. Our
            mission is to inform, entertain, and inspire our readers with our
            comprehensive coverage of the gaming industry, culture, and
            community. We aim to be the trusted voice of gamers, delivering
            honest reviews, insightful analysis, and original features.
          </p>
        </div>

        {/* Navigation */}
        <div className="">
          <div className="mx-auto w-fit">
            <h6 className="text-lg uppercase">Navigation</h6>
            <ul className="py-4 text-center text-sm md:text-start">
              {ROUTES.map((route) => (
                <li key={route.name}>
                  <Link
                    prefetch={false}
                    href={route.path}
                    className="hover:text-gray-400"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social media */}
        <div className="mx-auto flex flex-col sm:items-center md:mx-0">
          <h6 className="text-lg uppercase">Social Media</h6>
          <div className="space-x-4 py-4">
            <Link prefetch={false} href="">
              <FaFacebook size={20} className="mx-2 inline-block" />
            </Link>
            <Link prefetch={false} href="">
              <FaYoutube size={20} className="mx-2 inline-block" />
            </Link>
            <Link prefetch={false} href="">
              <FaTwitter size={20} className="mx-2 inline-block" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
