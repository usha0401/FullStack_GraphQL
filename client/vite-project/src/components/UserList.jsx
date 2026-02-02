import UserCard from "./UserCard";

function UserList({ users, search }) {
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <div className="user-list">
    {filteredUsers.map((user) => (
      <UserCard key={user.id} user={user} />
    ))}
  </div>
);

}

export default UserList;
