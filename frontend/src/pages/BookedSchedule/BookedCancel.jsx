import React from "react";
import BookedList from "./BookedList/BookedList";

function BookedCancel({ bookingListByUser }) {
    return <BookedList bookingListByUser={bookingListByUser} />;
}

export default BookedCancel;
