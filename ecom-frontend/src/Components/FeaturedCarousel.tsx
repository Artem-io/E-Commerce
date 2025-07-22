import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";

const Featured = () => {
  return (
    <Carousel
      withIndicators
      height={400}
      slideGap={{ base: 0, sm: "md" }}
      emblaOptions={{ loop: true, align: "start" }}
    >
      <Carousel.Slide>
        <Image src="https://www.apple.com/v/iphone-16/f/images/meta/iphone-16_overview__fcivqu9d5t6q_og.png?202507172105" />
      </Carousel.Slide>

      <Carousel.Slide>
        <Image src="https://wearepolaris.sg/wp-content/uploads/2021/10/Web-Banner-Blank-Macbook-1024x512.jpg" />
      </Carousel.Slide>

      <Carousel.Slide>
        <Image src="https://mybyte.com.au/cdn/shop/articles/apple-airpods-max-banner.jpg?v=1724643954&width=1024" />
      </Carousel.Slide>
    </Carousel>
  );
};

export default Featured;
