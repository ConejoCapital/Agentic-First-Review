import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a2540 0%, #1a1068 40%, #3d2b8c 70%, #1b6b6d 100%)",
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                backgroundColor: "#635bff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
              }}
            >
              ✦
            </div>
            <span
              style={{
                fontSize: "48px",
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Agentic-First SEO
            </span>
          </div>

          <p
            style={{
              fontSize: "28px",
              color: "rgba(255,255,255,0.7)",
              textAlign: "center",
              maxWidth: "700px",
            }}
          >
            Is your website ready for the AI agent era?
          </p>

          <div
            style={{
              display: "flex",
              gap: "32px",
              marginTop: "16px",
            }}
          >
            {["100 Personas", "10 Categories", "5 Waves"].map((text) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 20px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
              >
                <span style={{ color: "#00d4aa", fontSize: "16px" }}>●</span>
                <span style={{ color: "#ffffff", fontSize: "18px" }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
