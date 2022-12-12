import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import useSWR from "swr";
import { buildImageUrl } from "utils/api";
import {
  Badge,
  Box,
  Center,
  CircularProgress,
  Container,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import Layout from "components/Layout";
import HistoryButton from "components/HistoryButton";
import FavouriteButton from "components/FavouriteButton";

const MovieContent = () => {
  const { id } = useRouter().query;
  const { data, error } = useSWR(id && `/api/movies/${id}`);
  if (error) {
    return (
      <Text color="red">
        Error fetching movie with ID {id}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  if (data.success === false) {
    return <Text color="red">{data.status_message}</Text>;
  }
  return (
    <Stack
      direction={["column", "row"]}
      spacing={4}
      boxShadow="md"
      p="6"
      rounded="md"
      bg="rgba(0,0,0,0.2)"
    >
      <Head>
        <title>{data.title}</title>
      </Head>
      <Box minW="300px" pos="relative">
        <Image
          src={buildImageUrl(data.poster_path, "w300")}
          alt="Movie poster"
          width="300"
          height="450"
          unoptimized
          quality="75"
          priority
        />
      </Box>
      <Stack>
        <HStack justify="space-between">
          <Heading as="h2">{data.title}</Heading>
          <Box>
            <Tag colorScheme="purple" variant="solid">
              {data.release_date}
            </Tag>
          </Box>
        </HStack>
        <Box>{data.tagline}</Box>

        <Stack direction="row">
          {data.genres?.map((genre) => (
            <Badge key={genre.id} colorScheme="purple" variant="outline">
              {genre.name}
            </Badge>
          ))}
        </Stack>
        <Box color="#cccccc">{data.overview}</Box>
        <Stack direction="row">
          {new Date(data.release_date).getTime() < new Date().getTime() && (
            <HistoryButton />
          )}
          <FavouriteButton />
        </Stack>
        <Stack flex="1" justifyContent="end">
          <HStack justify="space-between">
            <Box>Votes: {data.vote_count}</Box>
            <Box>
              {data.spoken_languages.map((lg, i) => (
                <Text key={i}>{lg.name}</Text>
              ))}
            </Box>
          </HStack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default function Movie() {
  return (
    <Layout>
      <Container h="full">
        <MovieContent />
      </Container>
    </Layout>
  );
}
