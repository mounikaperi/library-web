import { Footer } from "../NavBarAndFooter/Footer";
import { Navbar } from "../NavBarAndFooter/Navbar";
import { Carousel } from "./Carousel";
import { ExploreTopBooks } from "./ExploreTopBooks";
import { Heros } from "./Heros";
import { LibraryServices } from "./LibraryServices";

export const HomePage = () => {
  return (
    <>
      <Navbar />
      <ExploreTopBooks />
      <Carousel />
      <Heros />
      <LibraryServices />
      <Footer />
    </>
  );
}