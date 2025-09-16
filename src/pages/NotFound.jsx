import CommonHeader from "../components/CommonHeader";

function NotFound() {
  return (
    <div>
      <CommonHeader />
      <div className="2xl:max-w-[35rem] mx-auto py-10 md:py-[6.5rem] px-4 sm:px-6 lg:px-[4.6875rem] 2xl:px-[0] text-center">
        <span className="bg-gray-100 rounded-full p-5 shadow-inner mx-auto inline-block ">
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-14 w-14 text-gray-800"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </span>
        <h3 className="font-bold text-4xl my-5">Oops! Page not found</h3>
        <p className="text-lg">
          The page you're looking for doesn't exist or may have been moved. Try
          navigating from the homepage or contact our support team.
        </p>
        <div className="flex flex-row gap-4 justify-center my-5">
          <a
            href=""
            className="inline w-full lg:w-1/2 text-center gap-2 btn px-[1.5rem] py-[0.9375rem] rounded-lg text-sm font-medium focus:outline-none items-center uppercase"
          >
            Go to Homepage
          </a>
          <a
            href=""
            className="inline w-full lg:w-1/2 text-center gap-2 border px-[1.5rem] py-[0.9375rem] rounded-lg text-sm font-medium focus:outline-none items-center uppercase"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
