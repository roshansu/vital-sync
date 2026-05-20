import { useState } from "react";
import { colors } from "../../constant/style";
import Icon from "../appointment/Icon";
import FieldLabel from "./FieldLabel";
import TextareaInput from './TextareaInput'
import Toast from './Toast'
import SelectInput from './SelectInput'
import LockedField from './LockedField'
import EditableInput from './EditableInput'
import Card from './Card'
import SectionHeader from './SectionHeader'
import FooterAction from './FooterAction'

export default function ProfileSettings() {
  // Personal info — only gender & dob editable
  const [gender, setGender]     = useState("Female");
  const [dob, setDob]           = useState("1992-05-14");

  // Bio (editable)
  const [bio, setBio] = useState(
    "Regular outpatient since 2022. Managing mild hypertension and seasonal allergies. Very active lifestyle, high health literacy."
  );

  // Medical info
  const [bloodGroup, setBloodGroup]   = useState("O Positive (O+)");
  const [conditions, setConditions]   = useState("Hypertension");
  const [medications, setMedications] = useState("Lisinopril 10mg");
  const [medHistory, setMedHistory]   = useState(
    "Appendectomy in 2015. Family history of Type 2 Diabetes (maternal). No history of major surgical complications. Reports regular physical activity 3-4 times per week."
  );
  const [allergies, setAllergies] = useState(["Peanuts", "Penicillin"]);
  const [newAllergy, setNewAllergy]   = useState("");
  const [addingAllergy, setAddingAllergy] = useState(false);

  // Address
  const [address, setAddress] = useState({
    line: "742 Evergreen Terrace",
    city: "Springfield",
    state: "Illinois",
    pincode: "62704",
  });

  // Emergency contact
  const [emergency, setEmergency] = useState({
    name: "Marco Rodriguez",
    relationship: "Spouse",
    phone: "+1 (555) 0987-654",
  });

  const [showToast, setShowToast] = useState(false);
  const [saveHovered, setSaveHovered] = useState(false);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const removeAllergy = (a) => setAllergies((prev) => prev.filter((x) => x !== a));
  const addAllergy = () => {
    if (newAllergy.trim()) {
      setAllergies((prev) => [...prev, newAllergy.trim()]);
      setNewAllergy("");
      setAddingAllergy(false);
    }
  };

  const inputFocusStyle = (focused) => ({
    background: colors.surfaceContainerLow,
    color: colors.onSurface,
    fontFamily: "Inter",
    boxShadow: focused
      ? `0 0 0 2px ${colors.primaryContainer}50`
      : `0 0 0 1px ${colors.outlineVariant}30`,
    borderRadius: 10,
    border: "none",
    outline: "none",
    width: "100%",
    padding: "10px 16px",
    fontSize: 14,
  });

  return (
    <>
      <style>{`
        body { font-family: 'Inter', sans-serif; background: ${colors.surface}; }
        input::placeholder, textarea::placeholder { color: #94a3b8; }
        select option { background: ${colors.surfaceContainerLowest}; }
        textarea { resize: none; }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .mandatory-note { font-size: 11px; color: ${colors.onSurfaceVariant}; }
        .mandatory-note span { color: ${colors.error}; font-weight: 700; }
      `}</style>

      <div
        className="min-h-screen flex flex-col"
        style={{ background: colors.surface, fontFamily: "Inter" }}
      >
        <main className="p-6 md:p-8 max-w-5xl mx-auto w-full space-y-8">

          {/* ── Page header ── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <nav className="flex items-center gap-1.5 mb-2">
                <span
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: `${colors.onSurfaceVariant}99` }}
                >
                  Patients
                </span>
                <Icon name="chevron_right" size={13} color={`${colors.onSurfaceVariant}60`} />
                <span
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: colors.primary }}
                >
                  Profile Management
                </span>
              </nav>
              <h2
                className="text-3xl font-extrabold tracking-tight"
                style={{ fontFamily: "Manrope", color: colors.onSurface }}
              >
                Profile Settings
              </h2>
              <p className="mt-1 text-sm mandatory-note">
                Fields marked <span>*</span> are mandatory
              </p>
            </div>

            <button
              onMouseEnter={() => setSaveHovered(true)}
              onMouseLeave={() => setSaveHovered(false)}
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all self-start md:self-auto"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
                color: colors.onPrimaryContainer,
                border: "none",
                cursor: "pointer",
                fontFamily: "Manrope",
                boxShadow: saveHovered
                  ? `0 8px 24px ${colors.primary}40`
                  : `0 4px 12px ${colors.primary}25`,
                opacity: saveHovered ? 0.92 : 1,
                transform: saveHovered ? "translateY(-1px)" : "translateY(0)",
              }}
            >
              <Icon name="save" size={18} color={colors.onPrimary} />
              Save Changes
            </button>
          </div>

          {/* ── Profile hero section ── */}
          <section
            className="rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start gap-6 md:gap-8"
            style={{
              background: colors.surfaceContainerLowest,
              boxShadow: "0 8px 32px rgba(25,28,30,0.05)",
            }}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="w-28 h-28 rounded-2xl overflow-hidden ring-4"
                style={{ ringColor: colors.surface }}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR0qRVluOXVPe_Ua1uoPOIfr5MFDtfnbkmygfLdU-EspXByAOZ9isHvpEhRVQDbxlv3PlMJ7e_7tvcBx0BpdlpHoV3nsfg10MnVhuwBtn7lR_ZZpoCnS8MDpWBc5Xi2i6Lpa_qoNEfW-Kq5z5q74oSpSjH5KUf9vddBqp8x4iLpRJd96N0wwPxsUA2-MjWbcGwaBEYW6BzHPQiMxbLfrW7gfIKm2xGaAySoI_RGcVKXHd5UTIg4hAbTwDjKFGjk-exO09vxYJ1pD5N"
                  alt="Patient Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full flex items-center justify-center border-4 shadow-lg transition-transform hover:scale-105"
                style={{
                  background: colors.primary,
                  borderColor: colors.surfaceContainerLowest,
                  cursor: "pointer",
                }}
              >
                <Icon name="photo_camera" size={15} color={colors.onPrimary} />
              </button>
            </div>

            {/* Bio fields */}
            <div className="flex-1 space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    
                  <FieldLabel required>Full Legal Name</FieldLabel>
                  <LockedField value="Elena Rodriguez" />
                </div>
                <div>
                  <FieldLabel>Patient ID</FieldLabel>
                  <LockedField value="#AT-8921-X" mono />
                </div>
              </div>
              <div>
            
                <FieldLabel>Short Bio / Clinical Summary</FieldLabel>
                <TextareaInput value={bio} onChange={(e) => setBio(e.target.value)} rows={2} />
              </div>
            </div>
          </section>

          {/* ── 2-col grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ── Personal Information ── */}
            <section>
                
              <SectionHeader
                icon="person"
                iconBg={colors.primaryFixed}
                iconColor={colors.primary}
                title="Personal Information"
              />
              <Card>
                
                {/* First + Last (locked) */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FieldLabel required>First Name</FieldLabel>
                    <LockedField value="Elena" />
                  </div>
                  <div>
                    <FieldLabel required>Last Name</FieldLabel>
                    <LockedField value="Rodriguez" />
                  </div>
                </div>

                {/* Email (locked) */}
                <div>
                  <FieldLabel required>Email Address</FieldLabel>
                  <LockedField value="elena.r@example.health" />
                </div>

                {/* Phone + Gender */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FieldLabel required>Phone Number</FieldLabel>
                    <LockedField value="+1 (555) 0123-456" />
                  </div>
                  <div>
                    <FieldLabel required>Gender</FieldLabel>
                    <SelectInput
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      options={["Female", "Male", "Non-binary", "Prefer not to say"]}
                    />
                  </div>
                </div>

                {/* Date of Birth (editable) */}
                <div>
                  <FieldLabel required>Date of Birth</FieldLabel>
                  
                  <EditableInput
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>

                {/* Locked notice */}
                <div
                  className="flex items-start gap-2.5 p-3 rounded-lg"
                  style={{ background: `${colors.primary}08` }}
                >
                  <Icon name="info" size={15} color={colors.primaryContainer} className="mt-0.5" />
                  <p className="text-xs leading-relaxed" style={{ color: colors.onPrimaryFixedVariant }}>
                    Name, email, phone and Patient ID are managed by the hospital
                    administration. Contact your care coordinator to request changes.
                  </p>
                </div>
              </Card>
            </section>

            {/* ── Medical Information ── */}
            <section>
              <SectionHeader
                icon="vital_signs"
                iconBg={colors.tertiaryFixed}
                iconColor={colors.tertiary}
                title="Medical Information"
              />
              <Card>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FieldLabel required>Blood Group</FieldLabel>
                    <SelectInput
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      options={["O Positive (O+)", "A Positive (A+)", "B Positive (B+)", "AB Positive (AB+)", "O Negative (O-)", "A Negative (A-)", "B Negative (B-)", "AB Negative (AB-)"]}
                    />
                  </div>
                  <div>
                    <FieldLabel>Existing Conditions</FieldLabel>
                    <EditableInput
                      value={conditions}
                      onChange={(e) => setConditions(e.target.value)}
                      placeholder="e.g. Hypertension"
                    />
                  </div>
                </div>

                {/* Allergies */}
                <div>
                  <FieldLabel>Known Allergies</FieldLabel>
                  <div className="flex flex-wrap gap-2">
                    {allergies.map((a) => (
                      <span
                        key={a}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          background: colors.errorContainer,
                          color: colors.onErrorContainer,
                        }}
                      >
                        {a}
                        <button
                          onClick={() => removeAllergy(a)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: colors.onErrorContainer,
                            lineHeight: 1,
                            padding: 0,
                            opacity: 0.7,
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
                        >
                          ×
                        </button>
                      </span>
                    ))}

                    {addingAllergy ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          autoFocus
                          value={newAllergy}
                          onChange={(e) => setNewAllergy(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") addAllergy();
                            if (e.key === "Escape") { setAddingAllergy(false); setNewAllergy(""); }
                          }}
                          placeholder="Allergy name"
                          className="rounded-full px-3 py-1 text-xs border-none outline-none"
                          style={{
                            background: colors.surfaceContainerLow,
                            color: colors.onSurface,
                            boxShadow: `0 0 0 1.5px ${colors.primaryContainer}60`,
                            width: 120,
                          }}
                        />
                        <button
                          onClick={addAllergy}
                          className="text-xs font-bold px-2 py-1 rounded-full"
                          style={{ background: colors.primary, color: colors.onPrimary, border: "none", cursor: "pointer" }}
                        >
                          Add
                        </button>
                        <button
                          onClick={() => { setAddingAllergy(false); setNewAllergy(""); }}
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ background: colors.surfaceContainerHigh, color: colors.onSurfaceVariant, border: "none", cursor: "pointer" }}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setAddingAllergy(true)}
                        className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border border-dashed transition-colors"
                        style={{
                          borderColor: colors.outline,
                          color: colors.onSurfaceVariant,
                          background: "none",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerLow)}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                      >
                        <Icon name="add" size={13} color={colors.onSurfaceVariant} />
                        Add Allergy
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <FieldLabel required>Current Medications</FieldLabel>
                  <EditableInput
                    value={medications}
                    onChange={(e) => setMedications(e.target.value)}
                    placeholder="e.g. Lisinopril 10mg"
                  />
                </div>

                <div>
                  <FieldLabel>Medical History</FieldLabel>
                  <TextareaInput
                    value={medHistory}
                    onChange={(e) => setMedHistory(e.target.value)}
                    rows={3}
                  />
                </div>
              </Card>
            </section>

            {/* ── Primary Address ── */}
            <section>
              <SectionHeader
                icon="location_on"
                iconBg={colors.surfaceContainerHigh}
                iconColor={colors.onSurfaceVariant}
                title="Primary Address"
              />
              <Card>
                <div>
                  <FieldLabel required>Address Line</FieldLabel>
                  <EditableInput
                    value={address.line}
                    onChange={(e) => setAddress((p) => ({ ...p, line: e.target.value }))}
                    placeholder="Street address"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { key: "city",    label: "City",    placeholder: "City",    required: true  },
                    { key: "state",   label: "State",   placeholder: "State",   required: true  },
                    { key: "pincode", label: "Pincode", placeholder: "Pincode", required: false },
                  ].map(({ key, label, placeholder, required }) => (
                    <div key={key}>
                      <FieldLabel required={required}>{label}</FieldLabel>
                      <EditableInput
                        value={address[key]}
                        onChange={(e) => setAddress((p) => ({ ...p, [key]: e.target.value }))}
                        placeholder={placeholder}
                      />
                    </div>
                  ))}
                </div>

                {/* Map preview */}
                <div
                  className="mt-2 rounded-lg overflow-hidden"
                  style={{ aspectRatio: "21/9", filter: "grayscale(1) contrast(0.8)", opacity: 0.7 }}
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzlmK511i-DTNJ7CjGWxFXLVoSX4lcr7BgK1x7kmBdvFTWA19ga6qg-PmXsfQoVEEYO9dfsjhPzCgqepDTZ5PPhxEUebu6uWS59W4cjvNRrB7J_V5lsq0eYYj74cNp8nGLAeaT9s-IZFNe-iIs6ArNJKK1iVRyRLu4h0Rxjv7128nuswxyA9AsM_Q0MUUx8b1dPvH3PhMnB0P7UwoG3PfwbDSjUGgBPJqUWcakM0CdcgRaSvj-EDaLeAIa0xW6qaRmzlenQCJ2mjjS"
                    alt="Location Map"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
            </section>

            {/* ── Emergency Contact ── */}
            <section>
              <SectionHeader
                icon="emergency"
                iconBg={colors.errorContainer}
                iconColor={colors.error}
                title="Emergency Contact"
              />
              <Card>
                <div>
                  <FieldLabel required>Contact Name</FieldLabel>
                  <EditableInput
                    value={emergency.name}
                    onChange={(e) => setEmergency((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Full name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FieldLabel required>Relationship</FieldLabel>
                    <SelectInput
                      value={emergency.relationship}
                      onChange={(e) => setEmergency((p) => ({ ...p, relationship: e.target.value }))}
                      options={["Spouse", "Parent", "Sibling", "Legal Guardian", "Friend", "Other"]}
                    />
                  </div>
                  <div>
                    <FieldLabel required>Phone Number</FieldLabel>
                    <EditableInput
                      type="tel"
                      value={emergency.phone}
                      onChange={(e) => setEmergency((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                {/* Info note */}
                <div
                  className="flex items-start gap-3 p-4 rounded-lg"
                  style={{ background: `${colors.primaryFixed}50` }}
                >
                  <Icon name="info" size={18} color={colors.primaryContainer} className="mt-0.5 flex-shrink-0" />
                  <p className="text-xs leading-relaxed" style={{ color: colors.onPrimaryFixedVariant }}>
                    The emergency contact will be notified immediately in case of critical
                    clinical alerts or unplanned admissions.
                  </p>
                </div>
              </Card>
            </section>
          </div>

          {/* ── Footer meta ── */}
          <footer
            className="pt-6 pb-10 flex flex-wrap items-center justify-between gap-4 border-t"
            style={{ borderColor: `${colors.outlineVariant}18` }}
          >
            <div className="flex flex-wrap gap-6">
              <p
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: `${colors.onSurfaceVariant}60` }}
              >
                Last Sync: 12 Oct 2023, 14:32:01
              </p>
              <p
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: `${colors.onSurfaceVariant}60` }}
              >
                Encryption: AES-256 Military Grade
              </p>
            </div>
            <div className="flex gap-4">
              <FooterAction label="Export Record" hoverColor={colors.primary} />
              <FooterAction label="Archive Profile" hoverColor={colors.error} />
            </div>
          </footer>
        </main>
      </div>

      <Toast visible={showToast} />
    </>
  );
}
