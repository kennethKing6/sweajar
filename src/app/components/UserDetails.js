import React from 'react';

export default function UserDetails({
    user,
    onPress = () => {},
}) {
    if (!user) {
        // If there's no user, return null or some placeholder
        return null;
    }

    const { firstName, lastName, username, profilePicture, violationType, countPerViolation } = user;

    return (
        <div onClick={onPress}>
            <h2>User Details</h2>
            <div>
                <img src={profilePicture} alt={`${firstName} ${lastName}`} />
            </div>
            <div>
                <p>Name: {firstName} {lastName}</p>
                <p>Username: {username}</p>
                <p>Violation Type: {violationType}</p>
                <p>Count per Violation: {countPerViolation}</p>
            </div>
        </div>
    );
}
