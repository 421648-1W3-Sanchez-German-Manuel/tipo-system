import { useForm } from '../../context/FormContext';
import { TIPOS_PAPEL } from '../../types';

const MEDIOS = [
  { id: 'papel', label: 'Papel', desc: 'Soportes impresos' },
  { id: 'pantallas', label: 'Pantallas', desc: 'Web, aplicaciones, dispositivos digitales' },
];

const METODOS = [
  { id: 'offset', label: 'Offset', desc: 'Impresion litografica para grandes tiradas' },
  { id: 'digital', label: 'Digital', desc: 'Impresion laser o inkjet, tiradas cortas' },
  { id: 'web', label: 'Web / Pantalla', desc: 'Sitios web, aplicaciones, interfaces digitales' },
];

export default function StepTecnica() {
  const { state, dispatch } = useForm();

  return (
    <div className="animate-fade-in">
      <h2 className="font-serif text-3xl md:text-4xl text-ink-900 mb-2">
        Plano Tecnico
      </h2>
      <p className="text-ink-500 mb-8 max-w-lg">
        Define los requerimientos tecnicos de reproduccion y soporte para las tipografias del proyecto.
      </p>

      <div className="space-y-8">
        {/* Compatibilidad con medios */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">
            Compatibilidad con medios
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MEDIOS.map(medio => {
              const checked = state.tecnica.compatibilidadMedios.includes(medio.id);
              return (
                <label
                  key={medio.id}
                  className={`
                    flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200
                    ${checked
                      ? 'border-terracotta-500 bg-white shadow-sm'
                      : 'border-ink-100 bg-white hover:border-ink-200'
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => dispatch({ type: 'TOGGLE_TECNICA_MEDIO', medio: medio.id })}
                    className="w-4 h-4 rounded mt-0.5"
                  />
                  <div>
                    <span className={`text-sm font-medium ${checked ? 'text-ink-900' : 'text-ink-700'}`}>
                      {medio.label}
                    </span>
                    <p className="text-xs text-ink-500 mt-0.5">{medio.desc}</p>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Sub-opciones de Papel */}
          {state.tecnica.compatibilidadMedios.includes('papel') && (
            <div className="animate-slide-down mt-4 bg-cream-100 rounded-lg p-5 border border-ink-100">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-500 mb-3">
                Papel — tipos
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TIPOS_PAPEL.map(t => {
                  const checked = state.tecnica.tiposPapel.includes(t.id);
                  return (
                    <label
                      key={t.id}
                      className={`
                        flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200
                        ${checked
                          ? 'border-terracotta-500 bg-white shadow-sm'
                          : 'border-ink-200 bg-white hover:border-ink-300'
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => dispatch({ type: 'TOGGLE_TECNICA_PAPEL', tipo: t.id })}
                        className="w-4 h-4 rounded mt-0.5"
                      />
                      <div>
                        <span className={`text-sm font-medium ${checked ? 'text-ink-900' : 'text-ink-700'}`}>
                          {t.label}
                        </span>
                        <p className="text-xs text-ink-500 mt-0.5">{t.desc}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* Metodo de reproduccion */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">
            Metodo de reproduccion
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {METODOS.map(metodo => {
              const checked = state.tecnica.metodoReproduccion.includes(metodo.id);
              return (
                <label
                  key={metodo.id}
                  className={`
                    flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200
                    ${checked
                      ? 'border-terracotta-500 bg-white shadow-sm'
                      : 'border-ink-100 bg-white hover:border-ink-200'
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => dispatch({ type: 'TOGGLE_TECNICA_METODO', metodo: metodo.id })}
                    className="w-4 h-4 rounded mt-0.5"
                  />
                  <div>
                    <span className={`text-sm font-medium ${checked ? 'text-ink-900' : 'text-ink-700'}`}>
                      {metodo.label}
                    </span>
                    <p className="text-xs text-ink-500 mt-0.5">{metodo.desc}</p>
                  </div>
                </label>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
