import { useEffect } from "react";

export const useVersionCheck = () => {
  useEffect(() => {
    return;
    const checkVersion = async () => {
      try {
        const response = await fetch("/version.json?t=" + new Date().getTime());
        if (!response.ok) return;

        const data = await response.json();
        const latestVersion = data.version;
        const currentVersion = localStorage.getItem("app_version");

        if (currentVersion && latestVersion !== currentVersion) {
          // Version changed
          console.log("New version detected:", latestVersion);

          // Clear cache
          localStorage.clear();
          sessionStorage.clear();

          // Update version
          localStorage.setItem("app_version", latestVersion);

          // Reload page
          window.location.reload();
        } else if (!currentVersion) {
          // First load, set version
          localStorage.setItem("app_version", latestVersion);
        }
      } catch (error) {
        console.error("Failed to check version:", error);
      }
    };

    // Check on mount
    checkVersion();

    // Optional: Check periodically or on visibility change
    const interval = setInterval(checkVersion, 60 * 1000); // Check every minute

    return () => clearInterval(interval);
  }, []);
};
