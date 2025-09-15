import { Link, useLocation, useParams } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

function CommonHeader({ className = "", ...props }) {
  const { theme, bottomFooterTextColor } = useTheme();
  const { id } = useParams();
  const { slug } = useParams();
  const location = useLocation();
  // Define page titles and breadcrumb configurations
  const routeConfigs = {
    "/": {
      content: (
        <div className="py-[2.5rem] lg:py-15 -mt-[40px] z-10 relative rounded-b-none rounded-3xl">
          <div className="flex items-center md:justify-between justify-center md:max-w-[90rem] max-w-full ml-auto mr-auto">
            <div className="flex xxl:px-[248px] md:gap-6 gap-4 md:flex-row flex-col">
              <div className="flex-1 md:px-[1.8rem] px-[1rem] lg:px-[3.75rem] md:py-6 py-[0] lg:py-7.5">
                <h1 className="mb-4 text-[1.125rem] lg:text-[1.5rem] font-bold">
                  Free Shipping
                </h1>
                <p className="text-lg font-normal">
                  Upgrade your style today and get FREE shipping on all orders!
                  Don't miss out.
                </p>
              </div>
              <span className="seperator md:border-r"></span>
              <div className="flex-1 md:px-[1.8rem] px-[1rem] lg:px-[3.75rem] md:py-6 py-[0] lg:py-7.5">
                <h1 className="mb-4 text-[1.125rem] lg:text-[1.5rem] font-bold">
                  Secure Payment
                </h1>
                <p className="text-lg font-normal">
                  Your security is our priority. Your payments are secure with
                  us.
                </p>
              </div>
              <span className="seperator md:border-r"></span>
              <div className="flex-1 md:px-[1.8rem] px-[1rem] lg:px-[3.75rem] md:py-6 py-[0] lg:py-7.5">
                <h1 className="mb-4 text-[1.125rem] lg:text-[1.5rem] font-bold">
                  Satisfaction Guarantee
                </h1>
                <p className="text-lg font-normal">
                  Shop confidently with our Satisfaction Guarantee: Love it or
                  get a refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    "/about": {
      content: (
        <div className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem]">
          <h1 className="text-2xl font-bold">About Page Header</h1>
          <nav className="flex gap-4">
            <Link to="/" className="">
              Home
            </Link>
          </nav>
        </div>
      ),
    },
    "/shop": {
      title: "Shop",
      breadcrumb: true,
    },
    "/cart": {
      title: "Your Shopping Cart",
      breadcrumb: true,
    },
    "/checkout": {
      title: "Your Shopping Cart",
      breadcrumb: true,
    },
    "/categories": {
      title: "Shop By Category",
      breadcrumb: true,
    },
    "/order-success": {
      title: "Successful Order",
      breadcrumb: true,
    },
    "/order-failure": {
      title: "Order failure",
      breadcrumb: true,
    },
    "/my-account": {
      title: "Successful Order",
      breadcrumb: true,
    },
    "/signin": {
      title: "Sign In",
    },
    "/signup": {
      title: "Sign Up",
    },
    "/forgot-password": {
      title: "Forgot Password",
    },
    "/reset-password": {
      title: "Reset Password",
    },
    [`/products/${slug}`]: {
      title: "Women's Watch",
      breadcrumb: true,
    },
    "/faq": {
      title: "FAQ",
      breadcrumb: true,
    },
    "/terms-use": {
      title: "Terms & Conditions",
      breadcrumb: true,
    },
    "/privacy-policy": {
      title: "Privacy Policy",
      breadcrumb: true,
    },
    "/support": {
      title: "Support",
      breadcrumb: true,
    },
  };

  // Breadcrumb component for reusability
  const Breadcrumb = ({ currentPage }) => (
    <nav className="flex justify-center" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center font-medium me-2">
          <Link to="/" className="inline-flex items-center">
            Home
          </Link>
        </li>
        <li aria-current="page">
          <div className="flex items-center border-l opacity-35 font-medium ps-2">
            <span className="text-sm">{currentPage}</span>
          </div>
        </li>
      </ol>
    </nav>
  );

  // Default content for unmatched routes
  const defaultContent = (
    <div className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem]">
      <h1 className="text-2xl font-bold">Default Header</h1>
      <nav className="flex gap-4">
        <Link to="/" className="">
          Home
        </Link>
        <Link to="/about" className="">
          About
        </Link>
      </nav>
    </div>
  );

  // Determine content based on route
  const routeConfig = routeConfigs[location.pathname] || {};
  const innerContent =
    routeConfig.content ||
    (routeConfig.title ? (
      <div className="xxl:px-[248px]">
        <div className="px-[2.5rem] lg:px-[4.6875rem] py-[30px] lg:py-[4.6875rem]">
          {routeConfig.breadcrumb && (
            <Breadcrumb currentPage={routeConfig.title} />
          )}
          <h1 className="text-[30px] lg:text-[2.625rem] font-bold">
            {routeConfig.title}
          </h1>
        </div>
      </div>
    ) : (
      defaultContent
    ));
  return (
    <section
      className={`z-10 relative ${
        location.pathname === "/" ? "rounded-b-none rounded-3xl" : "rounded-b-none rounded-3xl"
      } ${className}`}
      style={{
        backgroundColor: theme?.bottomFooterBackgroundColor || "#ffffff",
        color: bottomFooterTextColor || "#111111",
        fontFamily: theme?.fontFamily || "system-ui, -apple-system, sans-serif",
      }}
      {...props}
    >
      {innerContent}
    </section>
  );
}

export default CommonHeader;
