import CommonHeader from "../components/CommonHeader";
function About() {
  return (
    <div>
      <CommonHeader />
      <div className="max-w-[80rem] mx-auto lg:py-[6.25rem] md:py-[5rem] py-[3.5rem]">
        <div className="px-4 sm:mb-10 mb-7.5">
          <div className="space-y-5 text-left w-full">
            <p className="md:text-[1.375rem] text-lg">
              Established in 2018, JDwebship is a tech-based logistics
              aggregator. We have rapidly emerged as a leading force in the
              logistics sector, embodying a commitment to innovation,
              reliability, and customer satisfaction. Our journey began with a
              simple yet profound goal: to revolutionize E-commerce shipping
              services.
            </p>
            <p className="md:text-[1.375rem] text-lg">
              Making logistics seamless, efficient, and accessible for everyone.
              Founded with a vision to democratize shipping for businesses of
              all sizes, JDwebship has emerged as one of India's leading
              shipping and logistics platforms, empowering over 20,000 sellers
              and entrepreneurs to reach their customers across 26,000+ pin
              codes nationwide.
            </p>
          </div>
        </div>

        <div className="px-4 sm:mb-10 mb-7.5">
          <div className="space-y-5 text-left w-full">
            <h2 className="md:text-[2rem] text-2xl font-bold mb-4">Our Mission</h2>
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
            <h2 className="md:text-[2rem] text-2xl font-bold mb-4">Why Choose JDwebship?</h2>
            <p className="md:text-[1.375rem] text-lg">
              Our dedication goes beyond just providing a service. We are
              committed to the success of our merchants, offering personalized
              support and insights to help them grow their business. Our
              community of entrepreneurs and businesses is a testament to the
              trust and reliability that JDwebship brings to the logistics
              ecosystem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
