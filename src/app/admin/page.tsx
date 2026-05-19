export default function Admin() {
  return (
    <div>
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Overview of your portfolio performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h2 className="text-gray-400 text-sm">Projects</h2>
          <p className="text-3xl font-bold mt-2">3</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h2 className="text-gray-400 text-sm">Visitors</h2>
          <p className="text-3xl font-bold mt-2">1,204</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h2 className="text-gray-400 text-sm">Messages</h2>
          <p className="text-3xl font-bold mt-2">8</p>
        </div>

      </div>

    </div>
  );
}