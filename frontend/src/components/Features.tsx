const features = [
  {
    title: "Publication Registry",
    description:
      "Register scientific papers with IPFS content hashes. Track submission status from review to publication.",
    icon: "📄",
  },
  {
    title: "Blind Peer Review",
    description:
      "Anonymous review protocol with ZK proof support. Prevents bias while maintaining accountability.",
    icon: "🔬",
  },
  {
    title: "Credential Verification",
    description:
      "On-chain verification of academic credentials. Role-based access for researchers and reviewers.",
    icon: "🎓",
  },
  {
    title: "Reputation Tokens",
    description:
      "SIP-010 compliant tokens track reviewer reputation across research categories.",
    icon: "⭐",
  },
  {
    title: "DAO Governance",
    description:
      "Token-weighted voting for protocol decisions. Community-driven parameter updates.",
    icon: "🏛️",
  },
  {
    title: "Bitcoin Settlement",
    description:
      "All verifications settle on Bitcoin through Stacks for maximum security.",
    icon: "₿",
  },
];

export default function Features() {
  return (
    <section id="how-it-works" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            How SciVerify Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            End-to-end scientific verification on blockchain
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-md transition-shadow"
            >
              <div className="text-3xl">{feature.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
