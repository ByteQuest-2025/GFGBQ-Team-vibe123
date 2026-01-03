export default function VoteMotor() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #F4FFF8 0%, #E8FFF2 100%)",
      }}
    >
      <div className="bg-white rounded-2xl shadow-lg px-10 py-8 text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Limited Hand Movement Voting
        </h1>

        <p className="text-xl text-gray-600">
          This mode supports keyboard-only
          <br />
          and minimal interaction voting.
        </p>

        <p className="mt-6 text-gray-500">
          (Customization coming next)
        </p>
      </div>
    </div>
  );
}
