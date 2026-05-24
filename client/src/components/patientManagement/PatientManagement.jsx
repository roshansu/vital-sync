import {colors} from '../../constant/style'
import Icon from '../appointment/Icon'
import { useState } from 'react';
import PatientCard from './PatientCard'
import PatientDetail from './PatientDetail'
import PrescriptionModal from './PrescriptionModal'
import apiCall from '../../api/apiCall';
import LoadingSpinner from '../LoadingSpinner';
import { useEffect } from 'react';

// const PATIENTS = [
//   {
//     id: 1,
//     name: "Elena Rodriguez",
//     age: 42,
//     gender: "Female",
//     status: "Active",
//     statusColor: { bg: `${colors.primary}15`, color: colors.primary },
//     lastVisit: "Oct 24, 2023 - Post-op review",
//     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvkQSu5L46RMqB9AmtgrEAGniHVxQD_5ZPA0ccbPxFrxqTI36utlSvZwNQg37PV0oQQscsvUo1y6S7VNpdu7N7hQ-VSVV1wPWuafH8Pk7V-LT79W54HQv0SsjaVZHC3z55tg9OQnXS25OdqvsyidcBFfL9uJW8rmVWVLx5rNqEUeLdgG85d9kJnrfEpsrgGXB9XzPnam3DG4vOPZrlbIS5f7YC8ISLLm8h1YpNfI3MUjbvUo5XoQvc1ZB3pVDgZd4vq7zJLq6RVzjs",
//     address: { street: "221 Oak Lane, Apt 3B", city: "Springfield", state: "IL", zip: "62701" },
//     medical: {
//       bloodGroup: "O Positive (O+)",
//       conditions: "Hypertension, Post-Surgical Recovery",
//       allergies: ["Penicillin", "Latex"],
//       history: "Appendectomy in 2015. Hypertension diagnosed 2020. Family history of cardiovascular disease (paternal). No prior psychiatric history.",
//     },
//     emergency: { name: "Carlos Rodriguez", relationship: "Spouse", phone: "+1 (555) 987-6543" },
//   },
//   {
//     id: 2,
//     name: "Arthur Vance",
//     age: 68,
//     gender: "Male",
//     status: "Follow-up",
//     statusColor: { bg: `${colors.tertiary}15`, color: colors.tertiary },
//     lastVisit: "Sep 12, 2023 - Chronic management",
//     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBP-bZleLraRCUQ1b-quY92wPbROzyh3G9SfUJ1gOd8H-26_mYP-yqVPdzoIn3NLmtrem-zRT1LOCDwDxNysfu8I8uMfMuV-E_pOnJ1mvHaZvaxmBOdmJfP-Qz7HhHrrIylsqMCj5vngUmG2UfoNOcVWtlG8yZtQfvVPIdJtHj4xp-S7MmcJuQ2kbTumkPN42rb-GLRQuwzIYLzlr9aIqK4WRudR-4peZl9aUHoCXVGaZILcBnDDwBHvZ82E4kMQV42KAGDTpzPeu8U",
//     address: { street: "74 Maple Ave", city: "Lincoln", state: "NE", zip: "68501" },
//     medical: {
//       bloodGroup: "A Positive (A+)",
//       conditions: "Type 2 Diabetes, COPD",
//       allergies: ["Sulfa Drugs"],
//       history: "COPD diagnosed 2018. Type 2 Diabetes managed since 2016. Knee replacement surgery 2021. Regular pulmonology follow-ups.",
//     },
//     emergency: { name: "Margaret Vance", relationship: "Spouse", phone: "+1 (555) 234-5678" },
//   },
//   {
//     id: 3,
//     name: "Marcus Chen",
//     age: 29,
//     gender: "Male",
//     status: "Discharged",
//     statusColor: { bg: `${colors.outline}15`, color: colors.outline },
//     lastVisit: "Aug 30, 2023 - Recovery complete",
//     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCq9lSFTDJii-JzAA6YcYUdB2IX8_U2u950TlImmNskfbgVfbM9zHDMMv00O1vZWqdCcvk23w4wpOBMG2XKevPREUMmEA97-vZB-RkwPW68HAttGJerPWXBGv638Ia4TCBm3K12V6Tk19YQMmaS7KVNvaUwWrf315iX6X_JDhaQ7pBE81TH3Na11ysvoh41ohdhk_BGiTSPUyVMHzwVaaB5TJYMCU_m5CePmYFgitVjaWn_OCe7g9WVZsdVTDU3vyItHZosWeI33fBL",
//     address: { street: "892 Pine Street, Suite 10", city: "Portland", state: "OR", zip: "97201" },
//     medical: {
//       bloodGroup: "B Negative (B-)",
//       conditions: "Recovered from Pneumonia",
//       allergies: [],
//       history: "Hospitalized Oct 2023 for community-acquired pneumonia. Full recovery. No chronic conditions. Non-smoker.",
//     },
//     emergency: { name: "Linda Chen", relationship: "Mother", phone: "+1 (555) 876-5432" },
//   },
//   {
//     id: 4,
//     name: "Priya Nair",
//     age: 35,
//     gender: "Female",
//     status: "Active",
//     statusColor: { bg: `${colors.primary}15`, color: colors.primary },
//     lastVisit: "Oct 18, 2023 - Dermatology consult",
//     img: null,
//     address: { street: "12 Cedar Blvd", city: "Austin", state: "TX", zip: "73301" },
//     medical: {
//       bloodGroup: "AB Positive (AB+)",
//       conditions: "Eczema, Seasonal Allergies",
//       allergies: ["Peanuts", "Aspirin"],
//       history: "Chronic eczema since childhood. Seasonal allergic rhinitis. No surgeries. Family history of atopic disease.",
//     },
//     emergency: { name: "Raj Nair", relationship: "Spouse", phone: "+1 (555) 321-0987" },
//   },
//   {
//     id: 5,
//     name: "James Holden",
//     age: 55,
//     gender: "Male",
//     status: "Follow-up",
//     statusColor: { bg: `${colors.tertiary}15`, color: colors.tertiary },
//     lastVisit: "Oct 10, 2023 - Cardiology review",
//     img: null,
//     address: { street: "500 Westfield Drive", city: "Columbus", state: "OH", zip: "43085" },
//     medical: {
//       bloodGroup: "O Negative (O-)",
//       conditions: "Atrial Fibrillation, Hyperlipidemia",
//       allergies: ["ACE Inhibitors"],
//       history: "Atrial fibrillation diagnosed 2021, managed with Warfarin. Hyperlipidemia since 2019. No prior cardiac surgery.",
//     },
//     emergency: { name: "Susan Holden", relationship: "Spouse", phone: "+1 (555) 654-3210" },
//   },
//   {
//     id: 6,
//     name: "Sofia Martin",
//     age: 23,
//     gender: "Female",
//     status: "Discharged",
//     statusColor: { bg: `${colors.outline}15`, color: colors.outline },
//     lastVisit: "Sep 28, 2023 - Minor fracture follow-up",
//     img: null,
//     address: { street: "7 Riverside Walk", city: "Denver", state: "CO", zip: "80201" },
//     medical: {
//       bloodGroup: "A Negative (A-)",
//       conditions: "Healed hairline fracture",
//       allergies: [],
//       history: "Hairline fracture of right wrist, Sep 2023. Fully healed. No prior surgeries or chronic illnesses.",
//     },
//     emergency: { name: "Ana Martin", relationship: "Mother", phone: "+1 (555) 789-0123" },
//   },
// ];



export default function PatientManagement() {
  const [selectedId,    setSelectedId]    = useState();
  const [prescribeFor,  setPrescribeFor]  = useState(null);
    const [loading, setLoading] = useState(true)
  const [PATIENTS, setData] = useState([])
  async function getData() {
    setLoading(true)
    try{
        const res = await apiCall('/doctor/patient', "GET")
        if(res.success){
          setData(res?.data?.patientList)
          setSelectedId(res?.data?.patientList[0]?._id)
        }
    }catch(err){

    }

    setLoading(false)
  }
// console.log(data)
  useEffect(()=>{
    getData()
  },[])

  const selected = PATIENTS.find((p) => p.id === selectedId) || PATIENTS[0];

  if(loading) return <LoadingSpinner/>

  return (
    <>
      <style>{`
        body { font-family: 'Inter', sans-serif; background: ${colors.surface}; }
        textarea { resize: none; }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 0.7s linear infinite; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: ${colors.outlineVariant}; border-radius: 4px; }
        @media (max-width: 768px) { .main-offset { margin-left: 0 !important; } }
      `}</style>

      <main
        className="main-offset min-h-screen"
        style={{ background: colors.surface, fontFamily: "Inter" }}
      >
        <div className="p-6 md:p-8 max-w-7xl mx-auto">

          {/* ── Page header ── */}
          <div className="mb-8">
            <h2
              className="text-2xl md:text-3xl font-extrabold tracking-tight"
              style={{ fontFamily: "Manrope", color: colors.onSurface }}
            >
              Patient Management
            </h2>
            <p className="text-sm mt-1" style={{ color: colors.onSurfaceVariant }}>
              Reviewing active treatments and historical clinical records.
            </p>
          </div>

          {/* ── Two-column grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT: patient card list (2–3 column grid) */}
            {/* <div className="lg:col-span-7 xl:col-span-8"> */}
              {/* <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4"> */}
                {PATIENTS.map((p) => (
                  <PatientCard
                    key={p._id}
                    patient={p}
                    isSelected={p._id === selectedId}
                    onClick={() => setSelectedId(p.id)}
                    onPrescribe={(pt) => setPrescribeFor(pt)}
                  />
                ))}
              {/* </div> */}
            {/* </div> */}

            {/* RIGHT: patient detail panel */}
            {/* <div className="lg:col-span-5 xl:col-span-4">
              <PatientDetail
                patient={selected}
                onPrescribe={() => setPrescribeFor(selected)}
              />
            </div> */}
          </div>
        </div>
      </main>

      {/* Prescription modal */}
      {prescribeFor && (
        <PrescriptionModal
          patient={prescribeFor}
          onClose={() => setPrescribeFor(null)}
        />
      )}
    </>
  );
}