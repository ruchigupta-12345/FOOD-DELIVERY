import React, { useState, useEffect } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets"; // Adjust based on actual path

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Server error");
      console.error(error);
    }
  };
const statusHandler = async (event,orderId)=>{
const response = await axios.post(url+"/api/order/status",{
  orderId,
  status:event.target.value
})
if (response.data.success) {
  await fetchAllOrders();
}
}
  useEffect(() => {
    fetchAllOrders();
  }, [url]); // Added `url` in dependencies

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="Order" />
            <p className="order-item-food">
              {order.items
                .map((item, idx) => `${item.name} x${item.quantity}`)
                .join(", ")}
            </p>
            <p className="order-item-name">
              {order.address.firstname + " " + order.address.lastname}
            </p>
            <div className="order-item-address">
              <p>{order.address.street},</p>
              <p>
                {order.address.city}, {order.address.state}, {order.address.country},{" "}
                {order.address.zipcode}
              </p>
            </div>
            <p className="order-item-phone">{order.address.phone}</p>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Deliverd">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
