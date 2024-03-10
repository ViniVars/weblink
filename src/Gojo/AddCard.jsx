import { onValue, ref, update } from "firebase/database";

import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import React, { useState } from "react";
import { v4 } from "uuid";
import {
  getStorage,
  ref as ref1,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { Link } from "react-router-dom";

export default function AddCard({ db, storage }) {
  const [imageUpload, setImageUpload] = useState(null);

  const uploadImage = (name) => {
    if (imageUpload == null) return;
    const imageRef = ref1(storage, `Email/${name}/${v4()}`);
    uploadBytes(imageRef, imageUpload);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImageUpload(file);
  };

  async function add() {
    let name = document.querySelector(".name").value;
    let cat = document.querySelector(".cat").value;
    let base = document.querySelector(".base-price").value;
    let loc = document.querySelector(".location").value;
    let date = document.querySelector(".date").value;
    let img1 = document.querySelector(".pro-img").value;
    let date1 = new Date(date);
    uploadImage(name);
    update(ref(db, `Varshith/Products`), {
      [`Email_${name}`]: {
        Base: parseInt(base),
        Location: loc,
        Author: "Author",
        Time: date1,
        Cat: cat,
        img : img1,
        Bid: {
          Bid1: "",
          Bid2: "",
          Bid3: "",
        },
      },
    });
    update(ref(db, `Varshith/Login/Email`), {
      [name]: base,
    });
  }

  return (
    <>
      <Container
        bg="#9DC4FB"
        maxW="full"
        mt={0}
        centerContent
        overflow="hidden"
      >
        <Flex>
          <Box
            bg="#02054B"
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}
          >
            <Box p={4}>
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <WrapItem>
                  <Box>
                    <Heading>Need Help? Contact Us.</Heading>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                      Fill up the Form to put your product to sale
                    </Text>
                    <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                      <VStack pl={0} spacing={3} alignItems="flex-start">
                        <Button
                          size="md"
                          height="48px"
                          width="200px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: "2px solid #1C6FEB" }}
                          leftIcon={<MdPhone color="#1970F1" size="20px" />}
                        >
                          +91-988888888
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          width="200px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: "2px solid #1C6FEB" }}
                          leftIcon={<MdEmail color="#1970F1" size="20px" />}
                        >
                          hello@abc.com
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          width="200px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: "2px solid #1C6FEB" }}
                          leftIcon={
                            <MdLocationOn color="#1970F1" size="20px" />
                          }
                        >
                          Karnavati, India
                        </Button>
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
                <WrapItem>
                  <Box bg="white" borderRadius="lg">
                    <Box m={8} color="#0B0E3F">
                      <VStack spacing={5}>
                        <FormControl id="name">
                          <FormLabel>Product Name</FormLabel>
                          <input type="text" className="name" />
                        </FormControl>
                        <FormControl id="name">
                          <FormLabel>Base Price</FormLabel>
                          <input type="text" className="base-price" />
                        </FormControl>
                        <FormControl id="name">
                          <FormLabel>Category</FormLabel>
                          <input type="text" className="cat" />
                        </FormControl>
                        <FormControl id="name">
                          <FormLabel>Last date</FormLabel>
                          <input type="date" className="date" />
                        </FormControl>
                        <FormControl id="name">
                          <FormLabel>Upload Product Image Link</FormLabel>
                          <input
                            type="type"
                            className="pro-img"
                          />
                        </FormControl>
                        <FormControl id="name">
                          <FormLabel>Location</FormLabel>
                          <Textarea
                            borderColor="gray.300"
                            _hover={{
                              borderRadius: "gray.300",
                            }}
                            placeholder="message"
                            className="location"
                          />
                        </FormControl>
                        <FormControl id="name" float="right">
                            <Link to={`/home`} >
                                <Button
                                    variant="solid"
                                    bg="#0D74FF"
                                    color="white"
                                    _hover={{}}
                                    onClick={add}
                                >
                                    Start Auction
                                </Button>
                            </Link>
                        </FormControl>
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Container>

      {/* <div className="con">
        <div className="name-con"></div>
        <div className="base-price-con"></div>
        <div className="img-con"></div>
        <div className="Location-con">
          <textarea rows={10} cols={70} className="location"></textarea>
        </div>
        <div className="cat-con"></div>
        <div className="date-con"></div>
        <div className="sub">
          <button onClick={add}>Submit</button>
        </div>
      </div> */}
    </>
  );
}
