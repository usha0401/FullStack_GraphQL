function Header({ search = "", setSearch = () => {} }) {
  return (
    <div className="header">
      <h1>Users</h1>
      <input
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}

      />
    </div>
  );
}

export default Header;
