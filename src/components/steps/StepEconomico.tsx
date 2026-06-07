import { useForm } from '../../context/FormContext';
import { LICENCIAS } from '../../types';

export default function StepEconomico() {
  const { state, dispatch } = useForm();

  return (
    <div className="animate-fade-in">
      <h2 className="font-serif text-3xl md:text-4xl text-ink-900 mb-2">
        Plano Economico
      </h2>
      <p className="text-ink-500 mb-8 max-w-lg">
        Define el presupuesto y las licencias necesarias para tu proyecto tipografico.
      </p>

      <div className="space-y-8">
        {/* Presupuesto */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">
            Disponibilidad presupuestaria
          </h3>
          <div className="flex gap-4">
            {([
              { value: 'gratuita' as const, label: 'Distribucion gratuita', desc: 'Solo tipografias de libre acceso' },
              { value: 'con_costo' as const, label: 'Con costo', desc: 'Incluye tipografias comerciales' },
            ]).map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => dispatch({ type: 'SET_PRESUPUESTO', value: opt.value })}
                className={`
                  flex-1 p-4 rounded-lg border-2 text-left transition-all duration-200
                  ${state.economico.presupuesto === opt.value
                    ? 'border-terracotta-500 bg-white shadow-md'
                    : 'border-ink-100 bg-white hover:border-ink-200'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${state.economico.presupuesto === opt.value ? 'border-terracotta-500' : 'border-ink-200'}
                  `}>
                    {state.economico.presupuesto === opt.value && (
                      <div className="w-2.5 h-2.5 rounded-full bg-terracotta-500" />
                    )}
                  </div>
                  <div>
                    <div className={`font-medium ${state.economico.presupuesto === opt.value ? 'text-terracotta-600' : 'text-ink-900'}`}>
                      {opt.label}
                    </div>
                    <div className="text-sm text-ink-500">{opt.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Licencias */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">
            Licencias de uso requeridas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LICENCIAS.map(lic => {
              const checked = state.economico.licencias.includes(lic.id);
              return (
                <label
                  key={lic.id}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200
                    ${checked
                      ? 'border-terracotta-500 bg-white shadow-sm'
                      : 'border-ink-100 bg-white hover:border-ink-200'
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => dispatch({ type: 'TOGGLE_LICENCIA', licencia: lic.id })}
                    className="w-4 h-4 rounded"
                  />
                  <span className={`text-sm ${checked ? 'text-ink-900 font-medium' : 'text-ink-700'}`}>
                    {lic.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
