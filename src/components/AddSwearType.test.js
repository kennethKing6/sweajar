import "../shared/firebase/__mock__/mockFirebase"
import "../model/__mocks__/User";
import "../model/__mocks__/SwearType";
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { User } from "../model/User";
import { SignedInUser } from "../model/SignedInUser";
import { Teams } from '../model/Teams';
import AddSwearType from "./AddSwearType";
import { SwearType } from "../model/SwearType";

jest.mock('../model/SwearType', () => ({
    SwearType: {
        createNewSwearType: jest.fn(),
    },
}));

jest.mock('../model/Teams', () => ({
    Teams: {
        getTeams: jest.fn(),
    },
}));

jest.mock('../model/AppState', () => ({
    user: { userID: "userID" }
}));

jest.mock('../model/SignedInUser', () => ({
    SignedInUser: { user: { userID: "userID", teamID: "testTeamID" } }
}));

window.alert = jest.fn();

describe('AddSwearType', () => {
    beforeEach(() => {
        SwearType.createNewSwearType.mockResolvedValue({});
        Teams.getTeams.mockResolvedValue([]);
    });

    it('renders without crashing', () => {
        render(<AddSwearType/>);
    });

    it('updates state when input fields are changed', async () => {
        const { getByLabelText } = render(<AddSwearType />);
        await act(async () => {
            fireEvent.change(getByLabelText('Enter Violation Name'), { target: { value: 'Test Name' } });
            fireEvent.change(getByLabelText('Enter Violation Description'), { target: { value: 'Test Description' } });
        });

        await waitFor(() => {
            expect(getByLabelText('Enter Violation Name').value).toBe('Test Name');
            expect(getByLabelText('Enter Violation Description').value).toBe('Test Description');
        });
    });

    it('calls onAdd with new swear type when form is submitted', async () => {
        const onAdd = jest.fn();
        const { getByText, getByLabelText } = render(<AddSwearType onAdd={onAdd} />);

        await act(async () => {
            fireEvent.change(getByLabelText('Enter Violation Name'), { target: { value: 'Test Name' } });
            fireEvent.change(getByLabelText('Enter Violation Description'), { target: { value: 'Test Description' } });

            fireEvent.click(getByText('Submit'));
        });

        await waitFor(() => {
            expect(SwearType.createNewSwearType).toHaveBeenCalledWith({
                name: 'Test Name',
                description: 'Test Description',
                level: '',
                teamID: ''
            });
            expect(onAdd).toHaveBeenCalled();
        });
    });

    it("shows alert when form is submitted with invalid inputs", async () => {
        const { getByText } = render(<AddSwearType />);

        fireEvent.click(getByText("Submit"));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("Please enter name and description for the new swear type.");
        });
    });
});