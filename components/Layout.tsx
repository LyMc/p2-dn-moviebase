import Head from "next/head";
import Link from "next/link";
import { Box, Heading, Button, Container, useDisclosure, HStack, Stack, Spacer, VStack, Grid, ButtonProps } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

type MenuItemProps = {
    href: string;
} & ButtonProps

const MenuItem = (props: MenuItemProps) => (
    <Link href={props.href} passHref legacyBehavior>
        <Button as="a" variant="link" {...props}>
            {props.children}
        </Button>
    </Link>
);

function Header() {
    const { isOpen, onToggle } = useDisclosure();
    return (
        <Box bg="blue.500">
            <Container>
                <Stack as="nav" direction={['column', 'row']} justify="space-between" wrap="wrap" py="1.5rem">
                    <HStack justify="space-between">
                        <MenuItem href="/" mr={8}>
                            <Heading size="lg">Moviebase</Heading>
                        </MenuItem>
                        <Box display={['block', 'none']} onClick={onToggle}>
                            <Button variant="outline">
                            <HamburgerIcon />
                            </Button>
                        </Box>
                    </HStack>

                    <Stack direction={['column', 'row']} justify="start" align={['start', 'center']} display={[isOpen ? 'flex' : 'none', 'flex']} spacing={4}>
                        <MenuItem href="/search">Search</MenuItem>
                        <MenuItem href="/" disabled>Watchlist</MenuItem>
                        <MenuItem href="/" disabled>History</MenuItem>
                    </Stack>

                    <Spacer />

                    <Box display={[isOpen ? 'block' : 'none', 'block']}>
                        <MenuItem href="/" variant="outline" disabled>
                            What to watch
                        </MenuItem>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

type LayoutProps = {
    title: string;
} & ButtonProps;

export default function Layout(props: LayoutProps) {
    return (
        <>
            <Head>
                <title>{props.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid minH="100vh">
                <VStack w="full" align="stretch" spacing={8}>
                    <Header />
                    <Box as="main" h="full">{props.children}</Box>
                </VStack>
            </Grid>
        </>
    );
}