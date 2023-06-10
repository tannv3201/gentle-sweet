import React from "react";
import BookedList from "./BookedList/BookedList";

function BookedCancelPending({ bookingListByUser }) {
    return <BookedList bookingListByUser={bookingListByUser} />;
}

export default BookedCancelPending;
