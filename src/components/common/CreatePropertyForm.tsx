import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { CardContent, CardHeader, CardTitle } from "../ui/CardElements";
import Card from "../ui/Card";
import { useAuth } from "@/context/AuthContext";

const CreatePropertyForm = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    price_per_night: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    const requestBody = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        price_per_night: Number(formData.price_per_night),
        hostId: user?.id,
    }

    try {
      const response = await fetch("http://localhost:3000/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,

        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to create property");
      }

      const result = await response.json();
      console.log("Property created successfully:", result);

      setFormData({
        title: "",
        location: "",
        description: "",
        price_per_night: ""
      });
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  return (
    <Card className="p-6 shadow-lg border rounded-lg bg-white w-full max-w-md mx-auto">
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
              className="border rounded px-3 py-2 text-black"
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
              className="border rounded px-3 py-2 text-black"
              required
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="description" className="mb-1 font-medium">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="border rounded px-3 py-2 text-black"
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
              className="border rounded px-3 py-2 text-black"
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
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePropertyForm;
