import "../shared/firebase/__mock__/mockFirebase";
import "../model/__mocks__/User";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import { Teams } from "../model/Teams";
import CreateNewTeam from "../components/CreateNewTeam";

window.alert = jest.fn();

jest.mock('../model/Teams');

jest.mock('../model/AppState', () => ({
    user: { userID: "userID" }
}));

jest.mock('../model/SignedInUser', () => ({
    user: { userID: "userID" }
}));

describe('CreateNewTeam', () => {

    beforeEach(() => {
        Teams.createTeam.mockClear();
    });

    it('renders without crashing', () => {
        render(<CreateNewTeam />);
    });

    it('calls Teams.createTeam when form is submitted', async () => {
        const { getByLabelText, getByText } = render(<CreateNewTeam />);
        const teamNameInput = getByLabelText('Team Name');
        const createButton = getByText('Create');
        const teamName = 'Test Team';

        Teams.createTeam.mockResolvedValue({ id: '1', name: teamName });

        await act( async () => {
            fireEvent.change(teamNameInput, { target: { value: teamName }});
            fireEvent.click(createButton);
        });

        await waitFor(() => {
            expect(Teams.createTeam).toHaveBeenCalledWith(teamName);
            expect(window.alert).toHaveBeenCalledWith('Team Creation Successful');
        });
    });

    it('does not call Teams.createTeam when team name is empty', async () => {
        const { getByText } = render(<CreateNewTeam />);
        const createButton = getByText('Create');
    
        fireEvent.click(createButton);
    
        expect(Teams.createTeam).not.toHaveBeenCalled();
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Please enter a name for the new team.');
        });
    });
});