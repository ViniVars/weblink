import { Button, useStatStyles } from '@chakra-ui/react';
import { ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { read } from '../App';

const ReviewPage = ({id, db}) => {
  // Array of random image URLs
  const imageUrls = [];
  const [rev, setRev] = useState(false)
  const [k1, setK] = useState(0)
// Generate image URLs with increasing last digit for both men and women
for (let i = 1; i <= 8; i++) {
  const urlMen = `https://randomuser.me/api/portraits/men/${i}.jpg`;
  const urlWomen = `https://randomuser.me/api/portraits/women/${i}.jpg`;
  imageUrls.push(urlMen);
  imageUrls.push(urlWomen);
}

  useEffect(()=>{
    async function fetchData(){
      let k = await read(`Varshith/Products/${id}`)
      setRev(k.review.split('_'))
      console.log(k.review.split('_'))
      
    }
    fetchData()
  }, [k1])
  // Array of random usernames
  const usernames = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Emma',
    'Frank',
    'Grace',
    'Henry',
    'Ivy',
    'Jack',
    'Kate',
    'Liam',
    'Mia',
    'Nora',
    'Oscar',
    'Penny',
    'Quinn',
    'Riley',
    'Sam',
    'Taylor',
    'Uma',
    'Victor',
    'Wendy',
    'Xavier',
    'Yara',
    'Zane'
  ];
  async function addReview(){
    let r = document.querySelector('.reviewaddtext').value
    let prev = await read(`Varshith/Products/${id}`) || ""
    if(prev.review != ''){

      r = `${prev.review}_${r}`
    }
    update(ref(db, `Varshith/Products/${id}`),{
      review : r
    })
  }
  // Function to get a random element from an array
  const getRandomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  // JSX for a single review card
  const renderReviewCard = (ro) => {
    const imageUrl = getRandomElement(imageUrls);
    const username = getRandomElement(usernames);
    const rating = `${Math.floor(Math.random() * 5) + 1}/5`; // Generate random rating

    return (
      <div style={reviewCardStyle}>
        <img src={imageUrl} alt="User" style={imageStyle} />
        <div style={ratingStyle}>{rating}</div>
        <div style={reviewTextStyle}>{ro || "Amazing product! I highly recommend it."}</div>
        <div style={usernameStyle}>- {username}</div>
      </div>
    );
  };
  const renderReviewCard1 = (ro) => {
    const imageUrl = getRandomElement(imageUrls);
    const rating = `${Math.floor(Math.random() * 5) + 1}/5`; // Generate random rating

    return (
      <div style={reviewCardStyle}>
        <img src={imageUrl} alt="User" style={imageStyle} />
        <div style={ratingStyle}>{rating}</div>
        <div style={reviewTextStyle}>{ro}</div>
        <div style={usernameStyle}>- {'User'}</div>
      </div>
    );
  };

  return (
    <>
      <div className='reviewadd'>
        <textarea rows={5} cols={100} placeholder='Enter Review Here...' className='reviewaddtext' ></textarea>
        <Button  width={200} colorScheme='green' onClick={()=>{
      setK(prev => prev + 1)
      addReview()
        }}>Submit</Button>
      </div>
      <div className='myrev'>
      {Array.isArray(rev) && rev.map((ro, index) => (
  <div key={index}>{renderReviewCard(ro)}</div>
))}
 
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Render multiple review cards */}
        {Array.from({ length: 8 }).map((_, index) => (
          <React.Fragment key={index}>
            {renderReviewCard()}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

const reviewCardStyle = {
  width: '300px',
  backgroundColor: '#f0f0f0',
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
};

const imageStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  marginBottom: '10px',
};

const ratingStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const reviewTextStyle = {
  fontSize: '16px',
};

const usernameStyle = {
  fontSize: '14px',
  fontStyle: 'italic',
  marginTop: '10px',
};

export default ReviewPage;
