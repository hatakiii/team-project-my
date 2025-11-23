import React, { useState } from "react";
import DatePicker from "react-date-picker";

interface Barber {
  id: number;
  name: string;
  availability: Record<string, string[]>; // "2025-11-21": ["08:00", "08:30"]
}

const mockBarbers: Barber[] = [
  {
    id: 1,
    name: "John Barber",
    availability: {
      "2025-11-21": ["08:00", "08:30", "09:00", "10:00"],
      "2025-11-22": ["09:00", "09:30", "10:00"],
    },
  },
  {
    id: 2,
    name: "Alex Fade Master",
    availability: {
      "2025-11-21": ["08:30", "09:00", "11:00"],
      "2025-11-23": ["10:00", "10:30"],
    },
  },
];

export default function BarberAppointment() {
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Format date to "YYYY-MM-DD"
  const formattedDate = selectedDate.toISOString().split("T")[0];

  const availableTimes = selectedBarber?.availability[formattedDate] ?? [];

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 bg-white shadow rounded-xl">
      <h1 className="text-xl font-bold">Book a Barber</h1>

      {/* Barber Select */}
      <div>
        <label className="font-medium">Choose Barber</label>
        <select
          className="w-full mt-1 p-2 border rounded"
          value={selectedBarber?.id ?? ""}
          onChange={(e) => {
            const barber =
              mockBarbers.find((b) => b.id === Number(e.target.value)) || null;

            setSelectedBarber(barber);
            setSelectedTime(null);
          }}
        >
          <option value="">Select Barber...</option>
          {mockBarbers.map((barber) => (
            <option key={barber.id} value={barber.id}>
              {barber.name}
            </option>
          ))}
        </select>
      </div>

      {/* Calendar */}
      <div>
        <label className="font-medium">Choose Date</label>
        <div className="mt-2">
          <DatePicker
            onChange={(date) => {
              if (date instanceof Date) {
                setSelectedDate(date);
                setSelectedTime(null);
              }
            }}
            value={selectedDate}
          />
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <label className="font-medium">Available Times</label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {availableTimes.length > 0 ? (
            availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-2 border rounded ${
                  selectedTime === time ? "bg-blue-500 text-white" : ""
                }`}
              >
                {time}
              </button>
            ))
          ) : (
            <p className="text-gray-500 col-span-3">No times available.</p>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="p-3 bg-gray-100 rounded-md">
        <p>
          <b>Barber:</b> {selectedBarber?.name || "None"}
        </p>
        <p>
          <b>Date:</b> {formattedDate}
        </p>
        <p>
          <b>Time:</b> {selectedTime || "None"}
        </p>
      </div>

      <button
        disabled={!selectedBarber || !selectedTime}
        className="w-full p-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-300"
      >
        Confirm Appointment
      </button>
    </div>
  );
}
