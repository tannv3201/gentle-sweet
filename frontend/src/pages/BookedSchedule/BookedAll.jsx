import React from "react";
import BookedList from "./BookedList/BookedList";

function BookedAll({ bookingListByUser }) {
    return <BookedList bookingListByUser={bookingListByUser} />;
}

export default BookedAll;
