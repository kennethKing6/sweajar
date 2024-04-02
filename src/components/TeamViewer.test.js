import "../shared/firebase/__mock__/mockFirebase";
import "../model/__mocks__/User";
import { render, fireEvent, waitFor } from '@testing-library/react';
import TeamViewer from '../components/TeamViewer';
import { Teams } from '../model/Teams';
import { SignedInUser } from '../model/SignedInUser';

jest.mock('../model/Teams');

jest.mock('../model/User', () => ({
    User: {
        updateCurrentTeam: jest.fn().mockResolvedValue(),
    },
}));

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
});