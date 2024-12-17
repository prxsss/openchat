export default function getMutalFriends(authUser, friend) {
  const mutalFriends = friend.friends.filter((f) =>
    authUser?.friends.includes(f._id)
  );

  return mutalFriends;
}
