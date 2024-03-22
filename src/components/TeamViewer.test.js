import "../shared/firebase/__mock__/mockFirebase";
import "../model/__mocks__/User";
import { render, fireEvent, act, waitFor, getByTestId } from '@testing-library/react';
import TeamViewer from '../components/TeamViewer';
import { Teams } from '../model/Teams';
import { User } from '../model/User';
import { SignedInUser } from '../model/SignedInUser';

jest.mock('../model/Teams');

// jest.mock('../model/AppState', () => ({
//     user: { userID: "userID" }
// }));

jest.mock('../model/User', () => ({
    User: {
        updateCurrentTeam: jest.fn().mockResolvedValue(),
    },
}));

// jest.mock('../model/SignedInUser', () => ({
//     SignedInUser: {
//         user: { teamID: null },
//     },
// }));

describe('TeamViewer', () => {
    beforeEach(() => {
        SignedInUser.user = {
            teamID: 'testTeamID',
        };

        Teams.getTeams.mockResolvedValue([
            { teamID: 'team1', teamName: 'Team 1' },
            { teamID: 'team2', teamName: 'Team 2' },
        ]);

        Teams.getTeam.mockResolvedValue({ teamID: 'testTeamID', teamName: 'Test Team' });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', async () => {
        await waitFor(() => render(<TeamViewer />));
    });

    // it('renders TeamViewer with test team selected', async () => {
    //     const { getByText, findByText } = render(<TeamViewer />);

    //     // Wait for initial data fetching
    //     await waitFor(() => {
    //         expect(Teams.getTeams).toHaveBeenCalledTimes(1);
    //         expect(Teams.getTeam).toHaveBeenCalledWith('testTeamID');
    //     });

    //     const testTeam = await findByText('Test Team');
    //     expect(testTeam).toBeInTheDocument();

    //     expect(getByText('Team Viewer')).toBeInTheDocument();
    // });

    it('renders Create New Team form when "Create New Team" button is clicked', async () => {
        const { getByTitle, getByText } = render(<TeamViewer />);
        const createNewTeamButton = getByTitle('Create a New Team / Delete a Team');

        fireEvent.click(createNewTeamButton);

        expect(getByText('Create')).toBeInTheDocument();
    });

    it('renders team viewer with user teams when "Show My Teams" button is clicked', async () => {
        const { getByTitle, getByText } = render(<TeamViewer />);
        const showMyTeamsButton = getByTitle('Show My Teams');

        fireEvent.click(showMyTeamsButton);

        await waitFor(() => {
            expect(getByText('View Details')).toBeInTheDocument();
        });
    });

    // it('toggles team selection when a team is clicked', async () => {
    //     const { getByText } = render(<TeamViewer />);
    //     const team2 = getByText('Team 2');

    //     fireEvent.click(team2);

    //     // Wait for team selection update
    //     await waitFor(() => {
    //         expect(User.updateCurrentTeam).toHaveBeenCalledTimes(1);
    //         expect(User.updateCurrentTeam).toHaveBeenCalledWith('team2');
    //     });

    //     expect(team2).toHaveStyle('border: 2px solid yellow;');
    // });

    // it('renders message when no teams exist', async () => {
    //     Teams.getTeams.mockResolvedValue([]);

    //     const { getByTestId } = render(<TeamViewer />);

    //     await waitFor(() => {
    //         expect(getByTestId("You don't have any teams yet. Click on a 'Plus' icon to create a team.")).toBeInTheDocument();
    //     });
    // });
});