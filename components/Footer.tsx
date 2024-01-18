import Link from "next/link";

import { FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 py-8 text-white">
      <div className="mx-auto grid max-w-1300 px-4 sm:px-0 md:grid-cols-3 md:grid-rows-1">
        {/* Logo and mission text */}
        <div className="items-center pb-4 md:pb-0">
          <h3 className="pb-4 font-PressStart text-lg font-normal uppercase">
            <span className="text-custom-amber-800">Gaming</span> News
          </h3>
          <p className="pr-4 text-xs font-normal">
            Gaming News is a website dedicated to providing gamers with the most
            relevant and engaging content about the world of video games. Our
            mission is to inform, entertain, and inspire our readers with our
            comprehensive coverage of the gaming industry, culture, and
            community. We aim to be the trusted voice of gamers, delivering
            honest reviews, insightful analysis, and original features.
          </p>
        </div>

        {/* Navigation */}
        <div className="">
          <div className="w-fit sm:mx-auto">
            <h6 className="text-lg uppercase">Navigation</h6>
            <ul className="py-4 text-sm">
              <li>
                <Link href="/" className="hover:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-gray-400">
                  News
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-gray-400">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="About" className="hover:text-gray-400">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social media */}
        <div className="flex flex-col sm:items-center">
          <h6 className="text-lg uppercase">Social Media</h6>
          <div className="space-x-4 py-4">
            <Link href="">
              <FaFacebook size={20} className="mx-2 inline-block" />
            </Link>
            <Link href="">
              <FaYoutube size={20} className="mx-2 inline-block" />
            </Link>
            <Link href="">
              <FaTwitter size={20} className="mx-2 inline-block" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
