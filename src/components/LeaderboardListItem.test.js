import "../shared/firebase/__mock__/mockFirebase"
import "../model/__mocks__/User";
import React from 'react';
import { render } from '@testing-library/react';
import LeaderboardListItem from './LeaderboardListItem';

describe('LeaderboardListItem', () => {
    it('renders without crashing', () => {
        render(<LeaderboardListItem />);
    });

    it('renders profile pictures', () => {
        const { getAllByRole } = render(<LeaderboardListItem />);
        const profilePictures = getAllByRole('img');
        expect(profilePictures.length).toBeGreaterThan(0);
    });

    it('renders primary text correctly', () => {
        const { getByText } = render(<LeaderboardListItem />);
        const primaryText = getByText(/Birthday Gift Test/);
        expect(primaryText).toBeInTheDocument();
    });

    it('renders secondary text correctly', () => {
        const { getByText } = render(<LeaderboardListItem />);
        const secondaryText = getByText(/I'll be in the neighbourhood/);
        expect(secondaryText).toBeInTheDocument();
    });

    it('renders chips correctly', () => {
        const { getAllByRole } = render(<LeaderboardListItem />);
        const chips = getAllByRole('button', { name: /Do you have a suggestion/ });
        expect(chips.length).toBeGreaterThan(0);
    });

    it('renders secondary action chips correctly', () => {
        const { getAllByRole } = render(<LeaderboardListItem />);
        const secondaryActionChips = getAllByRole('button', { label: '30' });
        expect(secondaryActionChips.length).toBeGreaterThan(0);
    });
});