"use client";

import { LoadingContainer, Spinner } from "@/shared/components/Loading";
import { loading } from "@/shared/lib/loading";
import { useState } from "react";

/**
 * Loading Demo Page
 * Demonstrates all loading features
 */
export default function LoadingDemoPage() {
  const [containerLoading, setContainerLoading] = useState(false);

  const simulateFullLoading = () => {
    loading.showFull("Đang xử lý toàn bộ trang...");
    setTimeout(() => {
      loading.hideFull();
    }, 3000);
  };

  const simulateMainLoading = () => {
    loading.showMain("Đang tải dữ liệu...");
    setTimeout(() => {
      loading.hideMain();
    }, 3000);
  };

  const simulateContainerLoading = () => {
    setContainerLoading(true);
    setTimeout(() => {
      setContainerLoading(false);
    }, 3000);
  };

  return (
    <div className="container" style={{ padding: "2rem" }}>
      <h1
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}
      >
        Loading System Demo
      </h1>

      {/* Full Page Loading */}
      <section className="card" style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            marginBottom: "1rem",
          }}
        >
          1. Full Page Loading
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
          Covers the entire page with a loading overlay. Use for login, logout,
          route transitions.
        </p>
        <button className="btn btn-primary" onClick={simulateFullLoading}>
          Show Full Page Loading (3s)
        </button>
      </section>

      {/* Main Content Loading */}
      <section className="card" style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            marginBottom: "1rem",
          }}
        >
          2. Main Content Loading
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
          Covers only the main content area. Use for data fetching, form
          submissions.
        </p>
        <button className="btn btn-primary" onClick={simulateMainLoading}>
          Show Main Loading (3s)
        </button>
      </section>

      {/* Loading Container */}
      <section className="card" style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            marginBottom: "1rem",
          }}
        >
          3. Loading Container
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
          Wrap any component to show loading overlay over that specific area.
        </p>
        <button className="btn btn-primary" onClick={simulateContainerLoading}>
          Show Container Loading (3s)
        </button>

        <LoadingContainer
          isLoading={containerLoading}
          message="Loading container content..."
          type="main"
        >
          <div
            style={{
              marginTop: "1rem",
              padding: "2rem",
              background: "var(--bg-secondary)",
              borderRadius: "var(--border-radius)",
              minHeight: "200px",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              Container Content
            </h3>
            <p style={{ color: "var(--text-secondary)" }}>
              This content will be covered by loading overlay when you click the
              button above.
            </p>
          </div>
        </LoadingContainer>
      </section>

      {/* Spinner Variants */}
      <section className="card" style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            marginBottom: "1rem",
          }}
        >
          4. Spinner Variants
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
          Standalone spinners in different sizes and colors.
        </p>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <Spinner size="sm" />
            <p style={{ marginTop: "0.5rem", fontSize: "0.75rem" }}>Small</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Spinner size="md" />
            <p style={{ marginTop: "0.5rem", fontSize: "0.75rem" }}>Medium</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Spinner size="lg" />
            <p style={{ marginTop: "0.5rem", fontSize: "0.75rem" }}>Large</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Spinner size="md" color="#ef4444" />
            <p style={{ marginTop: "0.5rem", fontSize: "0.75rem" }}>
              Custom Color
            </p>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="card">
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            marginBottom: "1rem",
          }}
        >
          5. Usage Examples
        </h2>

        <div style={{ marginBottom: "1.5rem" }}>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            Full Page Loading
          </h3>
          <pre
            style={{
              background: "var(--bg-tertiary)",
              padding: "1rem",
              borderRadius: "var(--border-radius)",
              overflow: "auto",
              fontSize: "0.875rem",
            }}
          >
            {`import { loading } from "@/shared/lib/loading";

              loading.showFull("Processing...");
              await doSomething();
              loading.hideFull();`}
          </pre>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            Main Content Loading
          </h3>
          <pre
            style={{
              background: "var(--bg-tertiary)",
              padding: "1rem",
              borderRadius: "var(--border-radius)",
              overflow: "auto",
              fontSize: "0.875rem",
            }}
          >
            {`import { loading } from "@/shared/lib/loading";

            loading.showMain("Loading data...");
            const data = await fetchData();
            loading.hideMain();`}
          </pre>
        </div>

        <div>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            With Try/Catch
          </h3>
          <pre
            style={{
              background: "var(--bg-tertiary)",
              padding: "1rem",
              borderRadius: "var(--border-radius)",
              overflow: "auto",
              fontSize: "0.875rem",
            }}
          >
            {`try {
  loading.showMain("Processing...");
  await operation();
} finally {
  loading.hideMain();
}`}
          </pre>
        </div>
      </section>
    </div>
  );
}
