// import React, { useState } from 'react';
// import { Plus, Minus, X } from 'lucide-react';

// function Account() {
//   const [notifications, setNotifications] = useState({
//     email: true,
//     phone: false
//   });

//   const [connectedAccounts, setConnectedAccounts] = useState({
//     google: { email: 'sample@gmail.com', connected: true },
//     zoom: { status: 'Not Linked', connected: false },
//     ethereum: { status: 'Not Linked', connected: false },
//     solana: { status: 'Not Linked', connected: false }
//   });

//   return (
//     <div className="space-y-8">
//       {/* Profile Section */}
//       <section>
//         <h2 className="text-lg font-medium mb-2">Your Profile</h2>
//         <p className="text-sm text-gray-400 mb-4">Choose how you will appear to users</p>
        
//         <div className="flex gap-6">
//           <div className="relative">
//             <div className="w-24 h-24 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center overflow-hidden">
//               <Plus className="h-6 w-6 text-gray-400" />
//             </div>
//             <button className="absolute bottom-0 right-0 bg-pink-600 rounded-full p-1">
//               <Plus className="h-4 w-4" />
//             </button>
//           </div>
          
//           <div className="flex-1 space-y-4">
//             <div>
//               <label className="block text-sm text-gray-400 mb-2">Username</label>
//               <input
//                 type="text"
//                 className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
//                 placeholder="Enter username"
//               />
//             </div>
//             <div>
//               <label className="block text-sm text-gray-400 mb-2">Bio</label>
//               <textarea
//                 className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white resize-none"
//                 rows={3}
//                 placeholder="Write a little about yourself..."
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Notification Preferences */}
//       <section>
//         <h2 className="text-lg font-medium mb-4">Notification Preferences</h2>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-sm font-medium">Email Notifications</h3>
//               <p className="text-sm text-gray-400">Get notified about important updates</p>
//             </div>
//             <button
//               className="toggle-switch"
//               data-state={notifications.email ? "checked" : "unchecked"}
//               onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
//             >
//               <span className="toggle-switch-thumb" />
//             </button>
//           </div>
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-sm font-medium">Phone Notifications</h3>
//               <p className="text-sm text-gray-400">Manage your phone number for sign-in and SMS alerts</p>
//             </div>
//             <button
//               className="toggle-switch"
//               data-state={notifications.phone ? "checked" : "unchecked"}
//               onClick={() => setNotifications(prev => ({ ...prev, phone: !prev.phone }))}
//             >
//               <span className="toggle-switch-thumb" />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Password & Security */}
//       <section>
//         <h2 className="text-lg font-medium mb-4">Password & Security</h2>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-sm font-medium">Account Password</h3>
//               <p className="text-sm text-gray-400">Please follow the instructions in the email to finish setting your password</p>
//             </div>
//             <button className="px-4 py-2 bg-pink-600 rounded-md text-sm font-medium">
//               Set Password
//             </button>
//           </div>
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
//               <p className="text-sm text-gray-400">Please set a password before enabling two-factor authentication</p>
//             </div>
//             <button className="px-4 py-2 bg-pink-600 rounded-md text-sm font-medium">
//               Enable 2FA
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Third Party Accounts */}
//       <section>
//         <h2 className="text-lg font-medium mb-4">Third Party Accounts</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {Object.entries(connectedAccounts).map(([platform, { email, status, connected }]) => (
//             <div key={platform} className="connected-account">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-md bg-gray-700 flex items-center justify-center">
//                   <img
//                     src={`https://api.iconify.design/simple-icons:${platform.toLowerCase()}.svg?color=white`}
//                     alt={platform}
//                     className="w-5 h-5"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="capitalize">{platform}</h3>
//                   <p className="text-sm text-gray-400">{email || status}</p>
//                 </div>
//               </div>
//               <button
//                 className={connected ? 'text-gray-400 hover:text-white' : 'bg-pink-600 rounded-full w-6 h-6 flex items-center justify-center'}
//               >
//                 {connected ? <X className="h-5 w-5" /> : <Plus className="h-4 w-4" />}
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Account Syncing */}
//       <section>
//         <h2 className="text-lg font-medium mb-4">Account Syncing</h2>
//         <div className="connected-account">
//           <div>
//             <h3 className="text-sm font-medium">Calendar Syncing with Google</h3>
//             <p className="text-sm text-gray-400">Sync your Luna events with your Google calendar</p>
//           </div>
//           <button className="px-4 py-2 bg-pink-600 rounded-md text-sm font-medium">
//             Enable Syncing
//           </button>
//         </div>
//       </section>

//       {/* Active Devices */}
//       <section>
//         <h2 className="text-lg font-medium mb-4">Active Devices</h2>
//         <div className="space-y-4">
//           {[
//             { name: 'Chrome on Windows', location: 'Current Device • Coinstatus, IN' },
//             { name: 'Android App', location: 'Active Mar 12 • Coinstatus, IN' },
//             { name: 'Chrome on Windows', location: 'Active Mar 11 • Coinstatus, IN' },
//             { name: 'Android App', location: 'Active Mar 10 • Coinstatus, IN' }
//           ].map((device, index) => (
//             <div key={index} className="connected-account">
//               <div>
//                 <h3 className="text-sm font-medium">{device.name}</h3>
//                 <p className="text-sm text-gray-400">{device.location}</p>
//               </div>
//               <button className="text-gray-400 hover:text-white">
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>

//       <div className="flex justify-between pt-6">
//         <button className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium">
//           Delete Account
//         </button>
//         <button className="px-4 py-2 bg-pink-600 text-white rounded-md text-sm font-medium">
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Account;