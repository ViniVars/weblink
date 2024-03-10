import React, { useState } from 'react';

const SelectInterest = () => {
  const interestsList = [
    "Artwork",
    "Antiques",
    "Jewelry",
    "Coins and Currency",
    "Watches",
    "Classic Cars",
    "Wine and Spirits",
    "Memorabilia",
    "Rare Books",
    "Designer Fashion",
    "Fine China",
    "Musical Instruments",
    "Firearms",
    "Electronics",
    "Real Estate",
    "Rugs and Carpets",
    "Toys and Games",
    "Sports Equipment",
    "Silverware",
    "Diningware"
  ];

  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = interest => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <h2>Select Your Interests</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {interestsList.map(interest => (
          <div
            key={interest}
            style={{
              padding: '8px 12px',
              margin: '4px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              backgroundColor: selectedInterests.includes(interest) ? '#007bff' : '#fff',
              color: selectedInterests.includes(interest) ? '#fff' : '#000',
            }}
            onClick={() => toggleInterest(interest)}
          >
            {interest}
          </div>
        ))}
      </div>
  
    </div>
  );
};

export default SelectInterest;