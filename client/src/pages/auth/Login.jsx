
import { useState } from "react";
import { userAuth } from "../../api/api";
import { Link } from "react-router-dom";
import Field from "../../components/Field";
import SuccessModal from "../../components/SuccessModal";
import Icon from "../../components/Icon";
import getStrength from "../../constant/getStrength";
import { colors } from "../../constant/style";
import { setUserData, getUserData } from "../../lib/setLocalData";
import Redirect from "../../components/Redirect";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("Patient");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showModal, setShowModal] = useState({
    show: false,
    type: "pending",
    message: "Please wait..."
  });
  const [focused, setFocused] = useState(null);
  const navigate = useNavigate()
  const strength = getStrength(password);


  // console.log("role", role)

  const handleEmailChange = (e) => {
    const val = e.target.value;
    console.log("val", val);
    setEmail(val);
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return;

    const updatedData = {
      email, password
    }
    console.log(updatedData); //  correct data instantly

    const data = await userAuth('/user/login', updatedData)

    if(data.success){
      setShowModal({
        show: true,
        message: data.message,
        type: "success"
      });
      setUserData(data.userData)
      navigate(`/${data?.userData?.role}`)
      
    }
    else{
        setShowModal({
        show: true,
        message: data.message,
        type: "error"
    });
    }

  };
  

  // ── shared input style factory ──
  const inputStyle = (id) => ({
    width: "100%",
    padding: "14px 16px",
    background: colors.surfaceContainerLowest,
    border: "none",
    borderRadius: 10,
    fontSize: "0.9rem",
    color: colors.onSurface,
    outline: "none",
    fontFamily: "Inter",
    boxShadow:
      focused === id
        ? `0 0 0 2px ${colors.primaryContainer}`
        : id === "email" && emailValid
          ? `0 0 0 1.5px ${colors.primaryContainer}`
          : `0 0 0 1px ${colors.outlineVariant}`,
    transition: "box-shadow 0.2s",
  });

  return (
    <>
      <style>{`
        input::placeholder { color: ${colors.outline}80; font-family: Inter; }
        input[type="checkbox"] { accent-color: ${colors.primary}; }
        * { box-sizing: border-box; }
        select:focus { outline: none; }
        select option { background: ${colors.surfaceContainerLowest}; color: ${colors.onSurface}; }
      `}</style>

      <main
        className="min-h-screen flex flex-col md:flex-row overflow-hidden"
        style={{ fontFamily: "Inter", background: colors.surface }}>
        {/* ── LEFT panel ─────────────────────────────────────────────────────── */}
        <section
          className="hidden md:flex md:w-1/2 relative items-center justify-center p-12 overflow-hidden"
          style={{ background: colors.primary, minHeight: "100vh" }}>
          {/* BG image + gradient overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnXaJ9J2Z9-oPv8ECeQimmr6DZZzSQEkL4PVMlQcwCObkT_PHY4zcDHfI2Ll_c4jINuYzIEaxBzuqgfLh3jcAFrVBsX4SuOg56x63zBAXdqv2AwQ7nAkIDpv1MrhRJuVPQIhyojBV75jtq9FtLU6bbr1_z8uw07hTkDPNILo6laZzomwIx0g6U0O20kOnRXR9Ftlu5M8lJqqzaw7Rvv4Y_srHva30f43Yilqtx65deWimDIm81D_IvAVn8MPiM-3kxKIdr-7k-0sp8"
              alt="Healthcare professional"
              className="w-full h-full object-cover"
              style={{ opacity: 0.55 }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}cc 0%, ${colors.primaryContainer}66 60%, transparent 100%)`,
              }}
            />
          </div>

          {/* Text content */}
          <div className="relative z-10 max-w-md">
            <p
              className="font-bold text-2xl tracking-tighter mb-12"
              style={{ fontFamily: "Manrope", color: colors.onPrimary }}>
              Vital Sync
            </p>

            <h1
              className="text-5xl font-extrabold tracking-tight mb-6 leading-tight"
              style={{ fontFamily: "Manrope", color: colors.onPrimary }}>
              Where Precision <br />
              Meets Serenity.
            </h1>

            <p
              className="text-lg leading-relaxed mb-10"
              style={{ color: colors.onPrimaryContainer, opacity: 0.92 }}>
              Join the next generation of hospital management. A platform
              designed with clinical authority and editorial elegance.
            </p>

            <div className="space-y-4">
              {[
                { icon: "verified_user", label: "HIPAA Compliant Security" },
                { icon: "insights", label: "Advanced Patient Analytics" },
                {
                  icon: "auto_awesome",
                  label: "AI-Driven Scheduling Workflow",
                },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.15)" }}>
                    <Icon name={icon} size={18} color={colors.primaryFixed} />
                  </div>
                  <span
                    className="font-medium text-sm"
                    style={{ color: colors.onPrimary }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative blob */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              bottom: "-10%",
              right: "-10%",
              width: 320,
              height: 320,
              background: `${colors.primaryContainer}33`,
              filter: "blur(64px)",
            }}
          />
        </section>

        {/* ── RIGHT: form ────────────────────────────────────────────────────── */}
        <section
          className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-16 lg:p-24 overflow-y-auto"
          style={{ background: colors.surface, minHeight: "100vh" }}>
          <div className="w-full max-w-md">
            {/* Mobile brand */}
            <div className="md:hidden flex justify-center mb-8">
              <span
                className="font-bold text-xl tracking-tighter"
                style={{ fontFamily: "Manrope", color: colors.primary }}>
                Vital Sync
              </span>
            </div>

            {/* Heading */}
            <div className="mb-10 text-center md:text-left">
              <h2
                className="text-3xl font-bold tracking-tight mb-1"
                style={{ fontFamily: "Manrope", color: colors.onSurface }}>
                Welcome Back
              </h2>
              <p
                className="font-medium text-sm"
                style={{ color: colors.onSurfaceVariant }}>
                Enter your credential 
              </p>
            </div>

            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              className="space-y-6">

              {/* Email */}
              <Field label="Email Address">
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    required
                    onChange={(e) => handleEmailChange(e)}
                    value={email}
                    placeholder="you@hospital.com"
                    style={{
                      ...inputStyle("email"),
                      paddingRight: emailValid ? 44 : 16,
                    }}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                  />
                  {emailValid && (
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <Icon
                        name="check_circle"
                        filled
                        size={20}
                        color={colors.primaryContainer}
                      />
                    </div>
                  )}
                </div>
                {emailValid && (
                  <p
                    className="text-[10px] font-medium mt-1 px-1"
                    style={{ color: colors.primaryContainer }}>
                    Email is available
                  </p>
                )}
              </Field>

              {/* Password */}
              <Field label="Password">
                <div className="relative">
                  <input
                    id="password"
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{ ...inputStyle("password"), paddingRight: 44 }}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}>
                    <Icon
                      name={showPassword ? "visibility" : "visibility_off"}
                      size={20}
                      color={colors.outlineVariant}
                    />
                  </button>
                </div>
              </Field>

              {/* Terms */}
              <div className="flex items-start gap-3 px-1 py-2">
                <input
                  id="terms"
                  required
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded cursor-pointer"
                  style={{ accentColor: colors.primary }}
                />
                <label
                  htmlFor="terms"
                  className="text-xs leading-relaxed cursor-pointer"
                  style={{ color: colors.onSurfaceVariant }}>
                  I agree to the{" "}
                  <a
                    href="#"
                    className="font-semibold hover:underline"
                    style={{ color: colors.primary }}>
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="font-semibold hover:underline"
                    style={{ color: colors.primary }}>
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-all active:scale-[0.98]"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
                    color: colors.onPrimary,
                    fontFamily: "Manrope",
                    boxShadow: `0 8px 24px ${colors.primary}22`,
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                  }}>
                  Login
                </button>
              </div>
            </form>

            {/* Sign-in link */}
            <div className="mt-8 text-center">
              <p className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                Don't have an account?{" "}
                <Link to={'/signup'}
                  href="#"
                  className="font-bold hover:underline"
                  style={{ color: colors.primary }}>
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      {showModal.show && <SuccessModal message={showModal.message}
      type={showModal.type}
      onClose={() => setShowModal(false)} />}
    </>
  );
}
