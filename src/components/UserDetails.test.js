import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserDetails from './UserDetails';

// Mocking modules
jest.mock("@mui/x-charts", () => ({ 
    BarChart: jest.fn().mockImplementation(({ children }) => children)
}));

jest.mock('../model/User', () => ({
  getUserByID: jest.fn().mockResolvedValue({}),
}));

jest.mock('../model/SignedInUser', () => ({
    SignedInUser: { user: { userID: '123', teamID: '456' } },
  }));

jest.mock('../controllers/userDetailsController', () => ({
  getMonthBarChartData: jest.fn().mockResolvedValue([]),
  getMonthLineChartData: jest.fn().mockResolvedValue({ data: [], series: [] }),
}));

describe('UserDetails Component', () => {
  it('renders without crashing', () => {
    render(<UserDetails />);
  });

  it('displays user information', async () => {
    const { getByText } = render(<UserDetails />);
    // Wait for user data to be fetched
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(getByText(/Analysis/i)).toBeInTheDocument();
  });

  it('fetches bar chart data when user is set', async () => {
    render(<UserDetails />);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for useEffect to execute
    expect(require('../controllers/userDetailsController').getMonthBarChartData).toHaveBeenCalled();
  });

  it('fetches line chart data when user is set', async () => {
    render(<UserDetails />);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for useEffect to execute
    expect(require('../controllers/userDetailsController').getMonthLineChartData).toHaveBeenCalled();
  });

//   it('shows "No graph available" message if bar chart data is empty', async () => {
//     const { getByText } = render(<UserDetails />);
//     await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for useEffect to execute
//     expect(getByText(/No graph available/i)).toBeInTheDocument();
//   });

//   it('shows "No graph available" message if line chart data is empty', async () => {
//     const { getByText } = render(<UserDetails />);
//     await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for useEffect to execute
//     expect(getByText(/No graph available/i)).toBeInTheDocument();
//   });

  it('displays violation types if chart data is available', async () => {
    const mockChartData = [
      { violationType: 'Type 1', countPerViolation: 5 },
      { violationType: 'Type 2', countPerViolation: 10 },
    ];
    require('../controllers/userDetailsController').getMonthBarChartData.mockResolvedValue(mockChartData);
    const { getByText } = render(<UserDetails />);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for useEffect to execute
    expect(getByText(/Type 1/i)).toBeInTheDocument();
    expect(getByText(/Type 2/i)).toBeInTheDocument();
  });

  it('calls onPress function when user image is clicked', async () => {
    const onPress = jest.fn();
    const { getByAltText } = render(<UserDetails onPress={onPress} />);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for useEffect to execute
    const userImage = getByAltText(/user profile/i);
    fireEvent.click(userImage);
    expect(onPress).toHaveBeenCalled();
  });
});
