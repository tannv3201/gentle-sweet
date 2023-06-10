import React from "react";
import BookedList from "./BookedList/BookedList";

function BookedScheduled({ bookingListByUser }) {
    return <BookedList bookingListByUser={bookingListByUser} />;
}

export default BookedScheduled;
