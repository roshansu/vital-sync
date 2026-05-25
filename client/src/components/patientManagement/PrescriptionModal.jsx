import { useEffect, useState } from "react";
import Icon from '../appointment/Icon'
import { colors } from "../../constant/style";
import apiCall from "../../api/apiCall";
import LoadingSpinner from "../LoadingSpinner";

const ROUTE_OPTIONS   = ["Oral", "IV", "Topical", "Subcutaneous", "Inhaled", "Rectal"];
const FREQ_OPTIONS    = ["Once daily", "Twice daily", "3x daily", "Every 8 hours", "Every 12 hours", "As needed", "Once weekly", "Ongoing"];
const DURATION_OPTIONS = ["3 Days", "5 Days", "7 Days", "10 Days", "14 Days", "30 Days", "90 Days", "Ongoing"];

const DIET_SUGGESTIONS = [
  "Low Sodium", "Hydration (2L/day)", "Light Walking", "Low Glycemic Diet",
  "No Alcohol", "Avoid Grapefruit", "High Protein", "Low Fat",
];


export default function PrescriptionModal({ patient, onClose }) {
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Amoxicillin 500mg", dosage: "1 Tablet", frequency: "Twice daily", duration: "7 Days", route: "Oral" },
    { id: 2, name: "Lisinopril 10mg",   dosage: "1 Tablet", frequency: "Once daily",  duration: "Ongoing", route: "Oral" },
  ]);
  const [dietTags,      setDietTags]      = useState(["Low Sodium", "Hydration (2L/day)", "Light Walking"]);
  const [instructions,  setInstructions]  = useState("");
  const [customTag,     setCustomTag]     = useState("");
  const [addingTag,     setAddingTag]     = useState(false);
  const [instrFocused,  setInstrFocused]  = useState(false);
  const [saving,        setSaving]        = useState(false);
  const [loading, setLoading] = useState(true)
  // console.log(patient)

  const addMedicine = () =>
    setMedicines((p) => [...p, { id: Date.now(), name: "", dosage: "", frequency: "Once daily", duration: "7 Days", route: "Oral" }]);

  const updateMed = (id, field, val) =>
    setMedicines((p) => p.map((m) => (m.id === id ? { ...m, [field]: val } : m)));

  const removeMed = (id) =>
    setMedicines((p) => p.filter((m) => m.id !== id));

  const removeTag = (tag) => setDietTags((p) => p.filter((t) => t !== tag));
  const addTag = (tag) => {
    if (tag && !dietTags.includes(tag)) setDietTags((p) => [...p, tag]);
    setCustomTag(""); setAddingTag(false);
  };

  const handleSave = () => {

    const data={
      medicines,
      instructions,
      dietTags,
      userId: patient.userId._id
    }

    const res = apiCall('/doctor/patient/prescription', "POST", data)

    console.log(data)
    setSaving(true);
    setTimeout(() => { setSaving(false); onClose(); }, 900);
  };

  async function getData() {
    setLoading(true)
    try{
      const res = await apiCall(`/doctor/patient/${patient.userId._id}`, "GET")
      if(res.success && res?.data){
        // console.log(res.data)
        setMedicines(res.data.medicines)
        setDietTags(res.data.dietTags)
        setInstructions(res.data.instructions)
      }
    }catch(err){

    }
    setLoading(false)
  }

  useEffect(()=>{
    getData()
  },[])

  const cellInput = (val, onChange, placeholder) => (
    <input
      value={val}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-2 py-1.5 rounded-lg text-xs font-medium border-none outline-none"
      style={{
        background: colors.surfaceContainerLow,
        color: colors.onSurface,
        fontFamily: "Inter",
        minWidth: 90,
      }}
    />
  );

  const cellSelect = (val, onChange, options) => (
    <select
      value={val}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-2 py-1.5 rounded-lg text-xs font-medium border-none outline-none appearance-none"
      style={{
        background: colors.surfaceContainerLow,
        color: colors.onSurface,
        fontFamily: "Inter",
        cursor: "pointer",
        minWidth: 90,
      }}
    >
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(25,28,30,0.5)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={{
          background: colors.surfaceContainerLowest,
          maxHeight: "90vh",
          animation: "scaleIn 0.22s cubic-bezier(0.34,1.56,0.64,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-6 py-5 flex justify-between items-center border-b flex-shrink-0"
          style={{ borderColor: `${colors.outlineVariant}18`, background: colors.surfaceContainerLowest }}
        >
          <div>
            <h2
              className="text-xl font-extrabold flex items-center gap-2"
              style={{ fontFamily: "Manrope", color: colors.onSurface }}
            >
              <Icon name="prescriptions" size={22} color={colors.primary} />
              New Prescription
            </h2>
            <p className="text-sm mt-0.5" style={{ color: colors.onSurfaceVariant }}>
              {patient.userId.firstName+" "+patient.userId.lastName} · ID: VS-{patient._id.toString().padStart(4, "0")}-{patient.userId.firstName.split(" ").map((w) => w[0]).join("")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerHigh)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            <Icon name="close" size={20} color={colors.onSurfaceVariant} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">

          {/* Medicine table */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base" style={{ fontFamily: "Manrope", color: colors.onSurface }}>
                Medication List
              </h3>
              <button
                onClick={addMedicine}
                className="flex items-center gap-1.5 text-sm font-bold transition-colors"
                style={{ color: colors.primary, background: "none", border: "none", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
              >
                <Icon name="add_circle" size={16} color={colors.primary} />
                Add Medicine
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border" style={{ borderColor: `${colors.outlineVariant}25` }}>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr style={{ background: `${colors.surfaceContainerLow}80` }}>
                    {["Medicine Name", "Dosage", "Frequency", "Duration", "Route", ""].map((h, i) => (
                      <th
                        key={i}
                        className="px-4 py-3 text-[10px] uppercase tracking-widest font-bold border-b"
                        style={{ color: colors.outline, borderColor: `${colors.outlineVariant}20`, whiteSpace: "nowrap" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((med, idx) => (
                    <tr
                      key={med.id}
                      className="group border-b transition-colors"
                      style={{ borderColor: `${colors.outlineVariant}10` }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = `${colors.surfaceContainerLow}60`)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td className="px-4 py-3 min-w-[160px]">
                        {cellInput(med.name, (v) => updateMed(med.id, "name", v), "e.g. Amoxicillin 500mg")}
                      </td>
                      <td className="px-4 py-3 min-w-[100px]">
                        {cellInput(med.dosage, (v) => updateMed(med.id, "dosage", v), "e.g. 1 Tablet")}
                      </td>
                      <td className="px-4 py-3 min-w-[140px]">
                        {cellSelect(med.frequency, (v) => updateMed(med.id, "frequency", v), FREQ_OPTIONS)}
                      </td>
                      <td className="px-4 py-3 min-w-[110px]">
                        {cellSelect(med.duration, (v) => updateMed(med.id, "duration", v), DURATION_OPTIONS)}
                      </td>
                      <td className="px-4 py-3 min-w-[100px]">
                        <span
                          className="px-2 py-1 rounded text-xs font-semibold"
                          style={{ background: colors.surfaceContainerHigh, color: colors.onSurface }}
                        >
                          {cellSelect(med.route, (v) => updateMed(med.id, "route", v), ROUTE_OPTIONS)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => removeMed(med.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg transition-all"
                          style={{ color: colors.error, background: "none", border: "none", cursor: "pointer" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = colors.errorContainer)}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                        >
                          <Icon name="delete" size={17} color={colors.error} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Dietary & Lifestyle */}
          <section>
            <h3 className="font-bold text-base mb-4" style={{ fontFamily: "Manrope", color: colors.onSurface }}>
              Dietary &amp; Lifestyle Advice
            </h3>
            <div className="flex flex-wrap gap-2">
              {dietTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => removeTag(tag)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
                    color: colors.onPrimary,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {tag}
                  <Icon name="close" size={13} color={colors.onPrimary} />
                </button>
              ))}

              {/* Add tag */}
              {addingTag ? (
                <div className="flex items-center gap-1.5">
                  <input
                    autoFocus
                    list="diet-suggestions"
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addTag(customTag);
                      if (e.key === "Escape") { setAddingTag(false); setCustomTag(""); }
                    }}
                    placeholder="Type advice…"
                    className="px-3 py-2 rounded-full text-xs border-none outline-none"
                    style={{
                      background: colors.surfaceContainerLow,
                      color: colors.onSurface,
                      width: 130,
                      boxShadow: `0 0 0 1.5px ${colors.primaryContainer}50`,
                    }}
                  />
                  <datalist id="diet-suggestions">
                    {DIET_SUGGESTIONS.filter((s) => !dietTags.includes(s)).map((s) => (
                      <option key={s} value={s} />
                    ))}
                  </datalist>
                  <button onClick={() => addTag(customTag)}
                    className="text-[10px] font-bold px-2.5 py-1.5 rounded-full"
                    style={{ background: colors.primary, color: colors.onPrimary, border: "none", cursor: "pointer" }}>
                    Add
                  </button>
                  <button onClick={() => { setAddingTag(false); setCustomTag(""); }}
                    className="text-[10px] px-2 py-1.5 rounded-full"
                    style={{ background: colors.surfaceContainerHigh, color: colors.onSurfaceVariant, border: "none", cursor: "pointer" }}>
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAddingTag(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-colors"
                  style={{
                    borderColor: `${colors.outlineVariant}40`,
                    color: colors.onSurfaceVariant,
                    background: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerLow)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                >
                  <Icon name="add" size={14} color={colors.onSurfaceVariant} />
                  Add Tag
                </button>
              )}
            </div>
          </section>

          {/* General Instructions */}
          <section>
            <h3 className="font-bold text-base mb-4" style={{ fontFamily: "Manrope", color: colors.onSurface }}>
              General Instructions
            </h3>
            <textarea
              rows={4}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              onFocus={() => setInstrFocused(true)}
              onBlur={() => setInstrFocused(false)}
              placeholder="Type specific instructions for the patient or nursing staff..."
              className="w-full rounded-xl px-5 py-4 text-sm font-medium border leading-relaxed outline-none transition-all"
              style={{
                background: colors.surfaceContainerLowest,
                color: colors.onSurface,
                fontFamily: "Inter",
                resize: "none",
                borderColor: instrFocused ? colors.primaryContainer : `${colors.outlineVariant}30`,
                boxShadow: instrFocused ? `0 0 0 2px ${colors.primaryContainer}25` : "none",
              }}
            />
          </section>
        </div>

        {/* Footer */}
        <div
          className="px-6 py-4 flex justify-end gap-3 border-t flex-shrink-0"
          style={{ borderColor: `${colors.outlineVariant}18`, background: colors.surfaceContainerLowest }}
        >
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg font-bold text-sm transition-colors"
            style={{ background: colors.surfaceContainerHigh, color: colors.onSurface, border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerHighest)}
            onMouseLeave={(e) => (e.currentTarget.style.background = colors.surfaceContainerHigh)}
          >
            Discard Draft
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-7 py-2.5 rounded-lg font-bold text-sm transition-all active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
              color: colors.onPrimary,
              border: "none",
              cursor: saving ? "not-allowed" : "pointer",
              fontFamily: "Manrope",
              boxShadow: `0 4px 16px ${colors.primary}30`,
              opacity: saving ? 0.8 : 1,
            }}
          >
            {saving ? (
              <>
                <Icon name="refresh" size={16} color={colors.onPrimary} className="animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Icon name="save" size={16} color={colors.onPrimary} />
                Save Prescription
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}