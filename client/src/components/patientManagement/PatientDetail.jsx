import {colors} from '../../constant/style'
import DetailRow from './DetailRow'
import Collapsible from './Collapsible'
import Icon from '../appointment/Icon';


export default function PatientDetail({ patient, onPrescribe }) {
  const initials = patient.name.split(" ").map((w) => w[0]).slice(0, 2).join("");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div
        className="rounded-xl p-5 border-l-4"
        style={{
          background: colors.surfaceContainerLowest,
          borderLeftColor: colors.primary,
          boxShadow: "0 2px 12px rgba(25,28,30,0.05)",
        }}
      >
        <div className="flex items-center gap-4 mb-4">
          {patient.img ? (
            <img src={patient.img} alt={patient.name}
              className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
          ) : (
            <div className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`, color: colors.onPrimary, fontFamily: "Manrope" }}>
              {initials}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold" style={{ fontFamily: "Manrope", color: colors.onSurface }}>
                {patient.name}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: patient.statusColor.bg, color: patient.statusColor.color }}>
                {patient.status}
              </span>
            </div>
            <p className="text-sm" style={{ color: colors.onSurfaceVariant }}>
              {patient.age} yrs · {patient.gender}
            </p>
            <p className="text-xs italic mt-0.5" style={{ color: `${colors.onSurfaceVariant}90` }}>
              {patient.lastVisit}
            </p>
          </div>
        </div>
        <button
          onClick={onPrescribe}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98]"
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
            color: colors.onPrimary,
            border: "none",
            cursor: "pointer",
            fontFamily: "Manrope",
            boxShadow: `0 4px 12px ${colors.primary}25`,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.92")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <Icon name="prescriptions" size={18} color={colors.onPrimary} />
          Add Prescription
        </button>
      </div>

      {/* Address */}
      <Collapsible icon="location_on" title="Address" iconBg={colors.surfaceContainerHigh} iconColor={colors.onSurfaceVariant}>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2"><DetailRow label="Street" value={patient.address.street} /></div>
          <DetailRow label="City"  value={patient.address.city}  />
          <DetailRow label="State" value={patient.address.state} />
          <DetailRow label="ZIP"   value={patient.address.zip}   />
        </div>
      </Collapsible>

      {/* Medical Information */}
      <Collapsible icon="vital_signs" title="Medical Information" iconBg={colors.tertiaryFixed} iconColor={colors.tertiary} defaultOpen>
        <div className="space-y-3">
          <DetailRow label="Blood Group"           value={patient.medical.bloodGroup}  />
          <DetailRow label="Existing Conditions"   value={patient.medical.conditions}  />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "#94a3b8" }}>
              Known Allergies
            </p>
            {patient.medical.allergies.length === 0 ? (
              <p className="text-sm font-medium" style={{ color: colors.onSurface }}>None reported</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {patient.medical.allergies.map((a) => (
                  <span key={a} className="px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{ background: colors.errorContainer, color: colors.error }}>
                    {a}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "#94a3b8" }}>
              Medical History
            </p>
            <p className="text-xs leading-relaxed" style={{ color: colors.onSurface }}>
              {patient.medical.history}
            </p>
          </div>
        </div>
      </Collapsible>

      {/* Emergency Contact */}
      <Collapsible icon="emergency" title="Emergency Contact" iconBg={colors.errorContainer} iconColor={colors.error}>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2"><DetailRow label="Contact Name"  value={patient.emergency.name}         /></div>
          <DetailRow label="Relationship" value={patient.emergency.relationship} />
          <DetailRow label="Phone"        value={patient.emergency.phone}        />
        </div>
      </Collapsible>
    </div>
  );
}