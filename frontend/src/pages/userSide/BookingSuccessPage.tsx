import UserHeader from "../../components/users/UserHeader"
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';

const BookingSuccessPage: React.FC = () => {
    const navigate = useNavigate();

    const handleExploreMore = () => {
        navigate('/search')
    };

    return (
        <>
            <UserHeader />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <Card className="max-w-md w-full p-6 text-center animate-fadeIn">
                    <CardHeader className="flex flex-col items-center">
                        <CheckCircleIcon className="h-16 w-16 text-green-500 mb-4" />
                        <h1 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h1>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 mb-6">
                            Thank you for booking with us! Your resort reservation is confirmed.
                            We look forward to welcoming you!
                        </p>
                        <Button
                            onClick={handleExploreMore}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
                        >
                            Explore More Resorts
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default BookingSuccessPage;