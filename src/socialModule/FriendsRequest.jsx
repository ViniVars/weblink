import React, { useState } from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';

function FriendRequestUI() {
    const navigate = useNavigate();
     const handleClick = () => {
    navigate("/", {
      state: {
        name: request.name,
        imageUrl: request.imageUrl,
        isFollowing: request.isFollowing
      }
    });
  };
   
  const [friendRequests, setFriendRequests] = useState(
    Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      name: faker.person.fullName(),
      mutualFriends: Math.floor(Math.random() * 10),
      imageUrl:  faker.image.avatar(),
      isFollowing: false,
    }))
  );

  const handleFollow = (id) => {
    const updatedRequests = friendRequests.map((request) =>
      request.id === id ? { ...request, isFollowing: !request.isFollowing } : request
    );
    setFriendRequests(updatedRequests);
  };

  return (
    <ChakraProvider>
      <Container maxW="container.sm" mt="6">
        <Box border="1px" borderColor="gray.200" p="4" borderRadius="md">
          <Flex justify="space-between" align="center" mb="4">
            <Heading size="md">Friend Recomandation</Heading>
            <Text color="gray.500">See All</Text>
          </Flex>
          {friendRequests.map((request) => (
            <Flex key={request.id} align="center" mb="4" >
              <Box mr="4" >
                <Box
                  w="10"
                  h="10"
                  borderRadius="full"
                  overflow="hidden"
                  border="2px"
                  borderColor="gray.200"
                >
                  <img
                    src={request.imageUrl}
                    alt={request.name}
                    onClick={() => {
    navigate("/seeFri", {
      state: {
        name: request.name,
        imageUrl: request.imageUrl,
        isFollowing: request.isFollowing
      }
    });}}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              </Box>
              <Flex direction="column">
                <Text fontWeight="bold">{request.name}</Text>
                <Text color="gray.500" fontSize="sm">
                  {request.mutualFriends} mutual{' '}
                  {request.mutualFriends === 1 ? 'friend' : 'friends'}
                </Text>
              </Flex>
              <Button
                colorScheme={request.isFollowing ? 'gray' : 'blue'}
                size="sm"
                ml="auto"
                onClick={() => handleFollow(request.id)}
              >
                {request.isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            </Flex>
          ))}
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default FriendRequestUI;

