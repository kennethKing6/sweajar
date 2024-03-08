import "../shared/firebase/__mock__/mockFirebase";
import "../model/__mocks__/User";
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import TeamViewer from '../components/TeamViewer';
import { Teams } from '../model/Teams';
import { User } from '../model/User';
import { SignedInUser } from '../model/SignedInUser';

jest.mock('../model/Teams');

jest.mock('../model/AppState', () => ({
    user: { userID: "userID" }
}));

jest.mock('../model/User', () => ({
    User: {
        updateCurrentTeam: jest.fn().mockResolvedValue(),
    },
}));

jest.mock('../model/SignedInUser', () => ({
    SignedInUser: {
        user: { teamID: null },
    },
}));

describe('TeamViewer', () => {
    beforeEach(() => {
        Teams.getTeams.mockResolvedValue([]);
        User.updateCurrentTeam.mockResolvedValue();
        SignedInUser.user = { teamID: null };
    });

    test('renders without crashing', async () => {
        await waitFor(() => render(<TeamViewer />));
    });

    test('shows user teams by default', async () => {
        const { getByText } = await waitFor(() => render(<TeamViewer />));
        expect(getByText('Your Teams:')).toBeInTheDocument();
    });

    test('can switch to new team view', async () => {
        const { getByTitle, queryByText } = await waitFor(() => render(<TeamViewer />));
        await act(async () => {
            fireEvent.click(getByTitle('Create a New Team / Delete a Team'));
        });
        expect(queryByText('Your Teams:')).toBeNull();
    });

    test('can switch back to user teams view', async () => {
        const { getByText, getByTitle } = await waitFor(() => render(<TeamViewer />));
        await act(async () => {
            fireEvent.click(getByTitle('Create a New Team / Delete a Team'));
            fireEvent.click(getByTitle('Show My Teams'));
        });
        expect(getByText('Your Teams:')).toBeInTheDocument();
    });
});
