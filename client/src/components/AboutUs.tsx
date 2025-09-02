import { Button, Container, Flex, Stack, Text } from "@chakra-ui/react";

const AboutUs = () => {
  return (
    <Container maxW={"full"} bg={"#b6f27272"}>
      <Stack minH={"50vh"} gap={14} pt={4}>
        <Flex>
          <Text textStyle={"2xl"}>About Us</Text>
        </Flex>
        <Stack alignItems={"center"} justifyContent={"center"} gap={10}>
          <Flex maxW={"750px"} textStyle={"4xl"}>
            <Text textAlign={"center"}>
              We are a organization rethinking what it means to track your
              workouts. This is transforming the mundane into a fun activity to
              be experienced. Come join us!{" "}
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"} gap={16}>
            <Button
              size={"xl"}
              bg={"#ED4F01"}
              textStyle={"xl"}
              _hover={{ bg: "#000" }}
            >
              Get started
            </Button>
            <Button
              size={"xl"}
              variant={"outline"}
              border={"2px solid"}
              borderColor={"black"}
            >
              Login
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </Container>
  );
};

export default AboutUs;
