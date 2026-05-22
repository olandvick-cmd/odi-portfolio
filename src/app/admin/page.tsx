import DashboardCards from "@/components/admin/DashboardCards";

export default function AdminPage() {
  return (
    <div className="space-y-10">

      <div>

        <h1 className="text-4xl font-bold mb-3">
          Dashboard
        </h1>

        <p className="text-gray-400">
          Welcome back, Odi.
        </p>

      </div>

      <DashboardCards />

    </div>
  );
}