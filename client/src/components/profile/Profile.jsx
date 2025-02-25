import React, { useContext, useState } from 'react';
import './Profile.css';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { logout } = useContext(AuthContext); // Destructure logout from AuthContext

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    // Optionally, you can redirect the user to the login page or home page after logout
    // Example: history.push('/login');
  };

  return (
    <div className='profile-contain'>
      <div className='profile-header'>
        <label htmlFor='profile-upload' className='profile-pic-label'>
          <input
            type='file'
            id='profile-upload'
            accept='image/*'
            onChange={handleProfilePicChange}
            hidden
          />
          {profilePic ? (
            <img
              src={profilePic || 'default-profile.png'}
              alt='Profile'
              className='profile-pic'
            />
          ) : (
            <span className='profile-icon'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='40px'
                viewBox='0 -960 960 960'
                width='40px'
                fill='#000000'
              >
                <path d='M440-440ZM120-120q-33 0-56.5-23.5T40-200v-480q0-33 23.5-56.5T120-760h126l74-80h240v80H355l-73 80H120v480h640v-360h80v360q0 33-23.5 56.5T760-120H120Zm640-560v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM440-260q75 0 127.5-52.5T620-440q0-75-52.5-127.5T440-620q-75 0-127.5 52.5T260-440q0 75 52.5 127.5T440-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Z' />
              </svg>
            </span>
          )}
        </label>
        <div className='profile-info'>
          <h2>Anmol Sinha</h2>
          <p>anmol.sinha@example.com</p>
        </div>
        <button className='edit-button' onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </div>

      <div className='profile-details'>
        <div className='profile-field'>
          <label>Full Name</label>
          <input type='text' placeholder='Your Full Name' readOnly />
        </div>

        <div className='profile-field'>
          <label>UID</label>
          <input type='text' value='123456789' readOnly />
        </div>

        <div className='profile-field'>
          <label>Gender</label>
          <input type='text' placeholder='Gender' readOnly />
        </div>

        <div className='profile-field'>
          <label>University/College</label>
          <input type='text' placeholder='Your University/College' readOnly />
        </div>

        <div className='profile-field'>
          <label>Phone Number</label>
          <input type='text' placeholder='+91 Your Phone Number' readOnly />
        </div>

        <div className='profile-field'>
          <label>Course</label>
          <input type='text' placeholder='B-Tech CSE - Sem 2' readOnly />
        </div>
      </div>

      {/* Logout Button */}
      <button className='logout-button' onClick={handleLogout}>
        Logout
      </button>

      {isEditing && (
        <div className='edit-overlay' onClick={() => setIsEditing(false)}>
          <div className='edit-popup' onClick={(e) => e.stopPropagation()}>
            <h2>Edit Profile</h2>
            <div className='profile-field'>
              <label>Full Name</label>
              <input type='text' placeholder='Your Full Name' />
            </div>
            <div className='profile-field'>
              <label>Gender</label>
              <input type='text' placeholder='Gender' />
            </div>
            <div className='profile-field'>
              <label>University/College</label>
              <input type='text' placeholder='Your University/College' />
            </div>
            <div className='profile-field'>
              <label>Phone Number</label>
              <input type='text' placeholder='+91 Your Phone Number' />
            </div>
            <div className='profile-field'>
              <label>Course</label>
              <input type='text' placeholder='B-Tech CSE - Sem 2' />
            </div>
            <button className='done-button' onClick={() => setIsEditing(false)}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;