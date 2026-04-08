'use client';

import { useState } from 'react';
import { ProposalAction } from '@/types/governance';
import { useCreateProposal } from '@/hooks/useCreateProposal';

interface ProposalFormProps {
  onSuccess?: (txId: string) => void;
}

type ActionType = ProposalAction['type'];

const ACTION_TYPES: { value: ActionType; label: string; description: string }[] = [
  { value: 'parameter-change', label: 'Parameter Change', description: 'Modify a protocol parameter' },
  { value: 'contract-upgrade', label: 'Contract Upgrade', description: 'Upgrade a contract to a new version' },
  { value: 'fund-allocation', label: 'Fund Allocation', description: 'Allocate funds to a recipient' },
];

interface FieldError {
  title?: string;
  description?: string;
  payload?: string;
}

export default function ProposalForm({ onSuccess }: ProposalFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [actionType, setActionType] = useState<ActionType>('parameter-change');
  const [paramKey, setParamKey] = useState('');
  const [paramValue, setParamValue] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState<FieldError>({});

  const { createProposal, creating, error: createError, txId } = useCreateProposal();

  function validate(): FieldError {
    const errs: FieldError = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (title.length > 100) errs.title = 'Title must be 100 characters or fewer';
    if (!description.trim()) errs.description = 'Description is required';
    if (description.length > 2000) errs.description = 'Description must be 2000 characters or fewer';
    if (actionType === 'parameter-change' && (!paramKey.trim() || !paramValue.trim())) {
      errs.payload = 'Both parameter name and value are required';
    }
    if (actionType === 'contract-upgrade' && !contractAddress.trim()) {
      errs.payload = 'Contract address is required';
    }
    if (actionType === 'fund-allocation' && (!recipient.trim() || !amount.trim())) {
      errs.payload = 'Recipient and amount are required';
    }
    return errs;
  }

  function buildPayload(): Record<string, unknown> {
    if (actionType === 'parameter-change') return { key: paramKey, value: paramValue };
    if (actionType === 'contract-upgrade') return { contractAddress };
    if (actionType === 'fund-allocation') return { recipient, amount: Number(amount) };
    return {};
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const tx = await createProposal({
      title: title.trim(),
      description: description.trim(),
      action: { type: actionType, payload: buildPayload() },
    });
    if (tx && onSuccess) onSuccess(tx);
  }

  if (txId) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-semibold text-green-700">Proposal submitted!</p>
        <a
          href={`https://explorer.stacks.co/txid/${txId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 block text-sm text-green-600 hover:text-green-700"
        >
          View transaction →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Title */}
      <div>
        <label htmlFor="prop-title" className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-gray-400 text-xs">({title.length}/100)</span>
        </label>
        <input
          id="prop-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          placeholder="Enter a clear, concise proposal title"
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
        />
        {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="prop-desc" className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-gray-400 text-xs">({description.length}/2000)</span>
        </label>
        <textarea
          id="prop-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={2000}
          rows={5}
          placeholder="Describe what this proposal changes and why it matters..."
          className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
        />
        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
      </div>

      {/* Action type */}
      <div>
        <label htmlFor="prop-action" className="block text-sm font-medium text-gray-700 mb-1">
          Action Type
        </label>
        <select
          id="prop-action"
          value={actionType}
          onChange={(e) => { setActionType(e.target.value as ActionType); setErrors({}); }}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
        >
          {ACTION_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label} — {opt.description}</option>
          ))}
        </select>
      </div>

      {/* Dynamic payload fields */}
      {actionType === 'parameter-change' && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="param-key" className="block text-xs font-medium text-gray-600 mb-1">Parameter Name</label>
            <input id="param-key" type="text" value={paramKey} onChange={(e) => setParamKey(e.target.value)} placeholder="e.g. min-reputation" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500/20" />
          </div>
          <div>
            <label htmlFor="param-val" className="block text-xs font-medium text-gray-600 mb-1">New Value</label>
            <input id="param-val" type="text" value={paramValue} onChange={(e) => setParamValue(e.target.value)} placeholder="e.g. 150" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500/20" />
          </div>
        </div>
      )}

      {actionType === 'contract-upgrade' && (
        <div>
          <label htmlFor="upgrade-addr" className="block text-xs font-medium text-gray-600 mb-1">New Contract Address</label>
          <input id="upgrade-addr" type="text" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} placeholder="ST..." className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-mono focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500/20" />
        </div>
      )}

      {actionType === 'fund-allocation' && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="fund-recipient" className="block text-xs font-medium text-gray-600 mb-1">Recipient Address</label>
            <input id="fund-recipient" type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="ST..." className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-mono focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500/20" />
          </div>
          <div>
            <label htmlFor="fund-amount" className="block text-xs font-medium text-gray-600 mb-1">Amount (tokens)</label>
            <input id="fund-amount" type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="1000" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500/20" />
          </div>
        </div>
      )}

      {errors.payload && <p className="text-xs text-red-600">{errors.payload}</p>}
      {createError && <p className="text-sm text-red-600">{createError}</p>}

      <button
        type="submit"
        disabled={creating}
        className="w-full rounded-lg bg-accent-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {creating ? 'Submitting...' : 'Submit Proposal'}
      </button>
    </form>
  );
}
