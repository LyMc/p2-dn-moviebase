import { Center, Heading } from "@chakra-ui/react";
import Layout from "components/Layout";
import { MoviesContent } from "./watchlist";
import { Watch } from "./recommend";
import { HistoryContent } from "./history";
export default function Home() {
  return (
    <Layout title="Moviebase">
      <Center h="full"></Center>
    </Layout>
  );
}
