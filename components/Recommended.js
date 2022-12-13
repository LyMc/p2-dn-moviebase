import {
  Badge,
  Card,
  CardBody,
  Center,
  CircularProgress,
  Heading,
  IconButton,
  Image,
  Link,
  Stack,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import { buildImageUrl } from "utils/api";
import FavouriteButton from "./FavouriteButton";
import HistoryButton from "./HistoryButton";
import { TiRefreshOutline } from "react-icons/ti";
const Recommended = ({ id, title, reroll }) => {
  const { data, error } = useSWR(id && `/api/recommended/${id}`);

  if (error) {
    return <Text color="red">An error occured</Text>;
  }

  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  return (
    <>
      {title ? (
        <Heading mb="5" display="flex" justifyContent="space-between">
          <Text>
            Because you watched{" "}
            <Text as="span" color="grey">
              {title}
            </Text>
          </Text>
          <Tooltip label="Re-roll">
            <IconButton bg="" fontSize="32">
              <TiRefreshOutline cursor="pointer" onClick={reroll} />
            </IconButton>
          </Tooltip>
        </Heading>
      ) : (
        <Heading>Our recommendations</Heading>
      )}
      <Wrap spacing="30px" justify="space-evenly">
        {data.results.length > 0 ? (
          data.results.map((movie) => (
            <WrapItem
              key={movie.id}
              w={[300, 400, 500]}
              boxShadow="inner"
              p="1"
              rounded="md"
              bg="rgba(0,0,0,0.5)"
            >
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                bg="rgba(0,0,0,0.7)"
                key={movie.id}
                w={[300, 400, 500]}
                border="none"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src={buildImageUrl(movie.poster_path)}
                  alt="Movie poster"
                  layout="responsive"
                  maxH="225"
                />
                <CardBody w={[300, 400, 500]}>
                  <Heading size="md">{movie.title}</Heading>
                  <Text py="2">{movie.release_date}</Text>
                  <Text mb="2">Popularity {movie.popularity}</Text>
                  <Stack direction="row">
                    <HistoryButton ID={movie.id} />
                    <FavouriteButton ID={movie.id} />
                  </Stack>
                  <Stack>
                    <Link href={`/movies/${movie.id}`} mt="5">
                      <Text>More...</Text>
                    </Link>
                  </Stack>
                </CardBody>
              </Card>
            </WrapItem>
          ))
        ) : (
          <Heading>Nothing to recommend...</Heading>
        )}
      </Wrap>
    </>
  );
};

export default Recommended;
