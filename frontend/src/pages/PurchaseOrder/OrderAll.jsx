import React from "react";
import OrderList from "./OrderList/OrderList";

function OrderAll({ invoiceListByUser }) {
    return <OrderList invoiceListByUser={invoiceListByUser} />;
}

export default OrderAll;
