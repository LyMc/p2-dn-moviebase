import { StarIcon } from "@chakra-ui/icons";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "utils/api";

export default function FavouriteButton({ ID }) {
  let { id } = useRouter().query;
  if (!id) {
    id = ID;
  }
  const { data } = useSWR(`/api/watchlist/${id}`);
  const { mutate } = useSWRConfig();
  return (
    <Tooltip label={data?.found ? "Remove from watchlist" : "Add to Watchlist"}>
      <IconButton
        isLoading={!data}
        color={data?.found ? "gold" : "white"}
        colorScheme={data?.found ? "yellow" : "gray"}
        size="sm"
        onClick={() => {
          mutate(`/api/watchlist/${id}`, () =>
            fetcher(`/api/watchlist/${id}`, {
              method: data.found ? "DELETE" : "PUT",
            })
          );
        }}
      >
        <StarIcon w={6} h={6} />
      </IconButton>
    </Tooltip>
  );
}
