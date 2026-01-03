export default function VoteHearing() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #F7FAFF 0%, #EEF3FF 100%)",
      }}
    >
      <div className="bg-white rounded-2xl shadow-lg px-10 py-8 text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Hearing / Speech Impaired Voting
        </h1>

        <p className="text-xl text-gray-600">
          This voting mode is designed with
          <br />
          clear visual instructions and confirmations.
        </p>

        <p className="mt-6 text-gray-500">
          (Customization coming next)
        </p>
      </div>
    </div>
  );
}
