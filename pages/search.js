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
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Layout from "components/Layout";

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
      {data.results.map(({ id, title, release_date, popularity, overview }) => (
        <ListItem
          key={id}
          display="flex"
          flexDir="column"
          alignItems="start"
          mb="10"
          gap="1"
          color=" #cccccc"
          boxShadow="md"
          p="6"
          rounded="md"
        >
          <Link href={`/movies/${id}`} passHref legacyBehavior>
            <Button as="a" variant="link">
              <Text as="span" color="white" fontSize="20">
                {title}
              </Text>
            </Button>
          </Link>
          <Text as="popularity">Release Date: {release_date}</Text>
          <Text as="popularity">Popularity: {popularity}</Text>
        </ListItem>
      ))}
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
