import { Button, Container, Flex, Stack, Text } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Container maxW={"full"} p={8} bg={"#b6f27272"}>
      <Stack minH={"35vh"} alignItems={"center"} pt={16} gap={4}>
        <Text fontWeight={"bold"} textStyle={"6xl"}>
          Start your journey today!
        </Text>
        <Text>Aether is your all-in-one stop for all fitness needs</Text>
        <Flex gap={3}>
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
    </Container>
  );
};

export default Hero;
