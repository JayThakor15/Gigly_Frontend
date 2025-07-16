import React, { useEffect, useState } from "react";
import styled from "styled-components";
import API from "../utils/api";
import Navbar from "../components/Navbar";

// Stepper UI for order status
const OrderStepper = ({ order }) => {
  // Define all possible statuses in order
  const steps = [
    {
      key: "placed",
      title: "Order Placed",
      status: "Completed",
      time: order.createdAt ? new Date(order.createdAt).toLocaleString() : "",
      completed: true,
    },
    {
      key: "processing",
      title: "Processing",
      status: "Processing",
      time: order.processingTime || "",
      active: order.status === "processing",
      completed: ["in-progress", "submitted", "delivered"].includes(
        order.status
      ),
    },
    {
      key: "in-progress",
      title: "In Progress",
      status: "Accepted",
      time: order.inProgressTime || "",
      active: order.status === "in-progress",
      completed: ["submitted", "delivered"].includes(order.status),
    },
    {
      key: "submitted",
      title: "Submitted",
      status: "Submitted",
      time: order.submittedAt
        ? new Date(order.submittedAt).toLocaleString()
        : "",
      active: order.status === "submitted",
      completed: order.status === "delivered",
    },
    {
      key: "delivered",
      title: "Delivered",
      status: "Delivered",
      time: order.deliveredAt
        ? new Date(order.deliveredAt).toLocaleString()
        : "",
      active: order.status === "delivered",
      completed: false,
    },
  ];

  // Find current step index
  const currentStepIndex = steps.findIndex((step) => step.key === order.status);

  return (
    <StepperWrapper>
      <div className="stepper-box">
        {steps.map((step, idx) => {
          let stepClass = "stepper-step ";
          if (idx < currentStepIndex) stepClass += "stepper-completed";
          else if (idx === currentStepIndex) stepClass += "stepper-active";
          else stepClass += "stepper-pending";
          return (
            <div className={stepClass} key={step.key}>
              <div className="stepper-circle">
                {idx < currentStepIndex ? (
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    height={20}
                    width={20}
                  >
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                  </svg>
                ) : (
                  idx + 1
                )}
              </div>
              {idx < steps.length - 1 && <div className="stepper-line" />}
              <div className="stepper-content">
                <div className="stepper-title">{step.title}</div>
                <div className="stepper-status">{step.status}</div>
                <div className="stepper-time">{step.time}</div>
              </div>
            </div>
          );
        })}
      </div>
    </StepperWrapper>
  );
};

const OrderModal = ({ order, open, onClose }) => {
  if (!open || !order) return null;

  return (
    <div className="fixed inset-0 z-50 w-full flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-2xl p-0 max-w-3xl w-full flex relative animate-fade-in">
        {/* Left: Order Status */}
        <div className="w-1/2 p-8 border-r flex items-center justify-center">
          <OrderStepper order={order} />
        </div>
        {/* Right: Order Details */}
        <div className="w-1/2 p-8 relative">
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
                Freelancer: {order.freelancerName}
              </p>
            </div>
          </div>
          <div className="mb-2 text-gray-700">
            <strong>Amount Paid:</strong> ₹{order.price}
          </div>
          <div className="mb-2 text-gray-700 break-all">
            <strong>Order ID:</strong> {order._id}
          </div>
          <div className="mb-2 text-gray-700">
            <strong>Placed On:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </div>
          {order.deliveryMessage && (
            <div className="mb-2 text-gray-700">
              <strong>Delivery Message:</strong> {order.deliveryMessage}
            </div>
          )}
          {order.deliveryFileUrl && (
            <div className="mb-2 text-gray-700">
              <strong>Delivery File:</strong>{" "}
              <a
                href={order.deliveryFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View File
              </a>
            </div>
          )}
          <div className="mt-6 flex justify-end">
            <button
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition-all duration-300"
              onClick={() => alert("Chat feature coming soon!")}
            >
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StepperWrapper = styled.div`
  .stepper-box {
    background-color: white;
    border-radius: 10px;
    padding: 24px;
    width: 100%;
    max-width: 340px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
    font-size: 15px;
  }
  .stepper-step {
    display: flex;
    margin-bottom: 22px;
    position: relative;
    align-items: flex-start;
  }
  .stepper-step:last-child {
    margin-bottom: 0;
  }
  .stepper-line {
    position: absolute;
    left: 19px;
    top: 32px;
    bottom: -22px;
    width: 2px;
    background-color: #e2e8f0;
    z-index: 1;
  }
  .stepper-step:last-child .stepper-line {
    display: none;
  }
  .stepper-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    z-index: 2;
    background: #f8fafc;
    color: #94a3b8;
    border: 2px solid #e2e8f0;
    transition: background 0.3s, color 0.3s, border 0.3s;
  }
  .stepper-completed .stepper-circle {
    background-color: #dcfce7 !important;
    color: #166534 !important;
    border: 2px solid #166534 !important;
  }
  .stepper-active .stepper-circle {
    border: 2px solid #1d4ed8;
    color: #1d4ed8;
    background: #dbeafe;
  }
  .stepper-pending .stepper-circle {
    border: 2px solid #e2e8f0;
    color: #94a3b8;
    background: #f8fafc;
  }
  .stepper-content {
    flex: 1;
    min-width: 0;
  }
  .stepper-title {
    font-weight: 600;
    margin-bottom: 2px;
    font-size: 16px;
  }
  .stepper-completed .stepper-title {
    color: #166534;
  }
  .stepper-active .stepper-title {
    color: #1d4ed8;
  }
  .stepper-pending .stepper-title {
    color: #94a3b8;
  }
  .stepper-status {
    font-size: 13px;
    display: inline-block;
    padding: 2px 10px;
    border-radius: 10px;
    margin-top: 2px;
    background: #f1f5f9;
    color: #64748b;
    transition: background 0.3s, color 0.3s;
  }
  .stepper-completed .stepper-status {
    background-color: #dcfce7;
    color: #166534;
  }
  .stepper-active .stepper-status {
    background-color: #dbeafe;
    color: #1d4ed8;
  }
  .stepper-time {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 2px;
    word-break: break-all;
  }
`;

const ClientOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/my-orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
                className="bg-white p-4 shadow rounded-lg cursor-pointer hover:shadow-lg transition-all"
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
                      Freelancer: {order.freelancerName}
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
      />
    </div>
  );
};

export default ClientOrders;
