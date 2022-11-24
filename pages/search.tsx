import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../components/Layout";

export default function Search(): JSX.Element {
    const { query } = useRouter().query;
    const { data, error } = useSWR(`/api/search?query=${query}`);

    return (
        <Layout title="Search" />
    );
};