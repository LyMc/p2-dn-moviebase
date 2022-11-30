import { ViewIcon } from "@chakra-ui/icons";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "utils/api";

export default function HistoryButton({ ID }) {
  let { id } = useRouter().query;
  if (!id) {
    id = ID;
  }
  const { data } = useSWR(`/api/history/${id}`);
  const { mutate } = useSWRConfig();
  return (
    <Tooltip label={data?.found ? "Remove from history" : "Add to history"}>
      <IconButton
        isLoading={!data}
        color={data?.found ? "green" : "white"}
        colorScheme={data?.found ? "green" : "gray"}
        size="sm"
        onClick={() => {
          mutate(`/api/history/${id}`, () =>
            fetcher(`/api/history/${id}`, {
              method: data.found ? "DELETE" : "PUT",
            })
          );
        }}
      >
        <ViewIcon w={6} h={6} />
      </IconButton>
    </Tooltip>
  );
}
