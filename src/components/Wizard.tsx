import { useState } from 'react';
import { useForm } from '../context/FormContext';
import { STEPS } from '../types';
import FunnelIndicator from './FunnelIndicator';
import StepRoles from './steps/StepRoles';
import StepEconomico from './steps/StepEconomico';
import StepFormaFuncion from './steps/StepFormaFuncion';
import StepTecnica from './steps/StepTecnica';
import StepEstetica from './steps/StepEstetica';
import Results from './Results';

const STEP_COMPONENTS = [
  StepRoles,
  StepEconomico,
  StepFormaFuncion,
  StepTecnica,
  StepEstetica,
  Results,
];

export default function Wizard() {
  const [step, setStep] = useState(0);
  const { state } = useForm();

  const canAdvance = step === 0 ? state.roles.length > 0 : true;
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;

  const StepComponent = STEP_COMPONENTS[step];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-ink-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl sm:text-2xl text-ink-900">Embudo Tipografico</h1>
            <p className="text-xs text-ink-500 hidden sm:block">Metodo de seleccion por cuatro planos</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-ink-300 uppercase tracking-wider">Paso {step + 1} de {STEPS.length}</span>
            <p className="text-sm font-medium text-ink-700">{STEPS[step].label}</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-5xl mx-auto w-full">
        {/* Sidebar funnel */}
        <aside className="lg:w-52 lg:border-r border-ink-100 lg:sticky lg:top-[73px] lg:h-[calc(100vh-73px)] flex-shrink-0 no-print">
          <div className="hidden lg:block">
            <FunnelIndicator currentStep={step} />
          </div>
          {/* Mobile: horizontal steps */}
          <div className="lg:hidden flex gap-1 p-3 overflow-x-auto">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={`
                  px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors
                  ${i === step
                    ? 'bg-terracotta-500 text-white'
                    : i < step
                      ? 'bg-ink-900 text-cream-100'
                      : 'bg-ink-100 text-ink-500'
                  }
                `}
              >
                {s.shortLabel}
              </div>
            ))}
          </div>
        </aside>

        {/* Form area */}
        <main className="flex-1 px-4 sm:px-8 py-8">
          <StepComponent />
        </main>
      </div>

      {/* Footer navigation */}
      <footer className="border-t border-ink-100 bg-white/80 backdrop-blur-sm sticky bottom-0 z-10 no-print">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep(s => s - 1)}
            disabled={isFirst}
            className={`
              px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
              ${isFirst
                ? 'text-ink-300 cursor-not-allowed'
                : 'text-ink-700 bg-white border border-ink-200 hover:bg-cream-100 shadow-sm'
              }
            `}
          >
            Anterior
          </button>

          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => i <= step && setStep(i)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-200
                  ${i === step ? 'bg-terracotta-500 w-6' : i < step ? 'bg-ink-900 cursor-pointer hover:bg-ink-700' : 'bg-ink-200'}
                `}
              />
            ))}
          </div>

          {!isLast ? (
            <button
              type="button"
              onClick={() => setStep(s => s + 1)}
              disabled={!canAdvance}
              className={`
                px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                ${canAdvance
                  ? 'bg-terracotta-500 text-white hover:bg-terracotta-600 shadow-sm'
                  : 'bg-ink-200 text-ink-400 cursor-not-allowed'
                }
              `}
            >
              Siguiente
            </button>
          ) : (
            <div className="w-[100px]" />
          )}
        </div>
      </footer>
    </div>
  );
}
