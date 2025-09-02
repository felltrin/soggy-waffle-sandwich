import { Button, Container, Flex, Stack, Text } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Container maxW={"full"} p={8} bg={"#fff"}>
      <Stack minH={"fit"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex>
            <Text fontWeight={"bold"} textStyle={"3xl"}>
              Aether
            </Text>
          </Flex>
          <Flex gap={3}>
            <Text textStyle={"xl"}>Features</Text>
            <Text textStyle={"xl"}>About Us</Text>
            <Text textStyle={"xl"}>Contact</Text>
          </Flex>
          <Flex>
            <Button
              size={"xl"}
              bg={"#ED4F01"}
              textStyle={"xl"}
              _hover={{ bg: "#000" }}
            >
              Get Started
            </Button>
          </Flex>
        </Flex>
      </Stack>
    </Container>
  );
};

export default NavBar;
