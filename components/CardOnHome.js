import {
  Badge,
  Box,
  CardBody,
  Divider,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import FavouriteButton from "./FavouriteButton";
import { buildImageUrl } from "utils/api";
import Moment from "moment";
import LikeButton from "./LikeButton";

const CardOnHome = ({ movie, star, date, gen }) => {
  const [active, setActive] = useState(false);
  return (
    <>
      <CardBody
        padding="0"
        pos="relative"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <Image
          objectFit="cover"
          objectPosition="center"
          borderTopRadius="3"
          w={{ base: "100%" }}
          maxH="120"
          src={buildImageUrl(
            movie.backdrop_path || movie.poster_path || movie.data.backdrop_path
          )}
          alt="Movie poster"
        />
        <Box pos="absolute" top="0" right="0">
          {star && <FavouriteButton ID={movie.id || movie.data.id} />}
        </Box>
        <Stack mt="2" spacing="3" color="white" paddingLeft="3" pos="relative">
          <LikeButton
            visibility={!active && "hidden"}
            id={movie.id || movie.data.id}
          />
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
              <Text>Seen at {Moment(movie.date).format("YYYY-MM-DD")}</Text>
            ) : gen ? (
              <Stack direction="row" flexWrap="wrap" mb="4">
                {movie.genres?.map((genre) => (
                  <Badge
                    key={genre.id}
                    colorScheme="purple"
                    variant="outline"
                    mb="2"
                  >
                    {genre.name}
                  </Badge>
                ))}
              </Stack>
            ) : (
              <div>Popularity: {movie.popularity}</div>
            )}
          </Link>
        </Stack>
      </CardBody>
      <Divider />
    </>
  );
};

export default CardOnHome;
