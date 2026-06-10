import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export function AuthUI() {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    // Valid credentials
    const validCredentials = [
      { email: "reader@orbit.news", password: "spaceflight", username: "Reader" },
      { email: "admin@dispatch.com", password: "admin123", username: "Administrator" },
    ];

    const registeredEmail = localStorage.getItem("mock_registered_email");
    const registeredPassword = localStorage.getItem("mock_registered_password");
    const registeredUsername = localStorage.getItem("mock_registered_username");

    const matched = validCredentials.find(
      (c) => c.email === email.trim() && c.password === password
    );
    const isRegistered =
      registeredEmail &&
      email.trim() === registeredEmail &&
      password === registeredPassword;

    if (matched) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user_identity", matched.username);
      window.dispatchEvent(new Event("storage"));
      navigate("/dashboard");
    } else if (isRegistered) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user_identity", registeredUsername || email.split("@")[0]);
      window.dispatchEvent(new Event("storage"));
      navigate("/dashboard");
    } else {
      setError("Invalid email address or password.");
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    localStorage.setItem("mock_registered_email", email.trim());
    localStorage.setItem("mock_registered_password", password);
    localStorage.setItem("mock_registered_username", name.trim());
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user_identity", name.trim());
    window.dispatchEvent(new Event("storage"));
    navigate("/dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--background)", padding: "2rem 1rem" }}>
      <div style={{
        width: "100%",
        maxWidth: "900px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "center",
      }}
        className="auth-layout-grid"
      >
        {/* Left: Heading + subtitle */}
        <div>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--foreground)",
          }}>
            {isSignIn ? "Sign in to your Dispatch." : "Join the Dispatch."}
          </h1>
          <p style={{
            marginTop: "1rem",
            fontSize: "1rem",
            color: "var(--muted-foreground)",
            lineHeight: 1.6,
            maxWidth: "22rem",
          }}>
            {isSignIn
              ? "Save stories, follow missions, and get a personalized launch feed."
              : "Create your account and start following the second space age."}
          </p>

          <p style={{ marginTop: "2rem", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
            {isSignIn ? "No account yet? " : "Already have an account? "}
            <button
              onClick={() => { setIsSignIn(!isSignIn); setError(""); }}
              style={{ color: "var(--accent-red)", fontWeight: 600, cursor: "pointer", background: "none", border: "none", padding: 0, textDecoration: "underline" }}
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        {/* Right: Form */}
        <div style={{ border: "1px solid var(--rule)", padding: "2rem", background: "var(--background)" }}>
          <form onSubmit={isSignIn ? handleSignIn : handleSignUp}>
            {error && (
              <div style={{ marginBottom: "1rem", padding: "0.75rem", border: "1px solid var(--accent-red)", color: "var(--accent-red)", fontSize: "0.8rem", fontFamily: "var(--font-mono)" }}>
                {error}
              </div>
            )}

            {!isSignIn && (
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "100%", border: "1px solid var(--foreground)", background: "transparent", padding: "0.6rem 0.75rem", fontSize: "0.875rem", color: "var(--foreground)", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            )}

            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>
                Email
              </label>
              <input
                type="email"
                required
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", border: "1px solid var(--foreground)", background: "transparent", padding: "0.6rem 0.75rem", fontSize: "0.875rem", color: "var(--foreground)", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ marginBottom: "1.5rem", position: "relative" }}>
              <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", border: "1px solid var(--foreground)", background: "transparent", padding: "0.6rem 2.5rem 0.6rem 0.75rem", fontSize: "0.875rem", color: "var(--foreground)", outline: "none", boxSizing: "border-box" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: "0.6rem", top: "calc(50% + 0.6rem)", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", padding: 0, display: "flex" }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button
              type="submit"
              style={{ width: "100%", background: "var(--foreground)", color: "var(--background)", padding: "0.75rem 1rem", fontSize: "1rem", fontWeight: 600, border: "none", cursor: "pointer", letterSpacing: "-0.01em" }}
            >
              {isSignIn ? "Sign in" : "Sign up"}
            </button>

            {isSignIn && (
              <p style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--muted-foreground)", textAlign: "center" }}>
                By signing in you agree to our{" "}
                <a href="/legal/terms" style={{ textDecoration: "underline", color: "var(--muted-foreground)" }}>terms</a>.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Mobile: stack vertically */}
      <style>{`
        @media (max-width: 640px) {
          .auth-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default AuthUI;
