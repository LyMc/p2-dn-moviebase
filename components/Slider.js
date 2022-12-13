import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Card, Center, CircularProgress } from "@chakra-ui/react";
import CardOnHome from "./CardOnHome";
const Slider = ({ data, star, date, gen }) => {
  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 45,
          },
          1244: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
          1344: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        navigation
        style={{
          width: "95vw",
          height: "200px",
          padding: "0px 50px",
        }}
      >
        {data?.map((movie) => (
          <SwiperSlide
            key={movie?.id || movie.data.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card
              w="100%"
              h="100%"
              bg="rgba(0,0,0,0.7)"
              _hover={{ transform: "scale(1.1)" }}
              cursor="pointer"
            >
              <CardOnHome movie={movie} star={star} date={date} gen={gen} />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
