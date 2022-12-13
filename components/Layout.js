import Head from "next/head";
import Link from "next/link";
import {
  Box,
  Heading,
  Button,
  Container,
  useDisclosure,
  HStack,
  Stack,
  Spacer,
  VStack,
  Grid,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const MenuItem = ({ href, children, ...props }) => (
  <Link href={href} passHref legacyBehavior>
    <Button as="a" variant="" {...props} _hover={{ color: " grey" }}>
      {children}
    </Button>
  </Link>
);

function Header() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box bgGradient="linear(#000000 50%, #181A1B)">
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

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        <link rel="icon" href="../public/favicon.ico" />
      </Head>
      <Grid minH="100vh" bg="#181A1B">
        <VStack w="full" align="stretch" spacing={8}>
          <Header />
          <Box as="main" h="full" paddingBottom="10">
            {children}
          </Box>
        </VStack>
      </Grid>
    </>
  );
}
