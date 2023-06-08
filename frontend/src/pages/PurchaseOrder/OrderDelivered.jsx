import React from "react";
import OrderList from "./OrderList/OrderList";

function OrderDelivered({ invoiceListByUser }) {
    return <OrderList invoiceListByUser={invoiceListByUser} />;
}

export default OrderDelivered;
