import React from 'react';

const UserInfoForm = ({ errorMessage, book, username, setUsername, phoneNumber, setPhoneNumber }) => {
    return (
        <div>
            <h2>Enter User Information</h2>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
            </div>
            <div>
                <label>Phone Number:</label>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
            </div>
            <button onClick={book}>Book</button>
            <span>{errorMessage}</span>
        </div>
    );
};

export default UserInfoForm;
