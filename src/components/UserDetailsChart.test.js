import React from 'react';
import { render } from '@testing-library/react';
import UserDetailsChart from './UserDetailsChart';

jest.mock("@mui/x-charts", () => ({ 
    BarChart: jest.fn().mockImplementation(({ children }) => children)
}));


describe('UserDetailsChart Component', () => {
  it('renders without crashing', () => {
    const violationData = [
      { violationType: 'Type 1', countPerViolation: 5 },
      { violationType: 'Type 2', countPerViolation: 10 },
    ];
    render(<UserDetailsChart violationData={violationData} />);
  });

  it('displays bar chart with correct data', () => {
    const violationData = [
      { violationType: 'Type 1', countPerViolation: 5 },
      { violationType: 'Type 2', countPerViolation: 10 },
    ];
    const { getByText } = render(<UserDetailsChart violationData={violationData} />);
    
    // Check if the chart displays the data correctly
    expect(getByText('Type 1')).toBeInTheDocument();
    expect(getByText('Type 2')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
  });
});
