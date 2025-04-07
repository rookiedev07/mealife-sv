import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jul 19', value: 300 },
  { name: 'Jul 20', value: 400 },
  { name: 'Jul 21', value: 350 },
  { name: 'Jul 22', value: 450 },
  { name: 'Jul 23', value: 500 },
  { name: 'Jul 24', value: 550 },
  { name: 'Jul 25', value: 600 },
];

function Performance() {
  return (
    <div className="App">
      <div className="performance-container grid items-center py-20 relative -top-24 mb-5">
        <h1 className="text-2xl font-bold mb-[-5em]">Performance</h1>
        <div className="tabs flex mb-5">
          <button className="tab p-2 w-full bg-transparent hover:bg-gray-200 rounded-md">
            Overview
          </button>
          <button className="tab p-2 w-full bg-transparent hover:bg-gray-200 rounded-md">
            Orders
          </button>
          <button className="tab p-2 w-full bg-transparent hover:bg-gray-200 rounded-md">
            Menu
          </button>
          <button className="tab p-2 w-full bg-transparent hover:bg-gray-200 rounded-md">
            Promotions
          </button>
        </div>
        <div className="metrics flex mt-[-10em] justify-between">
          <div className="metric text-center">
            <div className="value text-2xl font-bold">$3,238</div>
            <div className="label text-sm text-gray-500">Net sales</div>
          </div>
          <div className="metric text-center">
            <div className="value text-2xl font-bold">1,256</div>
            <div className="label text-sm text-gray-500">Orders</div>
          </div>
        </div>
        <h1 className="chart-title text-2xl font-bold mb-[-12em]">Last 7 days</h1>
        <div className="chart-container relative top-0">
          <div className="chart w-full h-[200px] mt-[-13em] rounded-md bg-gray-50">
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
              <defs>
                {/* Define the shadow effect */}
                <filter id="lineShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0, 0, 0, 1)" />
                </filter>
              </defs>
            </svg>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={3}
                  activeDot={{ r: 1 }}
                  filter="url(#lineShadow)" // Apply the shadow effect
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Performance;
