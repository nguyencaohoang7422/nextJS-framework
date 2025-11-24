export default function ReportsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Reports</h1>
      <p className="text-gray-600">
        This page requires authentication. You can only access it when logged
        in.
      </p>

      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h2 className="font-semibold text-green-900 mb-2">Protected Route</h2>
        <p className="text-sm text-green-700">
          This page is protected by middleware. If you&apos;re not logged in,
          you&apos;ll be redirected to /login.
        </p>
      </div>
    </div>
  );
}
