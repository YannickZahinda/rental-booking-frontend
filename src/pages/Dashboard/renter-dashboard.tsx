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
import Card from "@/components/ui/Card";
import { Tabs, TabsContent, TabList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, MapPinIcon, UserIcon } from "lucide-react";

const HostDashboard = () => {
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
      <p className="mb-6">Manage your bookings and properties.</p>

      <Tabs defaultValue="bookings" className="space-y-4">
        <TabList>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
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
                      <UserIcon className="mr-2 h-4 w-4" /> 0 guests
                    </p>
                    <p className="flex items-center">
                      <MapPinIcon className="mr-2 h-4 w-4" />{" "}
                      {booking.property?.location || "Unknown Location"}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Booking Details
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <h2 className="text-2xl font-semibold">My Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((property) => (
              <Card className="transition-all hover:shadow-lg" key={property}>
                <CardHeader>
                  <CardTitle>Property {property}</CardTitle>
                  <CardDescription>Location details</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="flex items-center">
                    <MapPinIcon className="mr-2 h-4 w-4" /> Location
                  </p>
                  <p className="flex items-center">
                    <UserIcon className="mr-2 h-4 w-4" /> 0 guests
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

export default HostDashboard;