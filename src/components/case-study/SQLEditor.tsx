import React, { useState, useRef, useEffect } from 'react';

// SQL keywords to highlight
const SQL_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER',
  'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT', 'UPDATE',
  'DELETE', 'CREATE', 'ALTER', 'DROP', 'TABLE', 'INDEX', 'VIEW', 'INTO',
  'VALUES', 'SET', 'NULL', 'NOT NULL', 'DEFAULT', 'PRIMARY KEY', 'FOREIGN KEY',
  'AND', 'OR', 'IN', 'BETWEEN', 'LIKE', 'IS', 'AS', 'DISTINCT', 'COUNT',
  'SUM', 'AVG', 'MIN', 'MAX', 'ON', 'ASC', 'DESC'
];

interface SQLEditorProps {
  value: string;
  onChange: (value: string) => void;
  onExecute: () => void;
  placeholder?: string;
}

interface Token {
  type: 'keyword' | 'string' | 'number' | 'comment' | 'text';
  value: string;
}

export function SQLEditor({ value, onChange, onExecute, placeholder }: SQLEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  // Handle keyboard shortcuts
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+Enter or Cmd+Enter
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onExecute();
      }
    };

    textarea.addEventListener('keydown', handleKeyDown);
    return () => textarea.removeEventListener('keydown', handleKeyDown);
  }, [onExecute]);

  // Sync scroll between textarea and highlight div
  useEffect(() => {
    const textarea = textareaRef.current;
    const highlight = highlightRef.current;
    
    if (!textarea || !highlight) return;

    const handleScroll = () => {
      highlight.scrollTop = textarea.scrollTop;
      highlight.scrollLeft = textarea.scrollLeft;
    };

    textarea.addEventListener('scroll', handleScroll);
    return () => textarea.removeEventListener('scroll', handleScroll);
  }, []);

  const tokenize = (code: string): Token[] => {
    const tokens: Token[] = [];
    let remaining = code;

    while (remaining.length > 0) {
      // Check for keywords
      const keywordMatch = remaining.match(new RegExp(`^(${SQL_KEYWORDS.join('|')})\\b`, 'i'));
      if (keywordMatch) {
        tokens.push({ type: 'keyword', value: keywordMatch[0] });
        remaining = remaining.slice(keywordMatch[0].length);
        continue;
      }

      // Check for strings
      const stringMatch = remaining.match(/^(['"][^'"]*['"])/);
      if (stringMatch) {
        tokens.push({ type: 'string', value: stringMatch[0] });
        remaining = remaining.slice(stringMatch[0].length);
        continue;
      }

      // Check for numbers
      const numberMatch = remaining.match(/^(\d+(\.\d+)?)/);
      if (numberMatch) {
        tokens.push({ type: 'number', value: numberMatch[0] });
        remaining = remaining.slice(numberMatch[0].length);
        continue;
      }

      // Check for comments
      const commentMatch = remaining.match(/^(--[^\n]*)/);
      if (commentMatch) {
        tokens.push({ type: 'comment', value: commentMatch[0] });
        remaining = remaining.slice(commentMatch[0].length);
        continue;
      }

      // Take one character as text
      tokens.push({ type: 'text', value: remaining[0] });
      remaining = remaining.slice(1);
    }

    return tokens;
  };

  return (
    <div className="relative font-mono text-sm">
      <div
        ref={highlightRef}
        className="absolute top-0 left-0 right-0 bottom-0 p-4 overflow-auto whitespace-pre-wrap break-words pointer-events-none text-amber-100"
        aria-hidden="true"
      >
        {value ? (
          tokenize(value).map((token, i) => {
            switch (token.type) {
              case 'keyword':
                return <span key={i} className="sql-keyword">{token.value}</span>;
              case 'string':
                return <span key={i} className="sql-string">{token.value}</span>;
              case 'number':
                return <span key={i} className="sql-number">{token.value}</span>;
              case 'comment':
                return <span key={i} className="sql-comment">{token.value}</span>;
              default:
                return <span key={i}>{token.value}</span>;
            }
          })
        ) : (
          <span className="sql-placeholder">{placeholder}</span>
        )}
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        className="w-full h-48 bg-transparent text-transparent caret-amber-100 p-4 resize-none focus:outline-none"
        style={{ caretColor: '#fef3c7' }}
      />
    </div>
  );
}