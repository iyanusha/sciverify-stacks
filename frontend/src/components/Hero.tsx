"use client";

import { useWallet } from "@/hooks/useWallet";

export default function Hero() {
  const { isConnected, connect } = useWallet();

  return (
    <section className="relative bg-white pt-20 pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full bg-accent-50 px-4 py-1.5 text-sm font-medium text-accent-700 mb-6">
            Powered by Stacks Blockchain
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Transparent Scientific
            <span className="block text-accent-600">Publication Verification</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Submit, verify, and review scientific publications on-chain.
            Decentralized peer review with reputation tracking and
            governance.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {!isConnected ? (
              <button
                onClick={connect}
                className="rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent-700"
              >
                Connect Wallet
              </button>
            ) : (
              <a
                href="#publications"
                className="rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent-700"
              >
                Submit Publication
              </a>
            )}
            <a
              href="#how-it-works"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              How it works &rarr;
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-accent-600">Blind</div>
            <div className="mt-1 text-sm text-gray-600">Peer Review</div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-accent-600">On-Chain</div>
            <div className="mt-1 text-sm text-gray-600">Verification</div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-accent-600">Token</div>
            <div className="mt-1 text-sm text-gray-600">Reputation</div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-accent-600">DAO</div>
            <div className="mt-1 text-sm text-gray-600">Governance</div>
          </div>
        </div>
      </div>
    </section>
  );
}
