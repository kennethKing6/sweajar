import CreateNewTeam from "../components/CreateNewTeam";
import { Teams } from "../model/Teams";
import { render, fireEvent } from "@testing-library/react";
import React from "react";

jest.mock('../model/Teams', () => ({
    createTeam: jest.fn(),
}));

describe('CreateNewTeam', () => {
    let mockOnAdd;

    beforeEach(() => {
        mockOnAdd = jest.fn();
    });

    it('renders without crashing', () => {
        render(<CreateNewTeam onAdd={mockOnAdd} />);
    });

    it('calls Teams.createTeam when form is submitted', async () => {
        const { getByLabelText, getByText } = render(<CreateNewTeam/>);
        const teamNameInput = getByLabelText('Team Name');
        const createButton = getByText('Create');

        fireEvent.change(teamNameInput, { target: { value: 'Test Team'}});
        fireEvent.click(createButton);

        expect(Teams.createTeam).toHaveBeenCalledWith('Test Team');
    });

    it('does not call Teams.createTeam when team name is empty', () => {
        const { getByText } = render(<CreateNewTeam />);
        const createButton = getByText('Create');
    
        fireEvent.click(createButton);
    
        expect(Teams.createTeam).not.toHaveBeenCalled();
    });
});