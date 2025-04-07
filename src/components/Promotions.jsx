import React from 'react';

function Promotions() {
  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-6">Create a Promotion</h2>
      <form className="space-y-6">
        <input
          type="text"
          placeholder="Enter promotion name"
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg"
        />
        <textarea
          placeholder="Enter promotion description"
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg"
        ></textarea>
        <select className="w-full max-w-md p-3 border border-gray-300 rounded-lg">
          <option>Select promotion type</option>
        </select>
        <div className="flex gap-4 mb-6">
          <input
            type="date"
            placeholder="Start date"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="date"
            placeholder="End date"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <textarea
          placeholder="Enter terms and conditions"
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg"
        ></textarea>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Discount amount</label>
          <input
            type="range"
            min="0"
            max="100"
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          Create promotion
        </button>
      </form>
    </div>
  );
}

export default Promotions;
