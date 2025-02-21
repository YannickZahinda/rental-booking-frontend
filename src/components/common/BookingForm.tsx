import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Shadcn popover
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";

const properties = [
  "Luxury Villa with Ocean View",
  "Cozy Mountain Cabin",
  "Modern City Apartment",
];

const BookingForm = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    property: properties[0],
    guests: 1,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking Details: ", formData, "Date: ", date);
  };

  return (
    <div className="mt-12 bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-2xl font-bold text-gray-900">Book Your Stay</h2>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Fill out the form below to make a reservation.
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="property">Select Property</Label>
            <select
              id="property"
              value={formData.property}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {properties.map((property, index) => (
                <option key={index} value={property}>
                  {property}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label>Check-in Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${
                      !date && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="guests">Number of Guests</Label>
              <Input
                id="guests"
                type="number"
                value={formData.guests}
                onChange={handleChange}
                placeholder="2"
                min={1}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="message">Special Requests</Label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              placeholder="Any special requests or requirements?"
            />
          </div>

          <Button type="submit" className="w-full">
            Book Now
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
