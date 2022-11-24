import { Center, Heading } from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout";

export default function Home(): JSX.Element {
    return (
        <Layout title="Home">
            <Center h="full">
                <Heading as="h2">Working</Heading>
            </Center>
        </Layout>
    );
};