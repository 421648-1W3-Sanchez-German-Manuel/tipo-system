import { STEPS } from '../types';

interface Props {
  currentStep: number;
}

export default function FunnelIndicator({ currentStep }: Props) {
  const totalSteps = STEPS.length;

  return (
    <div className="flex flex-col items-center gap-1 py-6">
      {STEPS.map((step, i) => {
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;
        const widthPercent = 100 - (i / (totalSteps - 1)) * 55;

        return (
          <div
            key={step.id}
            className="flex items-center justify-center transition-all duration-300"
            style={{ width: `${widthPercent}%`, minWidth: '60px' }}
          >
            <div
              className={`
                w-full py-2 px-3 text-center text-xs font-medium rounded-sm transition-all duration-300
                ${isActive
                  ? 'bg-terracotta-500 text-white shadow-md'
                  : isCompleted
                    ? 'bg-ink-900 text-cream-100'
                    : 'bg-ink-100 text-ink-500'
                }
              `}
            >
              <span className="hidden sm:inline">{step.shortLabel}</span>
              <span className="sm:hidden">{i + 1}</span>
            </div>
          </div>
        );
      })}
      <div className="mt-2 flex flex-col items-center text-ink-300">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-bounce">
          <path d="M8 2v10M4 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[10px] tracking-widest uppercase mt-1">
          {currentStep < totalSteps - 1 ? 'Filtrar' : 'Resultado'}
        </span>
      </div>
    </div>
  );
}
