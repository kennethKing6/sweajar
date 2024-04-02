import "../shared/firebase/__mock__/mockFirebase";
import "../model/__mocks__/User";
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import { User } from "../model/User";
import { Teams } from "../model/Teams";
import { ReportViolationsController } from '../controllers/reportViolationsController';
import UsersList, { TeamMemberItem } from "./UsersList";

jest.mock('../model/Teams', () => ({
    Teams: {
        getTeamMembers: jest.fn(),
    },
}));

jest.mock('../model/SignedInUser', () => ({
    SignedInUser: {
        user: { teamID: 'testTeamID' },
    },
}));

jest.mock('../model/User', () => ({
    User: {
        getUserByID: jest.fn().mockImplementation((userID) => {
            return Promise.resolve({
                userID: userID,
                firstName: "MockedFirstName",
                lastName: "MockedLastName",
                email: "email@test.com",
                profilePicture: "https://test.com/mock.jpg",
            });
        }),
    },
}));

jest.mock('../controllers/reportViolationsController', () => ({
    ReportViolationsController: {
        reportUsers: jest.fn(),
    },
}));

window.alert = jest.fn();

describe('UsersList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        Teams.getTeamMembers.mockResolvedValue([]);
    });

    it('renders UsersList component', () => {
        render(<UsersList />);
        expect(screen.getByText('Employees List')).toBeInTheDocument();
    });

    it('fetches team members on mount', async () => {
        Teams.getTeamMembers.mockResolvedValueOnce([
            {
                userID: "mockedUserID1",
                firstName: "MockedFirstName1",
                lastName: "MockedLastName1",
                email: "email1@test.com",
                profilePicture: "https://test.com/mock1.jpg",
            },
            {
                userID: "mockedUserID2",
                firstName: "MockedFirstName2",
                lastName: "MockedLastName2",
                email: "email2@test.com",
                profilePicture: "https://test.com/mock2.jpg",
            },
        ]);
        render(<UsersList />);
        await waitFor(() => {
            expect(Teams.getTeamMembers).toHaveBeenCalledTimes(1);
        });
    });

    it('handles error when fetching team members', async () => {
        const errorMessage = 'Failed to fetch team members';
        
        // Mocking the rejection of getTeamMembers
        Teams.getTeamMembers.mockRejectedValueOnce(new Error(errorMessage));
        
        render(<UsersList />);
        await waitFor(() => {
            act(() => {
                expect(window.alert).toHaveBeenCalledTimes(1);
                expect(window.alert).toHaveBeenCalledWith(errorMessage);
            });
        }).catch((error) => {
            console.error('Error during waitFor:', error);
        });
    });        

    it('handles report button click', async () => {
        render(<UsersList />);
        fireEvent.click(screen.getByText('Report'));
        await waitFor(() => {
            expect(ReportViolationsController.reportUsers).toHaveBeenCalledTimes(1);
            expect(window.alert).toHaveBeenCalledWith('Successfully added violatons');
        });
    });

    it('initializes with correct initial state', () => {
        render(<UsersList />);
        expect(screen.getByText('Employees List')).toBeInTheDocument();
        expect(Teams.getTeamMembers).toHaveBeenCalledTimes(1);
        expect(ReportViolationsController.reportUsers).not.toHaveBeenCalled();
    });        
});

describe('TeamMemberItem', () => {
    const mockUser = {
        userID: "mockedUserID",
        firstName: "MockedFirstName",
        lastName: "MockedLastName",
        email: "email@test.com",
        profilePicture: "https://test.com/mock.jpg",
    };

    beforeEach(() => {
        User.getUserByID.mockResolvedValue(mockUser);
    });

    it('renders user item correctly', async () => {
        render(<TeamMemberItem value={mockUser.userID} checked={[]} setChecked={() => {}} />);
        await waitFor(() => {
            expect(screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`)).toBeInTheDocument();
            expect(screen.getByAltText(`Avatar n°${mockUser.userID + 1}`)).toBeInTheDocument();
        });
    });
});