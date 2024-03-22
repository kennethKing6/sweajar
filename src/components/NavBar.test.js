import '../model/__mocks__/User'
import '../shared/firebase/__mock__/mockFirebase'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import NavBar from './NavBar'
import { SignedInUser } from "../model/SignedInUser";

SignedInUser.user = {
  userID: "userID",
};

describe('NavBar Component', () => {
  // Test 1: Renders without errors
  test('renders without errors', () => {
    render(
      <NavBar 
        onLeaderboardClick={() => {}} 
        onTeamsClick={() => {}} 
        onNewReportClick={() => {}} 
        onProfileClick={() => {}} 
        onLogout={() => {}}
      />
    );
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('Teams')).toBeInTheDocument();
    expect(screen.getByText('New Report')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  // Test 2: Triggers click events for navigation items
  test('triggers click events for navigation items', async () => {
    // Mock event handler functions
    const mockHandlers = {
      onLeaderboardClick: jest.fn(),
      onTeamsClick: jest.fn(),
      onNewReportClick: jest.fn(),
      onProfileClick: jest.fn(),
      onLogout: jest.fn()
    };

    // Render the NavBar component with mock event handlers
    render(<NavBar {...mockHandlers} />);

    // Simulate clicks on navigation items
    fireEvent.click(screen.getByText('Leaderboard'));
    fireEvent.click(screen.getByText('Teams'));
    fireEvent.click(screen.getByText('New Report'));
    fireEvent.click(screen.getByText('Profile'));
    fireEvent.click(screen.getByText('Logout'));

    // Assert that event handlers were called when expected
    await waitFor(() => {
    // // Assert that event handler functions were called with correct arguments
      expect(mockHandlers.onLeaderboardClick).toHaveBeenCalledTimes(1);
      expect(mockHandlers.onTeamsClick).toHaveBeenCalledTimes(1);
      expect(mockHandlers.onNewReportClick).toHaveBeenCalledTimes(1);
      expect(mockHandlers.onProfileClick).toHaveBeenCalledTimes(1);
      expect(mockHandlers.onLogout).toHaveBeenCalledTimes(1);
    });
  });

  // Test 3: Triggers hover effect over the nav items
  test('hover/unhover', async () => {
    // Render the NavBar component
    render(
      <NavBar 
        onLeaderboardClick={() => {}} 
        onTeamsClick={() => {}} 
        onNewReportClick={() => {}} 
        onProfileClick={() => {}} 
        onLogout={() => {}}
      />
    );
  
    const leaderboardItem = screen.getByText('Leaderboard');
    const teamsItem = screen.getByText('Teams');
    const newReportItem = screen.getByText('New Report');
    const profileItem = screen.getByText('Profile');
    const logoutItem = screen.getByText('Logout');
    // No hover effect
    expect(leaderboardItem).not.toHaveStyle('border: 1px solid blue');
    expect(teamsItem).not.toHaveStyle('border: 1px solid blue');
    expect(newReportItem).not.toHaveStyle('border: 1px solid blue');
    expect(profileItem).not.toHaveStyle('border: 1px solid blue');
    expect(logoutItem).not.toHaveStyle('border: 1px solid blue');
  
    await userEvent.hover(leaderboardItem);
    await userEvent.hover(teamsItem);
    await userEvent.hover(newReportItem);
    await userEvent.hover(profileItem);
    await userEvent.hover(logoutItem);
    
    // Has hover effect
    expect(leaderboardItem).toHaveStyle('border: 1px solid blue');
    expect(teamsItem).toHaveStyle('border: 1px solid blue');
    expect(newReportItem).toHaveStyle('border: 1px solid blue');
    expect(profileItem).toHaveStyle('border: 1px solid blue');
    expect(logoutItem).toHaveStyle('border: 1px solid blue');
  
    await userEvent.unhover(leaderboardItem);
    await userEvent.unhover(teamsItem);
    await userEvent.unhover(newReportItem);
    await userEvent.unhover(profileItem);
    await userEvent.unhover(logoutItem);
  
    expect(leaderboardItem).not.toHaveStyle('border: 1px solid blue');
    expect(teamsItem).not.toHaveStyle('border: 1px solid blue');
    expect(newReportItem).not.toHaveStyle('border: 1px solid blue');
    expect(profileItem).not.toHaveStyle('border: 1px solid blue');
    expect(logoutItem).not.toHaveStyle('border: 1px solid blue');
  });
});