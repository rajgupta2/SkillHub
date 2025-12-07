"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, GraduationCap, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register" | "otp">("login");
  const toggleMode = (mode:"login" | "register" | "otp") => setMode(mode);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="flex-1 flex justify-center items-center px-6 py-20">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white p-10 rounded-2xl shadow-lg border border-blue-100"
        >
          <AnimatePresence mode="wait">
            {
              mode === "login" ? (
                // -------------------- LOGIN FORM --------------------
                <LoginForm toggleMode={toggleMode}/>
              ) : (
                // -------------------- REGISTER FORM --------------------
                <RegisterForm toggleMode={toggleMode} />
              )
            }
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}




export const RegisterForm=({toggleMode}:{ toggleMode:(mode:"login" | "register" | "otp")=>void})=>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("Student");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [optMode,setOtpMode]=useState(false);

    // 🧩 Handle Register Request
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      setMessage(data.message);
      setOtpMode(true);

    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try{
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        fullName,
        role,
        otp,
      }),
    });
    const data = await res.json();
    if (!res.ok) return setMessage(data.message);
    setMessage(data.message);
    setTimeout(()=>{
      toggleMode("login");
    }, 2000);
    }catch(err:any){
      setMessage(err.message);
    }finally{
      setLoading(false);
    }
  }

  if (optMode){
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-center">Verify your Email</h2>

        <input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          className="w-full border p-3 rounded"
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={verifyOtp} disabled={loading}
            className={`
              w-full py-3 mt-4 rounded-lg font-semibold text-white
              bg-gradient-to-r from-blue-500 to-blue-600
              hover:from-blue-600 hover:to-blue-700
              transition-all duration-200 shadow-md
              hover:shadow-lg active:scale-95
              disabled:opacity-60 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-blue-300
            `}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {message && <p className="text-center text-red-500">{message}</p>}

         <p className="text-center text-gray-600 mt-4">
          <button
            onClick={()=>{setOtpMode(false);}}
            type="button"
            className="text-blue-600 font-semibold hover:underline"
          >
            Go Back
          </button>
        </p>

      </div>
  )}


  return (
    <motion.div key="register" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create Your SkillHub Account
      </h2>

      <form className="space-y-5" onSubmit={handleRegister}>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Full Name</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3">
            <User className="text-blue-600 w-5 h-5" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 outline-none"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3">
            <Mail className="text-blue-600 w-5 h-5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); }}
              className="w-full px-3 py-2 outline-none"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3">
            <Lock className="text-blue-600 w-5 h-5" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 outline-none"
              placeholder="Create a password"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Account Type</label>
          <div className="flex items-center gap-4 mt-2">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="role"
                value="Student"
                onChange={(e) => setRole(e.target.value)}
                defaultChecked
                required
              />
              <GraduationCap className="w-5 h-5 text-blue-600" /> Student
            </label>
            {
            /*
            <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="role"
                  value="college"
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
                <Building2 className="w-5 h-5 text-blue-600" /> College
              </label>
            */
            }
          </div>
        </div>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mt-4 rounded-lg"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>

        {message && (
          <p className="text-center text-sm text-red-500">{message}</p>
        )}

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            onClick={()=>{toggleMode("login")}}
            type="button"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </motion.div>
  )
}

export const LoginForm=({toggleMode}:{ toggleMode:(mode:"login" | "register" | "otp")=>void})=>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

    // 🧩 Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      setMessage("Login successful!");

      // Redirect or update app state
      if (data.user?.token) {
        await fetch("/api/set-auth-cookie", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: data.user.token,
            name: data.user.name,
            role: data.user.role
          }),
        });
      }

      if(data.user?.role=="student" || "Student")
        window.location.href = "/student";
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Login to SkillHub
      </h2>

      <form className="space-y-5" onSubmit={handleLogin}>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3">
            <Mail className="text-blue-600 w-5 h-5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 outline-none"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3">
            <Lock className="text-blue-600 w-5 h-5" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 outline-none"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mt-4 rounded-lg"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        {message && (
          <p className="text-center mt-3 text-sm text-red-500">{message}</p>
        )}

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <button
            onClick={()=>{toggleMode("register")}}
            type="button"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </button>
        </p>
      </form>
    </motion.div>
  )
}