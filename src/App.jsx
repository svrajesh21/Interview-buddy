import React, { useState } from 'react';

function App() {
const [users, setUsers] = useState([
  { id: '1', name: 'Dave Richards', email: 'dave@mail.com' },
  { id: '2', name: 'Abhishek Hari', email: 'hari@mail.com' },
  { id: '3', name: 'Nishta Gupta', email: 'nishta@mail.com' }
]);
const [isModalOpen, setIsModalOpen] = useState(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);
const [modalMode, setModalMode] = useState('add');
const [formData, setFormData] = useState({ name: '', email: '' });
const [showProfile, setShowProfile] = useState(false);
const [activeTab, setActiveTab] = useState('basic');
const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
const [profileData, setProfileData] = useState({
firstName: '',
lastName: '',
email: '',
phone: '',
yearOfBirth: '',
gender: '',
alternatePhone: '',
address: '',
pincode: '',
domicileState: '',
domicileCountry: '',
domain1: '',
subDomain1: '',
experience1: '',
domain2: '',
subDomain2: '',
experience2: '',
linkedinUrl: '',
resumeFile: null
});

const handleAddUser = () => {
setModalMode('add');
setSelectedUser(null);
setFormData({ name: '', email: '' });
setIsModalOpen(true);
};

const handleEditUser = (user) => {
setModalMode('edit');
setSelectedUser(user);
setFormData({ name: user.name, email: user.email });
setIsModalOpen(true);
};

const handleDeleteUser = (user) => {
setSelectedUser(user);
setIsDeleteModalOpen(true);
};

const handleSaveUser = () => {
if (!formData.name || !formData.email) return;

if (modalMode === 'edit' && selectedUser) {
setUsers(users.map(u => u.id === selectedUser.id ? { ...formData, id: u.id } : u));
} else {
const newUser = {
...formData,
id: Date.now().toString()
};
setUsers([...users, newUser]);
}
setIsModalOpen(false);
setSelectedUser(null);
setFormData({ name: '', email: '' });
};

const confirmDelete = () => {
setUsers(users.filter(u => u.id !== selectedUser.id));
setIsDeleteModalOpen(false);
setSelectedUser(null);
};

const handleProfileChange = (field, value) => {
setProfileData(prev => ({
...prev,
[field]: value
}));
};

return (
<div className="min-h-screen bg-gray-50">
{/* Header */}
<header className="bg-white border-b border-gray-200 shadow-md">  <div className="w-full px-6 py-4 flex items-center">
 <img 
  src="/profile-section.webp"
  alt="LOGO"
  className="h-12"
/>
    <div className="flex items-center gap-2 ml-auto mr-0">
<button className="p-2 text-gray-600 hover:text-gray-900">
<img 
  src="/headset.png"
  alt="Headset"
  className="w-5 h-5"
/>
</button>
<button className="p-2 text-gray-600 hover:text-gray-900">
<img 
  src="/bell.png"
  alt="Notifications"
  className="w-5 h-5"
/>
</button>
<button
  onClick={() => setShowProfile(!showProfile)}
  className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 overflow-hidden"
>
  <img 
    src="/avatar.png"
    alt="Profile"
    className="w-full h-full object-cover scale-120"
  />
</button>
</div>
</div>
</header>
{/* Main Content */}
<main className="w-full px-6 py-8">
{!showProfile ? (
<div className="bg-white rounded-lg shadow-sm border border-gray-200">
<div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
<h1 className="text-xl font-semibold text-gray-900">Users</h1>
<button
onClick={handleAddUser}
className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 flex items-center gap-2"
>
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
</svg>
Add user
</button>
</div>

<table className="w-full">
  <thead>
    <tr className="border-b border-gray-200 bg-gray-100">
      <th className="pl-8 pr-4 py-3 text-left text-xs font-semibold text-gray-700 w-24">Sr. No</th>
      <th className="pl-0 pr-4 py-3 text-left text-xs font-semibold text-gray-700">Username</th>
      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">E-mail</th>
      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700">Action</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user, index) => (
      <tr key={user.id} className="border-b border-gray-200">
        <td className="pl-10 pr-4 py-4 text-sm text-gray-900 w-24">{index + 1}</td>
        <td className="pl-0 pr-4 py-4 text-sm text-gray-900">{user.name}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-3 justify-end">
            <button onClick={() => handleEditUser(user)} className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button onClick={() => handleDeleteUser(user)} className="text-gray-400 hover:text-red-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>
) : (
<div className="space-y-6">
{/* Profile Header */}
<div className="bg-white rounded-lg shadow-sm border border-gray-200">
<div className="px-8 py-6 relative overflow-hidden">
  <div className="absolute inset-0 pointer-events-none">
    <svg className="absolute" style={{ left: '-20%', top: '-80%', width: '40%', height: '250%' }} viewBox="0 0 400 400" fill="none">
      <circle cx="200" cy="200" r="180" fill="#FEFAFF" opacity="0.9"/>
    </svg>
    <svg className="absolute" style={{ right: '-35%', top: '-120%', width: '140%', height: '350%' }} viewBox="0 0 1000 1000" fill="none">
      <path d="M 500 220 A 280 280 0 0 1 500 780" stroke="#F0EBFF" strokeWidth="1" fill="none"/>
      <path d="M 500 70 A 430 430 0 0 1 500 930" stroke="#F0EBFF" strokeWidth="1" fill="none"/>
      <path d="M 500 -130 A 630 630 0 0 1 500 1130" stroke="#F0EBFF" strokeWidth="1" fill="none"/>
    </svg>
  </div>
  {/* Content */}
  <div className="flex items-center gap-6 relative z-10">
    {/* Avatar */}
<div className="relative">
  <div className="w-40 h-40 bg-purple-100 rounded-full flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
    <img 
      src="/profile.webp"
      alt="Profile"
      className="w-full h-full object-cover scale-125"
    />
  </div>
</div>
    {/* User Info */}
    <div className="ml-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Dave Richards</h2>
      <div className="flex items-center gap-2 text-gray-600 mb-1">
        <span className="text-base">dave@mail.com</span>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      <p className="text-gray-600 text-base">+91 8332883854</p>
    </div>
  </div>
</div>
</div>
{/* Tabs */}
<div className="flex gap-2">
  <button
    onClick={() => setActiveTab('basic')}
    className={`px-4 py-2.5 text-sm font-medium rounded-t-md ${activeTab === 'basic' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400 hover:text-gray-600'}`}
  >
    Basic Info
  </button>
  <button
    onClick={() => setActiveTab('education')}
    className={`px-4 py-2.5 text-sm font-medium rounded-t-md relative ${activeTab === 'education' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400 hover:text-gray-600'}`}
  >
    Education & skills
    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full"></span>
  </button>
  <button
    onClick={() => setActiveTab('experience')}
    className={`px-4 py-2.5 text-sm font-medium rounded-t-md ${activeTab === 'experience' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400 hover:text-gray-600'}`}
  >
    Experience
  </button>
</div>

{/* Tab Content */}
{activeTab === 'basic' && (
<div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
<div className="flex items-center justify-between mb-6">
<h3 className="text-lg font-semibold text-gray-900">Basic Details</h3>
<button className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200">
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
</svg>
</button>
</div>

<div className="space-y-6">
  {/* Row 1: First name, Last name, Email ID */}
  <div className="grid grid-cols-3 gap-6">
    <div>
      <label className="block text-sm text-gray-600 mb-2">First name</label>
      <input
        type="text"
        placeholder="e.g. John"
        value={profileData.firstName}
        onChange={(e) => handleProfileChange('firstName', e.target.value)}
        className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
    <div>
      <label className="block text-sm text-gray-600 mb-2">Last name</label>
      <input
        type="text"
        placeholder="e.g. Doe"
        value={profileData.lastName}
        onChange={(e) => handleProfileChange('lastName', e.target.value)}
        className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
    <div>
      <label className="block text-sm text-gray-600 mb-2">Email ID</label>
      <input
        type="email"
        placeholder="e.g. mrnobody@mail.com"
        value={profileData.email}
        onChange={(e) => handleProfileChange('email', e.target.value)}
        className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
  </div>

  {/* Row 2: Year of birth & Gender , Phone number , Alternate Phone no  */}
  <div className="grid grid-cols-3 gap-6">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm text-gray-600 mb-2">Year of birth</label>
        <select
          value={profileData.yearOfBirth}
          onChange={(e) => handleProfileChange('yearOfBirth', e.target.value)}
          className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-400"
        >
          <option value="">YYYY</option>
          {Array.from({ length: 80 }, (_, i) => 2024 - i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-2">Gender</label>
        <select
          value={profileData.gender}
          onChange={(e) => handleProfileChange('gender', e.target.value)}
          className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-400"
        >
          <option value="">Select an option</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
    <div>
  <label className="block text-sm text-gray-600 mb-2">Phone number</label>
  <div className="relative">
    <select 
      value={selectedCountryCode}
      onChange={(e) => setSelectedCountryCode(e.target.value)}
      className="absolute left-0 top-0 h-full w-16 px-2 bg-gray-100 border border-gray-300 rounded-l-md border-r-0 text-sm appearance-none cursor-pointer focus:ring-2 focus:ring-purple-500 focus:z-10 text-transparent" 
      style={{
        backgroundImage: selectedCountryCode === '+91' 
          ? `url("/flag.png"), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")`
          : selectedCountryCode === '+1'
          ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 7410 3900'%3E%3Crect width='7410' height='3900' fill='%23B22234'/%3E%3Cpath d='M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0' stroke='%23fff' stroke-width='300'/%3E%3Crect width='2964' height='2100' fill='%233C3B6E'/%3E%3C/svg%3E"), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")`
          : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30'%3E%3Crect width='60' height='30' fill='%23012169'/%3E%3Cpath d='M0,0 L60,30 M60,0 L0,30' stroke='%23fff' stroke-width='6'/%3E%3Cpath d='M0,0 L60,30 M60,0 L0,30' stroke='%23C8102E' stroke-width='4'/%3E%3Cpath d='M30,0 V30 M0,15 H60' stroke='%23fff' stroke-width='10'/%3E%3Cpath d='M30,0 V30 M0,15 H60' stroke='%23C8102E' stroke-width='6'/%3E%3C/svg%3E"), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")`,
        backgroundSize: '20px 15px, 12px 12px',
        backgroundPosition: '8px center, right 6px center',
        backgroundRepeat: 'no-repeat',
        paddingLeft: '32px',
        paddingRight: '24px'
      }}>
      <option value="+91">🇮🇳</option>
      <option value="+1">🇺🇸</option>
      <option value="+44">🇬🇧</option>
    </select>
    <input
      type="text"
      placeholder="8332883854"
      value={profileData.phone}
      onChange={(e) => handleProfileChange('phone', e.target.value)}
      className="w-full pl-20 pr-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
    />
  </div>
</div>
    <div>
      <label className="block text-sm text-gray-600 mb-2">Alternate Phone no</label>
      <input
        type="text"
        placeholder="e.g. 9876543210"
        value={profileData.alternatePhone}
        onChange={(e) => handleProfileChange('alternatePhone', e.target.value)}
        className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
  </div>

  {/* Row 3: Address , Pincode & Domicile country, Domicile state */}
  <div className="grid grid-cols-3 gap-6">
    <div>
      <label className="block text-sm text-gray-600 mb-2">Address</label>
      <textarea
        placeholder="Enter here"
        value={profileData.address}
        onChange={(e) => handleProfileChange('address', e.target.value)}
        rows="5"
        className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
      />
    </div>
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-600 mb-2">Pincode</label>
        <input
          type="text"
          placeholder="Enter here"
          value={profileData.pincode}
          onChange={(e) => handleProfileChange('pincode', e.target.value)}
          className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-2">Domicile country</label>
        <select
          value={profileData.domicileCountry}
          onChange={(e) => handleProfileChange('domicileCountry', e.target.value)}
          className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-400"
        >
          <option value="">Select an option</option>
          <option value="india">India</option>
          <option value="usa">United States</option>
          <option value="uk">United Kingdom</option>
        </select>
      </div>
    </div>
    <div>
      <label className="block text-sm text-gray-600 mb-2">Domicile state</label>
      <select
        value={profileData.domicileState}
        onChange={(e) => handleProfileChange('domicileState', e.target.value)}
        className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-400"
      >
        <option value="">Select an option</option>
        <option value="delhi">Delhi</option>
        <option value="mumbai">Mumbai</option>
        <option value="bangalore">Bangalore</option>
      </select>
    </div>
  </div>
</div>
</div>
)}
{activeTab === 'education' && (
<>
  {/* Education Details  */}
  <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
   <div className="flex items-center justify-between mb-6">
<h3 className="text-lg font-semibold text-gray-900">Education Details</h3>
<button className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200">
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
</svg>
</button>
</div>

<div className="grid grid-cols-2 gap-6 mb-6">
<div>
<label className="block text-sm text-gray-600 mb-2">School / College</label>
<input
type="text"
placeholder="e.g. Lincoln College"
className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
/>
</div>
<div>
<label className="block text-sm text-gray-600 mb-2">Highest degree or equivalent</label>
<input
type="text"
placeholder="e.g. Bachelors in Technology"
className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
/>
</div>
</div>

<div className="grid grid-cols-4 gap-6">
  <div className="col-span-2">
    <label className="block text-sm text-gray-600 mb-2">Course</label>
    <input
      type="text"
      placeholder="e.g. Computer science engineering"
      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
    />
  </div>
  <div>
    <label className="block text-sm text-gray-600 mb-2">Year of completion</label>
    <select className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-400">
      <option value="">YYYY</option>
      {Array.from({ length: 53 }, (_, i) => 2027 - i).map(year => (
        <option key={year} value={year}>{year}</option>
      ))}
    </select>
  </div>
  <div>
    <label className="block text-sm text-gray-600 mb-2">Grade</label>
    <input
      type="text"
      placeholder="Enter here"
      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
    />
  </div>
</div>
</div>

{/* Skills & Projects  */}
<div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
  <div className="flex items-center justify-between mb-6">
  <h3 className="text-lg font-semibold text-gray-900">Skills & Projects</h3>
  <button className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200">
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
</svg>
</button>
</div>

<div className="grid grid-cols-2 gap-6">
<div>
<label className="block text-sm text-gray-600 mb-2">Skills</label>
<textarea
placeholder="Enter here"
rows="8"
className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
/>
</div>
<div>
<label className="block text-sm text-gray-600 mb-2">Projects</label>
<textarea
placeholder="Enter here"
rows="8"
className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
/>
</div>
</div>
</div>
</>
)}
{activeTab === 'experience' && (
<>
{/* Work Experience */}
<div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
<div className="flex items-center justify-between mb-6">
<h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
<button className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200">
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
</svg>
</button>
</div>
{/* First Domain Group */}
<div className="mb-4">
<label className="block text-sm text-gray-600 mb-2">Domain</label>
<input
type="text"
placeholder="e.g. Technology"
value={profileData.domain1}
onChange={(e) => handleProfileChange('domain1', e.target.value)}
className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
/>
</div>

<div className="pl-6 mb-6 border-l-2 border-gray-300">
<div className="grid grid-cols-2 gap-6">
<div>
<label className="block text-sm text-gray-600 mb-2">Sub-domain</label>
<input
type="text"
placeholder="e.g. MERN Stack"
value={profileData.subDomain1}
onChange={(e) => handleProfileChange('subDomain1', e.target.value)}
className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
/>
</div>
<div>
<label className="block text-sm text-gray-600 mb-2">Experience</label>
<select
value={profileData.experience1}
onChange={(e) => handleProfileChange('experience1', e.target.value)}
className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-400"
>
<option value="">Select an option</option>
<option value="0-1">0-1 years</option>
<option value="1-3">1-3 years</option>
<option value="3-5">3-5 years</option>
<option value="5+">5+ years</option>
</select>
</div>
</div>
</div>

{/* Second Domain Group */}
<div className="mb-4">
<label className="block text-sm text-gray-600 mb-2">Domain</label>
<input
type="text"
placeholder="e.g. Technology"
value={profileData.domain2}
onChange={(e) => handleProfileChange('domain2', e.target.value)}
className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
/>
</div>

<div className="pl-6 border-l-2 border-gray-300">
<div className="grid grid-cols-2 gap-6">
<div>
<label className="block text-sm text-gray-600 mb-2">Sub-domain</label>
<input
type="text"
placeholder="e.g. MERN Stack"
value={profileData.subDomain2}
onChange={(e) => handleProfileChange('subDomain2', e.target.value)}
className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
/>
</div>
<div>
<label className="block text-sm text-gray-600 mb-2">Experience</label>
<select
value={profileData.experience2}
onChange={(e) => handleProfileChange('experience2', e.target.value)}
className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-400"
>
<option value="">Select an option</option>
<option value="0-1">0-1 years</option>
<option value="1-3">1-3 years</option>
<option value="3-5">3-5 years</option>
<option value="5+">5+ years</option>
</select>
</div>
</div>
</div>
</div>

{/* LinkedIn and Resume  */}
<div className="grid grid-cols-2 gap-6">
{/* LinkedIn Box */}
<div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
<div className="flex items-center justify-between mb-4">
<h3 className="text-lg font-semibold text-gray-900">LinkedIn</h3>
<button className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200">
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
</svg>
</button>
</div>
<div>
<label className="block text-sm text-gray-600 mb-2">Profile URL</label>
<input
type="text"
placeholder="linkedin.com/in/mrbean"
value={profileData.linkedinUrl}
onChange={(e) => handleProfileChange('linkedinUrl', e.target.value)}
className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
/>
</div>
</div>

{/* Resume Box */}
<div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
<div className="flex items-center justify-between mb-4">
<h3 className="text-lg font-semibold text-gray-900">Resume</h3>
<button className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200">
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
</svg>
</button>
</div>
<div className="flex items-center gap-2 mt-8">
<svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
</svg>
<span className="text-sm text-gray-700 flex-1">myresume.pdf</span>
<button className="px-3 py-1.5 bg-purple-100 text-purple-600 rounded text-sm font-medium hover:bg-purple-200">View</button>
</div>
</div>
</div>
</>
)}
</div>
)}
</main>
{/* Add/Edit Modal */}
{isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
    <div className="absolute right-0 top-0 h-full w-1/2 bg-white shadow-2xl overflow-y-auto">
      <div className="flex items-center justify-between px-8 h-20 border-b border-gray-200 shadow-md">
        <h2 className="text-xl font-semibold text-gray-900">{modalMode === 'edit' ? 'Edit User' : 'Add User'}</h2>
        <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-8">   <div>
          <label className="block text-sm text-gray-600 mb-2">Name of the user</label>
          <input
            type="text"
            placeholder="Type here"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">E-mail</label>
            <input
              type="email"
              placeholder="Type here"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Contact</label>
            <input
              type="text"
              placeholder="Type here"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-white border-t border-gray-200">
        <div className="flex justify-end gap-3">
          <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-purple-600 bg-purple-50 rounded-md hover:bg-purple-100">Cancel</button>
          <button onClick={handleSaveUser} className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">{modalMode === 'edit' ? 'Save' : 'Add'}</button>
        </div>
      </div>
    </div>
  </div>
)}

{/* Delete Modal */}
{isDeleteModalOpen && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
<div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
<h3 className="text-lg font-semibold mb-2">Delete User</h3>
<p className="text-sm text-gray-600 mb-6">Are you sure you want to delete {selectedUser?.name}?</p>
<div className="flex gap-3">
<button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 px-4 py-2 border rounded-md">Cancel</button>
<button onClick={confirmDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md">Delete</button>
</div>
</div>
</div>
)}
</div>
);
}

export default App;
