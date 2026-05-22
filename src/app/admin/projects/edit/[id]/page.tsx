import { supabase } from "@/lib/supabase";
import EditProjectForm from "@/components/admin/EditProjectForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProjectPage({
  params,
}: Props) {

  const { id } = await params;

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) {
    return (
      <div className="text-white p-10">
        Project not found
      </div>
    );
  }

  return (
    <div className="max-w-3xl">

      <h1 className="text-4xl font-bold mb-10">
        Edit Project
      </h1>

      <EditProjectForm project={project} />

    </div>
  );
}