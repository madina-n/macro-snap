"use client";

import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProgressRingProps {
  label: string;
  value: number;
  maxValue: number;
  color: string; // Recharts compatible color string e.g. "hsl(var(--primary))" or "#228B22"
  unit?: string;
  icon?: React.ReactNode;
}

const ProgressRing: React.FC<ProgressRingProps> = ({ label, value, maxValue, color, unit = "g", icon }) => {
  const percentage = maxValue > 0 ? Math.min((value / maxValue) * 100, 100) : 0;
  // Recharts data needs to be an array of objects
  const chartData = [{ name: label, value: percentage, fill: color }];

  return (
    <Card className="flex flex-col items-center text-center shadow-lg w-full">
      <CardHeader className="pb-2 pt-4 flex flex-row items-center justify-center space-x-2">
        {icon}
        <CardTitle className="text-base font-semibold">{label}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center items-center p-0 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="70%"
            outerRadius="90%"
            barSize={10}
            data={chartData}
            startAngle={90}
            endAngle={-270} // Full circle
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar
              background={{ fill: 'hsla(var(--muted), 0.3)' }}
              dataKey="value"
              cornerRadius={5}
              angleAxisId={0}
              // fill is set in chartData
            />
            {/* Text in the middle of the ring */}
            <text
              x="50%"
              y="45%" // Adjusted for two lines of text
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xl sm:text-2xl font-bold fill-foreground"
            >
              {Math.round(value)}
            </text>
            <text
              x="50%"
              y="65%" // Position unit below the value
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs sm:text-sm fill-muted-foreground"
            >
              / {maxValue}{unit}
            </text>
          </RadialBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ProgressRing;
