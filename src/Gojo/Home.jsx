import React, { useState, useEffect } from "react";
import { read } from "../App";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import TextRating from "./TextRating";
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { getStorage, ref as ref1,uploadBytes, listAll, getDownloadURL } from "firebase/storage";

export default function Home({db, s}) {
  var logs;
  const [cat, setCat] = useState("Price");
  const [list, setList] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageList, setInameList] = useState([])





    listAll(ref1(s, `Email/Coins`)).then((response) => {
      response.items.forEach(async (item) => {
        let url = await getDownloadURL(item)
          setInameList((prev) => url);
          return imageList
      });
    });


  async function check() {
    logs = await read("Varshith/Products");
    logs = Object.entries(logs);
    console.log(logs, "LOgs");
    let slist = [];
    let sea = document.querySelector(".search").value;
    console.log(sea, "Sea");
    if (cat == "Category") {
      for (const los in logs) {
        // console.log(logs[los][1].Cat)
        if (logs[los][1].Cat == sea) {
          slist.push(logs[los]);
        }
      }
    } else if (cat == "Price") {
      for (const los in logs) {
        if (parseInt(logs[los][1].Base) <= parseInt(sea)) {
          slist.push(logs[los]);
        }
      }
    } else if (cat == "Location") {
      for (const los in logs) {
        if (logs[los][1].Location == sea) {
          slist.push(logs[los]);
        }
      }
    }
    console.log(slist, "Slist");
    setList(slist);
  }
  useEffect(() => {
    async function fetchData() {
      logs = await read("Varshith/Products");
      logs = Object.entries(logs);
      // console.log(logs)
      setList(logs);
    }
    fetchData();
  }, []);

  return (
    <>
      

      <div className="search-con">
        <div className="auction-cover">
          <Link to={'/Add'}>
        <Button colorScheme='green' borderRadius={10} mt={2} ml={2}>New Auction</Button>
          </Link>
        </div>
        <div className="search-cover">
          <Button
            onClick={onOpen}
            colorScheme="blue"
            width={100}
            borderRadius={10}
          >
            Filters
          </Button>

          <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
                <div className="btns">
                  <div>
                    <button
                      onClick={() => {
                        setCat("Price");
                        document.querySelector('.search').value = '';
                        onClose()
                      }}
                    >
                      Price
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setCat("Location");
                        document.querySelector('.search').value = '';
                        onClose()
                      }}
                    >
                      Location
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setCat("Category");
                        document.querySelector('.search').value = '';
                        onClose()
                      }}
                    >
                      Category
                    </button>
                  </div>
                </div>


            </ModalContent>
          </Modal>
          <input type="text" className="search" placeholder={`Enter ${cat}`} />
          
          <Button
            onClick={check}
            colorScheme="blue"
            variant="outline"
            className="search-btn"
          >
            Search
          </Button>
        </div>

      </div>

      <div className="home-con">
      {list ? (
        list.map((lil) => (
          <div className="cont" key={lil} id={lil[0]}>
            <div className="img-con">
              <img
                className="img"
                src={lil[1].img}
                // src="https://img.etimg.com/thumb/width-1200,height-1200,imgsize-37850,resizemode-75,msid-106580228/news/international/us/jujutsu-kaisen-preview-is-gojo-making-a-return-key-details-here.jpg"
                alt=""
              />
            </div>
            <div className="content-con">
              <div className="nameprice-cov">
                <div className="cont1">{lil[0].split("_")[1]}</div>
                <TextRating rate = {lil[1].rate||0}/>
                <div className="price-cov">₹ {lil[1].Base}</div>
              </div>
              <div className="namebid-cov">
                <div className="name-cov">{lil[0].split("_")[0]}</div>
                <div className="bid-cov">
                  <Link key={lil} to={`/products/${lil[0]}`}> 
                    <Button borderRadius={40} colorScheme="green">
                      Add/See Bid
                    </Button>
                  </Link>
                </div>
                <div className="refcover">
                  <Link to={`/rev`}>Reviews</Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="loader-cover">
          <div class="loader">
            <div class="loader__bar"></div>
            <div class="loader__bar"></div>
            <div class="loader__bar"></div>
            <div class="loader__bar"></div>
            <div class="loader__bar"></div>
            <div class="loader__ball"></div>
          </div>
        </div>
      )}
    </div>
 
    </>
  );
}
