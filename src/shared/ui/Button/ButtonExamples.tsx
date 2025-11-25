"use client";

import { Button } from "./Button";

export function ButtonExamples() {
  return (
    <div
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Types */}
      <section>
        <h2>Button Types</h2>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Button type="primary">Primary</Button>
          <Button type="default">Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="text">Text</Button>
          <Button type="link">Link</Button>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h2>Button Sizes</h2>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Button size="large">Large</Button>
          <Button size="default">Default</Button>
          <Button size="small">Small</Button>
        </div>
      </section>

      {/* Shapes */}
      <section>
        <h2>Button Shapes</h2>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Button shape="default">Default</Button>
          <Button shape="round">Round</Button>
          <Button shape="circle" icon={<span>+</span>} />
        </div>
      </section>

      {/* States */}
      <section>
        <h2>Button States</h2>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button danger type="primary">
            Danger Primary
          </Button>
          <Button danger>Danger Default</Button>
          <Button ghost type="primary">
            Ghost Primary
          </Button>
          <Button block>Block Button</Button>
        </div>
      </section>

      {/* With Icons */}
      <section>
        <h2>Buttons with Icons</h2>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Button type="primary" icon={<span>🚀</span>}>
            Launch
          </Button>
          <Button icon={<span>⚙️</span>}>Settings</Button>
          <Button shape="circle" icon={<span>+</span>} />
        </div>
      </section>

      {/* As Links */}
      <section>
        <h2>Button as Link</h2>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button type="primary" href="https://example.com" target="_blank">
            External Link
          </Button>
          <Button type="link" href="https://example.com">
            Link Style
          </Button>
        </div>
      </section>

      {/* Combined */}
      <section>
        <h2>Combined Props</h2>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Button type="primary" size="large" shape="round">
            Large Round Primary
          </Button>
          <Button type="primary" danger size="small">
            Small Danger
          </Button>
          <Button ghost type="primary" icon={<span>👻</span>}>
            Ghost with Icon
          </Button>
        </div>
      </section>
    </div>
  );
}
