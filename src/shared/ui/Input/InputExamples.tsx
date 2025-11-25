"use client";

import { Input } from "./Input";

export function InputExamples() {
  return (
    <div
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Basic */}
      <section>
        <h2>Basic Input</h2>
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexDirection: "column",
            maxWidth: "300px",
          }}
        >
          <Input placeholder="Basic usage" />
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h2>Input Sizes</h2>
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexDirection: "column",
            maxWidth: "300px",
          }}
        >
          <Input size="large" placeholder="Large size" />
          <Input size="default" placeholder="Default size" />
          <Input size="small" placeholder="Small size" />
        </div>
      </section>

      {/* States */}
      <section>
        <h2>Input States</h2>
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexDirection: "column",
            maxWidth: "300px",
          }}
        >
          <Input disabled placeholder="Disabled input" />
          <Input error placeholder="Error state" />
        </div>
      </section>

      {/* With Icon */}
      <section>
        <h2>With Icon</h2>
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexDirection: "column",
            maxWidth: "300px",
          }}
        >
          <Input icon={<span>👤</span>} placeholder="Username" />
          <Input
            icon={<span>🔒</span>}
            type="password"
            placeholder="Password"
          />
        </div>
      </section>

      {/* Block */}
      <section>
        <h2>Block Input</h2>
        <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
          <Input block placeholder="Block input (full width)" />
        </div>
      </section>
    </div>
  );
}
