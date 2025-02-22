import Card from "../../ui/Card";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../ui/CardElements";
import { Button } from "../../common/Button";

interface PropertyCardProps {
  title: string;
  location: string;
  description: string;
  price: string;
  imageUrl: string;
}

const PropertyCard = ({
  title,
  location,
  description,
  price,
  imageUrl,
}: PropertyCardProps) => {
  return (
    <Card className="transition-all hover:shadow-lg">
      <img className="h-48 w-full object-cover" src={imageUrl} alt={title} />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{location}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-bold">{price}</span>
        <Button>View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
