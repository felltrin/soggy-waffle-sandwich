import { Container, Flex, Stack, Text } from "@chakra-ui/react";
import { ChartLine, ClipboardPen, UserRound } from "lucide-react";

const FeatureSection = () => {
  return (
    <Container maxW={"full"} p={8} bg={"#fff"}>
      <Stack gap={100}>
        <Flex>
          <Text textStyle={"2xl"}>Features</Text>
        </Flex>
        <Stack minH={"30vh"} alignItems={"center"} pt={6} gap={4}>
          <Flex justifyContent={"space-between"} gap={14}>
            <Flex>
              <Stack>
                <Flex alignItems={"center"}>
                  <UserRound size={64} />
                  <Text fontWeight={"bold"} textStyle={"3xl"}>
                    Community
                  </Text>
                </Flex>
                <Flex maxW={"300px"}>
                  <Text>
                    Find your place in the world of fitness! Share your progress
                    with other people
                  </Text>
                </Flex>
              </Stack>
            </Flex>
            <Flex>
              <Stack>
                <Flex alignItems={"center"} gap={2}>
                  <ChartLine size={64} />
                  <Text fontWeight={"bold"} textStyle={"3xl"}>
                    View Progress
                  </Text>
                </Flex>
                <Flex maxW={"300px"}>
                  <Text>
                    Monitor your fitness progress with detailed charts and
                    analytics
                  </Text>
                </Flex>
              </Stack>
            </Flex>
            <Flex>
              <Stack>
                <Flex alignItems={"center"}>
                  <ClipboardPen size={64} />
                  <Text fontWeight={"bold"} textStyle={"3xl"}>
                    Log Workouts
                  </Text>
                </Flex>
                <Flex maxW={"300px"}>
                  <Text>
                    Keep an eye on your goals and progress. See how much you are
                    improving week by week
                  </Text>
                </Flex>
              </Stack>
            </Flex>
          </Flex>
        </Stack>
      </Stack>
    </Container>
  );
};

export default FeatureSection;
