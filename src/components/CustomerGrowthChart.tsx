import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { fetchCustomerGrowth, type CustomerGrowth } from "../services/customerService";
import "../styles/CustomerGrowthChart.less";

const CustomerGrowthChart: React.FC = () => {
  const [data, setData] = useState<CustomerGrowth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCustomerGrowth()
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load customer data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="chart-status">Loading customer growth...</p>;
  }

  if (error) {
    return <p className="chart-status error">{error}</p>;
  }

  return (
    <section className="customer-growth-section">
      <h2>Customer Growth Over the Years</h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="customers"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default CustomerGrowthChart;
