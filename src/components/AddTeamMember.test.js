import "../shared/firebase/__mock__/mockFirebase"
import "../model/__mocks__/User";
import { render, fireEvent, act } from '@testing-library/react';
import { User } from "../model/User";
import { SignedInUser } from "../model/SignedInUser";
import { Teams } from '../model/Teams';
import AddTeamMember from "../components/AddTeamMember";

jest.mock('../model/Teams');
jest.mock('../model/User');

// jest.mock('../model/AppState', () => ({
//     user: { userID: "userID" }
// }));

jest.mock('../model/SignedInUser', () => ({
    SignedInUser: { user: { userID: "userID", teamID: "testTeamID" } }
}));

describe('AddTeamMember', () => {

    beforeEach(() => {
        Teams.addTeamMember.mockResolvedValue({});
        Teams.deleteTeamMember.mockResolvedValue({});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<AddTeamMember/>);
    });

    it('calls onAddTeamMember when Add button is clicked', async () => {
        const { getByText, getByLabelText } = render(<AddTeamMember />);
        const emailInput = getByLabelText('Team Member Email');
        const addButton = getByText('Add');

        await act( async () => {
            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.click(addButton);
        });

        await expect(Teams.addTeamMember).toHaveBeenCalledWith('test@example.com', 'testTeamID');
    });

    it('calls onDeleteTeamMember when Delete button is clicked', async () => {
        const { getByText, getByLabelText } = render(<AddTeamMember />);
        const emailInput = getByLabelText('Team Member Email');
        const deleteButton = getByText('Delete');

        await act( async () => {
            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.click(deleteButton);
        });

        expect(Teams.deleteTeamMember).toHaveBeenCalledWith('test@example.com', 'testTeamID');
    });
});