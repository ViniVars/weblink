import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Center,
  IconButton,
  AvatarBadge,
  Image,
  Avatar,
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BounceLoader from "react-spinners/BounceLoader"

export default function CreateAccount() {
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = () => {
    // Retrieve user name input value
    const userNameInput = document.getElementById('userNameInput').value;

    // Store user name in local storage
    localStorage.setItem('userName', userNameInput);

    // Show loading div
    setLoading(true);

    // Simulate form submission delay
    setTimeout(() => {
      // Navigate to the desired page
      navigate('/reg');
    }, 3000); // Change delay time as needed
  };

  return (
    <>
      {loading && (
      <Center
        position="fixed"
        top={0}
        left={0}
        bottom={0}
        right={0}
        backgroundColor="rgba(255, 255, 255, 0.5)"
        zIndex={9999}
      >
        <BounceLoader color="#36d7b7" />
      </Center>
    )}
    <Center minH={'100vh'}>
 
      <Flex flex={1} justify="center" align="center" padding={'50px'}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://firebasestorage.googleapis.com/v0/b/mycrush-9ec67.appspot.com/o/3.png?alt=media&token=1889c842-2a14-44ca-ad1b-f09cf41bf42e'
          }
        />

        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          marginLeft={'200px'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Create Account
          </Heading>
          <FormControl id="userName" isRequired>
            <FormLabel>User Icon</FormLabel>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src={image ? image : ""}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full" onClick={handleUploadButtonClick}>Change Icon</Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="userNameInput" isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="UserName"
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: 'gray.500' }}
              type="password"
            />
          </FormControl>
          <Stack spacing={4}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}>
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
         
        </Stack>
      </Flex>
    </Center>
    </>
  )
}