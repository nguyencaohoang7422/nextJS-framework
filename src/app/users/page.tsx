export default function UsersPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <p className="text-gray-600">
        This page requires authentication. You can only access it when logged
        in.
      </p>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="font-semibold text-blue-900 mb-2">Protected Route</h2>
        <p className="text-sm text-blue-700">
          This page is protected by middleware. If you&apos;re not logged in,
          you&apos;ll be redirected to /login.
        </p>
      </div>
    </div>
  );
}
