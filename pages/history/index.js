import Layout from "components/Layout";
import useSWR, { useSWRConfig } from "swr";
import Movie from "components/Movie";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  Link,
  Stack,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

export const HistoryContent = () => {
  const { data, error } = useSWR(`/api/history/history`);

  if (error) {
    return <Center h="full">An error occured</Center>;
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
        data.map(({ data, date }) => (
          <Movie key={data.id} data={data} date={date} />
        ))
      ) : (
        <div>Your history is empty</div>
      )}
    </>
  );
};
export default function Watchlist() {
  return (
    <Layout title="Watchlist">
      <Wrap spacing="50px" justify="center">
        <HistoryContent />
      </Wrap>
    </Layout>
  );
}
