import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Container from "../components/common/Container";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin");
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <p className="text-slate-500 dark:text-slate-400">Loading…</p>
      </div>
    );
  }

  if (!user) return null;

  const joined = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const initial = (user.name ?? user.email ?? "C")[0].toUpperCase();

  return (
    <div className="pb-20">
      <Container className="grid min-h-[70vh] place-items-center py-10">
        <div className="w-full max-w-lg space-y-6 rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b0f19] p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0052ff] text-3xl font-bold text-white">
              {initial}
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{user.name}</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Member since {joined}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-200 dark:divide-slate-700">
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-sm text-slate-500 dark:text-slate-400">Name</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">{user.name}</span>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-sm text-slate-500 dark:text-slate-400">Email</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">{user.email}</span>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-sm text-slate-500 dark:text-slate-400">Account ID</span>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">{user._id}</span>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-sm text-slate-500 dark:text-slate-400">Joined</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">{joined}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to="/home"
              className="block w-full rounded-xl bg-[#0052ff] py-3 text-center text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Go to Dashboard
            </Link>
            <button
              onClick={handleLogout}
              type="button"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Sign out
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Profile;
