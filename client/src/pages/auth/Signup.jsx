import { useState } from "react";
import { userAuth } from "../../api/api";
import { Link } from "react-router-dom";
import Field from "../../components/Field";
import SuccessModal from "../../components/SuccessModal";
import Icon from "../../components/Icon";
import getStrength from "../../constant/getStrength";
import QualificationPicker from "../../components/QualificationPicker";
import { colors } from "../../constant/style";
import { setUserData, getUserData } from "../../lib/setLocalData";
import Redirect from "../../components/Redirect";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [role, setRole] = useState("Patient");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    qualification: "",
    specialization: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setCobfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showModal, setShowModal] = useState({
    show: false,
    type: "pending",
    message: "Please wait..."
  });
  const [focused, setFocused] = useState(null);
  const [specialization, setSpecialization] = useState("");
  const [qualification, setQualification] = useState("");
  const navigate = useNavigate()
  const roles = ["Patient", "Doctor"];
  const strength = getStrength(password);

  console.log(qualification);

  // console.log("role", role)

  const strengthBarColors = Array.from({ length: 4 }, (_, i) =>
    i < strength.score ? strength.color : colors.surfaceContainerHigh,
  );

  const handleEmailChange = (e) => {
    const val = e.target.value;
    console.log("val", val);
    setEmail(val);
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) return;

      setShowModal({
        show: true,
        message: "Please wait...",
        type: "pending"
      });

    let updatedData = {
      ...formData,
      email,
      password,
      role: role.toLowerCase()
    };

    if (role === "Doctor") {
      updatedData = {
        ...updatedData,
        qualification,
        specialization,
      };
    }

    console.log(updatedData); //  correct data instantly

    const data = await userAuth('/user/register', updatedData)

    if(data?.success){
      setShowModal({
        show: true,
        message: data?.message ,
        type: "success"
      });
      setUserData(data?.userData)
      navigate(`/${data?.userData?.role}`)
    }
    else{
        setShowModal({
        show: true,
        message: data.message,
        type: "error"
    });
    }

    setFormData(updatedData); // update state

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
        .doctor-fields {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transform: translateY(-8px);
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1),
                      opacity 0.3s ease,
                      transform 0.3s ease;
          pointer-events: none;
        }
        .doctor-fields.visible {
          max-height: 1000px;
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
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
              The Clinical Atelier
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
                Create your account
              </h2>
              <p
                className="font-medium text-sm"
                style={{ color: colors.onSurfaceVariant }}>
                Join our healthcare community today.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              className="space-y-6">
              {/* Role segmented control */}
              <div className="space-y-2">
                <span
                  className="block text-[10px] font-bold uppercase tracking-widest px-1"
                  style={{
                    color: colors.onSurfaceVariant,
                    fontFamily: "Inter",
                  }}>
                  Organization Role
                </span>
                <div
                  className="grid grid-cols-2 gap-2 p-1.5 rounded-xl"
                  style={{ background: colors.surfaceContainerLow }}>
                  {roles.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className="py-2.5 px-4 text-sm font-medium rounded-lg transition-all"
                      style={{
                        background:
                          role === r
                            ? colors.surfaceContainerLowest
                            : "transparent",
                        color:
                          role === r ? colors.primary : colors.onSurfaceVariant,
                        fontFamily: "Inter",
                        boxShadow:
                          role === r ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                        border: "none",
                        cursor: "pointer",
                      }}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <Field label="First Name">
                <input
                  id="firstName"
                  type="text"
                  required
                  placeholder="Julianne"
                  style={inputStyle("firstName")}
                  onFocus={() => setFocused("firstName")}
                  onBlur={() => setFocused(null)}
                  onChange={handleChange}
                />
              </Field>

              <Field label="Lsst Name">
                <input
                  id="lastName"
                  type="text"
                  required
                  placeholder="Mercer"
                  style={inputStyle("lastName")}
                  onFocus={() => setFocused("lastName")}
                  onBlur={() => setFocused(null)}
                  onChange={handleChange}
                />
              </Field>

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

              {/* Phone */}
              <Field label="Phone Number">
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  style={inputStyle("phone")}
                  onChange={handleChange}
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused(null)}
                />
              </Field>

              {/* ── Doctor-only fields (animated reveal) ── */}
              <div
                className={` space-y-6 ${role === "Doctor" ? "block" : "hidden"}`}>
                <div
                  className="rounded-xl p-4 space-y-5"
                  style={{
                    background: `${colors.primaryFixed}60`,
                    border: `1px solid ${colors.outlineVariant}`,
                  }}>
                  {/* Section label */}
                  <div className="flex items-center gap-2">
                    <Icon name="stethoscope" size={16} color={colors.primary} />
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: colors.primary, fontFamily: "Inter" }}>
                      Clinical Details
                    </span>
                  </div>

                  {/* Specialization dropdown */}
                  <Field label="Specialization">
                    <div className="relative">
                      <select
                        value={specialization}
                        required={role === "Doctor"}
                        onChange={(e) => setSpecialization(e.target.value)}
                        style={{
                          ...inputStyle("spec"),
                          appearance: "none",
                          WebkitAppearance: "none",
                          paddingRight: 44,
                          cursor: "pointer",
                          color: specialization
                            ? colors.onSurface
                            : `${colors.outline}90`,
                        }}
                        onFocus={() => setFocused("spec")}
                        onBlur={() => setFocused(null)}>
                        <option value="" disabled>
                          Select specialization…
                        </option>
                        {[
                          "Cardiology",
                          "Neurology",
                          "Orthopedics",
                          "Pediatrics",
                          "Dermatology",
                          "Oncology",
                          "Radiology",
                          "Psychiatry",
                          "General Surgery",
                          "Internal Medicine",
                          "Gynecology & Obstetrics",
                          "Ophthalmology",
                          "ENT (Otolaryngology)",
                          "Urology",
                          "Nephrology",
                          "Pulmonology",
                          "Endocrinology",
                          "Gastroenterology",
                          "Rheumatology",
                          "Anesthesiology",
                        ].map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <Icon
                          name="expand_more"
                          size={20}
                          color={colors.onSurfaceVariant}
                        />
                      </div>
                    </div>
                  </Field>

                  {/* Qualification — multi-select chips */}
                  <Field label="Qualification">
                    <QualificationPicker
                      value={qualification}
                      isDoc={role === "Doctor"}
                      onChange={setQualification}
                      colors={colors}
                      inputStyle={inputStyle}
                      focused={focused}
                      setFocused={setFocused}
                    />
                  </Field>
                </div>
              </div>

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

                {/* Strength indicator */}
                {password && (
                  <div className="pt-2 px-1">
                    <div className="flex gap-1 h-1.5 w-full">
                      {strengthBarColors.map((bg, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-full transition-all duration-300"
                          style={{ background: bg }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wide"
                        style={{ color: strength.color }}>
                        {strength.label}
                      </span>
                      <span
                        className="text-[10px] italic"
                        style={{ color: colors.onSurfaceVariant }}>
                        {strength.hint}
                      </span>
                    </div>
                  </div>
                )}
              </Field>

              {/* Confirm Password */}
              <Field label="Confirm Password">
                <input
                  id="confirm-password"
                  required
                  type="password"
                  placeholder="••••••••"
                  style={inputStyle("confirm")}
                  onChange={(e) => setCobfirmPassword(e.target.value)}
                  onFocus={() => setFocused("confirm")}
                  onBlur={() => setFocused(null)}
                />
                <p
                  className={` ${confirmPassword ? "block" : "hidden"} text-sm ${password === confirmPassword ? "text-green-500" : "text-red-500"} `}>
                  Password is {password === confirmPassword ? "" : "not"}{" "}
                  matching
                </p>
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
                  Create Account
                </button>
              </div>
            </form>

            {/* Sign-in link */}
            <div className="mt-8 text-center">
              <p className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                Already have an account?{" "}
                <Link to={'/login'}
                  href="#"
                  className="font-bold hover:underline"
                  style={{ color: colors.primary }}>
                  Log In
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
