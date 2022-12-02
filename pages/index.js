import { Center, Box, Heading, CircularProgress } from "@chakra-ui/react";
import Slider from "components/Slider";
import Layout from "components/Layout";
import useSWR from "swr";
export default function Home() {
  const upcoming = useSWR("/api/upcoming");
  const history = useSWR("/api/history/history");
  const watchlist = useSWR("/api/watchlist/watchlist");
  const popular = useSWR("/api/popular");
  const top = useSWR("/api/top");

  const upcomingData = upcoming.data?.results;
  const historyData = history.data;
  const watchlistData = watchlist.data;
  const popularData = popular.data?.results;
  const topData = top.data?.results;

  if (
    !upcomingData &&
    !historyData &&
    !watchlistData &&
    !popularData &&
    !topData
  ) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  return (
    <Layout title="Main">
      <Center h="full" flexDirection="column" gap="5">
        <Box padding="0" margin="0">
          <Heading textAlign="left" margin="0" mb="3">
            {upcomingData && "Upcoming movies"}
          </Heading>

          <Slider data={upcomingData} star={true} date={true} />
        </Box>
        <Box padding="0" margin="0">
          <Heading textAlign="left" margin="0" mb="3">
            {popularData && "Popular now"}
          </Heading>
          <Slider data={popularData} star={true} />
        </Box>
        <Box padding="0" margin="0">
          <Heading textAlign="left" margin="0" mb="3">
            {topData && "Trending now"}
          </Heading>
          <Slider data={topData} star={true} />
        </Box>
        {historyData?.length > 0 && (
          <Box padding="0" margin="0">
            <Heading textAlign="left" margin="0" mb="3">
              {historyData && "Your history"}
            </Heading>
            <Slider data={historyData} />
          </Box>
        )}
        {watchlistData?.length > 0 && (
          <Box padding="0" margin="0">
            <Heading textAlign="left" margin="0" mb="3">
              {watchlistData && "Your watchlist"}
            </Heading>
            <Slider data={watchlistData} />
          </Box>
        )}
      </Center>
    </Layout>
  );
}
