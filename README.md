# SciVerify

A decentralized platform for transparent scientific peer reviews, built on the Stacks blockchain and secured by Bitcoin. SciVerify creates an immutable, fair, and incentive-aligned system for academic publication management, blind peer review, credential verification, and reputation tracking.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Smart Contracts](#smart-contracts)
  - [Publication Registry](#1-publication-registry)
  - [Review Protocol](#2-review-protocol)
  - [Reputation Token](#3-reputation-token)
  - [Credential Verification](#4-credential-verification)
  - [Governance](#5-governance)
  - [Traits](#6-traits)
- [Frontend](#frontend)
  - [Pages](#pages)
  - [Core Components](#core-components)
  - [Key Hooks](#key-hooks)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Smart Contract Development](#smart-contract-development)
  - [Frontend Development](#frontend-development)
  - [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Academic publishing suffers from reviewer bias, lack of transparency, and misaligned incentives. SciVerify addresses these problems by putting the peer review process on-chain:

- **Blind Reviews** — Reviewer identities are hashed until after a decision is made, preventing bias.
- **Multi-Dimensional Scoring** — Reviews rate papers on confidence, technical quality, novelty, and clarity (1–5 each).
- **Non-Transferable Reputation** — SVR tokens track academic reputation and cannot be traded, preventing reputation markets.
- **Credential Verification** — Zero-knowledge proof framework for verifying reviewer qualifications without exposing personal data.
- **DAO Governance** — Token-weighted voting on protocol parameters, upgrades, and new features.
- **Immutable Records** — All publications and reviews are anchored to Bitcoin via Stacks settlement.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     Next.js 16 Frontend                       │
│              (App Router + React 19 + Tailwind v4)           │
│                                                               │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌──────────────┐ │
│  │Publications│ │  Reviews  │ │Credentials│ │  Governance  │ │
│  │  Explorer  │ │  Portal   │ │  Manager  │ │   Voting     │ │
│  └─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └──────┬───────┘ │
│        └──────────────┼─────────────┼───────────────┘         │
│                       │      @stacks/connect v7               │
└───────────────────────┼───────────────────────────────────────┘
                        │
         ┌──────────────▼──────────────┐
         │      Stacks Blockchain      │
         │                             │
         │  ┌───────────────────────┐  │
         │  │ publication-registry  │  │
         │  ├───────────────────────┤  │
         │  │   review-protocol     │  │
         │  ├───────────────────────┤  │
         │  │   reputation-token    │◄─┤── SIP-010 (non-transferable)
         │  ├───────────────────────┤  │
         │  │credential-verification│  │
         │  ├───────────────────────┤  │
         │  │     governance        │  │
         │  └───────────────────────┘  │
         │                             │
         │      Secured by Bitcoin     │
         └─────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Smart Contracts** | Clarity | 3.0 (Epoch 3.0) |
| **Contract Testing** | Clarinet + Vitest | Latest |
| **Frontend Framework** | Next.js (App Router) | 16 |
| **UI Library** | React | 19 |
| **Language** | TypeScript | 5.4.5 |
| **Styling** | Tailwind CSS | 4.0 |
| **Wallet** | @stacks/connect | 7.8.0 |
| **Network** | @stacks/network | 6.17.0 |
| **Transactions** | @stacks/transactions | 6.17.0 |

---

## Smart Contracts

SciVerify consists of **7 Clarity contracts** working together. All contracts use Clarity 3 (Epoch 3.0).

### 1. Publication Registry

**`publication-registry.clar`** — Central registry for scientific publications.

#### Write Functions

| Function | Description |
|----------|-------------|
| `register-publication` | Submit a new paper with title, abstract, authors, and IPFS content hash. |
| `update-publication-status` | Advance through workflow: Submitted → Under Review → Accepted/Rejected → Published. |
| `assign-to-journal` | Assign a publication to a journal. |
| `set-publication-doi` | Attach a Digital Object Identifier. |
| `assign-reviewers` | Assign reviewers with a review deadline. |
| `add-completed-review` | Link a completed review to the publication. |
| `update-publication-ipfs-hash` | Update the content hash for revised versions. |
| `transfer-ownership` | Transfer contract admin rights. |

#### Read Functions

| Function | Returns |
|----------|---------|
| `get-publication` | Full publication record by ID. |
| `get-publication-metadata` | Keywords, field-of-study, additional info. |
| `get-publication-reviews-data` | Assigned reviewers, completed reviews, deadline. |
| `get-last-publication-id` | Latest publication ID. |
| `check-is-author` | Whether a principal is an author of a publication. |
| `check-is-reviewer` | Whether a principal is an assigned reviewer. |
| `get-registry-status` | Contract status summary. |

#### Publication Status Flow

```
SUBMITTED (1) → UNDER-REVIEW (2) → ACCEPTED (3) → PUBLISHED (5)
                                  → REJECTED (4)
                                                 → RETRACTED (6)
```

---

### 2. Review Protocol

**`review-protocol.clar`** — Manages the blind peer review process.

#### Write Functions

| Function | Description |
|----------|-------------|
| `assign-reviewer` | Assign a reviewer with conflict-of-interest validation. |
| `submit-review` | Submit a blind review with scores and recommendation. |
| `reveal-reviewer-identity` | Reveal reviewer identity after a decision is made. |

#### Scoring Dimensions

Each review rates the paper on four independent axes (1–5 scale):

| Dimension | What It Measures |
|-----------|-----------------|
| **Confidence** | Reviewer's domain expertise for this paper. |
| **Technical** | Correctness and rigor of methodology. |
| **Novelty** | Originality of contribution. |
| **Clarity** | Quality of writing and presentation. |

#### Recommendation Levels

| Code | Recommendation |
|------|---------------|
| `1` | Accept |
| `2` | Minor Revision |
| `3` | Major Revision |
| `4` | Reject |

---

### 3. Reputation Token

**`reputation-token.clar`** — SIP-010 compliant fungible token for tracking academic reputation.

| Property | Value |
|----------|-------|
| **Name** | SciVerify Reputation Token |
| **Symbol** | SVR |
| **Decimals** | 6 |
| **Transferable** | No (calling `transfer` returns an error) |

#### Earning Reputation

| Action | Reward |
|--------|--------|
| Quality review (score 1–5) | 1,000,000 – 5,000,000 SVR |
| Publication accepted | 10,000,000 SVR |

Reputation is tracked by category (e.g., `review-quality`, `publication-accepted`) so different aspects of academic contribution are distinguishable.

---

### 4. Credential Verification

**`credential-verification.clar`** — Zero-knowledge credential verification for reviewers.

#### Supported Roles

| Code | Role |
|------|------|
| `1` | Researcher |
| `2` | Professor |
| `3` | Industry Expert |
| `4` | Journal Editor |

#### Workflow

1. **Submit Credentials** — A user self-attests their role, institution, and field expertise.
2. **Verify Credentials** — A trusted verifier confirms the claim (optionally with a ZK proof hash).
3. **Revoke Credentials** — Credentials can be revoked if found to be invalid.

ZK proof hashes are stored on-chain for auditability without revealing underlying personal data.

---

### 5. Governance

**`governance.clar`** — Token-weighted DAO voting for protocol decisions.

#### Proposal Types

| Code | Type | Purpose |
|------|------|---------|
| `1` | Parameter | Change protocol parameters (thresholds, durations). |
| `2` | Contract | Upgrade or replace a contract. |
| `3` | Feature | Add a new feature to the protocol. |

#### Default Parameters

| Parameter | Default |
|-----------|---------|
| Minimum tokens to propose | 10,000,000 SVR |
| Minimum tokens to vote | 1,000,000 SVR |
| Pass threshold | 66% |
| Voting duration | Configurable (in blocks) |

#### Proposal Lifecycle

```
ACTIVE (1) → PASSED (2) → EXECUTED (4)
           → REJECTED (3)
```

---

### 6. Traits

- **`ownable-trait.clar`** — Standardized ownership interface (`get-owner`, `transfer-ownership`, `renounce-ownership`).
- **`sip-010-trait-ft-standard.clar`** — SIP-010 fungible token standard trait.

---

## Frontend

### Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features overview, and call-to-action. |
| `/publications` | Browse and search published papers. |
| `/review` | Reviewer portal for assigned reviews. |
| `/governance` | Proposal listing and voting interface. |
| `/credentials` | Credential submission and verification status. |
| `/dashboard` | Researcher dashboard with personal metrics. |
| `/wallet` | Wallet connection and account overview. |
| `/about` | Project information and team. |

### Core Components

| Component | Description |
|-----------|-------------|
| `Navbar` | Top navigation with wallet connect/disconnect. |
| `Hero` | Landing section with platform stats (publications, reviews, reputation). |
| `Features` | Six-card grid showcasing core protocol features. |
| `Footer` | Links to resources, documentation, and community. |

### Key Hooks

| Hook | Purpose |
|------|---------|
| `useWallet` | Stacks wallet connection via `@stacks/connect`. |
| `usePublicationDashboard` | Publication data fetching and management. |
| `useReviewTimeline` | Review assignment and submission tracking. |
| `useReputationAnalytics` | SVR token balance and category breakdown. |
| `useGovernance` | Proposal listing, voting, and execution. |
| `useCredential` | Credential submission and verification status. |

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** 9+
- **Clarinet** — [Install Guide](https://docs.hiro.so/clarinet/getting-started)
- **Stacks Wallet** — [Leather Wallet](https://leather.io/)

### Smart Contract Development

```bash
git clone https://github.com/iyanusha/sciverify-stacks.git
cd sciverify-stacks/sciverify-stacks

# Check contract syntax
clarinet check

# Run contract tests
clarinet test

# Interactive Clarity REPL
clarinet console
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

### Environment Variables

Create a `.env.local` file in `frontend/`:

```env
# Network: defaults to testnet
NEXT_PUBLIC_NETWORK=testnet

# Contract deployer address
NEXT_PUBLIC_CONTRACT_ADDRESS=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
```

---

## Testing

Contract tests use **Clarinet** with **Vitest**.

```bash
cd sciverify-stacks
clarinet test
```

### Test Coverage

| Test | What It Verifies |
|------|-----------------|
| Publication registration | Papers can be submitted with valid metadata. |
| Duplicate prevention | Same paper cannot be registered twice. |
| Status transitions | Publications follow the correct workflow. |
| Review assignment | Reviewers are assigned with conflict checks. |
| Blind review submission | Scores and recommendations are recorded. |
| Reputation minting | SVR tokens are awarded for quality reviews. |
| Governance proposals | Proposals can be created and voted on. |
| Credential verification | Credentials are verified by trusted verifiers. |

---

## Project Structure

```
sciverify-stacks/
├── sciverify-stacks/                  # Clarity smart contracts
│   ├── contracts/
│   │   ├── publication-registry.clar  # Publication management
│   │   ├── review-protocol.clar       # Blind peer review
│   │   ├── reputation-token.clar      # SVR reputation token (SIP-010)
│   │   ├── credential-verification.clar # ZK credential verification
│   │   ├── governance.clar            # DAO governance & voting
│   │   ├── ownable-trait.clar         # Ownership trait
│   │   └── sip-010-trait-ft-standard.clar # Token standard trait
│   ├── tests/                         # Contract test suites
│   ├── settings/
│   │   └── Devnet.toml                # Clarinet devnet config
│   └── Clarinet.toml                  # Project configuration
├── frontend/                          # Next.js 16 web application
│   ├── src/
│   │   ├── app/                       # App Router pages
│   │   │   ├── page.tsx               # Landing page
│   │   │   ├── layout.tsx             # Root layout
│   │   │   ├── globals.css            # Global Tailwind styles
│   │   │   ├── publications/          # Publication explorer
│   │   │   ├── review/                # Reviewer portal
│   │   │   ├── governance/            # Governance voting
│   │   │   ├── credentials/           # Credential management
│   │   │   └── dashboard/             # Researcher dashboard
│   │   ├── components/                # React components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   └── Footer.tsx
│   │   ├── hooks/                     # Custom React hooks
│   │   │   └── useWallet.ts
│   │   ├── lib/                       # Utilities and config
│   │   │   └── stacks.ts             # Network & contract config
│   │   └── types/                     # TypeScript definitions
│   ├── tailwind.config.ts
│   ├── next.config.ts
│   ├── tsconfig.json
│   └── package.json
└── README.md
```

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes with clear, descriptive messages.
4. Push to your fork and open a Pull Request.

Please ensure:
- All contract tests pass (`clarinet test`).
- Frontend builds without errors (`cd frontend && npm run build`).
- No TypeScript errors.

---

## License

MIT
