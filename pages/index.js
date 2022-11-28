import { Center, Heading } from "@chakra-ui/react";
import Layout from "components/Layout";

export default function Home() {
  return (
    <Layout title="Moviebase">
      <Center h="full">
        <Heading as="h2">Moviebase is Up and running</Heading>
      </Center>
    </Layout>
  );
}
