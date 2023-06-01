import React from 'react';
import "./ProfileScreen.css";
import Nav from '../Nav';
import profileAvatar from "../../images/Netflix-avatar.png";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import PlanScreen from './PlanScreen';
import { auth } from '../../firebase';

const ProfileScreen = () => {
    const user = useSelector(selectUser);

    return (
        <div className='profileScreen'>
            <Nav />
            <div className='profileScreen-body'>
                <h1>Edit Profile</h1>

                <div className='profile-Info'>
                    <img src={profileAvatar} alt='profileAvatar'></img>

                    <div className='profileScreen-details'>
                        <h2>{user.email}</h2>
                        <div className='profileScreen-plans'>
                            <h3>Plans</h3>
                            <PlanScreen />

                            <button onClick={() => auth.signOut()}
                                className='profileScreen-Signout'>Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProfileScreen
