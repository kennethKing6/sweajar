import React from 'react';
import { render, screen } from '@testing-library/react';
import './__mocks__/BarChart'

jest.mock('@mui/x-charts/BarChart', () => {
    const FakeBarChart = jest.fn(({ children }) => children);
    const FakeCSSTransition = jest.fn(props =>
      props.in ? <FakeBarChart>{props.children}</FakeBarChart> : null
    );
    return { BarChart: FakeCSSTransition};
  });

import LeaderboardChart from './LeaderboardChart';
describe('Leaderboard Component', () => {
    // Test 1: Renders chart
    test('BarChart renders without errors', ()=>{
        // Mock chart data
        const chartData = [
            { violationType: 'Type A', countPerViolation: 10 },
            { violationType: 'Type B', countPerViolation: 20 },
            { violationType: 'Type C', countPerViolation: 30 },
        ];
        render(<LeaderboardChart chartData={chartData} />);

        // expect(screen.getByText('Violation Count')).toBeInTheDocument();
        // expect(screen.getByText('Type A')).toBeInTheDocument();
        // expect(screen.getByText('Type B')).toBeInTheDocument();
        // expect(screen.getByText('Type C')).toBeInTheDocument();
    });
});