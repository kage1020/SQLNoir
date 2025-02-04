import React, { useState, useMemo } from "react";
import { Book, Code, Send, Database, ArrowLeft, PenLine } from "lucide-react";
import { CaseBrief } from "./case-study/CaseBrief";
import { SQLWorkspace } from "./case-study/SQLWorkspace";
import { SolutionSubmission } from "./case-study/SolutionSubmission";
import { DatabaseSchema } from "./case-study/DatabaseSchema";
import { CaseNotes } from "./case-study/CaseNotes";
import type { Case } from "../types";

const tabs = [
  { id: "brief", label: "Case Brief", icon: Book },
  { id: "workspace", label: "SQL Workspace", icon: Code },
  { id: "schema", label: "Schema", icon: Database },
  { id: "notes", label: "Notes", icon: PenLine, desktopOnly: true },
  { id: "submit", label: "Submit", icon: Send },
];

interface CaseSolverProps {
  caseData: Case;
  onBack: () => void;
  onSolve: () => void;
}

export function CaseSolver({ caseData, onBack, onSolve }: CaseSolverProps) {
  const [activeTab, setActiveTab] = useState("brief");
  const [isSolved, setIsSolved] = useState(false);

  const handleCaseSolved = () => {
    setIsSolved(true);
    onSolve();
  };

  // Create all components once
  const tabComponents = useMemo(
    () => ({
      brief: <CaseBrief caseData={caseData} />,
      workspace: <SQLWorkspace caseId={caseData.id} />,
      schema: <DatabaseSchema caseId={caseData.id} />,
      notes: <CaseNotes caseId={caseData.id} />,
      submit: (
        <SolutionSubmission caseData={caseData} onSolve={handleCaseSolved} />
      ),
    }),
    [caseData]
  );

  return (
    <div className="min-h-screen bg-amber-50/50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-amber-100 border-b border-amber-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="flex items-center text-amber-900 hover:text-amber-700 font-detective"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <span className="font-mono text-amber-900 text-sm">
            Case #{caseData.id.split("-")[1]} • {caseData.xpReward} XP
          </span>
        </div>

        {/* Mobile Navigation - Always Visible */}
        <div className="border-t border-amber-200 overflow-x-auto">
          <div className="flex p-2 gap-2 min-w-full">
            {tabs
              .filter((tab) => !tab.desktopOnly)
              .map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                    flex items-center px-3 py-2 rounded-lg font-detective text-sm whitespace-nowrap
                    ${
                      isActive
                        ? "bg-amber-200 text-amber-900"
                        : "bg-amber-100/50 text-amber-700 hover:bg-amber-100"
                    }
                  `}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-amber-900 hover:text-amber-700 font-detective"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cases
          </button>
          <div className="bg-amber-100 px-4 py-2 rounded-lg">
            <span className="font-mono text-amber-900">
              Case #{caseData.id.split("-")[1]} • {caseData.xpReward} XP
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-amber-50 rounded-lg shadow-lg border border-amber-900/10">
          {/* Desktop Navigation */}
          <div className="hidden lg:block border-b border-amber-900/10">
            <div className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center px-6 py-4 font-detective text-sm focus:outline-none whitespace-nowrap
                      ${
                        isActive
                          ? "bg-amber-100 text-amber-900 border-b-2 border-amber-900"
                          : "text-amber-700 hover:bg-amber-100/50"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 lg:p-6">
            {Object.entries(tabComponents).map(([id, component]) => (
              <div
                key={id}
                style={{ display: activeTab === id ? "block" : "none" }}
              >
                {component}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
