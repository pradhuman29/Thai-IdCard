import React from 'react';

function UserDetailsCard({ identificationNumber, firstName, lastName, dateOfBirth, dateOfIssue, dateOfExpiry, status }) {
    return (
        <div className='container'>
            <ul>ID: <strong>{identificationNumber}</strong></ul>
            <ul>First Name: <strong>{firstName}</strong></ul>
            <ul>Last Name: <strong>{lastName}</strong></ul>
            <ul>Date of Birth: <strong>{dateOfBirth}</strong></ul>
            <ul>Date of Issue: <strong>{dateOfIssue}</strong></ul>
            <ul>Date of Expiry: <strong>{dateOfExpiry}</strong></ul>
            <ul>Status: <strong>{status}</strong></ul>
            <br></br>
        </div>
    );
}

export default UserDetailsCard;
