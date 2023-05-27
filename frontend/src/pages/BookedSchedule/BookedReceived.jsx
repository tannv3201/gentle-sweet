import React from "react";
import BookedList from "./BookedList/BookedList";

function BookedReceived({ bookingListByUser }) {
    return <BookedList bookingListByUser={bookingListByUser} />;
}

export default BookedReceived;
