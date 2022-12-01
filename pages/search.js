import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import {
  Input,
  IconButton,
  Container,
  UnorderedList,
  ListItem,
  Progress,
  Text,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  Image,
  Card,
  CardBody,
  Heading,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Layout from "components/Layout";
import { buildImageUrl } from "utils/api";

function SearchBar() {
  const router = useRouter();
  const { terms } = router.query;
  const [text, setText] = useState("");

  // Update text input when route changes (ex when user goes back/forward)
  useEffect(() => {
    setText(terms || "");
  }, [terms]);

  // Update router history if a search was performed
  const handleSearch = (event) => {
    event.preventDefault();
    if (text !== terms) {
      router.push(`/search/?terms=${text}`, undefined, { shallow: true });
    }
  };

  return (
    <InputGroup
      as="form"
      onSubmit={handleSearch}
      outline="1.5px solid black"
      rounded="md "
    >
      <Input
        placeholder="Search for a movie..."
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <InputRightElement>
        <IconButton
          aria-label="Search for a movie"
          icon={<SearchIcon />}
          type="submit"
        />
      </InputRightElement>
    </InputGroup>
  );
}
function SearchResults() {
  const { terms } = useRouter().query;
  const { data, error } = useSWR(terms && `/api/search?terms=${terms}`);
  if (!terms) {
    return <Text>Type some terms and submit for a quick search</Text>;
  }

  if (error) {
    return (
      <Text color="red">
        Error fetching movies for {terms}: {JSON.stringify(error)}
      </Text>
    );
  }

  if (!data) {
    return <Progress size="xs" isIndeterminate />;
  }

  if (!data.results.length) {
    return <Text>No results</Text>;
  }

  return (
    <UnorderedList stylePosition="inside">
      {data.results.map(
        ({ id, title, release_date, popularity, poster_path }) => (
          <Link href={`/movies/${id}`} key={id}>
            <ListItem
              display="flex"
              flexDir="column"
              alignItems="start"
              mb="6"
              gap="1"
              color=" #cccccc"
              boxShadow="md"
              p="6"
              rounded="md"
              bg="rgba(0,0,0,0.5)"
              _hover={{ filter: "blur(0.8px)" }}
            >
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                border="none"
                w="100%"
                padding="0"
              >
                <Image
                  maxW={{ base: "100%", sm: "50px" }}
                  src={buildImageUrl(poster_path)}
                  alt="Movie poster"
                  layout="responsive"
                  maxH="225"
                  objectFit="cover"
                  objectPosition="center"
                />
                <CardBody>
                  <Heading size="md">{title}</Heading>
                  <Text>Release Date: {release_date}</Text>
                  <Text>Popularity: {popularity}</Text>
                </CardBody>
              </Card>
            </ListItem>
          </Link>
        )
      )}
    </UnorderedList>
  );
}

export default function Search() {
  return (
    <Layout title="Search">
      <Container>
        <VStack spacing={4} align="stretch">
          <SearchBar />
          <SearchResults />
        </VStack>
      </Container>
    </Layout>
  );
}
