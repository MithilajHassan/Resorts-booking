import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import StarRatings from 'react-star-ratings';
import { Textarea } from "../../components/ui/textarea";
import { ChangeEvent, useState } from "react";

export default function WriteReview() {
    const [rating, setRating] = useState<number>(2)
    const [review, setReview] = useState<string>('')
    const [errMsg, setErrMsg] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const submitHanlder = () => {
        const regex = /^[a-zA-Z0-9\s,.'-]{10,}$/;
        if (!regex.test(review)) {
            setErrMsg('Please write review with at least 10 characters.');
        } else {
            setErrMsg('')
            console.log(rating, review)
            setIsOpen(true)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-white hover:bg-blue-700 text-blue-700 hover:text-white border border-blue-800">Write review</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add your review</DialogTitle>
                    <DialogDescription>Please select your rating and write your review.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor="name" className="">
                            How would you rate it?
                        </Label>
                        <StarRatings
                            rating={rating}
                            starRatedColor="gold"
                            changeRating={(newRating: number) => setRating(newRating)}
                            numberOfStars={5}
                            name="rating"
                            starDimension="35px"  
                            starSpacing="5px"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Write your review</Label>
                        <Textarea
                            id="username"
                            value={review}
                            placeholder="What did you like or dislike?"
                            rows={3}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setReview(e.target.value)}
                        />
                    </div>
                </div>
                <p className="text-center text-red-700 text-sm">{errMsg}</p>

                <DialogFooter>
                    <Button className="bg-blue-600 hover:bg-blue-400" onClick={submitHanlder}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
