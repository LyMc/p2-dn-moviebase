import { IconButton, Text, Tooltip } from "@chakra-ui/react";
import { AiFillLike } from "react-icons/ai";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "utils/api";
const LikeButton = ({ visibility, id }) => {
  const { data } = useSWR(`/api/like/${id}`);
  const { mutate } = useSWRConfig();
  return (
    <Tooltip label={data?.found ? "Appreciated" : "Like"}>
      <IconButton
        pos="absolute"
        right="2"
        top="1"
        visibility={visibility}
        borderRadius="3"
        _hover={{}}
        height="6"
        bg={data?.found ? "#FFDAB9" : "gray"}
        color={data?.found ? "crimson" : "white"}
        onClick={() => {
          mutate(`/api/like/${id}`, () =>
            fetcher(`/api/like/${id}`, {
              method: data.found ? "DELETE" : "PUT",
            })
          );
        }}
      >
        <AiFillLike />
      </IconButton>
    </Tooltip>
  );
};

export default LikeButton;
