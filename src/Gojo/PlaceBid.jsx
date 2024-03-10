import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { read } from "../App";
import { Button } from "@chakra-ui/button";
import { Badge } from "@chakra-ui/layout";
import StarRating from "./TextRating";
import Bidding from "./Bidding";
import Swal from "sweetalert2";
import { update, ref } from 'firebase/database';
import ReviewPage from "./Review";



export default function PlaceBid({ db }) {
    let bid1, bid2, bid3
    const [sel, setBid3] = useState(0)
    const [duedate, setdue] = useState("Bid")
    const [lil, setLil] = useState(false);
    const { postid } = useParams();

    async function bid(){

        let bid1, bid2, bid3;
        let nbid = document.querySelector('.bid').value;
        let Bid = await read(`Varshith/Products/${postid}`)
        // console.log(postid)
        let date2 = new Date();
        let Bid1 = Bid.Time.toString().split('T')[0].split('-')
        if(date2.getMonth()+1 <= parseInt(Bid1[1])){
            console.log('Done')
        }
        console.log(date2.getDate(),date2.getMonth()+1, date2.getFullYear() )
        if(date2.getDate() <= parseInt(Bid1[2]) && date2.getMonth()+1 <= parseInt(Bid1[1]) && date2.getFullYear() <= parseInt(Bid1[0])){
            console.log(postid)
            bid1 = Bid.Bid.Bid1.split('_')[0];
            bid2 = Bid.Bid.Bid2.split('_')[0];
            bid3 = Bid.Bid.Bid3.split('_')[0];
            if(nbid < bid3 || nbid < Bid.Base){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Your Bid was lower than Base price",
                    // footer: '<a href="#">Why do I have this issue?</a>'
                  });
                return
            }
            else if(nbid == bid1 || nbid == bid2 || nbid == bid3){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Your Bid is Equal to an other Bid",
                    // footer: '<a href="#">Why do I have this issue?</a>'
                  });
                return
            }
            else if(nbid > bid1){
                bid3 = bid2;
                bid2 = bid1;
                bid1 = nbid;
                setBid3(prev => prev+1)
            }
            else if(nbid > bid2){
                bid3 = bid2;
                bid2 = nbid;
                setBid3(prev => prev+1)
            }
            else if(nbid > bid3){
                bid3 = nbid;
                setBid3(prev => prev+1)
            }
            update(ref(db, `Varshith/Products/${postid}`), {
                Bid : {
                    Bid1 : `${bid1}_User1`,
                    Bid2 : `${bid2}_User2`,
                    Bid3 : `${bid3}_User3`,
                }
            })
            Swal.fire({
                title: "Bid Succesfull",
                text: `Your Bid for ${nbid} is succeaafull`,
                icon: "success"
              });
        }
        else{
            setdue("Due Date Over!")
            Swal.fire({
                icon: "Bid Failed",
                title: "Oops...",
                text: "Due Date For Bid is Completed",
                // footer: '<a href="#">Why do I have this issue?</a>'
              });

        }
        
    }

    useEffect(() => {
    async function fetchData() {
      let logs = await read(`Varshith/Products/${postid}`);
      console.log(logs);
      setLil(logs);
    }
    fetchData();
  }, [postid, sel]);
  return (
    <>
      {lil ? (
        <>
        <div className="con-overlay" style={{zIndex: '9999', backgroundImage: `url(${lil.img})`, backgroundSize: 'contain', backgroundPosition: 'center', position: 'absolute', filter: 'blur(8px),', }}>

        </div>
        <div className="con"  >
          <div className="main-con">
            <div className="main-head"></div>
            <div className="main-hero">
              <div className="cont">
                <div className="img-con">
                  <img
                    className="img"
                    src = {lil.img}
                    // src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369818"
                    alt=""
                  />
                </div>
                <div className="content-con">
                  <div className="nameprice-cov">
                    <div className="cont1">{postid.split("_")[1]}</div>
                    <div className="price-cov">₹ {lil.Base}</div>
                  </div>
                  <div className="namebid-cov">
                    <div className="name-cov">{postid.split("_")[0]}</div>
                    <div className="bid-cov"></div>
                  </div>
                </div>
              </div>
              <div className="bid-con">
                <div className="bidname">
                  <div className="bid1-con">
                    <Badge colorScheme="green">
                      ₹ {lil.Bid.Bid1.split("_")[0]}
                    </Badge>
                    <span className="userbid">
                      {lil.Bid.Bid1.split("_")[1]}
                    </span>
                  </div>
                  <div className="bid2-con">
                    <Badge colorScheme="green">
                      ₹ {lil.Bid.Bid2.split("_")[0]}
                    </Badge>
                    <span className="userbid">
                      {lil.Bid.Bid2.split("_")[1]}
                    </span>
                  </div>
                  <div className="bid3-con">
                    <Badge colorScheme="green">
                      ₹ {lil.Bid.Bid3.split("_")[0]}
                    </Badge>
                    <span className="userbid">
                      {lil.Bid.Bid3.split("_")[1]}
                    </span>
                  </div>
                </div>
                <div class="notifications-container">
                  <div class="success">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        {/* <svg
                          class="succes-svg"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                          fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg> */}
                      </div>
                      <div class="success-prompt-wrap">
                        <p class="success-prompt-heading">
                          <span className="timename">Last Date : </span>
                        </p>
                        <div class="success-prompt-prompt">
                          {lil.Time.split("T")[0]}
                        </div>
                      </div>
                      <div class="success-prompt-wrap">
                        <p class="success-prompt-heading">
                          <span className="Authorname">Owner : </span>
                        </p>
                        <div class="success-prompt-prompt">{lil.Author}</div>
                      </div>
                      <div class="success-prompt-wrap">
                        <p class="success-prompt-heading">
                          <span className="Catname">Category : </span>
                        </p>
                        <div class="success-prompt-prompt">{lil.Cat}</div>
                      </div>
                      <div class="success-prompt-wrap">
                        <p class="success-prompt-heading">
                          <span className="locationname">Location : </span>
                        </p>
                        <div class="success-prompt-prompt">{lil.Location}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Rate-con">
                  <StarRating cus={1} db={db} path={postid} />
                </div>
                <div className="Rate-con">
                  <div className="biddingcontainer">
                    <div className="bidcon">
                      <input
                        type="text"
                        placeholder="Enter Your Bid"
                        className="bid"
                      />
                    </div>
                    <div className="bid-btncon">
                      <Button
                        className="bid-btn"
                        colorScheme="green"
                        borderRadius={12}
                        width={150}
                        mt={2}
                        onClick={bid}
                      >
                        {duedate}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
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
    <h1 style={{ marginLeft: '90px',marginTop:'30px', fontSize: '36px' }}>Reviews</h1>
<ReviewPage db = {db} id = {postid} />
    </>
  );
}
