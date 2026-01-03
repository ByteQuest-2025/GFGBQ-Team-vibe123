export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-6">
      <h1
        className="text-4xl font-bold mb-4"
        tabIndex="0"
        aria-label="VoteAble Accessible Voting Platform"
      >
        VoteAble
      </h1>

      <p
        className="text-lg text-center max-w-xl mb-6"
        tabIndex="0"
      >
        An inclusive and accessible digital voting platform empowering
        specially abled citizens to vote independently and securely.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          className="bg-white text-black py-3 rounded-xl text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-yellow-400"
        >
          Start Voting
        </button>

        <button
          className="border border-white py-3 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
        >
          Enable Voice Mode
        </button>

        <button
          className="border border-white py-3 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
        >
          High Contrast Mode
        </button>
      </div>
    </main>
  );
}
