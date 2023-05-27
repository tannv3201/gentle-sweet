import React from "react";
import OrderList from "./BookedList/BookedList";

function BookedPending({ bookingListByUser }) {
    return <OrderList bookingListByUser={bookingListByUser} />;
}

export default BookedPending;
