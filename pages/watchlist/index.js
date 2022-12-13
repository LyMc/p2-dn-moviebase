import Layout from "components/Layout";
import useSWR from "swr";

import {
  Badge,
  Card,
  CardBody,
  Center,
  CircularProgress,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { buildImageUrl } from "utils/api";
import HistoryButton from "components/HistoryButton";
import FavouriteButton from "components/FavouriteButton";
export const MoviesContent = () => {
  const { data, error } = useSWR(`/api/watchlist/watchlist`);
  if (error) {
    return <Center h="full">An error has occured</Center>;
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
      {data.length > 0 ? (
        data.map((movie) => (
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
                <Stack direction="row">
                  {new Date(movie.release_date).getTime() <
                    new Date().getTime() && <HistoryButton ID={movie.id} />}
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
        <div>{data.data}</div>
      )}
    </>
  );
};
export default function Watchlist() {
  return (
    <Layout title="Watchlist">
      <Wrap spacing="30px" justify="space-evenly">
        <MoviesContent />
      </Wrap>
    </Layout>
  );
}
