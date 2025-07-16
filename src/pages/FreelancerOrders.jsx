import React, { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";

const OrderModal = ({ order, open, onClose, onAccept }) => {
  if (!open || !order) return null;

  // Status badge colors
  const statusColors = {
    processing: "bg-yellow-400",
    "in-progress": "bg-blue-400",
    submitted: "bg-purple-400",
    delivered: "bg-green-400",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={order.gigId?.thumbnail || "https://via.placeholder.com/150"}
            alt={order.gigId?.title}
            className="w-24 h-24 object-cover rounded-lg shadow"
          />
          <div>
            <h2 className="text-2xl font-bold">{order.gigId?.title}</h2>
            <p className="text-gray-500">
              Client: {order.userId?.username || "Unknown"}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <span
            className={`inline-block px-4 py-2 rounded-full font-semibold text-white text-lg animate-pulse ${
              statusColors[order.status] || "bg-gray-400"
            }`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>

        <div className="mb-2 text-gray-700">
          <strong>Amount Paid:</strong> ₹{order.price}
        </div>
        <div className="mb-2 text-gray-700">
          <strong>Order ID:</strong> {order._id}
        </div>
        <div className="mb-2 text-gray-700">
          <strong>Placed On:</strong>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </div>

        {order.status === "processing" && (
          <Button
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold"
            onClick={() => onAccept(order._id)}
          >
            Accept Order
          </Button>
        )}

        <div className="mt-6 flex justify-end">
          <Button
            variant="outline"
            onClick={() => alert("Chat feature coming soon!")}
          >
            Chat with Client
          </Button>
        </div>
      </div>
    </div>
  );
};

const FreelancerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/freelancer-order");
      console.log("Freelancer Orders:", res.data);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching freelancer orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAccept = async (orderId) => {
    try {
      await API.patch(`/orders/${orderId}/progress`);
      await fetchOrders();
      setModalOpen(false);
    } catch (err) {
      console.error("Error accepting order:", err);
    }
  };

  if (loading) {
    return <p className="text-center">Loading your orders...</p>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="p-4 max-w-4xl mx-auto bg-gray-100 rounded-2xl">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-4 shadow rounded-lg cursor-pointer hover:shadow-lg transition"
                onClick={() => {
                  setSelectedOrder(order);
                  setModalOpen(true);
                }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      order.gigId?.thumbnail ||
                      "https://via.placeholder.com/150"
                    }
                    alt={order.gigId?.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">
                      {order.gigId?.title}
                    </h2>
                    <p className="text-gray-500">
                      Client: {order.userId?.username}
                    </p>
                    <p className="text-gray-500">Amount Paid: ₹{order.price}</p>
                    <p className="text-gray-500">
                      Status:{" "}
                      <span className="font-bold">
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <OrderModal
        order={selectedOrder}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAccept={handleAccept}
      />
    </div>
  );
};

export default FreelancerOrders;
