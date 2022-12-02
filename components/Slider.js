import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Moment from "moment";

import {
  Badge,
  Box,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  CircularProgress,
  Divider,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { buildImageUrl } from "utils/api";
import FavouriteButton from "./FavouriteButton";
const Slider = ({ data, star, date }) => {
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
            <Card w="100%" h="100%" bg="rgba(0,0,0,0.7)">
              <CardBody padding="0" pos="relative">
                <Image
                  objectFit="cover"
                  objectPosition="center"
                  w={{ base: "100%" }}
                  maxH="120"
                  src={buildImageUrl(
                    movie.backdrop_path ||
                      movie.poster_path ||
                      movie.data.backdrop_path
                  )}
                  alt="Movie poster"
                />
                <Box pos="absolute" top="0" right="0">
                  {star && <FavouriteButton ID={movie.id || movie.data.id} />}
                </Box>
                <Stack mt="2" spacing="3" color="white" paddingLeft="3">
                  <Link href={`/movies/${movie.id || movie.data.id}`}>
                    <Text>{movie.title || movie.data.title}</Text>
                    {star && date ? (
                      <Text>
                        Release date:
                        <Badge ml="2">
                          {movie.release_date || movie.data.release_date}
                        </Badge>
                      </Text>
                    ) : movie.data ? (
                      <Text>
                        Seen at {Moment(movie.date).format("YYYY-MM-DD")}
                      </Text>
                    ) : (
                      <Text>Popularity: {movie.popularity}</Text>
                    )}
                  </Link>
                </Stack>
              </CardBody>
              <Divider />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
