import { Carousel1 } from "./Carousel1";
import { ExploreTopBooks } from "./ExploreTopBooks";
import { Heros } from "./Heros";
import { LibraryServices } from "./LibraryServices";

export const HomePage = () => {
  return (
    <>
      <ExploreTopBooks />
      <Carousel1 />
      <Heros />
      <LibraryServices />
    </>
  );
}