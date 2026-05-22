import { supabase } from "@/lib/supabase";

export default async function MessagesPage() {

  const { data: messages } =
    await supabase
      .from("messages")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  return (
    <div>

      <div className="mb-10">

        <h1 className="text-4xl font-bold mb-3">
          Messages
        </h1>

        <p className="text-gray-400">
          Contact form submissions.
        </p>

      </div>

      <div className="space-y-6">

        {messages?.map((message) => (

          <div
            key={message.id}
            className="bg-white/[0.03] border border-white/10 rounded-[30px] p-8"
          >

            <div className="flex items-center justify-between gap-6 mb-6">

              <div>

                <h3 className="text-2xl font-semibold">
                  {message.name}
                </h3>

                <p className="text-gray-500">
                  {message.email}
                </p>

              </div>

              <p className="text-sm text-gray-500">
                {new Date(
                  message.created_at
                ).toLocaleDateString()}
              </p>

            </div>

            <p className="text-gray-300 leading-relaxed">
              {message.message}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}