import { supabase } from "@/lib/supabase";

export default async function TestPage() {

  const { data, error } = await supabase
    .from("projects")
    .select("*");

  console.log(data, error);

  return (
    <div className="text-white p-10">
      Check console for Supabase data.
    </div>
  );
}