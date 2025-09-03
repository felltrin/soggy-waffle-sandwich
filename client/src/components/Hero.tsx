import { Button, Container, Flex, Stack, Text } from "@chakra-ui/react";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
    window.location.reload();
  };

  const goToRegister = () => {
    navigate("/register");
    window.location.reload();
  };

  return (
    <>
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
              onClick={goToRegister}
            >
              Get started
            </Button>

            <Link to={"/login"} onClick={goToLogin}>
              <Button
                size={"xl"}
                variant={"outline"}
                border={"2px solid"}
                borderColor={"black"}
              >
                Login
              </Button>
            </Link>
          </Flex>
        </Stack>
      </Container>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default Hero;
