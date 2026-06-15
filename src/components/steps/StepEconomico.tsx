import { useForm } from '../../context/FormContext';
import { LICENCIAS, CON_COSTO_OPCIONES, GRATUITA_OPCIONES, ECONOMICO_PRINCIPALES } from '../../types';

export default function StepEconomico() {
  const { state, dispatch } = useForm();
  const { principales, gratuita, conCosto, licencias } = state.economico;

  const showGratuita = principales.includes('gratuita');
  const showConCosto = principales.includes('con_costo');
  const showLicencias = principales.includes('licencias');

  return (
    <div className="animate-fade-in">
      <h2 className="font-serif text-3xl md:text-4xl text-ink-900 mb-2">
        Plano Económico
      </h2>
      <p className="text-ink-500 mb-8 max-w-lg">
        Seleccioná las opciones económicas relevantes para tu proyecto. Podés elegir más de una.
      </p>

      {/* 3 opciones principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {ECONOMICO_PRINCIPALES.map(opt => {
          const selected = principales.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => dispatch({ type: 'TOGGLE_ECON_PRINCIPAL', value: opt.id })}
              className={`
                text-left p-5 rounded-lg border-2 transition-all duration-200
                ${selected
                  ? 'border-terracotta-500 bg-white shadow-md'
                  : 'border-ink-100 bg-white hover:border-ink-200 hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`font-semibold ${selected ? 'text-terracotta-600' : 'text-ink-900'}`}>
                    {opt.label}
                  </h3>
                  <p className="text-sm text-ink-500 mt-1">{opt.desc}</p>
                </div>
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all
                  ${selected ? 'border-terracotta-500 bg-terracotta-500' : 'border-ink-200'}
                `}>
                  {selected && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Panel: sub-opciones de Distribución gratuita */}
      {showGratuita && (
        <section className="animate-slide-down mb-6 bg-cream-100 rounded-lg p-5 border border-ink-100">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">
            Distribución gratuita — modalidades
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {GRATUITA_OPCIONES.map(o => {
              const checked = gratuita.includes(o.id);
              return (
                <label
                  key={o.id}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200
                    ${checked
                      ? 'border-terracotta-500 bg-white shadow-sm'
                      : 'border-ink-200 bg-white hover:border-ink-300'
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => dispatch({ type: 'TOGGLE_ECON_GRATUITA', value: o.id })}
                    className="w-4 h-4 rounded"
                  />
                  <span className={`text-sm ${checked ? 'text-ink-900 font-medium' : 'text-ink-700'}`}>
                    {o.label}
                  </span>
                </label>
              );
            })}
          </div>
        </section>
      )}

      {/* Panel: sub-opciones de Con costo */}
      {showConCosto && (
        <section className="animate-slide-down mb-6 bg-cream-100 rounded-lg p-5 border border-ink-100">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">
            Con costo — modalidades
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CON_COSTO_OPCIONES.map(o => {
              const checked = conCosto.includes(o.id);
              return (
                <label
                  key={o.id}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200
                    ${checked
                      ? 'border-terracotta-500 bg-white shadow-sm'
                      : 'border-ink-200 bg-white hover:border-ink-300'
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => dispatch({ type: 'TOGGLE_ECON_CON_COSTO', value: o.id })}
                    className="w-4 h-4 rounded"
                  />
                  <span className={`text-sm ${checked ? 'text-ink-900 font-medium' : 'text-ink-700'}`}>
                    {o.label}
                  </span>
                </label>
              );
            })}
          </div>
        </section>
      )}

      {/* Panel: sub-opciones de Licencias */}
      {showLicencias && (
        <section className="animate-slide-down bg-cream-100 rounded-lg p-5 border border-ink-100">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">
            Licencias — tipos requeridos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LICENCIAS.map(lic => {
              const checked = licencias.includes(lic.id);
              return (
                <label
                  key={lic.id}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200
                    ${checked
                      ? 'border-terracotta-500 bg-white shadow-sm'
                      : 'border-ink-200 bg-white hover:border-ink-300'
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
        </section>
      )}
    </div>
  );
}
