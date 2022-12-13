import Layout from "components/Layout";
import { Container, Progress } from "@chakra-ui/react";
import useSWR, { useSWRConfig } from "swr";
import Recommended from "components/Recommended";
export const Watch = () => {
  const { data } = useSWR(`/api/recommended/movie`);
  const { mutate } = useSWRConfig();

  const reroll = () => {
    mutate(`/api/recommended/movie`);
  };

  if (!data) {
    return <Progress size="xs" isIndeterminate />;
  }

  return <Recommended id={data.id} title={data.title} reroll={reroll} />;
};

export default function Watchlist() {
  return (
    <Layout title="Recommendation">
      <Container h="full">
        <Watch />
      </Container>
    </Layout>
  );
}
