import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/CardElements";
import Card from "@/components/ui/Card";
import { Tabs, TabsContent, TabList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HostDashboard = () => {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");

  interface Property {
    id: number;
    title: string;
    location: string;
    price_per_night: number;
  }

  interface Booking {
    id: number;
    property: Property;
    renter: {
      id: number;
      name: string;
      email: string;
    };
    check_in: string;
    check_out: string;
    status: "pending" | "confirmed" | "canceled";
  }

  const fetchData = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("No authentication token found");
      return;
    }

    try {
      const bookingsResponse = await fetch("http://localhost:3000/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!bookingsResponse.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const bookingsData = await bookingsResponse.json();
      setBookings(bookingsData);

      const propertiesResponse = await fetch("http://localhost:3000/properties", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!propertiesResponse.ok) {
        throw new Error("Failed to fetch properties");
      }
      const propertiesData = await propertiesResponse.json();
      setProperties(propertiesData);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBookProperty = async () => {
    if (!selectedPropertyId || !checkIn || !checkOut) {
      alert("Please fill in all fields");
      return;
    }

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("No authentication token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          renterId: user?.id, 
          propertyId: selectedPropertyId,
          check_in: checkIn,
          check_out: checkOut,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to book property");
      }

      const newBooking = await response.json();
      setBookings((prevBookings) => [...prevBookings, newBooking]);
      alert("Booking successful!");
    } catch (error) {
      setError((error as Error).message);
      alert("Failed to book property");
    }
  };

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}</h1>
      <p className="mb-6">Manage your bookings and properties.</p>

      <Tabs defaultValue="bookings" className="space-y-4">
        <TabList>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="book">Book a Property</TabsTrigger>
        </TabList>

        <TabsContent value="bookings" className="space-y-4">
          <h2 className="text-2xl font-semibold">Current Bookings</h2>
          <div className="space-y-4">
            {bookings.map((booking, index) => {
              let statusColor = "";
              let statusText = "";

              switch (booking.status) {
                case "pending":
                  statusColor = "bg-yellow-500";
                  statusText = "Pending";
                  break;
                case "confirmed":
                  statusColor = "bg-green-500";
                  statusText = "Confirmed";
                  break;
                case "canceled":
                  statusColor = "bg-red-500";
                  statusText = "Canceled";
                  break;
                default:
                  statusColor = "bg-gray-500";
                  statusText = "Unknown";
              }

              return (
                <Card className="transition-all hover:shadow-lg" key={index}>
                  <CardHeader>
                    <CardTitle>
                      Booking for {booking.property?.title || "Unknown Property"}
                    </CardTitle>
                    <CardDescription>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}
                      >
                        {statusText}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />{" "}
                      {new Date(booking.check_in).toLocaleDateString()} -{" "}
                      {new Date(booking.check_out).toLocaleDateString()}
                    </p>
                    <p className="flex items-center">
                      <MapPinIcon className="mr-2 h-4 w-4" />{" "}
                      {booking.property?.location || "Unknown Location"}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <h2 className="text-2xl font-semibold">My Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property) => (
              <Card className="transition-all hover:shadow-lg" key={property.id}>
                <CardHeader>
                  <CardTitle>{property.title}</CardTitle>
                  <CardDescription>{property.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="flex items-center">
                    <MapPinIcon className="mr-2 h-4 w-4" /> {property.location}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="book" className="space-y-4">
          <h2 className="text-2xl font-semibold">Book a Property</h2>
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>Book a Property</CardTitle>
              <CardDescription>
                Provide booking details to book a property.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="flex flex-col gap-4">
                  <div>
                    <Label htmlFor="property">Property ID</Label>
                    <Input
                      id="property"
                      type="number"
                      value={selectedPropertyId || ""}
                      onChange={(e) => setSelectedPropertyId(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="check-in">Check-in Date</Label>
                    <Input
                      id="check-in"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="check-out">Check-out Date</Label>
                    <Input
                      id="check-out"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  className="w-full"
                  onClick={handleBookProperty}
                >
                  Book Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Button className="bg-red-500 text-white" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default HostDashboard;