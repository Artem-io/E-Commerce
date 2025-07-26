import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import { useRef } from "react";
import Autoplay from 'embla-carousel-autoplay';

const Featured = () => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  return (
    <Carousel
      withIndicators
      withControls={false}
      height={490}
      plugins={[autoplay.current]}
      slideGap={{ base: 0, sm: "md" }}
      emblaOptions={{ loop: true, align: "start" }}>

      <Carousel.Slide>
        <Image h='100%' fit="cover" src="https://rewardmobile.co.uk/wp-content/uploads/2024/09/iPhone16-RewardMobile-Banner-Page-Preorder.jpg" />
      </Carousel.Slide>

      <Carousel.Slide>
        <Image h='100%' fit="cover" src="https://support.apple.com/content/dam/edam/applecare/images/en_US/psp/psp_heroes/hero-banner-maclaptop.image.large_2x.jpg" />
      </Carousel.Slide>

      <Carousel.Slide>
        <Image h='100%' fit="cover" src="https://mybyte.com.au/cdn/shop/articles/apple-airpods-max-banner.jpg?v=1724643954&width=1024" />
      </Carousel.Slide>
    </Carousel>
  );
};

export default Featured;
