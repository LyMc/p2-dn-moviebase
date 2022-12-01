import Layout from "components/Layout";
import { Container, Progress } from "@chakra-ui/react";
import useSWR from "swr";
import Recommended from "components/Recommended";
export const Watch = () => {
  const { data } = useSWR(`/api/recommended/movie`);
  if (!data) {
    return <Progress size="xs" isIndeterminate />;
  }

  return <Recommended id={data.id} title={data.title} />;
};

// request in db care va genera film deja vizionat
// daca istoricul de vizionare este gol vom genera un id random pentru film
// dupa ce primim id-ul filmului facem alt request care ne va afisa filmele recomandate  filmului din istoric
export default function Watchlist() {
  return (
    <Layout title="Recommendation">
      <Container h="full">
        <Watch />
      </Container>
    </Layout>
  );
}
