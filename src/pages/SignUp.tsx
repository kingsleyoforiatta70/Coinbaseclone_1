import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import { useAuth } from "../context/AuthContext";

function SignUp() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const name = [firstName, lastName].filter(Boolean).join(" ").trim();
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20">
      <Container className="grid min-h-[70vh] place-items-center py-10">
        <div className="w-full max-w-lg space-y-6 rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b0f19] p-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Create account</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Join Coinbase and start building your crypto portfolio.
            </p>
          </div>
          {error ? (
            <p className="rounded-xl bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-600 dark:text-rose-400">
              {error}
            </p>
          ) : null}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-slate-600 dark:text-slate-300">
                First name
                <input
                  type="text"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:text-slate-400"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="block text-sm text-slate-600 dark:text-slate-300">
                Last name
                <input
                  type="text"
                  className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:text-slate-400"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>
            <label className="block text-sm text-slate-600 dark:text-slate-300">
              Email
              <input
                type="email"
                placeholder="you@example.com"
                required
                className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:text-slate-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="block text-sm text-slate-600 dark:text-slate-300">
              Password
              <input
                type="password"
                placeholder="Create a strong password (min 6 chars)"
                required
                minLength={6}
                className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:text-slate-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <input type="checkbox" required className="h-4 w-4 rounded border-slate-300 dark:border-slate-600" />
              I agree to the Terms &amp; Privacy policy.
            </label>
            <Button className="w-full" variant="primary" type="submit" disabled={loading}>
              {loading ? "Creating account…" : "Create account"}
            </Button>
          </form>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link to="/signin" className="text-[#0052ff]">
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}

export default SignUp;
