import React, { useState } from 'react';
import { Flex, Text, Avatar, IconButton, Box } from '@chakra-ui/react';
import { AiOutlineHeart, AiOutlineComment, AiOutlineShareAlt } from 'react-icons/ai';

const Notification = ({ username, message, avatarUrl }) => {
  return (
    <Flex p="3" borderBottom="1px solid #E2E8F0" alignItems="center">
      <Avatar src={avatarUrl} size="lg" mr="3" />
      <Flex direction="column" flex="1">
        <Text fontWeight="bold" fontSize="md">{username}</Text>
        <Text fontSize="sm">{message}</Text>
      </Flex>
    </Flex>
  );
};

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    {
    username: 'Priya',
    message: 'messaged you',
    avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    username: 'John',
    message: 'won the bid',
    avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    username: 'Emma',
    message: 'liked your photo',
    avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    username: 'Alex',
    message: 'lost the bid',
    avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    username: 'Sophia',
    message: 'commented on your post',
    avatarUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
  {
    username: 'Daniel',
    message: 'sent you a friend request',
    avatarUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
  },
  {
    username: 'Ava',
    message: 'shared a post with you',
    avatarUrl: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    username: 'William',
    message: 'tagged you in a photo',
    avatarUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
  },
  {
    username: 'Olivia',
    message: 'replied to your comment',
    avatarUrl: 'https://randomuser.me/api/portraits/women/10.jpg',
  },
  {
    username: 'Michael',
    message: 'added you as a collaborator',
    avatarUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  {
    username: 'Isabella',
    message: 'asked you to join an event',
    avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    username: 'Ethan',
    message: 'mentioned you in a post',
    avatarUrl: 'https://randomuser.me/api/portraits/men/13.jpg',
  },
  ]);

  return (
    <Box
      bg="white"
      boxShadow="md"
      borderRadius="lg"
      p="4"
      w="400px"
      m="auto"
      mt="20px" // Adjust the margin top here
    >
      <Text fontWeight="bold" fontSize="xl" mb="3" textAlign="center">
        Notifications
      </Text>
      {notifications.map((notification, index) => (
        <Notification key={index} {...notification} />
      ))}
      <Flex mt="3" justifyContent="center">
        <IconButton aria-label="Like" icon={<AiOutlineHeart />} size="lg" mx="2" />
        <IconButton aria-label="Comment" icon={<AiOutlineComment />} size="lg" mx="2" />
        <IconButton aria-label="Share" icon={<AiOutlineShareAlt />} size="lg" mx="2" />
      </Flex>
    </Box>
  );
};

export default NotificationPanel;
