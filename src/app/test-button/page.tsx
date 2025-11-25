"use client";
import { ButtonExamples } from "@/shared/ui/Button/ButtonExamples";
import { InputExamples } from "@/shared/ui/Input/InputExamples";

export default function ButtonTestPage() {
  return (
    <div>
      <h1 style={{ padding: "24px", fontSize: "32px", fontWeight: "bold" }}>
        Component Examples
      </h1>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}
      >
        <div>
          <h2 style={{ padding: "0 24px", fontSize: "24px" }}>Button</h2>
          <ButtonExamples />
        </div>
        <div>
          <h2 style={{ padding: "0 24px", fontSize: "24px" }}>Input</h2>
          <InputExamples />
        </div>
      </div>
    </div>
  );
}
