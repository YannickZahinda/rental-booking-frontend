import BookingForm from "../../components/common/BookingForm";
import PropertyCard from "../../components/features/properties/PropertyCard";

const featuredProperties = [
  {
    title: "Luxury Villa with Ocean View",
    location: "Santa Barbara, California",
    description:
      "Spacious 4-bedroom villa with stunning ocean views, private pool, and modern amenities.",
    price: "$500/night",
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/542473567.jpg?k=009aaf531393730283099a9d50a1b688659014224242f4204e659011188e7476&o=&hp=1",
  },
  {
    title: "Cozy Mountain Cabin",
    location: "Aspen, Colorado",
    description:
      "Charming 2-bedroom cabin nestled in the mountains, perfect for a winter getaway.",
    price: "$300/night",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKGCTA3aY4q-SreT7K1vSNXv70HrKegV52PA&s",
  },
  {
    title: "Modern City Apartment",
    location: "New York City, New York",
    description:
      "Sleek 1-bedroom apartment in the heart of Manhattan, close to major attractions.",
    price: "$250/night",
    imageUrl: "https://media.architecturaldigest.com/photos/60dcd7c2f837262bdb349dc8/16:9/w_2560%2Cc_limit/NHD-50WEST-F.OUDEMAN%25C2%25A9-02.jpg",
  },
  {
    title: "Makuza Peace Plaza",
    location: "Rwanda, Kigali City",
    description:
      "Sleek 1-bedroom apartment in the heart of KIGALI, close to major attractions.",
    price: "$250/night",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7FFYJ-9LixZjQrVS1dro5IpghnajhZrd3kQ&ss",
  },
];

const Home = () => {
  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Featured Properties
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </div>
      <BookingForm />
    </main>
  );
};

export default Home;
