import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { CardContent, CardHeader, CardTitle } from "../ui/CardElements";
import Card from "../ui/Card";

interface CreatePropertyFormProps {
  onClose: () => void;
}

const CreatePropertyForm = ({ onClose }: CreatePropertyFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price_per_night: "",
    guests: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 p-4">
      <Card className="p-6 shadow-lg border rounded-lg bg-white w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Create New Property
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <Label htmlFor="title" className="mb-1 font-medium">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter property title"
                className="border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="location" className="mb-1 font-medium">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter property location"
                className="border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="price_per_night" className="mb-1 font-medium">
                Price per Night
              </Label>
              <Input
                id="price_per_night"
                name="price_per_night"
                type="number"
                value={formData.price_per_night}
                onChange={handleChange}
                placeholder="Enter price per night"
                className="border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="guests" className="mb-1 font-medium">
                Guests
              </Label>
              <Input
                id="guests"
                name="guests"
                type="number"
                value={formData.guests}
                onChange={handleChange}
                placeholder="Enter number of guests"
                className="border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <Button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Create Property
              </Button>
              <Button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePropertyForm;
