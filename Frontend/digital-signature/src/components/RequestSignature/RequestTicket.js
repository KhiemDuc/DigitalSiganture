import {
  SimpleGrid,
  CardHeader,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";

const data = [
  {
    id: 1,
    name: "Chứng thư số",
    status: "Đã xác thực",
    date: "2021-09-01",
  },
  {
    id: 2,
    name: "Chữ ký số",
    status: "Đang chờ xác thực",
    date: "2022-09-01",
  },
  {
    id: 3,
    name: "Chữ ký số",
    status: "Từ chối",
    date: "2023-09-01",
  },
];

function RequestTicket() {
  return (
    <SimpleGrid
      spacing={3}
      templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
    >
      {data.map((item) => (
        <Card
          key={item.id}
          sx={{
            width: "100%",
            borderRadius: "15px",
            border: "1px solid #ccc",
          }}
          // variant={"filled"}
        >
          <CardHeader>
            <Heading size="lg">{item.name}</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
            <Text>Ngày yêu cầu {item.date}</Text>
            <Text>Trạng thái {item.status}</Text>
          </CardBody>
          <CardFooter
            sx={{
              justifyContent: "center",
            }}
          >
            <Button
              // isLoading
              loadingText="Submitting"
              border={"1px solid #7843e6"}
              variant="outline"
              color={"#7843e6"}
              borderRadius={"15px"}
            >
              Xem chi tiết đơn yêu cầu
            </Button>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
}

export default RequestTicket;
