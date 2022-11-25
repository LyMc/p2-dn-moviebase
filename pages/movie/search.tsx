import { SearchIcon } from "@chakra-ui/icons";
import { Container, IconButton, Input, InputGroup, InputRightElement, VStack, Text, Progress, UnorderedList, ListItem, Button, Badge } from "@chakra-ui/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Layout from "../../components/Layout";
import { fetcher } from "../../utils/api";
import { ERROR_UNEXPECTED } from "../../utils/errors";
import { MovieSearchData } from "../../utils/types";

type RenderResultsProps = {
    query: string;
};

function RenderResults(props: RenderResultsProps): JSX.Element {
    const { data, error } = useSWR<MovieSearchData>(`/api/movie/search/?query=${props.query}`, fetcher);
    return (
        <>
            {error ? (
                <Text color="red">{ERROR_UNEXPECTED}</Text>
            ): !data ? (
                <Progress size="xs" isIndeterminate />
            ): !data.results?.length ? (
                <Text>No results</Text>
            ): (
                <UnorderedList stylePosition="inside">
                    {data.results.map((result, index) => (
                        <ListItem key={index}>
                            <Link href={`/movie/details/${result.id}`}>
                                <Button as="a" variant="link" rightIcon={<Badge>{result.release_date}</Badge>}>
                                    <Text as="span">{result.title}</Text>
                                </Button>
                            </Link>
                        </ListItem>
                    ))}
                </UnorderedList> 
            )}
        </>
    );
}

export default function Search(): JSX.Element {
    const [searchText, setSearchText] = useState<string>("");

    return (
        <Layout title="Search">
            <Container>
                <VStack spacing={4} align="stretch">
                    <InputGroup as={"form"} onSubmit={(e) => e.preventDefault()}>
                        <Input placeholder="Search for a movie" onChange={(e) => setSearchText(e.target.value)} />
                        <InputRightElement>
                            <IconButton aria-label="Search" icon={<SearchIcon />} type="submit" />
                        </InputRightElement>
                    </InputGroup>
                    <RenderResults query={searchText} />
                </VStack>
            </Container>
        </Layout>
    );
};