import "../model/__mocks__/SwearType";
import "../shared/firebase/__mock__/mockFirebase";
import "../model/__mocks__/User";
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { User } from "../model/User";
import { SignedInUser } from "../model/SignedInUser";
import { Teams } from "../model/Teams";
import CreateNewTeam from "../components/CreateNewTeam";

jest.mock('../model/Teams');

// SignedInUser.user = {
//     userID:"userID"
// }
jest.mock('../model/AppState', () => ({
    user: { userID: "userID" }
}));

jest.mock('../model/SignedInUser', () => ({
    user: { userID: "userID" }
}));

describe('CreateNewTeam', () => {
    let mockOnAdd;

    beforeEach(() => {
        mockOnAdd = jest.fn();
        Teams.createTeam.mockClear();
    });

    it('renders without crashing', () => {
        render(<CreateNewTeam onAdd={mockOnAdd} />);
    });

    it('calls Teams.createTeam when form is submitted', async () => {
        const { getByLabelText, getByText } = render(<CreateNewTeam onAdd={mockOnAdd}/>);
        const teamNameInput = getByLabelText('Team Name');
        const createButton = getByText('Create');
        const teamName = 'Test Team';

        Teams.createTeam.mockResolvedValue({ id: '1', name: teamName });

        fireEvent.change(teamNameInput, { target: { value: teamName }});
        fireEvent.click(createButton);

        const teams = await Teams.createTeam("name");
        await expect(Teams.createTeam).toHaveBeenCalledWith(teamName);
    });

    it('does not call Teams.createTeam when team name is empty', () => {
        const { getByText } = render(<CreateNewTeam />);
        const createButton = getByText('Create');
    
        fireEvent.click(createButton);
    
        expect(Teams.createTeam).not.toHaveBeenCalled();
    });
});