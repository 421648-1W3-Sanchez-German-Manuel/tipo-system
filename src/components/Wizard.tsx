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

export default function Wizard() {
  const [step, setStep] = useState(0);
  const { state, dispatch } = useForm();
  const goToStart = () => setStep(0);

  const STEP_COMPONENTS = [
    <StepRoles />,
    <StepEconomico />,
    <StepFormaFuncion />,
    <StepTecnica />,
    <StepEstetica />,
    <Results onReset={goToStart} />,
  ];

  const nombreOk = state.nombreProyecto.trim().length > 0;
  const canAdvance = step === 0 ? state.roles.length > 0 && nombreOk : nombreOk;
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;

  const stepElement = STEP_COMPONENTS[step];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-ink-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-shrink-0">
            <h1 className="font-serif text-xl sm:text-2xl text-ink-900">Selección Tipográfica</h1>
            <p className="text-xs text-ink-500 hidden sm:block">Herramienta para selección tipográfica</p>
          </div>

          {/* Nombre del proyecto */}
          <div className="flex-1 sm:mx-6 no-print">
            <label className="text-[10px] uppercase tracking-wider text-ink-400 font-medium block">
              Nombre del proyecto <span className="text-terracotta-500">*</span>
            </label>
            <input
              type="text"
              value={state.nombreProyecto}
              onChange={e => dispatch({ type: 'SET_NOMBRE_PROYECTO', nombre: e.target.value })}
              placeholder="Ej.: Revista cultural 2026"
              required
              className={`
                w-full mt-0.5 px-2 py-1 text-sm bg-transparent border-b
                focus:outline-none transition-colors
                ${nombreOk
                  ? 'border-ink-200 focus:border-ink-700 text-ink-900'
                  : 'border-terracotta-300 focus:border-terracotta-500 text-ink-900 placeholder-ink-300'
                }
              `}
            />
          </div>

          <div className="text-right flex-shrink-0">
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
                      ? 'bg-mauve-500 text-cream-50'
                      : 'bg-mauve-300/40 text-ink-500'
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
          {stepElement}
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
                  ${i === step ? 'bg-terracotta-500 w-6' : i < step ? 'bg-mauve-500 cursor-pointer hover:bg-terracotta-500' : 'bg-mauve-300/60'}
                `}
              />
            ))}
          </div>

          {!isLast ? (
            <button
              type="button"
              onClick={() => setStep(s => s + 1)}
              disabled={!canAdvance}
              title={!nombreOk ? 'Ingresá un nombre de proyecto para continuar' : undefined}
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
