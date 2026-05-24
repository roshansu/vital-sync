import { useState, useRef } from "react";
import { colors } from "../../constant/style";
import BioTextarea from "./BioTextArea";
import EditSelect from "./EditSelect";
import QualChip from "./QualChip";
import SectionTitle from "./SectionTitle";
import SpecialtyChip from "./SpecialtyChip";
import Icon from "../appointment/Icon";
import FieldLabel from "../form/FieldLabel";
import LockedField from "../form/LockedField";
import EditableInput from "../form/EditableInput";
import Card from "../form/Card";
import Toast from "../form/Toast";
import apiCall from "../../api/apiCall";
import LoadingSpinner from "../LoadingSpinner";
import { useEffect } from "react";

const QUALIFICATION_OPTIONS = [
  "MBBS",
  "MD",
  "MS",
  "DM",
  "MCh",
  "DNB",
  "FRCS",
  "MRCP",
  "PhD",
  "MDS",
  "FCPS",
];
const SPECIALTY_OPTIONS = [
  "Cardiology",
  "Neurology",
  "Internal Medicine",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "Oncology",
  "Psychiatry",
  "Radiology",
  "Endocrinology",
  "Pulmonology",
  "Gastroenterology",
];
const EXPERIENCE_OPTIONS = [
  "Less than 5 years",
  "5–10 Years",
  "10–15 Years",
  "15+ Years",
];
const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export default function DoctorProfile() {
  // Personal (locked)
  // const lockedName = "Dr. Julianne Moore";
  // const lockedEmail = "j.moore@clinical-atelier.com";
  // const lockedPhone = "+1 (555) 012-3456";
  const [lockedName, setLockedName] = useState("");
  const [lockedEmail, setLockedEmail] = useState("");
  const [lockedPhone, setLockedPhone] = useState("");
  const [image, setImage] = useState();
  // Address
  const [address, setAddress] = useState({
    street: "124 Medical Plaza, Suite 402",
    city: "Neo City",
    state: "New York",
    zip: "10001",
  });

  const [loading, setLoading] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  // Professional
  const [license, setLicense] = useState("");
  const [experience, setExperience] = useState("15+ Years");
  const [designation, setDesignation] = useState("Consultant");
  const [department, setDepartment] = useState("Internal Medicine");

  // Qualifications
  const [qualifications, setQualifications] = useState(["MBBS", "MD", "PhD"]);
  const [newQual, setNewQual] = useState("");
  const [addingQual, setAddingQual] = useState(false);

  // Specialties
  const [specialties, setSpecialties] = useState([]);
  const [newSpec, setNewSpec] = useState("");
  const [addingSpec, setAddingSpec] = useState(false);

  // Bio
  const [bio, setBio] = useState(''
  );

  // UI state
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState({
    visible: false,
    msg: "",
  });
  const [autoSaved, setAutoSaved] = useState("Auto-saved 2 mins ago");
  const [profileHov, setProfileHov] = useState(false);
  const [saveHov, setSaveHov] = useState(false);
  const [cancelHov, setCancelHov] = useState(false);
  const [pubHov, setPubHov] = useState(false);

  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAg-T5eeVUNI6vWuxVOT95QRRIAzHsXG8Ouva7v_7sl1g-EmnX37QmzrbvYoVPH9voVghqHjj3pnR-IIKW15lkI9-PxF79vxnO34QMX0vIcjeUImtdvrs9tr0ln4fZyXA93BJ6FA6lras0Ao9s8Z9JVwAElNYvly_i5J9aeylsekairYRpc4ZA6WN4TQftjYdJclE3SgLTETuaxDkzT6L1gIb4JrhrxlMFj1Pl9Pk5TFElX81qh6P6lBXCwX0UfNC8G0VPGxyi_lB2l",
  );

  const convertToArray = (value) => {
    if (!value) return [];

    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const handleAvailable = async () =>{
    await apiCall('/doctor/profile/available', 'POST', {available: !isAvailable})
    setIsAvailable((prev)=>!prev)
  }

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await apiCall("/doctor/profile", "GET");
      console.log(res);
      const data = res.data;

      if (res.success) {
        setLockedName(data.firstName + " " + data.lastName);
        setLockedEmail(data.email);
        setLockedPhone(data.phone);

        setAddress((p) => ({
          ...p,
          street: data.street,
          city: data.city,
          state: data.state,
          zip: data.postalCode,
        }));
      }

      setLicense(data.license)
      setIsApproved(data.isApproved);
      setIsAvailable(data.available)
      setExperience(data?.experience || "");
      setSpecialties(convertToArray(data.specialization[0]));
      setQualifications(convertToArray(data.qualification[0]));
      setBio(data.bio);
      setProfileImage(
        data?.imageUrl ||
          "https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg",
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Create preview URL
      const imageUrl = URL.createObjectURL(file);
      setImage(file);
      // Update image preview
      setProfileImage(imageUrl);

      console.log(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);

    const formData = new FormData();

    console.log(qualifications, specialties);

    // if(license)
    formData.append("license", license);

    // if(experience)
    formData.append("experience", experience);

    // if(address)
    formData.append("street", address.street);
    formData.append("city", address.city);
    formData.append("state", address.state);
    formData.append("postalCode", address.zip);

    // if(bio)
    formData.append("bio", bio);

    // if(newSpec)
    formData.append("specialization", specialties);

    // if(newQual)
    formData.append("qualification", qualifications);

    // if(image)
    formData.append("image", image);

    // if(Object.keys(formData).length<1){
    //   console.log(Object.keys(formData).length)
    //   alert('formdata is empty')
    // }

    const res = await apiCall(
      "/doctor/profile",
      "POST",
      formData,
      "multipart/form-data",
    );

    console.log(formData);

    setTimeout(() => {
      setSaving(false);
      setAutoSaved("Auto-saved just n");
      setShowToast({
        visible: true,
        msg: res.message,
      });
      setTimeout(() => setShowToast(false), 4000);
    }, 1200);
  };

  const addQual = () => {
    if (newQual && !qualifications.includes(newQual)) {
      setQualifications((p) => [...p, newQual]);
    }
    setNewQual("");
    setAddingQual(false);
  };

  const addSpec = () => {
    if (newSpec && !specialties.includes(newSpec)) {
      setSpecialties((p) => [...p, newSpec]);
    }
    setNewSpec("");
    setAddingSpec(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <style>{`
        body { font-family: 'Inter', sans-serif; background: ${colors.surface}; }
        input::placeholder, textarea::placeholder { color: #94a3b8; }
        select option { background: ${colors.surfaceContainerLowest}; }
        textarea { resize: none; }
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0ow.8s linear infinite; }
        @media (max-width: 768px) { .main-offset { margin-left: 0 !important; } }
      `}</style>

      <main
        className="main-offset min-h-screen"
        style={{ background: colors.surface, fontFamily: "Inter" }}>
        <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8 pb-16">
          {/* ── Profile Header ── */}
          <section
            className="rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 transition-colors"
            style={{
              background: colors.surfaceContainerLowest,
              boxShadow: "0 2px 16px rgba(25,28,30,0.05)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = colors.surfaceContainerLowest)
            }>
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-xl object-cover ring-4"
                style={{
                  ringColor: colors.surfaceContainerLow,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              />

              <button
                className="absolute -bottom-2 -right-2 p-2.5 rounded-lg shadow-lg transition-all active:scale-95"
                style={{
                  background: colors.primary,
                  border: "none",
                  cursor: "pointer",
                  transform: profileHov ? "scale(1.08)" : "scale(1)",
                }}
                onMouseEnter={() => setProfileHov(true)}
                onMouseLeave={() => setProfileHov(false)}
                onClick={handleImageClick}>
                <Icon name="edit" size={15} color={colors.onPrimary} />
              </button>

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center md:items-center gap-2 mb-2 flex-wrap justify-center md:justify-start">
                <h2
                  className="text-2xl md:text-3xl font-extrabold tracking-tight"
                  style={{ fontFamily: "Manrope", color: colors.onSurface }}>
                  {lockedName}
                </h2>
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                  style={
                    isApproved
                      ? {
                          background: "#eff6ff",
                          color: "#1d4ed8",
                        }
                      : {
                          background: "#fef3c7",
                          color: "#b45309",
                        }
                  }>
                  <Icon
                    name={isApproved ? "verified" : "pending"}
                    filled
                    size={13}
                    color={isApproved ? "#1d4ed8" : "#b45309"}
                  />

                  {isApproved ? "VERIFIED PROVIDER" : "NOT VERIFIED"}
                </span>
              </div>

              <p
                className="text-base font-medium mb-4"
                style={{ color: "#64748b" }}>
                {designation} · {department}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <div className="flex items-center gap-3">
                  {/* Status Badge */}
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
                    style={
                      isAvailable
                        ? {
                            background: "#f0fdf4",
                            color: "#15803d",
                          }
                        : {
                            background: "#fef2f2",
                            color: "#b91c1c",
                          }
                    }>
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: isAvailable ? "#22c55e" : "#ef4444",
                      }}
                    />

                    {isAvailable
                      ? "Available for Consultations"
                      : "Not Available"}
                  </div>

                  {/* Toggle Button */}
                  <button
                    onClick={handleAvailable}
                    className="relative w-12 h-6 rounded-full transition-all duration-300"
                    style={{
                      background: isAvailable ? "#22c55e" : "#d1d5db",
                    }}>
                    <div
                      className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300"
                      style={{
                        left: isAvailable ? "26px" : "4px",
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Public profile btn */}
            <div className="flex-shrink-0">
              <button
                onMouseEnter={() => setPubHov(true)}
                onMouseLeave={() => setPubHov(false)}
                className="px-5 py-2.5 rounded-lg font-bold text-sm transition-all"
                style={{
                  background: pubHov
                    ? colors.primary
                    : `${colors.primaryContainer}20`,
                  color: pubHov ? colors.onPrimary : colors.primaryContainer,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Manrope",
                }}>
                Public Profile View
              </button>
            </div>
          </section>

          {/* ── Main grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            {/* ── Personal Details (8 cols) ── */}
            <Card className="lg:col-span-8 space-y-6">
              <SectionTitle
                title="Personal Details"
                sub="General Information"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Locked fields */}
                <div>
                  <FieldLabel>Full Name</FieldLabel>
                  <LockedField value={lockedName} />
                </div>
                <div>
                  <FieldLabel>Email Address</FieldLabel>
                  <LockedField value={lockedEmail} />
                </div>
                <div>
                  <FieldLabel>Phone Number</FieldLabel>
                  <LockedField value={lockedPhone} />
                </div>

                {/* Designation (editable) */}
                {/* <div>
                  <FieldLabel required>Designation</FieldLabel>
                  <EditableInput
                    value={designation}
                    onChange={setDesignation}
                    placeholder="e.g. Chief Medical Officer"
                  />
                </div> */}
              </div>

              {/* Lock notice */}
              <div
                className="flex items-start gap-2.5 p-3 rounded-xl"
                style={{ background: `${colors.primary}08` }}>
                <Icon
                  name="info"
                  size={15}
                  color={colors.primaryContainer}
                  className="mt-0.5 flex-shrink-0"
                />
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: colors.onPrimaryFixedVariant }}>
                  Name, email, and phone are managed by the hospital
                  administration and cannot be edited here.
                </p>
              </div>

              {/* ── Address Form ── */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: colors.surfaceContainerHigh }}>
                    <Icon
                      name="location_on"
                      size={16}
                      color={colors.onSurfaceVariant}
                    />
                  </div>
                  <h4
                    className="text-base font-bold"
                    style={{ fontFamily: "Manrope", color: colors.onSurface }}>
                    Work Address
                  </h4>
                </div>

                <div className="space-y-4">
                  {/* Street */}
                  <div>
                    <FieldLabel required>Street Address</FieldLabel>
                    <EditableInput
                      value={address.street}
                      onChange={(e) =>
                        setAddress((p) => ({ ...p, street: e.target.value }))
                      }
                      placeholder="Street, Building, Suite"
                    />
                  </div>

                  {/* City + State */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FieldLabel required>City</FieldLabel>
                      <EditableInput
                        value={address.city}
                        onChange={(e) =>
                          setAddress((p) => ({ ...p, city: e.target.value }))
                        }
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <FieldLabel required>State</FieldLabel>
                      <EditSelect
                        value={address.state}
                        onChange={(v) =>
                          setAddress((p) => ({ ...p, state: v }))
                        }
                        options={US_STATES}
                        placeholder="Select state"
                      />
                    </div>
                  </div>

                  {/* Zip */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FieldLabel required>ZIP Code</FieldLabel>
                      <EditableInput
                        value={address.zip}
                        onChange={(e) =>
                          setAddress((p) => ({ ...p, zip: e.target.value }))
                        }
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <FieldLabel>Country</FieldLabel>
                      <LockedField value="India" icon="public" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* ── Professional Details (4 cols) ── */}
            <Card className="lg:col-span-4 space-y-6">
              <SectionTitle title="Professional" />

              {/* License */}
              <div>
                <FieldLabel required>License Number</FieldLabel>
                <EditableInput
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  placeholder="e.g. MED-99482-CM"
                />
              </div>

              {/* Department */}
              <div>
                <FieldLabel>Department</FieldLabel>
                <EditableInput
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Internal Medicine"
                />
              </div>

              {/* Experience */}
              <div>
                <FieldLabel>Years of Experience</FieldLabel>
                <EditSelect
                  value={experience}
                  onChange={setExperience}
                  options={EXPERIENCE_OPTIONS}
                />
              </div>

              {/* Qualifications */}
              <div>
                <div
                  className="p-4 rounded-xl space-y-3"
                  style={{ background: `${colors.primaryFixed}60` }}>
                  <div
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                    style={{ color: colors.primary }}>
                    <Icon name="school" size={15} color={colors.primary} />
                    Qualifications
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {qualifications.map((q) => (
                      <QualChip
                        key={q}
                        label={q}
                        onRemove={() =>
                          setQualifications((p) => p.filter((x) => x !== q))
                        }
                      />
                    ))}
                    {addingQual ? (
                      <div className="flex items-center gap-1">
                        <select
                          value={newQual}
                          onChange={(e) => setNewQual(e.target.value)}
                          autoFocus
                          className="rounded text-xs px-2 py-1 border-none outline-none"
                          style={{
                            background: colors.surfaceContainerLowest,
                            color: colors.onSurface,
                            boxShadow: `0 0 0 1.5px ${colors.primaryContainer}50`,
                            fontFamily: "Inter",
                          }}>
                          <option value="">Pick…</option>
                          {QUALIFICATION_OPTIONS.filter(
                            (o) => !qualifications.includes(o),
                          ).map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                        <button
                          onClick={addQual}
                          className="text-[10px] font-bold px-2 py-1 rounded"
                          style={{
                            background: colors.primary,
                            color: colors.onPrimary,
                            border: "none",
                            cursor: "pointer",
                          }}>
                          Add
                        </button>
                        <button
                          onClick={() => {
                            setAddingQual(false);
                            setNewQual("");
                          }}
                          className="text-[10px] px-1 py-1 rounded"
                          style={{
                            background: "none",
                            color: "#94a3b8",
                            border: "none",
                            cursor: "pointer",
                          }}>
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setAddingQual(true)}
                        className="text-[10px] font-bold px-2 py-1 rounded border border-dashed transition-colors"
                        style={{
                          borderColor: `${colors.primary}40`,
                          color: colors.primary,
                          background: "none",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = `${colors.primary}10`)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "none")
                        }>
                        + Add
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div>
                <div
                  className="p-4 rounded-xl space-y-3"
                  style={{ background: `${colors.primaryFixed}60` }}>
                  <div
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                    style={{ color: colors.primary }}>
                    <Icon name="award_star" size={15} color={colors.primary} />
                    Specialties
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((s) => (
                      <SpecialtyChip
                        key={s}
                        label={s}
                        onRemove={() =>
                          setSpecialties((p) => p.filter((x) => x !== s))
                        }
                      />
                    ))}
                    {addingSpec ? (
                      <div className="flex items-center gap-1">
                        <select
                          value={newSpec}
                          onChange={(e) => setNewSpec(e.target.value)}
                          autoFocus
                          className="rounded text-xs px-2 py-1 border-none outline-none"
                          style={{
                            background: colors.surfaceContainerLowest,
                            color: colors.onSurface,
                            boxShadow: `0 0 0 1.5px ${colors.primaryContainer}50`,
                            fontFamily: "Inter",
                          }}>
                          <option value="">Pick…</option>
                          {SPECIALTY_OPTIONS.filter(
                            (o) => !specialties.includes(o),
                          ).map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                        <button
                          onClick={addSpec}
                          className="text-[10px] font-bold px-2 py-1 rounded"
                          style={{
                            background: colors.primary,
                            color: colors.onPrimary,
                            border: "none",
                            cursor: "pointer",
                          }}>
                          Add
                        </button>
                        <button
                          onClick={() => {
                            setAddingSpec(false);
                            setNewSpec("");
                          }}
                          className="text-[10px] px-1 py-1 rounded"
                          style={{
                            background: "none",
                            color: "#94a3b8",
                            border: "none",
                            cursor: "pointer",
                          }}>
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setAddingSpec(true)}
                        className="text-[10px] font-bold px-2 py-1 rounded border border-dashed transition-colors"
                        style={{
                          borderColor: `${colors.primary}40`,
                          color: colors.primary,
                          background: "none",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = `${colors.primary}10`)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "none")
                        }>
                        + Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* ── Professional Biography (full width) ── */}
            <Card className="lg:col-span-12 space-y-4">
              <div className="flex items-center justify-between">
                <h3
                  className="text-xl font-bold tracking-tight"
                  style={{ fontFamily: "Manrope", color: colors.onSurface }}>
                  Professional Biography
                </h3>
                <span
                  className="text-xs font-medium"
                  style={{ color: "#94a3b8" }}>
                  {autoSaved}
                </span>
              </div>

              <BioTextarea value={bio} onChange={setBio} />

              <div className="flex items-center justify-between pt-1">
                <span
                  className="text-xs"
                  style={{
                    color: bio.length > 1200 ? colors.error : "#94a3b8",
                  }}>
                  {bio.length} / 1500 characters
                </span>
                <div
                  className="h-1 rounded-full overflow-hidden flex-1 max-w-[120px] ml-4"
                  style={{ background: colors.surfaceContainerHigh }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, (bio.length / 1500) * 100)}%`,
                      background:
                        bio.length > 1200
                          ? colors.error
                          : colors.primaryContainer,
                    }}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* ── Footer actions ── */}
          <footer className="flex items-center justify-end gap-4">
            <button
              onMouseEnter={() => setSaveHov(true)}
              onMouseLeave={() => setSaveHov(false)}
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-sm transition-all active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
                color: colors.onPrimary,
                border: "none",
                cursor: saving ? "not-allowed" : "pointer",
                fontFamily: "Manrope",
                boxShadow: saveHov
                  ? `0 8px 24px ${colors.primary}40`
                  : `0 4px 12px ${colors.primary}25`,
                transform: saveHov && !saving ? "scale(1.02)" : "scale(1)",
                opacity: saving ? 0.8 : 1,
              }}>
              {saving ? (
                <>
                  <Icon
                    name="refresh"
                    size={17}
                    color={colors.onPrimary}
                    className="spin"
                  />
                  Saving…
                </>
              ) : (
                <>
                  <Icon name="save" size={17} color={colors.onPrimary} />
                  Save Changes
                </>
              )}
            </button>
          </footer>
        </div>
      </main>

      <Toast visible={showToast.visible} msg={showToast.msg} />
    </>
  );
}
