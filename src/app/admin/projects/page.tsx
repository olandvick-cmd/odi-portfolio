import AddProjectForm from "@/components/admin/AddProjectForm";

export default function AdminProjects() {
  return (
    <div>
      
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Projects
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your portfolio projects
        </p>
      </div>

      <div className="max-w-2xl">
        <AddProjectForm />
      </div>

    </div>
  );
}