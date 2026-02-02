function UserCard({ user }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>Age: {user.age}</p>
      <p>Education: {user.Education}</p>
    </div>
  );
}

export default UserCard;
