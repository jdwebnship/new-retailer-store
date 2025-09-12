// src/components/Footer.jsx
import { useTheme } from "../contexts/ThemeContext";
import Facebook from "./Facebook";
import Instagram from "./instagram";
import Mail from "./Mail";
import Call from "./Call";
import Twitter from "./Twitter";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Footer() {
  const { theme, footerTextColor } = useTheme();
  const { storeInfo } = useSelector((state) => state.storeInfo);

  return (
    <footer
      className="pt-[30px] py-[30px] lg:py-[70px]"
      style={{
        backgroundColor: theme?.footerBackgroundColor || "#1f2937",
        color: footerTextColor || "#ffffff",
        fontFamily: theme?.fontFamily || "system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] pt-[4.375rem]">
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 pb-[1.875rem] lg:pb-[4.6875rem] gap-4">
          <div className="text-left">
            <h2 className="uppercase mb-6 text-sm font-semibold text-[1.5rem] lg:text[2rem]">
              {storeInfo?.storeinfo?.store_name ?? "Store name"}
            </h2>
          </div>
          <div className="text-left">
            <h2 className="mb-4 font-bold text-lg">Customer Care</h2>
            <ul className="font-regular flex flex-col gap-1">
              <li className="mb-1">
                <a href="#" className="flex gap-2 ">
                  <Mail />
                  {storeInfo?.storeinfo?.email || "storename123@gmail.com"}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="flex gap-2 ">
                  <Call />
                  {storeInfo?.storeinfo?.mobile_no || "+91 9876543210"}
                </a>
              </li>
            </ul>
          </div>

          <div className="text-left">
            <h2 className="mb-4 font-bold text-lg">Store</h2>
            <ul className="font-regular flex flex-col gap-1">
              <li className="mb-1">
                <span>
                  {" "}
                  {storeInfo?.storeinfo?.store_time || "11:00 AM to 08:00 PM"}
                </span>
              </li>
              <li className="mb-1">
                <span>Monday - Saturday</span>
              </li>
            </ul>
          </div>

          <div className="text-left">
            <h2 className="mb-4 font-bold text-lg">Support</h2>
            <ul className="font-regular flex flex-col gap-1">
              <li className="mb-1">
                <a href="#" className=" ">
                  FAQ
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="">
                  Terms of use
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="text-left">
            <h2 className="mb-4 font-bold text-lg">Company</h2>
            <ul className="font-regular flex flex-col gap-1">
              <li className="mb-1">
                <a href="#" className=" ">
                  About Us
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="">
                  Contact Us
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div className="text-left">
            <h2 className="mb-4 font-bold text-lg">Social Media</h2>
            <ul className="font-regular flex flex-col gap-4">
              <li className="mb-1">
                <Link
                  to={storeInfo?.storeinfo?.facebook || "#"}
                  className="flex gap-2 "
                >
                  <Facebook />
                  Facebook
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  to={storeInfo?.storeinfo?.instagram_url || "#"}
                  className="flex gap-2 "
                >
                  <Instagram />
                  Instagram
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  to={storeInfo?.storeinfo?.twitter_url || "#"}
                  className="flex gap-2 "
                >
                  <Twitter />
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border opacity-5"></div>
      </div>

      <div className="pt-[0.9375rem]">
        <p>© {new Date().getFullYear()} My Vite App. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
