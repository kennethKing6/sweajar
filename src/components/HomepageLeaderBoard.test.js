import "../shared/firebase/__mock__/mockFirebase";
import React from "react";
import { render, fireEvent, } from "@testing-library/react";
import * as  HomePageLeaderBoardController from "../controllers/homePageLeaderBoardController";
import HomepageLeaderBoard from "./HomepageLeaderBoard";

jest.mock('../model/SignedInUser', () => ({
    SignedInUser: { user: { userID: "userID", teamID: "testTeamID" } }
}));

jest.mock('../controllers/homePageLeaderBoardController', () => ({
    ...jest.requireActual('../controllers/homePageLeaderBoardController'),
    getAllTeamMembers: jest.fn(),
    selectAllTeamMembersByViolations: jest.fn(),
    getReportTypesPerTeam: jest.fn(),
}));

describe('HomepageLeaderBoard', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<HomepageLeaderBoard />);
    });

    it('displays "Add Teams here +" when no data is provided', () => {
        const { getByText } = render(<HomepageLeaderBoard data={[]} />);
        const addTeamsText = getByText('Add Teams here +');
        expect(addTeamsText).toBeInTheDocument();
    });

    it('calls onNavigateToTeams when clicked on "Add Teams here +"', () => {
        const onNavigateToTeamsMock = jest.fn();
        const { getByText } = render(
            <HomepageLeaderBoard data={[]} onNavigateToTeams={onNavigateToTeamsMock} />
        );
        const addTeamsText = getByText('Add Teams here +');
        fireEvent.click(addTeamsText);
        expect(onNavigateToTeamsMock).toHaveBeenCalled();
    });
});