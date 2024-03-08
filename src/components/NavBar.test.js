import '../shared/firebase/__mock__/mockFirebase'
import { render, screen, fireEvent } from '@testing-library/react'
import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import NavBar from './NavBar'

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
      // Assert that event handler functions were called with correct arguments
      expect(mockHandlers.onLeaderboardClick).toHaveBeenCalledTimes(1);
      expect(mockHandlers.onTeamsClick).toHaveBeenCalledTimes(1);
      expect(mockHandlers.onNewReportClick).toHaveBeenCalledTimes(1);
      expect(mockHandlers.onProfileClick).toHaveBeenCalledTimes(1);
      expect(mockHandlers.onLogout).toHaveBeenCalledTimes(1);
    });
  });
});
