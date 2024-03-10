import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Center,
  Image,
  Select // Add Select component for dropdown
} from '@chakra-ui/react'
import { useState } from 'react'
import SelectInterest from './SelectIntrest';
import { useNavigate } from 'react-router-dom';
import BounceLoader from "react-spinners/BounceLoader"


export default function RegisterAccount() {
    const navigation = useNavigate()
      const [loading, setLoading] = useState(false);

  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');
  const [interests, setInterests] = useState([]);
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);

  const handleSubmit = () => {
    if (!privacyPolicyAccepted) {
      alert('Please accept the privacy policy.')
      return;
     
    }
    // Show loading div
    setLoading(true);

    // Simulate form submission delay
    setTimeout(() => {
      // Navigate to the desired page
      navigation('/home');
    }, 3000); 
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
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Enter the details</Heading>
          <FormControl id="location">
            <FormLabel>Location</FormLabel>
            <Select placeholder="Select location" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
              <option value="Houston">Houston</option>
              <option value="Other">Other</option>
            </Select>
          </FormControl>
          <FormControl id="age">
            <FormLabel>Age</FormLabel>
            <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          </FormControl>

          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox isChecked={privacyPolicyAccepted} onChange={(e) => setPrivacyPolicyAccepted(e.target.checked)}>I accept the privacy policy</Checkbox>
              <Text color={'blue.500'}>Forgot password?</Text>
            </Stack>
                <SelectInterest/>

            <Button colorScheme={'blue'} variant={'solid'} onClick={handleSubmit}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
    </>
  )
}