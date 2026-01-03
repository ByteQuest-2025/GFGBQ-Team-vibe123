export default function VoteStandard() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #F9FAFB 0%, #F1F5F9 100%)",
      }}
    >
      <div className="bg-white rounded-2xl shadow-lg px-10 py-8 text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Standard Voting
        </h1>

        <p className="text-xl text-gray-600">
          This is the default voting experience
          <br />
          with accessible best practices.
        </p>

        <p className="mt-6 text-gray-500">
          (Customization coming next)
        </p>
      </div>
    </div>
  );
}
