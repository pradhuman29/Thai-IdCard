import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import UserDetailsCard from './../cards/card'; // Assuming you have a UserDetailsCard component

function createUserDetailsCard(user) {
    return (
        <UserDetailsCard
            key={user.user_id} // Assuming IdentificationNumber is a unique identifier
            identificationNumber={user.identification_number}
            firstName={user.name}
            lastName={user.last_name}
            dateOfBirth={user.date_of_birth}
            dateOfIssue={user.date_of_issue}
            dateOfExpiry={user.date_of_expiry}
            status={user.status}
        />
    );
}

function SecondComponent() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const res = await Axios.get('http://localhost:8000/showdetails');
                setUsers(res.data.users);
                console.log(res.data.users);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div id="container">
            <section className="spread">
                <h2>User Details</h2>
                <ul>{users.map(createUserDetailsCard)}</ul>
            </section>
        </div>
    );
}

export default SecondComponent;