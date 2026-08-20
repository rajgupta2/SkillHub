"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  GraduationCap,
  Building2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { UserProfile,College,Course } from "@/app/student/account/page";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register" | "otp">("register");
  const toggleMode = (mode: "login" | "register" | "otp") => setMode(mode);

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
            {mode === "login" ? (
              // -------------------- LOGIN FORM --------------------
              <LoginForm toggleMode={toggleMode} />
            ) : (
              // -------------------- REGISTER FORM --------------------
              <RegisterForm toggleMode={toggleMode} />
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}

export const RegisterForm = ({
  toggleMode,
}: {
  toggleMode: (mode: "login" | "register" | "otp") => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("Student");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [optMode, setOtpMode] = useState(false);

  const [modalNumber, setModalNumber] = useState(1);
  const [showCollegeList,setShowCollegeList]=useState(true);
  const [colleges, setColleges] = useState<College[]>([]);
  const [college, setCollege] = useState<College>({
    id: 0,
    name: "",
    city: "",
    district: "",
    state: "",
  });

  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course>({
    id:0,
    name:""
  });
  const [showCourseList, setShowCourseList] = useState(true);

  useEffect(() => {
    const fetchMeta = async () => {
      const courseRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/colleges-courses`);
      if(courseRes.status===200) setCourses(await courseRes.json());

      const collegeRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/colleges`);
      if(collegeRes.status===200) setColleges(await collegeRes.json());
    };

    fetchMeta();
  }, []);

  // Handle Register Request
  const sendEmail = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fullName,
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
    setMessage("");
    if(!otp){
      setMessage("Please fill the OTP.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          fullName,
          role,
          otp,
          college,
          course
        }),
      });
      const data = await res.json();
      if (!res.ok) return setMessage(data.message);
      setMessage(data.message);
      setTimeout(() => {
        toggleMode("login");
      }, 2000);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (modalNumber === 1) {
    return (
      <motion.div
        key="register"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your SkillHub Account
        </h2>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Full Name
          </label>
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full px-3 py-2 outline-none"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
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

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mt-4 rounded-lg"
          onClick={() => {
            if (fullName && email && password){
              setModalNumber(2);
              setMessage("");
            }else setMessage("Please enter all details to continue");
          }}
        >
          Next <ArrowRight className="h-5 w-5" />
        </Button>

        <p className="text-center text-red-500 pt-2">{message}</p>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => {
              toggleMode("login");
            }}
            type="button"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </motion.div>
    );
  }else if(modalNumber===2){
    return (
      <motion.div
        key="register"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Enter Your College Datails
        </h2>

        {showCollegeList ? (
          <select
            value={college.id}
            onChange={(e) => {
              if (e.target.value === "other") {
                setShowCollegeList(false);
                setCollege((prev) => ({
                  ...prev,
                  id: 0,
                }));
                return;
              }

              const selectedCollege = colleges.find(
                (c) => String(c.id) === e.target.value,
              );

              if (!selectedCollege) return;

              setCollege({
                id: selectedCollege.id,
                name: selectedCollege.name,
                city: selectedCollege.city,
                district: selectedCollege.district,
                state: selectedCollege.state,
              });

              setShowCollegeList(false);
            }}
            className="w-full border rounded-lg px-4 py-2 border-blue-400 focus:ring-2 focus:ring-blue-500 mt-4"
          >
            <option value="0">Select College</option>

            {colleges.map((c) => (
              <option
                key={c.id}
                value={c.id}
                title={`${c.name}, ${c.city}, ${c.district}, ${c.state}`}
              >
                {`${c.name}, ${c.city}, ${c.district}, ${c.state}`}
              </option>
            ))}

            <option value="other">Other (Add manually)</option>
          </select>
        ) : (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                value={college.name}
                onChange={(e) =>
                  setCollege((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="College Name"
                className="w-full border rounded-lg px-4 py-2 border-blue-400 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                City
              </label>
              <input
                type="text"
                value={college.city}
                placeholder="College City"
                onChange={(e) =>
                  setCollege((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
                className="w-full border rounded-lg px-4 py-2 border-blue-400 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                District
              </label>
              <input
                type="text"
                value={college.district}
                placeholder="College district"
                onChange={(e) =>
                  setCollege((prev) => ({
                    ...prev,
                    district: e.target.value,
                  }))
                }
                className="w-full border rounded-lg px-4 py-2 border-blue-400 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                State
              </label>
              <input
                type="text"
                value={college.state}
                placeholder="College State"
                onChange={(e) =>
                  setCollege((prev) => ({
                    ...prev,
                    state: e.target.value,
                  }))
                }
                className="w-full border rounded-lg px-4 py-2 border-blue-400 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}

        {showCourseList ? (
          <select
            value={course.id}
            onChange={(e) => {
              if (e.target.value === "other") {
                setShowCourseList(false);
                setCourse((prev) => ({
                  ...prev,
                  id: 0,
                }));
                return;
              }

              const selectedCourse = courses.find(
                (c) => String(c.id) === e.target.value,
              );

              if (!selectedCourse) return;

              setCourse({
                id: selectedCourse.id,
                name: selectedCourse.name
              });

              setShowCourseList(false);
            }}
            className="w-full mt-4 border rounded-lg px-4 py-2 border-blue-400 focus:ring-2 focus:ring-blue-500"
          >
            <option value="0">Select Course</option>

            {courses.map((c) => (
              <option
                key={c.id}
                value={c.id}
              >
                {c.name}
              </option>
            ))}

            <option value="other">Other (Add manually)</option>
          </select>
        ) : (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                value={course.name}
                onChange={(e) =>
                  setCourse((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="Course Name"
                className="w-full border rounded-lg px-4 py-2 border-blue-400 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}
        <div className="flex gap-4">
          <div className="w-full">
            <Button
              disabled={loading}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 mt-4 rounded-lg cursor-pointer"
              onClick={() => {
                setModalNumber(1);
                setMessage("");
              }}
            >
              <ArrowLeft className="h-5 w-5" /> Back
            </Button>
          </div>

          <div className="w-full">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mt-4 rounded-lg cursor-pointer"
              disabled={loading}
              onClick={async () => {
                if (
                  college.city &&
                  college.district &&
                  college.state &&
                  college.name  &&
                  course.name
                ) {
                  setMessage("");
                  await sendEmail();
                  setModalNumber(3);
                } else {
                  setMessage("Please fill all details of college & course name.");
                }
              }}
            >
              Next <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <p className="text-center text-red-500 pt-2">{message}</p>
      </motion.div>
    );
  }else if(modalNumber===3 && optMode){
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

        <Button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 mt-4 rounded-lg"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>

        <p className="text-center text-red-500 pt-2">{message}</p>
      </div>
    );
  }
};

export const LoginForm = ({
  toggleMode,
}: {
  toggleMode: (mode: "login" | "register" | "otp") => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  function isSafeRedirect(url: string) {
    return url.startsWith("/") && !url.startsWith("//");
  }

  // 🧩 Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    setLoading(true);
    setMessage("");
    if(!email || !password){
      setMessage("Please fill all details");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // Redirect or update app state
      if (data.user?.token) {
        await fetch("/api/set-auth-cookie", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: data.user.token,
            name: data.user.name,
            role: data.user.role,
          }),
        });
      }
      setMessage("Login successful!");

      const redirectUrl = searchParams.get("redirect");
      const destination =
        redirectUrl && isSafeRedirect(redirectUrl) ? redirectUrl : "/student";
      router.replace(destination);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Login to SkillHub
      </h2>

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
        onClick={handleLogin}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>

      <p className="text-center mt-3 text-red-500">{message}</p>

      <p className="text-center text-gray-600 mt-4">
        Don&apos;t have an account?{" "}
        <button
          onClick={() => {
            toggleMode("register");
          }}
          type="button"
          className="text-blue-600 font-semibold hover:underline"
        >
          Register
        </button>
      </p>
    </motion.div>
  );
};