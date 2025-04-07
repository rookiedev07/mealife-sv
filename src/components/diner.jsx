import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DinerHeader from './DinerHeader';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Sample data
const dataRevenue = [
  { month: 'Jun', revenue: 5000 },
  { month: 'Jul', revenue: 9900 },
  { month: 'Aug', revenue: 2000 },
  { month: 'Sep', revenue: 5000 },
  { month: 'Oct', revenue: 9800 },
];

const dataBookings = [
  { date: 'Jun 1', bookings: 15 },
  { date: 'Jun 15', bookings: 5 },
  { date: 'Jul 1', bookings: 18 },
  { date: 'Jul 15', bookings: 3 },
  { date: 'Aug 1', bookings: 20 },
];

const feedbackData = [
  { date: 'Jul 15', time: '12:00pm', order: 'Firecracker Chicken', customer: 'Amanda', rating: 5, feedback: 'Delicious!' },
  { date: 'Jul 14', time: '6:00pm', order: 'Beef & Broccoli', customer: 'Tom', rating: 4, feedback: 'Good, but a bit salty.' },
  { date: 'Jul 13', time: '1:00pm', order: 'Kung Pao Tofu', customer: 'Linda', rating: 3, feedback: 'Too spicy for me.' },
  { date: 'Jul 12', time: '7:00pm', order: 'Sweet & Sour Pork', customer: 'Mike', rating: 5, feedback: 'Perfect balance of flavors.' },
  { date: 'Jul 11', time: '5:00pm', order: 'Mongolian Beef', customer: 'Sarah', rating: 4, feedback: 'Tender and tasty.' },
];

const Diner = () => {
  const [businessDetails, setBusinessDetails] = useState({
    ownerName: '',
  });

  const [showNewDish, setShowNewDish] = useState(false);
  const navigate = useNavigate();

  // Simulate an API call to fetch owner's name
  useEffect(() => {
    const fetchOwnerName = async () => {
      // Simulate an API call with a timeout
      const ownerName = await new Promise((resolve) =>
        setTimeout(() => resolve('Rohan Sharma'), 1000)
      );
      setBusinessDetails({ ownerName });
    };

    fetchOwnerName();
  }, []);

  const handleNewDishClick = () => {
    navigate('/new-dish');
  };

  return (
    <div className="flex flex-col px-4 sm:px-8">
      <DinerHeader onNewDishClick={handleNewDishClick} />

      <div className="w-full sm:w-4/5 ml-0 sm:ml-72 mt-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            Hi {businessDetails.ownerName.split(' ')[0]}, let's get cooking
          </h2>
          <p className="text-gray-500">
            You have 2 new bookings today. You're on track to make $20,000 in the next 30 days.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border rounded-lg p-4 text-sm text-center">
            <h2 className="font-bold text-lg">Daily Bookings</h2>
            <p className="font-black text-2xl">5</p>
          </div>
          <div className="border rounded-lg p-4 text-sm text-center">
            <h2 className="font-bold text-lg">Monthly Revenue</h2>
            <p className="font-black text-2xl">$1,500</p>
          </div>
          <div className="border rounded-lg p-4 text-sm text-center">
            <h2 className="font-bold text-lg">Avg. Rating</h2>
            <p className="font-black text-2xl">4.3</p>
          </div>
          <div className="border rounded-lg p-4 text-sm text-center">
            <h2 className="font-bold text-lg">Avg. Delivery Time</h2>
            <p className="font-black text-2xl">45 Minutes</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2">Monthly Revenue</h3>
          <h2 className="text-xl">
            ${dataRevenue.reduce((acc, curr) => acc + curr.revenue, 0)}
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={dataRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2">Daily Bookings</h3>
          <h2 className="text-xl">20</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={dataBookings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#8884d8"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8">
          <h1 className="text-2xl text-start mb-4 font-bold">Feedback</h1>
          <div className="flex items-center mb-4">
            <h2 className="text-5xl font-bold mr-4">4.3</h2>
            <span className="text-blue-600 text-2xl">★★★★★</span>
            <p className="ml-4 text-sm">100 reviews</p>
          </div>
          <div className="grid gap-3">
            <progress className="w-full h-2 rounded-full bg-gray-200" value="70" max="100">
              <div className="bg-blue-500 h-full rounded-full"></div>
            </progress>
            <progress className="w-full h-2 rounded-full bg-gray-200" value="19" max="100">
              <div className="bg-blue-500 h-full rounded-full"></div>
            </progress>
            <progress className="w-full h-2 rounded-full bg-gray-200" value="6" max="100">
              <div className="bg-blue-500 h-full rounded-full"></div>
            </progress>
            <progress className="w-full h-2 rounded-full bg-gray-200" value="3" max="100">
              <div className="bg-blue-500 h-full rounded-full"></div>
            </progress>
            <progress className="w-full h-2 rounded-full bg-gray-200" value="2" max="100">
              <div className="bg-blue-500 h-full rounded-full"></div>
            </progress>
          </div>

          <div className="overflow-x-auto">
            <h2 className="text-2xl font-bold mt-8">Top Ratings:</h2>
            <table className="table-auto w-full border-collapse mb-12 border border-gray-300 mt-4 rounded-xl">
              <thead className="hidden md:table-header-group">
                <tr className="bg-blue-100 text-left text-sm font-semibold">
                  <th className="border-b border-gray-300 p-3 px-4">Date</th>
                  <th className="border-b border-gray-300 p-3 px-4">Time</th>
                  <th className="border-b border-gray-300 p-3 px-4">Order</th>
                  <th className="border-b border-gray-300 p-3 px-4">Customer</th>
                  <th className="border-b border-gray-300 p-3 px-4">Rating</th>
                  <th className="border-b border-gray-300 p-3 px-4">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {feedbackData.map((feedback, index) => (
                  <tr
                    key={feedback.date}
                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors duration-300`}
                  >
                    <td className="border-b border-gray-300 p-3 px-4">{feedback.date}</td>
                    <td className="border-b border-gray-300 p-3 px-4">{feedback.time}</td>
                    <td className="border-b border-gray-300 p-3 px-4">{feedback.order}</td>
                    <td className="border-b border-gray-300 p-3 px-4">{feedback.customer}</td>
                    <td className="border-b border-gray-300 p-3 px-4">{feedback.rating}</td>
                    <td className="border-b border-gray-300 p-3 px-4">{feedback.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diner;
