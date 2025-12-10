/**
 * Example Component demonstrating CSS Dark Theme usage
 * Sử dụng các CSS variables từ variables.css
 */

import './ThemeExample.css';

export function ThemeExample() {
  return (
    <div className="theme-example">
      <div className="theme-card">
        <h2 className="theme-title">Dark Theme Example</h2>
        <p className="theme-description">
          Component này sử dụng CSS variables từ variables.css. Theme tự động
          thay đổi khi toggle dark/light mode.
        </p>

        <div className="theme-colors">
          <div className="color-box bg-primary">
            <span>Primary BG</span>
          </div>
          <div className="color-box bg-secondary">
            <span>Secondary BG</span>
          </div>
          <div className="color-box bg-tertiary">
            <span>Tertiary BG</span>
          </div>
        </div>

        <div className="theme-status">
          <div className="status-item status-success">Success</div>
          <div className="status-item status-error">Error</div>
          <div className="status-item status-warning">Warning</div>
          <div className="status-item status-info">Info</div>
        </div>

        <div className="theme-input-group">
          <input
            type="text"
            className="theme-input"
            placeholder="Input example..."
          />
          <button className="theme-button">Submit</button>
        </div>
      </div>
    </div>
  );
}
