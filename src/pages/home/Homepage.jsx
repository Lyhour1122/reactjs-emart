import AboutUs from "../../components/About/AboutUs";
import Category from "../../components/category/Category";
import Herosection from "../../components/heroSection/Herosection";
import HomePageProductCard from "../../components/HomePageProductCard/HomePageProductCard";
import Testimonial from "../../components/testimonial/Testimonial";
import Track from "../../components/track/Track";

function Homepage() {
  return (
    <>
      <Herosection />
      <Category />
      <HomePageProductCard />
      <Track />
      <Testimonial />
      <AboutUs />
    </>
  );
}

export default Homepage;
