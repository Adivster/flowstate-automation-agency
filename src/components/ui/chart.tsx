
import React, { FC } from "react";
import { 
  ResponsiveContainer, 
  LineChart as RLineChart, 
  Line, 
  BarChart as RBarChart, 
  Bar, 
  PieChart as RPieChart,
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
  description?: string;
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
  // Additional properties for PieChart
  donut?: boolean;
  gradient?: boolean;
  interactive?: boolean;
  showLabel?: boolean;
  outerRadius?: number;
  legendPosition?: string;
  onClick?: (data: any, index: number) => void;
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
  donut = false,
  gradient = false,
  interactive = false,
  showLabel = true,
  outerRadius = 80,
  legendPosition = 'bottom',
  onClick,
}) => {
  // Line area generator using cardinal curve
  const cardinal = curveCardinal.tension(0.2);

  // Responsive wrapper to ensure chart fits container
  return (
    <div style={{ width: width || "100%", height }} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        {type === "line" && (
          <RLineChart
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
              onClick={onClick}
            />
          </RLineChart>
        )}

        {type === "bar" && (
          <RBarChart
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
            <Bar dataKey="value" fill={colors[0]} onClick={onClick} />
          </RBarChart>
        )}

        {type === "area" && (
          <RLineChart
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
              onClick={onClick}
            />
          </RLineChart>
        )}

        {type === "pie" && (
          <RPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={outerRadius}
              fill="#8884d8"
              dataKey="value"
              innerRadius={donut ? outerRadius * 0.6 : 0}
              label={showLabel ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%` : undefined}
              onClick={onClick}
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
                layout={legendPosition === 'side' ? 'vertical' : 'horizontal'}
                align={legendPosition === 'side' ? 'right' : 'center'}
                verticalAlign={legendPosition === 'side' ? 'middle' : 'bottom'}
                formatter={(value, entry, index) => {
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
          </RPieChart>
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

// For backward compatibility, add LineChart and BarChart as aliases of LineChart2 and BarChart2
export const LineChart = LineChart2;
export const BarChart = BarChart2;
