import { NavLink } from 'react-router';

import { HiChatBubbleOvalLeft, HiUsers, HiUserCircle } from 'react-icons/hi2';

const BottomNavigation = () => {
  const links = [
    {
      icon: <HiChatBubbleOvalLeft size={28} />,
      label: 'Chats',
      path: '/chats',
    },
    {
      icon: <HiUsers size={28} />,
      label: 'Friends',
      path: '/friends/list',
    },
    {
      icon: <HiUserCircle size={28} />,
      label: 'Profile',
      path: '/profile',
    },
  ];

  const linkClass = ({ isActive }) =>
    isActive
      ? 'flex flex-col items-center text-primary'
      : 'flex flex-col items-center';

  return (
    <div className="flex items-center justify-around px-4 py-2">
      {links.map((link, index) => (
        <NavLink to={link.path} className={linkClass} key={index}>
          {link.icon}
          <span className="btm-nav-label text-xs">{link.label}</span>
        </NavLink>
      ))}
    </div>
  );
};
export default BottomNavigation;
