'use client';

import { Loader2 } from 'lucide-react';

import { Button } from '@/shared/ui';

export function ButtonExamples() {
  return (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* Variants */}
      <section>
        <h2>Button Variants</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h2>Button Sizes</h2>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Button size="lg">Large</Button>
          <Button size="default">Default</Button>
          <Button size="sm">Small</Button>
          <Button size="icon">+</Button>
        </div>
      </section>

      {/* States */}
      <section>
        <h2>Button States</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button disabled>Disabled</Button>
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading
          </Button>
        </div>
      </section>

      {/* With Icons */}
      <section>
        <h2>Buttons with Icons</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button>
            <span className="mr-2">🚀</span>
            Launch
          </Button>
          <Button variant="outline">
            <span className="mr-2">⚙️</span>
            Settings
          </Button>
          <Button size="icon">+</Button>
        </div>
      </section>

      {/* As Links */}
      <section>
        <h2>Button as Link (asChild)</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button asChild>
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              External Link
            </a>
          </Button>
          <Button variant="link" asChild>
            <a href="https://example.com">Link Style</a>
          </Button>
        </div>
      </section>

      {/* Combined */}
      <section>
        <h2>Combined Props</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="default" size="lg" className="rounded-full">
            Large Round
          </Button>
          <Button variant="destructive" size="sm">
            Small Destructive
          </Button>
          <Button variant="ghost">
            <span className="mr-2">👻</span>
            Ghost with Icon
          </Button>
          <Button className="w-full">Full Width Button</Button>
        </div>
      </section>
    </div>
  );
}
