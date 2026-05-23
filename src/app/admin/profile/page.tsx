import { supabase } from "@/lib/supabase";
import EditProfileForm from "@/components/admin/EditProfileForm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminProfilePage() {
  // Pull your single configuration profile record row
  const { data: profile } = await supabase
    .from("profile_settings")
    .select("*")
    .maybeSingle(); // Prevents breaking if the row is empty initially

  return (
    <div className="space-y-8 p-6 md:p-10 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Profile Configurations</h1>
        <p className="text-gray-400 text-sm mt-1">
          Update your public portfolio hero avatar picture and your downloadable resume file.
        </p>
      </div>

      <EditProfileForm profile={profile || {}} />
    </div>
  );
}