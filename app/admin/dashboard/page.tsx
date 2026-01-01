export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Overview of platform activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-primary/50 bg-card p-5 shadow-lg">
          <h2 className="text-sm font-medium text-muted-foreground">
            Total Users
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-primary">
            —
          </p>
        </div>

        <div className="rounded-2xl border border-primary/50 bg-card p-5 shadow-lg">
          <h2 className="text-sm font-medium text-muted-foreground">
            Total Plans
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-primary">
            —
          </p>
        </div>
      </div>
    </div>
  );
}
