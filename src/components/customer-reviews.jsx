import React from 'react';
import pfp from '../assets/nopfp.png';
import DinerHeader from './DinerHeader';

const Reviews = () => {
  const reviews = [
    {
      profilePic: pfp,
      text: 'Great food',
      date: 'Jan 1, 2022',
      rating: 5.0,
    },
    {
      profilePic: pfp,
      text: 'The food was cold',
      date: 'Dec 29, 2021',
      rating: 2.0,
    },
    {
      profilePic: pfp,
      text: 'Lovely service',
      date: 'Dec 15, 2021',
      rating: 4.0,
    },
    {
      profilePic: pfp,
      text: 'Food was delicious',
      date: 'Dec 1, 2021',
      rating: 5.0,
    },
    {
      profilePic: pfp,
      text: 'Not happy with the service',
      date: 'Nov 28, 2021',
      rating: 1.0,
    },
  ];

  return (
    <div className="flex flex-col items-center p-5">
      <div className="w-full sm:w-[82%] lg:ml-[20em] lg:mt-[-2em]">
        <DinerHeader />

        <h1 className="text-3xl font-semibold mt-12 text-start mb-2">Reviews & Ratings</h1>
        <p className="text-lg mb-4">Manage your reviews and ratings</p>

        {reviews.map((review) => (
          <div key={review.text} className="flex flex-row text-start sm:flex-row w-full p-3 mb-3 rounded-2xl border border-gray-300">
            <div className="flex-shrink-1 mb-4 sm:mb-0">
            <img src={review.profilePic} alt="Profile" className="h-[80px] w-[110px] sm:h-[90px] sm:w-[90px] rounded-full ml-0 sm:ml-4" />
            </div>
            <div className="flex flex-col w-full sm:w-[86%]">
              <h4 className="text-xl mt-4 ml-4 font-medium">{review.text}</h4>
              <p className="text-gray-600 ml-4 text-sm">{review.date}</p>
            </div>
            <div className="font-semibold text-lg text-start sm:text-xl">
              <p>{review.rating}/5</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;