import React, { useState } from 'react';

const Booking = () => {
  const [vehicle, setVehicle] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ vehicle, serviceType, date, time, notes });
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Book a Service</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Vehicle</label>
          <select
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Vehicle</option>
            <option value="car1">Car 1</option>
            <option value="car2">Car 2</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Service Type</label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Service</option>
            <option value="oilChange">Oil Change</option>
            <option value="tireRotation">Tire Rotation</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Preferred Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;