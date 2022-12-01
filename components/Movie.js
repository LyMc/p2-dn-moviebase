import {
  Badge,
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Input,
  InputGroup,
  Link,
  Stack,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import { useSWRConfig } from "swr";
import Moment from "moment";

import HistoryButton from "./HistoryButton";
import { buildImageUrl, fetcher } from "utils/api";
import { useState } from "react";
const Movie = ({ data, date }) => {
  const [dateValue, setDateValue] = useState(null);
  const { mutate } = useSWRConfig();
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleChange = (e) => {
    setDateValue(e.target.value);
  };

  const handleChangeDate = (e, id) => {
    e.preventDefault();
    setLoadingBtn(true);
    if (dateValue) {
      mutate(
        `/api/history/changeDate`,
        async () =>
          await fetcher(`/api/history/changeDate?id=${id}`, {
            method: "PUT",
            body: JSON.stringify({
              newDate: dateValue,
            }),
          }).then(() => {
            setLoadingBtn(false);
          })
      );
    }
  };

  return (
    <WrapItem
      key={data.id}
      w={[300, 400, 500]}
      boxShadow="inner"
      p="1"
      rounded="md"
      bg="rgba(0,0,0,0.5)"
    >
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        bg="rgba(0,0,0,0.7)"
        key={data.id}
        w={[300, 400, 500]}
        border="none"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={buildImageUrl(data.poster_path)}
          alt="Movie poster"
          layout="responsive"
          maxH="280"
        />
        <CardBody w={[300, 400, 500]}>
          <Heading size="md">{data.title}</Heading>
          <Text py="2">{data.release_date}</Text>
          <Stack direction="row" flexWrap="wrap" mb="4">
            {data.genres?.map((genre) => (
              <Badge
                key={genre.id}
                colorScheme="purple"
                variant="outline"
                mb="2"
              >
                {genre.name}
              </Badge>
            ))}
          </Stack>
          <Stack direction="row" align="center">
            <HistoryButton ID={data.id} />
          </Stack>
          <Stack direction="row" align="center" mt="3">
            <InputGroup
              as="form"
              gap="2"
              onSubmit={(e) => handleChangeDate(e, data.id)}
            >
              <Input
                type="date"
                width="70%"
                value={dateValue || Moment(date).format("YYYY-MM-DD")}
                onChange={(e) => handleChange(e)}
              />
              <Button isLoading={loadingBtn} type="submit">
                Change
              </Button>
            </InputGroup>
          </Stack>
          <Stack>
            <Link href={`/movies/${data.id}`} mt="5">
              <Text>More...</Text>
            </Link>
          </Stack>
        </CardBody>
      </Card>
    </WrapItem>
  );
};

export default Movie;
