// ============================================
// THADAM AI — Startup Configuration Error Page
// ============================================

import React from 'react';
import { EnvAuditReport } from '@/lib/env-validator';

export default function ConfigErrorPage({ report }: { report: EnvAuditReport }) {
  return (
    <div className="config-error-container">
      <div className="config-error-card glass-panel">
        <div className="config-error-header">
          <div className="alert-icon">⚠️</div>
          <div>
            <h1 className="config-error-title">Configuration Warning</h1>
            <p className="config-error-subtitle">
              The THADAM AI server is missing required environment variables to start.
            </p>
          </div>
        </div>

        <div className="config-error-alert">
          <strong>Missing Critical Settings:</strong>{' '}
          {report.missingCritical.join(', ')}
        </div>

        <h3 className="section-title">Deployment Environment Audit</h3>
        <div className="table-responsive">
          <table className="audit-table">
            <thead>
              <tr>
                <th>Variable Name</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Description / Recommended Values</th>
              </tr>
            </thead>
            <tbody>
              {report.variables.map((variable) => (
                <tr key={variable.name} className={variable.status === 'Missing' && variable.required ? 'row-missing' : ''}>
                  <td className="var-name"><code>{variable.name}</code></td>
                  <td>
                    <span className={`status-badge ${variable.status.toLowerCase()}`}>
                      {variable.status}
                    </span>
                  </td>
                  <td>
                    <span className={`priority-badge ${variable.required ? 'required' : 'optional'}`}>
                      {variable.required ? 'Required' : 'Optional'}
                    </span>
                  </td>
                  <td>
                    <p className="var-desc">{variable.description}</p>
                    <div className="recommendation">
                      <strong>Recommended:</strong> <code>{variable.recommendedValue}</code>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="config-guide">
          <h3 className="section-title">How to Fix on Netlify</h3>
          <ol className="steps-list">
            <li>Open your Netlify Dashboard and navigate to your site.</li>
            <li>Go to <strong>Site configuration</strong> &gt; <strong>Environment variables</strong>.</li>
            <li>Click <strong>Add a variable</strong> and enter the missing keys.</li>
            <li>
              For <code>DATABASE_URL</code>, set it to:
              <pre className="code-block">file:./prisma/dev.db</pre>
            </li>
            <li>
              For <code>JWT_SECRET</code>, enter a secure random secret key.
            </li>
            <li>Trigger a new deployment of your site for the variables to take effect.</li>
          </ol>
        </div>
      </div>

      <style>{`
        .config-error-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: radial-gradient(circle at top left, #121c16 0%, #0a0a0a 100%);
          color: #f3f4f6;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .config-error-card {
          width: 100%;
          max-width: 900px;
          padding: 40px;
          border-radius: 20px;
          border: 1px solid rgba(220, 38, 38, 0.2);
          background: rgba(18, 18, 18, 0.7);
          backdrop-filter: blur(16px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .config-error-header {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 30px;
        }

        .alert-icon {
          font-size: 44px;
          line-height: 1;
        }

        .config-error-title {
          font-size: 26px;
          font-weight: 700;
          margin: 0 0 6px 0;
          color: #ef4444;
          letter-spacing: -0.02em;
        }

        .config-error-subtitle {
          font-size: 15px;
          margin: 0;
          color: #9ca3af;
        }

        .config-error-alert {
          padding: 16px 20px;
          background: rgba(220, 38, 38, 0.15);
          border-left: 4px solid #ef4444;
          border-radius: 8px;
          font-size: 15px;
          color: #fecaca;
          margin-bottom: 40px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 16px 0;
          color: #10b981;
          letter-spacing: -0.01em;
        }

        .table-responsive {
          overflow-x: auto;
          margin-bottom: 40px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
        }

        .audit-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
        }

        .audit-table th, .audit-table td {
          padding: 16px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          vertical-align: top;
        }

        .audit-table th {
          font-weight: 600;
          color: #9ca3af;
          background: rgba(255, 255, 255, 0.04);
        }

        .var-name code {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          color: #10b981;
          font-weight: 600;
          font-size: 13px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 8px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .status-badge.loaded {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
        }

        .status-badge.missing {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
        }

        .priority-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 8px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 600;
        }

        .priority-badge.required {
          background: rgba(251, 191, 36, 0.15);
          color: #fbbf24;
        }

        .priority-badge.optional {
          background: rgba(156, 163, 175, 0.15);
          color: #9ca3af;
        }

        .row-missing {
          background: rgba(239, 68, 68, 0.02);
        }

        .var-desc {
          margin: 0 0 8px 0;
          color: #d1d5db;
          line-height: 1.5;
        }

        .recommendation {
          font-size: 12px;
          color: #9ca3af;
        }

        .recommendation code {
          font-family: ui-monospace, monospace;
          color: #d1d5db;
          background: rgba(255, 255, 255, 0.05);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .config-guide {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 30px;
        }

        .steps-list {
          margin: 0;
          padding-left: 20px;
          color: #d1d5db;
          line-height: 1.8;
          font-size: 14px;
        }

        .steps-list li {
          margin-bottom: 12px;
        }

        .code-block {
          margin: 8px 0;
          padding: 10px 16px;
          background: #111;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: #10b981;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 13px;
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
}
