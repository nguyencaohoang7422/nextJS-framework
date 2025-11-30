'use client';

import { Input } from '@/shared/ui';

export function InputExamples() {
  return (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* Basic */}
      <section>
        <h2>Basic Input</h2>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexDirection: 'column',
            maxWidth: '300px',
          }}
        >
          <Input placeholder="Basic usage" />
        </div>
      </section>

      {/* Types */}
      <section>
        <h2>Input Types</h2>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexDirection: 'column',
            maxWidth: '300px',
          }}
        >
          <Input type="text" placeholder="Text input" />
          <Input type="email" placeholder="Email input" />
          <Input type="password" placeholder="Password input" />
          <Input type="number" placeholder="Number input" />
        </div>
      </section>

      {/* States */}
      <section>
        <h2>Input States</h2>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexDirection: 'column',
            maxWidth: '300px',
          }}
        >
          <Input disabled placeholder="Disabled input" />
          <Input
            className="border-destructive"
            placeholder="Error state (custom class)"
          />
        </div>
      </section>

      {/* With Icon (using wrapper) */}
      <section>
        <h2>With Icon (Custom Wrapper)</h2>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexDirection: 'column',
            maxWidth: '300px',
          }}
        >
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              👤
            </span>
            <Input className="pl-10" placeholder="Username" />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              🔒
            </span>
            <Input className="pl-10" type="password" placeholder="Password" />
          </div>
        </div>
      </section>

      {/* Full Width */}
      <section>
        <h2>Full Width Input</h2>
        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
          <Input className="w-full" placeholder="Full width input" />
        </div>
      </section>
    </div>
  );
}
