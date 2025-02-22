import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, MoreVertical } from "lucide-react";
import { MapPinIcon } from "lucide-react";
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/CardElements";
import Card from "@/components/ui/Card";
import {
  Tabs,
  TabsContent,
  TabList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { CalendarIcon, DollarSignIcon, UsersIcon } from "lucide-react";
import CreatePropertyForm from "@/components/common/CreatePropertyForm";

const HostDashboard = () => {
  const { user, logout } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  interface Property {
    id: string;
    title: string;
    description: string;
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
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:3000/properties");
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();

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

  const updateBookingStatus = async (id: number, status: "pending" | "confirmed" | "canceled") => {
    try {
      const response = await fetch(`http://localhost:3000/bookings/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update booking status");
      }

      const updatedBooking = await response.json();

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? updatedBooking : booking
        )
      );
    } catch (error) {
      setError((error as Error).message);
    }
  };

  if (loading) {
    return <div>Loading properties....</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="ghost"
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-6">Welcome {user?.name} you are a host</h1>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="create">Create Property</TabsTrigger>
        </TabList>

        <TabsContent value="overview" className="space-y-4">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle>Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle>Occupancy Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">78%</p>
                <p className="text-sm text-muted-foreground">Average</p>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle>Top Property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Luxury Villa 1</p>
                <p className="text-sm text-muted-foreground">$7,500 earned</p>
              </CardContent>
            </Card>
          </div>
          <h2 className="text-2xl font-semibold mt-8">Your Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property) => (
              <Card key={property.id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{property.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="flex items-center">
                    <MapPinIcon className="mr-2 h-4 w-4" /> {property.location}
                  </p>
                  <p className="flex items-center">
                    <DollarSignIcon className="mr-2 h-4 w-4" />{" "}
                    {property.price_per_night}
                  </p>
                  <p className="flex items-center">
                    <UsersIcon className="mr-2 h-4 w-4" /> 0 guests
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <h2 className="text-2xl font-semibold">Current Bookings</h2>
          {loading ? (
            <div>Loading bookings...</div>
          ) : error ? (
            <div className="text-red-500">Error: {error}</div>
          ) : (
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
                    <CardHeader className="flex items-center justify-between">
                      <CardTitle>
                        Booking for {booking.property?.title || "Unknown Property"}
                      </CardTitle>
                      <div className="relative">
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={() => {
                            const dropdown = document.getElementById(`dropdown-${booking.id}`);
                            dropdown?.classList.toggle("hidden");
                          }}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        <div
                          id={`dropdown-${booking.id}`}
                          className="hidden absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10"
                        >
                          <button
                            className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            onClick={() => updateBookingStatus(booking.id, "pending")}
                          >
                            Mark as Pending
                          </button>
                          <button
                            className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            onClick={() => updateBookingStatus(booking.id, "confirmed")}
                          >
                            Mark as Approved
                          </button>
                          <button
                            className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            onClick={() => updateBookingStatus(booking.id, "canceled")}
                          >
                            Mark as Canceled
                          </button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4" />{" "}
                        {new Date(booking.check_in).toLocaleDateString()} -{" "}
                        {new Date(booking.check_out).toLocaleDateString()}
                      </p>
                      <p className="flex items-center">
                        <UsersIcon className="mr-2 h-4 w-4" /> 0 guests
                      </p>
                      <p className="flex items-center">
                        <DollarSignIcon className="mr-2 h-4 w-4" /> Total: $3,000
                      </p>
                      <p className="flex items-center">
                        Status:{" "}
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}
                        >
                          {statusText}
                        </span>
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <h2 className="text-2xl font-semibold">Earnings Overview</h2>
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">$15,750</p>
              <p className="text-sm text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle>Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle>Occupancy Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">78%</p>
                <p className="text-sm text-muted-foreground">Average</p>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle>Top Property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Luxury Villa 1</p>
                <p className="text-sm text-muted-foreground">$7,500 earned</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <CreatePropertyForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HostDashboard;