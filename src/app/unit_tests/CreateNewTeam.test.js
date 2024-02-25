import CreateNewTeam from "../components/CreateNewTeam";
import { Teams } from "../model/Teams";
import { render, fireEvent } from "@testing-library/react";

jest.mock('../model/Teams', () => ({
    createTeam: jest.fn(),
}));

describe('CreateNewTeam', () => {
    // it('renders without crashing', () => {
    //     render(<CreateNewTeam/>);
    // });

    it('calls Teams.createTeam when form is submitted', async () => {
        const { getByLabelText, getByText } = render(<CreateNewTeam/>);
        const teamNameInput = getByLabelText('Team Name');
        const createButton = getByText('Create');

        fireEvent.change(teamNameInput, { target: { value: 'Test Team'}});
        fireEvent.click(createButton);

        expect(Teams.createTeam).toHaveBeenCalledWith('Test Team');
    });
});