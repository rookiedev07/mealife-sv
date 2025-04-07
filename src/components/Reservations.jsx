import React, { useState } from 'react';
import pfp from '../assets/nopfp.png';
import Calendar from 'react-calendar'; // Import react-calendar
import 'react-calendar/dist/Calendar.css'; // Import CSS for styling the calendar
import DinerHeader from './DinerHeader';

const Reservations = () => {
  const upcoming = [
    {
      profilePic: pfp,
      table: 'Table 12',
      time: '6:00 PM',
      guests: '2 guests',
    },
    {
      profilePic: pfp,
      table: 'Table 13',
      time: '6:00 PM',
      guests: '5 guests',
    },
    {
      profilePic: pfp,
      table: 'Table 18',
      time: '8:00 PM',
      guests: '3 guests',
    },
    {
      profilePic: pfp,
      table: 'Table 17',
      time: '6:00 PM',
      guests: '7 guests',
    },
    {
      profilePic: pfp,
      table: 'Table 2',
      time: '6:00 PM',
      guests: '4 guests',
    },
  ];

  const [date, setDate] = useState(new Date()); // State for selected date

  // Handle date selection
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className='px-4 pb-20 sm:px-8'>
      <DinerHeader />
      <div className="w-full sm:w-4/5 ml-0 sm:ml-64 mt-12">
        <h1 className="font-bold text-2xl text-start mb-5 text-[#333]">Bookings</h1>
        <div className="flex gap-2 mb-7 flex-wrap">
          <button className="bg-gray-200 text-black font-semibold rounded-lg py-2 px-4 hover:bg-blue-500 hover:text-white transition-all w-full sm:w-auto">
            All Dates
          </button>
          <button className="bg-gray-200 text-black font-semibold rounded-lg py-2 px-4 hover:bg-blue-500 hover:text-white transition-all w-full sm:w-auto">
            All Statuses
          </button>
          <button className="bg-gray-200 text-black font-semibold rounded-lg py-2 px-4 hover:bg-blue-500 hover:text-white transition-all w-full sm:w-auto">
            All Party Sizes
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-7">
          <input
            type="text"
            placeholder="Search reservations"
            className="w-full bg-gray-200 py-2 pl-10 pr-4 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 fa-solid fa-search"></i>
        </div>

        {/* Calendar */}
        <div className="react-calendar-container flex justify-center p-4 sm:p-6 md:p-8 rounded-xl bg-white w-full max-w-lg mx-auto">
          <Calendar className='rounded-xl w-full'
            onChange={handleDateChange} // Handle date change
            value={date} // Set the selected date
            navigationLabel={({ label }) => {
              if (label === 'Previous') {
                return <span className="prev-month text-sm sm:text-base">Previous</span>;
              } else if (label === 'Next') {
                return <span className="next-month text-sm rounded-xl sm:text-base">Next</span>;
              }
              return label;
            }}
            showNeighboringMonth={false} // Ensures no neighboring month dates are shown
            next2Label={null}
            prev2Label={null}
            tileClassName={({ date, view }) => view === 'month' ? 'month-tile' : ''}
            tileContent={({ date, view }) => {
              if (view === 'month') {
                // Ensure only one date is displayed in the tile
                return (
                  <div className="month-tile-content flex h-[30px] justify-center items-center w-full rounded-xl">
                  </div>
                );
              }
            }}
          />
        </div>

        {/* Upcoming Reservations */}
        <div className="upcoming-reservations mt-10">
          <h3 className="text-lg font-bold text-[#495057] mb-4">Upcoming Guests</h3>
          {upcoming.map((reservation, index) => (
            <div key={index} className="reservation flex flex-row sm:flex-row mt-8">
              <div className="reservation-profile mt-4">
                <img src={reservation.profilePic} alt="Profile" className="h-16 w-16 rounded-full" />
              </div>
              <div className="reservation-details flex flex-col sm:flex-row sm:items-center ml-4 mt-4 sm:ml-4">
                <h4 className="text-lg font-semibold">{reservation.table}</h4>
                <p className="text-sm text-[#495057] ml-0 sm:ml-4 mt-2 sm:mt-0">
                  {reservation.time} | {reservation.guests}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reservations;
