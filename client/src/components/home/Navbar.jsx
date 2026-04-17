const Navbar = ({ user, login, logout }) => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <h1 className="text-xl font-bold text-blue-600">HMS</h1>

      <div className="space-x-4">
        {!user ? (
          <>
            <button
              onClick={login}
              className="px-4 py-2 border rounded"
            >
              Login
            </button>
            <button
              onClick={login}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Signup
            </button>
          </>
        ) : (
          <>
            <span className="font-medium">{user.name}</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;