'use client';

import { useState } from 'react';
import { Publication } from '@/types/publication';
import { highlightMatch } from '@/lib/searchUtils';
import KeywordTag from './KeywordTag';

interface PublicationCardProps {
  publication: Publication;
  query?: string;
  onKeywordClick?: (keyword: string) => void;
}

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  approved: 'bg-green-50 text-green-700 border-green-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
};

// Strip all HTML except <mark> tags used for search highlights
function sanitizeHighlight(html: string): string {
  return html.replace(/<(?!\/?(mark)(?=>|\s))[^>]*>/gi, '');
}

function formatCitation(pub: Publication): string {
  const authors = pub.authors.join(', ');
  const year = new Date(pub.submittedAt).getFullYear();
  const doi = pub.doi ? ` https://doi.org/${pub.doi}` : '';
  return `${authors} (${year}). ${pub.title}.${doi}`;
}

export default function PublicationCard({ publication, query, onKeywordClick }: PublicationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const ABSTRACT_LIMIT = 200;

  function handleShare() {
    const url = `${window.location.origin}/publications/${publication.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    });
  }

  function handleCopyCitation() {
    const citation = formatCitation(publication);
    navigator.clipboard.writeText(citation).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const rawAbstract = publication.abstract;
  const isLong = rawAbstract.length > ABSTRACT_LIMIT;
  const displayAbstract = expanded ? rawAbstract : rawAbstract.slice(0, ABSTRACT_LIMIT) + (isLong && !expanded ? '...' : '');

  const highlightedTitle = query
    ? sanitizeHighlight(highlightMatch(publication.title, query))
    : null;
  const highlightedAbstract = query
    ? sanitizeHighlight(highlightMatch(displayAbstract, query))
    : null;

  const submittedDate = new Date(publication.submittedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className="publication-card rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <a href={`/publications/${publication.id}`} className="group block">
            <h3 className="text-base font-semibold text-gray-900 group-hover:text-accent-600 search-highlight">
              {highlightedTitle ? (
                <span
                  ref={(el) => {
                    if (el) el.innerHTML = highlightedTitle;
                  }}
                />
              ) : (
                publication.title
              )}
            </h3>
          </a>
          <p className="mt-1 text-sm text-gray-500">{publication.authors.join(', ')}</p>
        </div>

        <span
          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[publication.reviewStatus] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}
        >
          {publication.reviewStatus}
        </span>
      </div>

      <div className="mt-3 search-highlight">
        {highlightedAbstract ? (
          <p
            className="text-sm leading-relaxed text-gray-600"
            ref={(el) => {
              if (el) el.innerHTML = highlightedAbstract;
            }}
          />
        ) : (
          <p className="text-sm leading-relaxed text-gray-600">{displayAbstract}</p>
        )}
        {isLong && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-1 text-xs font-medium text-accent-600 hover:text-accent-700"
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      {publication.keywords.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {publication.keywords.map((kw) => (
            <KeywordTag
              key={kw}
              label={kw}
              onClick={onKeywordClick ? () => onKeywordClick(kw) : undefined}
            />
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
        <span>Submitted {submittedDate}</span>
        <div className="flex items-center gap-3">
          <span className="text-gray-300">#{publication.registryId}</span>
          <button
            onClick={handleShare}
            title="Copy link"
            className="font-medium text-gray-400 hover:text-gray-600 transition-colors"
          >
            {shared ? 'Copied!' : 'Share'}
          </button>
          <button
            onClick={handleCopyCitation}
            title="Copy citation"
            className="font-medium text-gray-400 hover:text-gray-600 transition-colors"
          >
            {copied ? 'Cited!' : 'Cite'}
          </button>
          {publication.doi && (
            <a
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-600 hover:text-accent-700"
            >
              DOI
            </a>
          )}
          <a
            href={`/publications/${publication.id}`}
            className="font-medium text-accent-600 hover:text-accent-700"
          >
            View full record →
          </a>
        </div>
      </div>
    </article>
  );
}
