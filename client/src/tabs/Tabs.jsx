import React, { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = ["Overview", "Notification", "Analytics", "Customers"];

  const tabContent = {
    Overview: `Overview ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. 
Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.`,
    Notification: "Notification content goes here.",
    Analytics: "Analytics content goes here.",
    Customers: "Customers content goes here.",
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Default Tab</h1>
      <div className="bg-white rounded-xl shadow border border-gray-200">
        <div className="flex space-x-4 p-4 bg-gray-100 rounded-t-xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold focus:outline-none transition
                ${
                  activeTab === tab
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">{activeTab}</h2>
          <p className="text-gray-600">{tabContent[activeTab]}</p>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
