import Layout from "components/Layout";
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
const MoviesContent = () => {
  return <div>content</div>;
};
export default function Watchlist() {
  return (
    <Layout title="Watchlist">
      <Container h="full">
        <MoviesContent />
      </Container>
    </Layout>
  );
}
