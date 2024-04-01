import "../shared/firebase/__mock__/mockFirebase"
import "../model/__mocks__/User";
import React from 'react';
import { render, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import { ReportViolationsController } from "../controllers/reportViolationsController";
import { DefaultViolations } from "../model/DefaultViolations";
import ViolationSelectList from './ViolationSelectList';

// Mock DefaultViolations
jest.mock('../model/DefaultViolations', () => ({
    DefaultViolations: [
        {
          name: "Profanity",
          description: "Choose this option if the user used inappropriate language",
          category: "Office Culture Enthusiast",
          categoryIcon: "🏢",
        },
        {
          name: "Muted Microphone",
          description: "Choose this option if the user's microphone was muted",
          category: "Digital Explorer",
          categoryIcon: "🌐",
        },
        {
          name: "Late Arrival",
          description: "Choose this option if the user joined the meeting late",
          category: "Idea Maverick ",
          categoryIcon: "💡",
        },
    ],
}));

// Mock User
jest.mock("../model/User", () => {
    return {
        User: jest.fn().mockImplementation((user) => ({
            teamID: user.teamID || "mockTeamID",
            firstName: user.firstName || "Mock",
            lastName: user.lastName || "User",
            userID: user.userID || "mockUserID",
            email: user.email || "mock@test.com",
            profilePicture: user.profilePicture || "mock-profile-picture-url"
        }))
    };
});

jest.mock("../model/SwearType", () => ({
    SwearType: jest.fn().mockImplementation((swearType) => ({
        swearTypeID: swearType.swearTypeID || "mockSwearTypeID",
        description: swearType.description || "Mock Description",
        levels: swearType.levels || "minor",
        name: swearType.name || "Mock Swear Type",
        teamID: swearType.teamID || "mockTeamID",
        userID: swearType.userID || "mockUserID",
    }))
}));

jest.mock('../model/SignedInUser', () => ({
    SignedInUser: { user: { teamID: 'mockTeamID' } }
}));

jest.mock('../controllers/reportViolationsController', () => ({
    ReportViolationsController: {
        getSelectedSwearTypeCount: jest.fn(),
        selectSwearType: jest.fn(),
        getSelectedSweartypes: jest.fn().mockReturnValue([]),
        hasSwearTypes: jest.fn().mockReturnValue(false),
        hasSelectedTeam: jest.fn().mockReturnValue(false)
    },
}));

describe('ViolationSelectList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<ViolationSelectList />);
    });
    
    it("displays selected violations count in badge", async () => {
        ReportViolationsController.getSelectedSwearTypeCount.mockReturnValueOnce(3);
        const { getByText } = render(<ViolationSelectList />);
        await waitFor(() => expect(getByText("3")).toBeInTheDocument());
    });

    it('toggles selected state when an item is clicked', () => {
        const { getByText } = render(<ViolationSelectList />);

        const category = getByText('Office Culture Enthusiast'); // Select a category
        fireEvent.click(category);

        const item = getByText('Profanity'); // Select an item from the list
        fireEvent.click(item);
        expect(ReportViolationsController.selectSwearType).toHaveBeenCalledWith({
            description: "Choose this option if the user used inappropriate language",
            levels: "minor",
            name: "Profanity",
            swearTypeID: "Profanity",
        });
    });

    it('renders violation list by category', () => {
        const { getByText } = render(<ViolationSelectList />);
        const category = getByText('Digital Explorer'); // Select a category
        fireEvent.click(category);
        expect(getByText('Muted Microphone')).toBeInTheDocument(); // Check if the items in the category are rendered
    });

    it('renders selected violations', () => {
        const { getByText } = render(<ViolationSelectList />);

        const category = getByText('Office Culture Enthusiast'); // Select a category
        fireEvent.click(category);

        const item = getByText('Profanity'); // Select an item from the list
        fireEvent.click(item);

        const badge = getByText('New Report'); // Select the badge
        fireEvent.click(badge);

        expect(getByText('Profanity')).toBeInTheDocument(); // Check if selected violations are rendered
    });
});