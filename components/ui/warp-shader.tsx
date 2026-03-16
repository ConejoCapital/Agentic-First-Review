"use client";

import { Warp } from "@paper-design/shaders-react";

export default function WarpShaderHero() {
  return (
    <div className="absolute inset-0">
      <Warp
        style={{ height: "100%", width: "100%" }}
        proportion={0.45}
        softness={1}
        distortion={0.25}
        swirl={0.8}
        swirlIterations={10}
        shape="checks"
        shapeScale={0.1}
        scale={1}
        rotation={0}
        speed={1}
        colors={[
          "hsl(220, 80%, 15%)",
          "hsl(260, 60%, 30%)",
          "hsl(280, 50%, 35%)",
          "hsl(170, 80%, 30%)",
        ]}
      />
    </div>
  );
}
