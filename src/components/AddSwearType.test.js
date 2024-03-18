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

describe('AddSwearType', () => {
    beforeEach(() => {
        SwearType.createNewSwearType.mockResolvedValue({});
        Teams.getTeams.mockResolvedValue([]);
    });

    it('renders without crashing', () => {
        render(<AddSwearType/>);
    });

    it('updates state when input fields are changed', async () => {
        const { getByLabelText, getByText } = render(<AddSwearType />);
        fireEvent.change(getByLabelText('Name'), { target: { value: 'Test Name' } });
        fireEvent.change(getByLabelText('Description'), { target: { value: 'Test Description' } });

        const select = getByLabelText('Select Level');
        fireEvent.mouseDown(select);
        const listItem = await waitFor(() => getByText('Minor'));
        fireEvent.click(listItem);

        // Ensure select value is set properly
        // await waitFor(() => {
        //     expect(select.value).toBe('minor');
        // });

        await waitFor(() => {
            expect(getByLabelText('Name').value).toBe('Test Name');
            expect(getByLabelText('Description').value).toBe('Test Description');
            //expect(select.value).toBe('minor');
        });
    });

    it('calls onAdd with new swear type when form is submitted', async () => {
        const onAdd = jest.fn();
        const { getByText, getByLabelText } = render(<AddSwearType onAdd={onAdd} />);
        const select = getByLabelText('Select Level');

        fireEvent.change(getByLabelText('Name'), { target: { value: 'Test Name' } });
        fireEvent.change(getByLabelText('Description'), { target: { value: 'Test Description' } });

        fireEvent.mouseDown(select);
        const listItem = await waitFor(() => getByText('Minor'));
        fireEvent.click(listItem);

        fireEvent.click(getByText('Submit'));

        await waitFor(() => {
            expect(SwearType.createNewSwearType).toHaveBeenCalledWith({
                name: 'Test Name',
                description: 'Test Description',
                level: 'minor',
                teamID: ''
            });
            expect(onAdd).toHaveBeenCalled();
        });
    });
});