// src/components/Footer.jsx
import { useTheme } from "../contexts/ThemeContext";
import Facebook from "./Facebook";
import Instagram from "./instagram";
import Mail from "./Mail";
import Call from "./Call";
import Twitter from "./Twitter";

function Footer() {
  const { theme, footerTextColor } = useTheme();

  return (
    <footer
      className="pt-[30px] py-[30px] lg:py-[70px]"
      style={{
        backgroundColor: theme?.footerBackgroundColor || "#1f2937",
        color: footerTextColor || "#ffffff",
        fontFamily: theme?.fontFamily || "system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] pt-[70px]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 pb-[30px] lg:pb-[4.6875rem] gap-4">
          <div className="text-left">
            <h2 className="uppercase mb-6 text-sm font-semibold text-[1.5rem] lg:text[2rem]">
              Store name
            </h2>
          </div>
          <div className="text-left">
            <h2 className="mb-4 font-bold text-lg">Customer Care</h2>
            <ul className="font-regular flex flex-col gap-1">
              <li className="mb-1">
                <a href="#" className="flex gap-2 hover:underline">
                  <Mail />
                  storename123@gmail.com
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="flex gap-2 hover:underline">
                  <Call />
                  +91 9876543210
                </a>
              </li>
            </ul>
          </div>

          <div className="text-left">
            <h2 className="mb-4 font-bold text-lg">Store</h2>
            <ul className="font-regular flex flex-col gap-1">
              <li className="mb-1">
                <span>11:00 AM to 08:00 PM</span>
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
                <a href="#" className=" hover:underline">
                  FAQ
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  Terms of use
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="text-left">
            <h2 className="mb-4 font-bold text-lg">Company</h2>
            <ul className="font-regular flex flex-col gap-1">
              <li className="mb-1">
                <a href="#" className=" hover:underline">
                  About Us
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div className="text-left">
            <h2 className="mb-4 font-bold text-lg">Social Media</h2>
            <ul className="font-regular flex flex-col gap-4">
              <li className="mb-1">
                <a href="#" className="flex gap-2 hover:underline">
                  <Facebook />
                  Facebook
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="flex gap-2 hover:underline">
                  <Instagram />
                  Instagram
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="flex gap-2 hover:underline">
                  <Twitter />
                  Twitter
                </a>
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
