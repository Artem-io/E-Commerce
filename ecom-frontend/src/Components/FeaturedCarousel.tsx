import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import { useRef } from "react";
import Autoplay from 'embla-carousel-autoplay';

const Featured = () => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  return (
    <Carousel
    my={30}
      withControls={false}
      height={500}
      slideSize={{ base: '100%', md: '70%' }}
      plugins={[autoplay.current]}
      slideGap={20}
      emblaOptions={{ loop: true, align: "center" }}>

      <Carousel.Slide>
        <Image radius='xl' h='100%' fit="cover" src="https://miro.medium.com/v2/resize:fit:1400/1*KuGlXZjyTw7q38uzY_aZRA.png" />
      </Carousel.Slide>

      <Carousel.Slide>
        <Image radius='xl' h='100%' fit="cover" src="https://miro.medium.com/v2/resize:fit:1400/1*KuGlXZjyTw7q38uzY_aZRA.png" />
      </Carousel.Slide>

      <Carousel.Slide>
        <Image radius='xl' h='100%' fit="cover" src="https://miro.medium.com/v2/resize:fit:1400/1*KuGlXZjyTw7q38uzY_aZRA.png" />
      </Carousel.Slide>

      <Carousel.Slide>
        <Image radius='xl' h='100%' fit="cover" src="https://miro.medium.com/v2/resize:fit:1400/1*KuGlXZjyTw7q38uzY_aZRA.png" />
      </Carousel.Slide>

    </Carousel>
  );
};

export default Featured;
