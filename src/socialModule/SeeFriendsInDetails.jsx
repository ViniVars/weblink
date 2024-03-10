import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
  Divider,
  VStack,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom';
export default function SocialProfileSimple() {
       const location = useLocation();
  const { name, imageUrl, isFollowing } = location.state;
  // Dummy data for joined clubs and activity feed
  const joinedClubs = ["Artwork",
    "Antiques",
    "Jewelry",
    "Coins and Currency",
    "Watches"];
  const activityFeed = [
    { action: "Bid on Horse Toy", amount: "$3" },
    { action: "Joined Photography Club" },
    { action: "Bid on Artwork", amount: "$25" }
  ];
 

  return (
    <Center py={10}>
      <Box
        maxW={'xl'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}>
        <Avatar
          size={'2xl'}
          src={
            imageUrl
          }
          mb={4}
          pos={'relative'}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={'4xl'} fontFamily={'body'}>
          {name}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          @{name}
        </Text>
        <Text
          textAlign={'center'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={6}>
          Actress, musician, songwriter and artist. PM for work inquires or{' '}
          <Text color={'blue.400'}>#tag</Text> me in your posts
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6} spacing={4}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            Followers: 1200
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            Following: 550
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            Posts: 300
          </Badge>
        </Stack>

        <Stack mt={8} direction={'row'} spacing={4}>
            <Button
      flex={1}
      fontSize={'lg'}
      rounded={'full'}
      bg={isFollowing ? 'green.400' : 'blue.400'} // Change color based on isFollowing
      color={'white'}
      boxShadow={
        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
      }
      _hover={{
        bg: isFollowing ? 'green.500' : 'blue.500', // Change hover color based on isFollowing
      }}
      _focus={{
        bg: isFollowing ? 'green.500' : 'blue.500', // Change focus color based on isFollowing
      }}>
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
          <Button
            flex={1}
            fontSize={'lg'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}>
            Message
          </Button>
        </Stack>

        <Divider mt={8} mb={6} />

        <VStack align="start" spacing={4}>
          <Heading size="md">Joined Clubs</Heading>
          {joinedClubs.map((club, index) => (
            <Badge key={index} px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'}>
              {club}
            </Badge>
          ))}
        </VStack>

        <Divider mt={8} mb={6} />

        <VStack align="start" spacing={4}>
          <Heading size="md">Activity Feed</Heading>
          {activityFeed.map((activity, index) => (
            <HStack key={index} spacing={4}>
              <Text>{activity.action}</Text>
              {activity.amount && <Badge px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'}>
                {activity.amount}
              </Badge>}
            </HStack>
          ))}
        </VStack>
      </Box>
    </Center>
  )
}
 