import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { CHART_COLOR, CHART_TEXT, CHART_LABEL } from '../assets/colors';

const chartSetting = {
  margin: { bottom: 20, left: 25, right: 5 },
  yAxis: [
    {
      label: 'Count',
    },
  ],
  width: 200,
  height: 200,
};

const chartStyles = {
  '.recharts-label': {
    fill: 'white', // NOT WORKING
  },
};

export default function LeaderboardChart({ userData }) {
  const flattenedData = userData.flatMap(user =>
    user.violations.map(violation => ({
      username: user.username,
      violationType: violation.violationType,
      countPerViolation: violation.countPerViolation,
    }))
  );

  return (
    <BarChart
      dataset={flattenedData}
      xAxis={[{ scaleType: 'band', dataKey: 'violationType' }]}
      series={[
        {
          dataKey: 'countPerViolation',
          label: 'Violation Count',
          color: '#FFC107',
        },
      ]}
      {...chartSetting}
      style={chartStyles}
    />
  );
}