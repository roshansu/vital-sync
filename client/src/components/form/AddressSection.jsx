import { colors } from "../../constant/style";
import DashIcon from "../DashIcon";
import TextInput from './TextInput'
import FieldLabel from './FieldLabel'

export default function AddressSection({ visible, address, setAddress }) {
  return (
    <div
      style={{
        overflow: "hidden",
        maxHeight: visible ? 400 : 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-10px)",
        transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, transform 0.3s ease",
        marginBottom: visible ? 32 : 0,
        transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, transform 0.3s ease, margin-bottom 0.3s ease",
      }}
    >
      <div
        style={{
          background: `${colors.surfaceContainerLow}99`,
          borderRadius: 14,
          padding: 24,
          border: `1px solid ${colors.primaryFixed}`,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: colors.primaryFixed,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DashIcon name="home_pin" size={17} color={colors.primaryContainer} />
          </div>
          <div>
            <h3
              style={{
                fontFamily: "Manrope",
                fontWeight: 700,
                fontSize: 15,
                color: colors.onSurface,
                lineHeight: 1.2,
              }}
            >
              Home Visit Address
            </h3>
            <p style={{ fontSize: 11, color: colors.onSurfaceVariant, marginTop: 1 }}>
              Our doctor will visit you at this address
            </p>
          </div>
        </div>

        {/* Fields grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Address line */}
          <div>
            <FieldLabel>Address Line</FieldLabel>
            <TextInput
              placeholder="123 Clinical Way, Apt 4B"
              value={address.line}
              onChange={(e) => setAddress((p) => ({ ...p, line: e.target.value }))}
            />
          </div>

          {/* City + State + Pincode row */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12 }}>
            <div>
              <FieldLabel>City</FieldLabel>
              <TextInput
                placeholder="New York"
                value={address.city}
                onChange={(e) => setAddress((p) => ({ ...p, city: e.target.value }))}
              />
            </div>
            <div>
              <FieldLabel>State</FieldLabel>
              <TextInput
                placeholder="NY"
                value={address.state}
                onChange={(e) => setAddress((p) => ({ ...p, state: e.target.value }))}
              />
            </div>
            <div>
              <FieldLabel>Pincode</FieldLabel>
              <TextInput
                placeholder="10001"
                value={address.pincode}
                onChange={(e) => setAddress((p) => ({ ...p, pincode: e.target.value }))}
              />
            </div>
          </div>

          {/* Landmark */}
          <div>
            <FieldLabel>Landmark (optional)</FieldLabel>
            <TextInput
              placeholder="Near Central Park, opposite Starbucks"
              value={address.landmark}
              onChange={(e) => setAddress((p) => ({ ...p, landmark: e.target.value }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}