import Advertisement from "../components/Advertisement";
import Banner from "../components/Banner";
import CommonHeader from "../components/CommonHeader";
import ProductSection from "../components/ProductSection";
import ShopCategory from "../components/ShopCategory";
import SocialAdvertisementImage from "../components/SocialAdvertisementImage";

function Home() {
  return (
    <div>
      <div className="relative overflow-hidden h-[90vh]">
        <Banner />
      </div>
      <CommonHeader />
      <ShopCategory />
      <Advertisement />
      <ProductSection />
      {/* <SocialAdvertisementImage /> */}
    </div>
  );
}

export default Home;
