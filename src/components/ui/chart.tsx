
// This is the file causing TypeScript errors. Let's fix the PieChart component, which has dataIndex and index errors
// Fixed file follows:
// Original file error: Property 'dataIndex' and 'index' do not exist on type '{ strokeDasharray: ReactText; value?: any; }'

import React, { FC } from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart,
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  TooltipProps 
} from "recharts";
import { curveCardinal } from "d3-shape";
import { ReactText } from 'react';

// Type for data points
interface DataPoint {
  name: string;
  value: number;
  color?: string;
}

// Chart Component Props
interface ChartProps {
  data: DataPoint[];
  type: "line" | "bar" | "pie" | "area";
  height?: number;
  width?: number;
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  className?: string;
}

// Default colors
const defaultColors = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#0088fe",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

export const Chart: FC<ChartProps> = ({
  data,
  type,
  height = 300,
  width,
  colors = defaultColors,
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  className,
}) => {
  // Line area generator using cardinal curve
  const cardinal = curveCardinal.tension(0.2);

  // Responsive wrapper to ensure chart fits container
  return (
    <div style={{ width: width || "100%", height }} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        {type === "line" && (
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            {showXAxis && <XAxis dataKey="name" />}
            {showYAxis && <YAxis />}
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            <Line
              type="monotone"
              dataKey="value"
              stroke={colors[0]}
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        )}

        {type === "bar" && (
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            {showXAxis && <XAxis dataKey="name" />}
            {showYAxis && <YAxis />}
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            <Bar dataKey="value" fill={colors[0]} />
          </BarChart>
        )}

        {type === "area" && (
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            {showXAxis && <XAxis dataKey="name" />}
            {showYAxis && <YAxis />}
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors[0]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="value"
              stroke={colors[0]}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 1 }}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </LineChart>
        )}

        {type === "pie" && (
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || colors[index % colors.length]}
                />
              ))}
            </Pie>
            {showLegend && (
              <Legend 
                formatter={(value, entry, index) => {
                  // Fixed TypeScript error by correctly typing the entry parameter
                  if (typeof index === 'number') {
                    return (
                      <span style={{ color: data[index].color || colors[index % colors.length] }}>
                        {value}
                      </span>
                    );
                  }
                  return value;
                }}
              />
            )}
            {showTooltip && <Tooltip />}
          </RechartsPieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

// Specialized chart components for specific use cases
export const LineChart2: FC<Omit<ChartProps, "type">> = (props) => (
  <Chart {...props} type="line" />
);

export const BarChart2: FC<Omit<ChartProps, "type">> = (props) => (
  <Chart {...props} type="bar" />
);

export const PieChart: FC<Omit<ChartProps, "type">> = (props) => (
  <Chart {...props} type="pie" />
);

export const AreaChart: FC<Omit<ChartProps, "type">> = (props) => (
  <Chart {...props} type="area" />
);

// Usage example:
// <LineChart2 data={[{name: 'A', value: 10}, {name: 'B', value: 20}]} />
