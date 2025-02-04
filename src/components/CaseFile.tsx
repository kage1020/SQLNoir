import React from 'react';
import { Case } from '../types';
import { Verified as Magnifier } from 'lucide-react';

interface CaseFileProps {
  caseData: Case;
  onClick: () => void;
  isSolved?: boolean;
}

export function CaseFile({ caseData, onClick, isSolved }: CaseFileProps) {
  return (
    <div 
      onClick={onClick}
      className="group relative paper-texture p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-amber-900/20 hover:scale-102"
    >
      {isSolved && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div 
            className="bg-red-800/90 text-amber-50 px-8 py-4 rounded-sm font-detective 
                     border-4 border-double border-red-900 shadow-lg transform -rotate-12 
                     flex flex-col items-center backdrop-blur-sm"
            style={{
              textShadow: '2px 2px 0 rgba(0,0,0,0.2)',
              boxShadow: '4px 4px 8px rgba(0,0,0,0.2), -2px -2px 4px rgba(255,255,255,0.1) inset'
            }}
          >
            <div className="text-2xl tracking-[0.2em] font-bold">SOLVED</div>
          </div>
        </div>
      )}
      <div className="absolute -rotate-12 top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
        {[...Array(caseData.difficulty)].map((_, i) => (
          <Magnifier key={i} className="w-4 h-4 inline-block mr-1" />
        ))}
      </div>
      <h3 className="font-detective text-xl mb-2 text-amber-900">{caseData.title}</h3>
      <p className="text-amber-800/80 text-sm mb-4">{caseData.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs font-mono bg-amber-100/80 backdrop-blur-sm px-2 py-1 rounded">
          XP: {caseData.xpReward}
        </span>
      </div>
    </div>
  );
}