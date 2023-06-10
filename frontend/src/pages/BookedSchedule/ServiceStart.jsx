import React from "react";
import BookedList from "./BookedList/BookedList";

function ServiceStart({ bookingListByUser }) {
    return <BookedList bookingListByUser={bookingListByUser} />;
}

export default ServiceStart;
