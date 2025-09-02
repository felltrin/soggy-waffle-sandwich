import { Container, Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Container maxW={"full"} bg={"#fff"}>
      <Flex
        minH={"10vh"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Flex>
          <Text>® 2025 Aether. All rights reserved</Text>
        </Flex>
        <Flex gap={3}>
          <Text>Terms of Service</Text>
          <Text>Privacy</Text>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Footer;
