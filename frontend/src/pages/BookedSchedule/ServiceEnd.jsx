import React from "react";
import BookedList from "./BookedList/BookedList";

function ServiceEnd({ bookingListByUser }) {
    return <BookedList bookingListByUser={bookingListByUser} />;
}

export default ServiceEnd;
