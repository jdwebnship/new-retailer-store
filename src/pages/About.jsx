import { useDispatch, useSelector } from "react-redux";
import CommonHeader from "../components/CommonHeader";
import { useEffect } from "react";
import { fetchAboutSections } from "../redux/slices/homeSectionsSlice";
function About() {
  const { aboutSections } = useSelector((state) => state.homeSections);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAboutSections());
  }, [dispatch]);

  const content = aboutSections?.data?.content || "";
  return (
    <div>
      <CommonHeader />
      <div className="xl:max-w-[80rem] mx-auto lg:py-[6.25rem] md:py-[5rem] py-[3.5rem]  px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] 2xl:px-0">
        <div className="">
          <div className="space-y-5 text-left w-full">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>

        {/* <div className="px-4 sm:mb-10 mb-7.5">
          <div className="space-y-5 text-left w-full">
            <h2 className="md:text-[2rem] text-2xl font-bold mb-4">
              Our Mission
            </h2>
            <p className="md:text-[1.375rem] text-lg">
              Our mission is to bridge the gap between merchants and consumers
              through technology-driven logistics solutions. We understand the
              challenges small and medium-sized enterprises face in the
              competitive e-commerce landscape. That's why our platform is
              designed to be intuitive, scalable, and cost-effective, enabling
              businesses to manage their shipping operations with ease, no
              matter their size.
            </p>
          </div>
        </div>
        <div className="sm:space-y-10 space-y-7.5 px-4">
          <div className="text-left w-full">
            <h2 className="md:text-[2rem] text-2xl font-bold mb-4">
              Innovative Solutions for Modern Businesses
            </h2>
            <p className="md:text-[1.375rem] text-lg">
              JDwebship platform is at the forefront of logistics innovation,
              offering features such as automated shipping, real-time tracking,
              and advanced analytics to optimize shipping routes and reduce
              costs. Our integration with leading courier partners ensures that
              your products are delivered safely and on time, every time.
            </p>
          </div>

          <div className="text-left w-full">
            <h2 className="md:text-[2rem] text-2xl font-bold mb-4">
              Commitment to Customer Success
            </h2>
            <p className="md:text-[1.375rem] text-lg">
              Our dedication goes beyond just providing a service. We are
              committed to the success of our merchants, offering personalized
              support and insights to help them grow their business. Our
              community of entrepreneurs and businesses is a testament to the
              trust and reliability that JDwebship brings to the logistics
              ecosystem.
            </p>
          </div>

          <div className="text-left w-full">
            <h2 className="md:text-[2rem] text-2xl font-bold mb-4">
              Why Choose JDwebship?
            </h2>
            <p className="md:text-[1.375rem] text-lg">
              Our dedication goes beyond just providing a service. We are
              committed to the success of our merchants, offering personalized
              support and insights to help them grow their business. Our
              community of entrepreneurs and businesses is a testament to the
              trust and reliability that JDwebship brings to the logistics
              ecosystem.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default About;
