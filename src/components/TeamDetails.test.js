import "../shared/firebase/__mock__/mockFirebase";
import "../model/__mocks__/User";
import { render, fireEvent, screen } from '@testing-library/react';
import { User } from "../model/User";
import { Teams } from "../model/Teams";
import TeamDetails, { TeamMemberItem } from '../components/TeamDetails';

jest.mock('../model/Teams');

jest.mock('../model/AppState', () => ({
    user: { userID: "userID" }
}));

jest.mock('../model/SignedInUser', () => ({
    SignedInUser: {
        user: { teamID: null },
    },
}));

jest.mock('../model/User', () => ({
    User: {
        getUserByID: jest.fn(),
    },
}));

describe('TeamDetails', () => {
    it('renders TeamDetails component', () => {
        Teams.getTeamMembers.mockResolvedValue([]);
        render(<TeamDetails />);
        expect(screen.getByText('Team Details')).toBeInTheDocument();
    });

    it('toggles between team members and add member', async () => {
        const teamMembers = [{ userID: '1' }, { userID: '2' }];
        Teams.getTeamMembers.mockResolvedValue(teamMembers);

        render(<TeamDetails />);

        fireEvent.click(screen.getByTitle('Add/Delete Team Member'));

        expect(screen.queryByText('Team Members:')).not.toBeInTheDocument();
        expect(screen.getByText('Add/Delete Team Member')).toBeInTheDocument();

        fireEvent.click(screen.getByTitle('Show Team Members'));
        
        expect(screen.getByText('Team Members:')).toBeInTheDocument();
    });
});

describe('TeamMemberItem', () => {
    it('renders TeamMemberItem component', async () => {
        const mockUser = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@test.com',
            profilePicture: 'https://test.com/john.jpg',
        };
        User.getUserByID.mockResolvedValue(mockUser);
        render(<TeamMemberItem userID="1" />);
        expect(await screen.findByText('John Doe')).toBeInTheDocument();
        expect(await screen.findByText('john.doe@test.com')).toBeInTheDocument();
    });
});
