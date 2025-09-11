import React, { useState } from "react";
import CommonHeader from "../components/CommonHeader";
import { useTheme } from "../contexts/ThemeContext";
import watch from "../assets/watch.png";
import CardComponent from "../components/CardComponent";

const renderContent = (selected) => {
  switch (selected) {
    case "orders":
      return (
        <div className="w-full">
          <div className="flex justify-between w-full pb-[1.25rem] items-center">
            <h3 className="text-2xl font-bold">Orders</h3>
            <p className="text-sm text-[#808080]">
              Showing 1-10 Of 20 Results.
            </p>
          </div>
          <hr className="opacity-10" />
          {/* Card */}
          <div className="flex flex-col mt-[1.875rem] text-start">
            <div className="rounded-2xl border border-[#808080] overflow-auto">
              <div className="top-card bg-[#fff7f2] p-[0.9375rem]">
                <div className="flex gap-[1.25rem] justify-between">
                  <div className="flex gap-[1.25rem]">
                    <div>
                      <span className="text-sm uppercase">Order Date:</span>
                      <p className="text-sm font-bold">08 September 2025</p>
                    </div>
                    <div>
                      <span className="text-sm uppercase">Total:</span>
                      <p className="text-sm font-bold">₹9,894</p>
                    </div>
                    <div>
                      <span className="text-sm uppercase">Status:</span>
                      <p className="text-sm font-bold">Order Placed</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm uppercase">Order Id:</span>
                    <p className="text-sm font-bold">#80879571220</p>
                  </div>
                </div>
              </div>
              <div className="bottom-card p-[0.9375rem]">
                <div className="flex gap-[0.9375rem]">
                  <div className="w-[5rem] h-[5rem] rounded-2xl overflow-hidden">
                    <img src={watch} alt="" />
                  </div>
                  <div>
                    <h6 className="text-lg font-bold">
                      Longine_s Heritage Classic Copper-Black
                    </h6>
                    <div className="flex gap-[0.9375rem] items-center mt-[0.5rem]">
                      <a
                        href=""
                        className="inline-flex text-sm gap-2 btn px-[1.5rem] py-[0.5rem] rounded-lg font-medium focus:outline-none items-center"
                      >
                        Buy it Again
                      </a>
                      <a href="" className="underline">
                        View order details 
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-[1.875rem] text-start">
            <div className="rounded-2xl border border-[#808080] overflow-auto">
              <div className="top-card bg-[#fff7f2] p-[0.9375rem]">
                <div className="flex gap-[1.25rem] justify-between">
                  <div className="flex gap-[1.25rem]">
                    <div>
                      <span className="text-sm uppercase">Order Date:</span>
                      <p className="text-sm font-bold">08 September 2025</p>
                    </div>
                    <div>
                      <span className="text-sm uppercase">Total:</span>
                      <p className="text-sm font-bold">₹9,894</p>
                    </div>
                    <div>
                      <span className="text-sm uppercase">Status:</span>
                      <p className="text-sm font-bold">Order Placed</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm uppercase">Order Id:</span>
                    <p className="text-sm font-bold">#80879571220</p>
                  </div>
                </div>
              </div>
              <div className="bottom-card p-[0.9375rem]">
                <div className="flex gap-[0.9375rem]">
                  <div className="w-[5rem] h-[5rem] rounded-2xl overflow-hidden">
                    <img src={watch} alt="" />
                  </div>
                  <div>
                    <h6 className="text-lg font-bold">
                      Longine_s Heritage Classic Copper-Black
                    </h6>
                    <div className="flex gap-[0.9375rem] items-center mt-[0.5rem]">
                      <a
                        href=""
                        className="inline-flex text-sm gap-2 btn px-[1.5rem] py-[0.5rem] rounded-lg font-medium focus:outline-none items-center"
                      >
                        Buy it Again
                      </a>
                      <a href="" className="underline">
                        View order details 
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-[1.875rem] text-start">
            <div className="rounded-2xl border border-[#808080] overflow-auto">
              <div className="top-card bg-[#fff7f2] p-[0.9375rem]">
                <div className="flex gap-[1.25rem] justify-between">
                  <div className="flex gap-[1.25rem]">
                    <div>
                      <span className="text-sm uppercase">Order Date:</span>
                      <p className="text-sm font-bold">08 September 2025</p>
                    </div>
                    <div>
                      <span className="text-sm uppercase">Total:</span>
                      <p className="text-sm font-bold">₹9,894</p>
                    </div>
                    <div>
                      <span className="text-sm uppercase">Status:</span>
                      <p className="text-sm font-bold">Order Placed</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm uppercase">Order Id:</span>
                    <p className="text-sm font-bold">#80879571220</p>
                  </div>
                </div>
              </div>
              <div className="bottom-card p-[0.9375rem]">
                <div className="flex gap-[0.9375rem]">
                  <div className="w-[5rem] h-[5rem] rounded-2xl overflow-hidden">
                    <img src={watch} alt="" />
                  </div>
                  <div>
                    <h6 className="text-lg font-bold">
                      Longine_s Heritage Classic Copper-Black
                    </h6>
                    <div className="flex gap-[0.9375rem] items-center mt-[0.5rem]">
                      <a
                        href=""
                        className="inline-flex text-sm gap-2 btn px-[1.5rem] py-[0.5rem] rounded-lg font-medium focus:outline-none items-center"
                      >
                        Buy it Again
                      </a>
                      <a href="" className="underline">
                        View order details 
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <nav className="mt-[4.375rem]" aria-label="Page navigation">
            <ul class="flex items-center justify-center -space-x-px h-8 text-sm text-[1rem]">
              {/* <li>
                  <a href="#" class="px-3 h-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M20 8L12 16L20 24"
                        stroke="#111111"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                </li> */}
              <li>
                <a href="#" class="px-3 h-8">
                  1
                </a>
              </li>
              <li>
                <a href="#" class="px-3 h-8">
                  2
                </a>
              </li>
              <li>
                <a href="#" aria-current="page" class="px-3 h-8">
                  3
                </a>
              </li>
              <li>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="3"
                    viewBox="0 0 11 3"
                    fill="none"
                  >
                    <path
                      d="M1.31475 2.176C0.77075 2.176 0.30675 1.728 0.30675 1.2C0.30675 0.656 0.77075 0.192 1.31475 0.192C1.85875 0.192 2.32275 0.656 2.32275 1.2C2.32275 1.728 1.85875 2.176 1.31475 2.176ZM5.50225 2.176C4.95825 2.176 4.49425 1.728 4.49425 1.2C4.49425 0.656 4.95825 0.192 5.50225 0.192C6.04625 0.192 6.51025 0.656 6.51025 1.2C6.51025 1.728 6.04625 2.176 5.50225 2.176ZM9.68975 2.176C9.14575 2.176 8.68175 1.728 8.68175 1.2C8.68175 0.656 9.14575 0.192 9.68975 0.192C10.2338 0.192 10.6978 0.656 10.6978 1.2C10.6978 1.728 10.2338 2.176 9.68975 2.176Z"
                      fill="#111111"
                    />
                  </svg>
                </span>
              </li>
              <li>
                <a href="#" class="px-3 h-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M12 24L20 16L12 8"
                      stroke="#111111"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      );
    case "wishlist":
      return (
        <div className="w-full">
          <div className="flex justify-between w-full pb-[1.25rem] items-center">
            <h3 className="text-2xl font-bold">Wishlist</h3>
            <p className="text-sm text-[#808080]">
              Showing 1-10 Of 20 Results.
            </p>
          </div>
          <hr className="opacity-10" />
          {/* Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 xxl:grid-cols-5  gap-4 md:gap-y-[4.375rem]">
          {products.map((product, index) => (
            <CardComponent
              key={index}
              productName={product.productName}
              price={product.price}
              imageSrc={product.imageSrc}
            />
          ))}
        </div>
        </div>
      );
    case "address":
      return (
        <div className="w-full text-start">
          <div className="flex justify-between w-full pb-[1.25rem] items-center">
            <h3 className="text-2xl font-bold">Update Address</h3>
            {/* <p className="text-sm text-[#808080]">
              Showing 1-10 Of 20 Results.
            </p> */}
          </div>
          <hr className="opacity-10" />
          <div className="mt-[1.875rem]">
            <form action="">
              <div className="mb-4">
                <label
                  className="block text-sm mb-2 font-bold uppercase"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  className="w-full border border-[#AAAAAA] rounded-md p-[0.9375rem] focus:outline-none"
                  placeholder="Enter your address"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm mb-2 font-bold uppercase"
                  htmlFor="zipcode"
                >
                  Your zipcode
                </label>
                <input
                  id="zipcode"
                  type="text"
                  className="w-full border border-[#AAAAAA] rounded-md p-[0.9375rem] focus:outline-none"
                  placeholder="Enter your zipcode"
                />
              </div>
              <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">CITY</label>
                  <input
                    type="text"
                    className="w-full border border-[#AAAAAA] rounded-md p-[0.9375rem] focus:outline-none"
                    placeholder="Enter your city"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">
                    STATE
                  </label>
                  <input
                    type="text"
                    className="w-full border border-[#AAAAAA] rounded-md p-[0.9375rem] focus:outline-none"
                    placeholder="Enter your state"
                  />
                </div>
              </div>
              <button className="inline-flex gap-2 btn px-[1.5rem] py-[0.9375rem] rounded-lg text-sm font-medium focus:outline-none items-center">
                Save Address
              </button>
            </form>
          </div>
        </div>
      );
    case "password":
      return (
        <div>
          <h2>Password</h2>
          <p>Update your password here.</p>
        </div>
      );
    case "account":
      return (
        <div>
          <h2>Account Details</h2>
          <p>Update your account details here.</p>
        </div>
      );
    case "logout":
      return (
        <div>
          <h2>Logout</h2>
          <p>You have been logged out.</p>
        </div>
      );
    default:
      return (
        <div>
          <h2>Welcome</h2>
          <p>Select an option from the menu.</p>
        </div>
      );
  }
};

const MyAccount = () => {
  const [selected, setSelected] = useState("orders");
  const { theme, bottomFooterTextColor } = useTheme();

  const menuItems = [
    {
      key: "orders",
      label: "Orders",
      img: (isSelected) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6M10 21C10 21.5523 9.55228 22 9 22C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20C9.55228 20 10 20.4477 10 21ZM21 21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21C19 20.4477 19.4477 20 20 20C20.5523 20 21 20.4477 21 21Z"
            stroke={isSelected ? bottomFooterTextColor : "#808080"} // Red when selected, black otherwise
            strokeWidth={isSelected ? "2" : "2"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "wishlist",
      label: "Wishlist",
      img: (isSelected) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.8401 4.60987C20.3294 4.09888 19.7229 3.69352 19.0555 3.41696C18.388 3.14039 17.6726 2.99805 16.9501 2.99805C16.2276 2.99805 15.5122 3.14039 14.8448 3.41696C14.1773 3.69352 13.5709 4.09888 13.0601 4.60987L12.0001 5.66987L10.9401 4.60987C9.90843 3.57818 8.50915 2.99858 7.05012 2.99858C5.59109 2.99858 4.19181 3.57818 3.16012 4.60987C2.12843 5.64156 1.54883 7.04084 1.54883 8.49987C1.54883 9.95891 2.12843 11.3582 3.16012 12.3899L4.22012 13.4499L12.0001 21.2299L19.7801 13.4499L20.8401 12.3899C21.3511 11.8791 21.7565 11.2727 22.033 10.6052C22.3096 9.93777 22.4519 9.22236 22.4519 8.49987C22.4519 7.77738 22.3096 7.06198 22.033 6.39452C21.7565 5.72706 21.3511 5.12063 20.8401 4.60987V4.60987Z"
            stroke={isSelected ? bottomFooterTextColor : "#808080"}
            strokeWidth={isSelected ? "2" : "2"}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "address",
      label: "Address",
      img: (isSelected) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
            stroke={isSelected ? bottomFooterTextColor : "#808080"}
            strokeWidth={isSelected ? "2" : "2"}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
            stroke={isSelected ? bottomFooterTextColor : "#808080"}
            strokeWidth={isSelected ? "2" : "2"}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "password",
      label: "Password",
      img: (isSelected) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11M5 11H19C20.1046 11 21 11.8954 21 13V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V13C3 11.8954 3.89543 11 5 11Z"
            stroke={isSelected ? bottomFooterTextColor : "#808080"}
            strokeWidth={isSelected ? "2" : "2"}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "account",
      label: "Account Details",
      img: (isSelected) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
            stroke={isSelected ? bottomFooterTextColor : "#808080"}
            strokeWidth={isSelected ? "2" : "2"}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "logout",
      label: "Logout",
      img: (isSelected) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
            stroke={isSelected ? bottomFooterTextColor : "#808080"}
            strokeWidth={isSelected ? "2" : "2"}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <CommonHeader />
      <div className="max-w-[80rem] mx-auto py-[6.5rem]">
        {/* Left Navigation */}
        <div className="flex">
          <nav
            className="max-w-[14.625rem] min-w-[13.625rem]  p-[1.875rem] pl-0 rounded-2xl"
            style={{
              backgroundColor: theme.bottomFooterBackgroundColor,
              height: "fit-content",
            }}
          >
            <ul
              className="flex flex-col gap-[1.5rem]"
              style={{ listStyle: "none", margin: 0, padding: 0 }}
            >
              {menuItems.map((item) => (
                <li className="text-[1.125rem]" key={item.key}>
                  <button
                    onClick={() => setSelected(item.key)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      textAlign: "left",
                      paddingLeft: "1.875rem",
                      borderLeftWidth: "2.8px",
                      borderLeft:
                        selected === item.key ? "solid" : "transparent",
                      fontWeight: selected === item.key ? 600 : 400,
                      color:
                        selected === item.key
                          ? bottomFooterTextColor
                          : "#808080",
                      cursor: "pointer",
                      outline: "none",
                      transition: "background all ease-in-out 0.5s",
                    }}
                  >
                    {item.img && (
                      <span style={{ marginRight: "0.5rem" }}>
                        {item.img(selected === item.key)}
                      </span>
                    )}
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          {/* Right Content */}
          <div className="w-full pl-[1.5rem]">{renderContent(selected)}</div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
