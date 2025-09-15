import React from "react";
import CommonHeader from "../components/CommonHeader";
import { Headset, Mail, Phone, Clock, MessageCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { useTheme } from "../contexts/ThemeContext";

const Support = () => {
  const { storeInfo } = useSelector((state) => state.storeInfo);
  const { theme, bottomFooterTextColor, textColor } = useTheme();
  return (
    <>
      <CommonHeader title="Support Center" />
      <div className="px-5 mx-auto py-[3.125rem] lg:py-[100px] min-h-screen flex flex-col">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-left">
              We're Here to Help
            </h1>
            <p className="text-xl text-gray-600 text-left">
              Get assistance with your healthcare & e-commerce needs from our
              dedicated support team.
            </p>
          </div>

          {/* Why Contact Us Section */}
          <div
            className="rounded-xl p-8 mb-12"
            style={{
              backgroundColor: theme?.bottomFooterBackgroundColor || "#1f2937",
              color: bottomFooterTextColor || "#ffffff",
            }}
          >
            <h2 className="text-2xl font-bold  mb-6 text-left">
              Why Contact Us?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Resolve account or billing issues",
                "Get help with product or service inquiries",
                "Technical support for platform usage",
                "Feedback or suggestions for improvement",
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div
                    className=" p-1 rounded-full mr-3 mt-1"
                    style={{
                      backgroundColor: bottomFooterTextColor,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          theme?.bottomFooterBackgroundColor || "#1f2937",
                        color: bottomFooterTextColor || "#ffffff",
                      }}
                    ></div>
                  </div>
                  <p className=" text-left">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Support Options */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-start">
            Support Options
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <MessageCircle className="w-6 h-6" />,
                title: "Live Chat – Instant support",
                description: "Available 24/7",
              },
              {
                icon: <Mail className="w-6 h-6" />,
                title: "Email Support – Detailed assistance",
                description: "Response within 24 hours",
              },
              {
                icon: <Phone className="w-6 h-6" />,
                title: "Phone Support – Speak to our team",
                description: `Mon-Fri, ${
                  storeInfo?.storeInfo?.storeTime || "11:00 AM - 8:00 PM"
                }`,
              },
            ].map((option, index) => (
              <div
                key={index}
                className=" rounded-xl p-6 transition-shadow"
                style={{
                  backgroundColor:
                    theme?.bottomFooterBackgroundColor || "#1f2937",
                  color: bottomFooterTextColor || "#ffffff",
                }}
              >
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 text-start">
                  {option.icon}
                </div>
                <h3 className="text-lg font-semibold  mb-2 text-start">
                  {option.title}
                </h3>
                <p className="text-start">{option.description}</p>
              </div>
            ))}
          </div>

          <div
            className=" rounded-xl p-6 mb-12"
            style={{
              backgroundColor: theme?.bottomFooterBackgroundColor || "#1f2937",
              color: bottomFooterTextColor || "#ffffff",
            }}
          >
            <div className="flex items-start">
              <Headset className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
              <p className="">
                <span className="font-medium">Need urgent help?</span> Try our
                live chat for the fastest response.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="w-full max-w-full">
            <div className="grid grid-cols-1 gap-6">
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  How to Reach Us
                </h2>
                <p className="text-gray-700 mb-6">
                  Email us at{" "}
                  <a
                    href="mailto:support@yourcompany.com"
                    className="text-blue-600 hover:underline"
                  >
                    {storeInfo?.storeinfo?.email || "storename123@gmail.com"}
                  </a>
                  . Please include a brief description of your issue.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Additional Help
                </h3>
                <p className="text-gray-700">
                  For immediate assistance, call us at{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    {storeInfo?.storeinfo?.mobile_no || "+91 9876543210"}
                  </a>{" "}
                  or visit our{" "}
                  <a href="/faq" className="text-blue-600 hover:underline">
                    FAQ page
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
