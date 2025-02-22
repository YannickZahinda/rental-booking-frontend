import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/CardElements";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import Card from "@/components/ui/Card";
import { Tabs, TabsContent, TabList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarIcon,
  HomeIcon,
  MapPinIcon,
  SearchIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";

const RenterDashboard = () => {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  interface Property {
    id: number;
    title: string;
    location: string;
    price_per_night: number;
  }

  interface Booking {
    id: number;
    property: Property; // Nested property object
    renter: {
      id: number;
      name: string;
      email: string;
    };
    check_in: string;
    check_out: string;
    status: "pending" | "confirmed" | "canceled";
  }

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:3000/bookings");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}</h1>
      <p className="mb-6">Explore your next stay and manage your bookings.</p>

      <Tabs defaultValue="search" className="space-y-4">
        <TabList>
          <TabsTrigger value="search">Search Properties</TabsTrigger>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabList>

        <TabsContent value="search" className="space-y-4">
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>Find Your Next Stay</CardTitle>
              <CardDescription>
                Search for properties by location, dates, and more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Where are you going?" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="check-in">Check-in</Label>
                    <Input id="check-in" type="date" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="check-out">Check-out</Label>
                    <Input id="check-out" type="date" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="guests">Guests</Label>
                    <Input id="guests" type="number" min="1" placeholder="1" />
                  </div>
                </div>
                <Button className="w-full">
                  <SearchIcon className="mr-2 h-4 w-4" /> Search Properties
                </Button>
              </form>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((property) => (
              <Card className="transition-all hover:shadow-lg" key={property}>
                <CardHeader>
                  <CardTitle>Luxury Villa {property}</CardTitle>
                  <CardDescription>Santa Barbara, California</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="flex items-center">
                    <HomeIcon className="mr-2 h-4 w-4" /> 4 bedrooms
                  </p>
                  <p className="flex items-center">
                    <MapPinIcon className="mr-2 h-4 w-4" /> Beachfront
                  </p>
                  <p className="flex items-center">
                    <StarIcon className="mr-2 h-4 w-4" /> 4.9 (120 reviews)
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <h2 className="text-2xl font-semibold">My Bookings</h2>
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <Card className="transition-all hover:shadow-lg" key={index}>
                <CardHeader>
                  <CardTitle>Booking #{index + 1}</CardTitle>
                  <CardDescription>
                    {booking.property
                      ? booking.property.title
                      : "Unknown Property"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />{" "}
                    {new Date(booking.check_in).toLocaleDateString()} -{" "}
                    {new Date(booking.check_out).toLocaleDateString()}
                  </p>
                  <p className="flex items-center">
                    <UserIcon className="mr-2 h-4 w-4" /> 0 guests
                  </p>
                  <p className="flex items-center">
                    <MapPinIcon className="mr-2 h-4 w-4" />{" "}
                    {booking.property.location || "Unknown Location"}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Booking Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <h2 className="text-2xl font-semibold">My Favorite Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((property) => (
              <Card className="transition-all hover:shadow-lg" key={property}>
                <CardHeader>
                  <CardTitle>Cozy Cabin {property}</CardTitle>
                  <CardDescription>Aspen, Colorado</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="flex items-center">
                    <HomeIcon className="mr-2 h-4 w-4" /> 2 bedrooms
                  </p>
                  <p className="flex items-center">
                    <MapPinIcon className="mr-2 h-4 w-4" /> Mountain view
                  </p>
                  <p className="flex items-center">
                    <StarIcon className="mr-2 h-4 w-4" /> 4.8 (95 reviews)
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
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

export default RenterDashboard;
