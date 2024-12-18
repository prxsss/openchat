import { Routes, Route, Navigate } from 'react-router';
import { useAuthContext } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useListenMessages from './hooks/useListenMessages';

import ChatLayout from './layouts/ChatLayout';
import NoChatSelectedPage from './pages/NoChatSelectedPage';
import ChatRoomPage from './pages/ChatRoomPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FriendLayout from './layouts/FriendLayout';
import FriendRequestsPage from './pages/FriendRequestsPage';
import FriendsListPage from './pages/FriendsListPage';
import AddFriendPage from './pages/AddFriendPage';
import ProfileLayout from './layouts/ProfileLayout';

const App = () => {
  const { authUser } = useAuthContext();
  // const authUser = useAuthStore((state) => state.authUser);

  useListenMessages();

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={authUser ? <Navigate to="/chats" replace /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={
            authUser ? <Navigate to="/chats" replace /> : <RegisterPage />
          }
        />
        <Route path="/" element={<Navigate to="/chats" replace />} />
        <Route element={<ChatLayout />}>
          <Route
            path="/chats"
            element={
              authUser ? (
                <NoChatSelectedPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/chats/:chatId"
            element={
              authUser ? <ChatRoomPage /> : <Navigate to="/login" replace />
            }
          />
        </Route>
        <Route
          path="/friends"
          element={<Navigate to="/friends/list" replace />}
        />
        <Route element={<FriendLayout />}>
          <Route
            path="/friends/requests"
            element={
              authUser ? (
                <FriendRequestsPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/friends/list"
            element={
              authUser ? <FriendsListPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="friends/add"
            element={
              authUser ? <AddFriendPage /> : <Navigate to="/login" replace />
            }
          />
        </Route>
        <Route
          path="/profile"
          element={
            authUser ? <ProfileLayout /> : <Navigate to="/login" replace />
          }
        ></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer stacked />
    </>
  );
};
export default App;
