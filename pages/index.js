import {
  Center,
  Box,
  Heading,
  CircularProgress,
  Image,
  Grid,
  VStack,
  Container,
  Stack,
  useDisclosure,
  HStack,
  Button,
  Spacer,
} from "@chakra-ui/react";
import Slider from "components/Slider";
import useSWR from "swr";
import Head from "next/head";
import Link from "next/link";

import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";

const MenuItem = ({ href, children, ...props }) => (
  <Link href={href} passHref legacyBehavior>
    <Button as="a" variant="" {...props} _hover={{ color: " grey" }}>
      {children}
    </Button>
  </Link>
);
function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const [scrolled, setScrolled] = useState(false);
  window.onscroll = () => {
    setScrolled(window.pageYOffset === 0 ? false : true);
  };

  return (
    <Box
      bg={scrolled && "#181A1B"}
      bgGradient={
        !scrolled && "linear(to top, transparent 0%, rgba(0,0,0,0.4) 90%)"
      }
      pos="fixed"
      w="full"
      zIndex="9999999999"
    >
      <Container>
        <Stack
          as="nav"
          direction={["column", , "row"]}
          justify="space-between"
          wrap="wrap"
          py="1.5rem"
        >
          <HStack justify="space-between">
            <MenuItem href="/" mr={8}>
              <Heading size="lg">Main page</Heading>
            </MenuItem>
            <Box display={["block", , "none"]} onClick={onToggle}>
              <Button variant="outline">
                <HamburgerIcon />
              </Button>
            </Box>
          </HStack>
          <Stack
            direction={["column", , "row"]}
            justify="start"
            align={["start", , "center"]}
            display={[isOpen ? "flex" : "none", , "flex"]}
            spacing={4}
          >
            <MenuItem href="/search">Search</MenuItem>
            <MenuItem href="/watchlist">Watchlist</MenuItem>
            <MenuItem href="/history">History</MenuItem>
          </Stack>

          <Spacer />

          <Box display={[isOpen ? "block" : "none", , "block"]}>
            <MenuItem href="/recommend" variant="outline">
              What to watch
            </MenuItem>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
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
    <>
      <Head>
        {<title>Main page</title>}
        <link rel="icon" href="../public/favicon.ico" />
      </Head>
      <Grid minH="100vh" bg="#181A1B" pos="relative">
        <VStack w="full" align="stretch" spacing={8}>
          <Header />
          <Box
            as="main"
            h="full"
            paddingBottom="10"
            className="main-content-big-o"
          >
            <Center h="full" flexDirection="column" gap="5">
              <Image
                width="full"
                height="400"
                src="https://images2.alphacoders.com/708/708521.jpg"
                alt="bg"
              ></Image>

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
                    {historyData && "Watch again"}
                  </Heading>
                  <Slider data={historyData} />
                </Box>
              )}
              {watchlistData?.length > 0 && (
                <Box padding="0" margin="0">
                  <Heading textAlign="left" margin="0" mb="3">
                    {watchlistData && "Your watchlist"}
                  </Heading>
                  <Slider data={watchlistData} gen={true} />
                </Box>
              )}
            </Center>
          </Box>
        </VStack>
      </Grid>
    </>
  );
}
