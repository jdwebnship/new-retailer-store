import Advertisment from "../components/Advertisment";
import Banner from "../components/Banner";
import CommonHeader from "../components/CommonHeader";
import ProductSection from "../components/ProductSection";
import SecondProductSection from "../components/SecondProductSection";
import ShopCategory from "../components/ShopCategory";
import SocialAdvertisementImage from "../components/SocialAdvertisementImage";

function Home() {
  return (
    <div>
      <div className="relative overflow-hidden h-[85vh]">
        <Banner />
      </div>
      <CommonHeader />
      <ShopCategory />
      <Advertisment />
      <ProductSection />
      {/* <SocialAdvertisementImage /> */}
    </div>
  );
}

export default Home;
