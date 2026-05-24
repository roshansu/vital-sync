import { colors } from "../../constant/style";
import Icon from "../appointment/Icon";
import { useState } from "react";
import DetailRow from "./DetailRow";
import Collapsible from "./Collapsible";

export default function PatientCard({
  patient,
  isSelected,
  onClick,
  onPrescribe,
}) {
  const [hovered, setHovered] = useState(false);

  const initials = patient.userId.firstName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl p-6 border transition-all duration-300 cursor-pointer flex flex-col gap-5"
      style={{
        background:
          isSelected || hovered
            ? colors.surfaceContainerLowest
            : `${colors.surfaceContainerLowest}95`,

        borderColor: isSelected
          ? `${colors.primary}40`
          : `${colors.outlineVariant}40`,

        boxShadow: isSelected
          ? "0 12px 32px rgba(0,74,198,0.12)"
          : hovered
            ? "0 8px 24px rgba(15,23,42,0.08)"
            : "0 2px 8px rgba(15,23,42,0.04)",

        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}>
      {/* Top Section */}
      <div className="flex gap-4">
        {/* Profile */}
        {patient.userId?.imageUrl ? (
          <img
            src={patient.userId.imageUrl}
            alt={patient.userId.firstName}
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl object-cover flex-shrink-0"
          />
        ) : (
          <div
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
              color: colors.onPrimary,
              fontFamily: "Manrope",
            }}>
            {initials}
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3
              className="text-lg lg:text-xl font-bold truncate"
              style={{
                fontFamily: "Manrope",
                color: colors.onSurface,
              }}>
              {patient?.userId?.firstName}
            </h3>

            <span
              className="text-[11px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
              style={{
                background: `${colors.primary}15`,
                color: colors.primary,
              }}>
              Approved
            </span>
          </div>

          <p
            className="text-sm lg:text-base mt-1"
            style={{
              color: colors.onSurfaceVariant,
            }}>
            {patient?.userId?.dob} · {patient?.userId?.gender}
          </p>

          {/* <p
            className="text-xs lg:text-sm italic mt-2 truncate"
            style={{
              color: `${colors.onSurfaceVariant}90`,
            }}>
            Last Visit: {patient.lastVisit}
          </p> */}
        </div>
      </div>
        <div className="flex gap-3 ">
        {/* Prescription Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrescribe(patient);
          }}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{
            background: isSelected
              ? `${colors.primary}15`
              : colors.surfaceContainerLow,

            color: isSelected ? colors.primary : colors.onSurfaceVariant,

            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`;

            e.currentTarget.style.color = colors.onPrimary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isSelected
              ? `${colors.primary}15`
              : colors.surfaceContainerLow;

            e.currentTarget.style.color = isSelected
              ? colors.primary
              : colors.onSurfaceVariant;
          }}>
          <Icon name="prescriptions" size={16} color="inherit" />
          Add Prescription
        </button>
      </div>

      <Collapsible
        icon="location_on"
        title="Address"
        iconBg={colors.surfaceContainerHigh}
        iconColor={colors.onSurfaceVariant}>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <DetailRow label="Street" value={patient?.address?.street} />
          </div>
          <DetailRow label="City" value={patient?.address?.city} />
          <DetailRow label="State" value={patient?.address?.state} />
          <DetailRow label="ZIP" value={patient?.address?.postalCode} />
        </div>
      </Collapsible>

      {/* Medical Information */}
      <Collapsible
        icon="vital_signs"
        title="Medical Information"
        iconBg={colors.tertiaryFixed}
        iconColor={colors.tertiary}
        defaultOpen>
        <div className="space-y-3">
          <DetailRow label="Blood Group" value={patient?.blood} />
          <DetailRow
            label="Existing Conditions"
            value={patient?.medicalInfo?.conditions}
          />
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: "#94a3b8" }}>
              Known Allergies
            </p>
            {patient?.medicalInfo?.allergies?.length === 0 ? (
              <p
                className="text-sm font-medium"
                style={{ color: colors.onSurface }}>
                None reported
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {patient?.medicalInfo?.allergies?.map((a) => (
                  <span
                    key={a}
                    className="px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: colors.errorContainer,
                      color: colors.error,
                    }}>
                    {a}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: "#94a3b8" }}>
              Medical History
            </p>
            <p
              className="text-xs leading-relaxed"
              style={{ color: colors.onSurface }}>
              {patient?.medicalInfo?.medicalHistory}
            </p>
          </div>
        </div>
      </Collapsible>

      {/* Emergency Contact */}
      <Collapsible
        icon="emergency"
        title="Emergency Contact"
        iconBg={colors.errorContainer}
        iconColor={colors.error}>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <DetailRow label="Contact Name" value={patient?.emergancyContact?.name} />
          </div>
          <DetailRow
            label="Relationship"
            value={patient?.emergancyContact?.relation}
          />
          <DetailRow label="Phone" value={patient?.emergancyContact?.phone} />
        </div>
      </Collapsible>

      {/* Actions */}

    </div>
  );
}
