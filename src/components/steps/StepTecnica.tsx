import { useForm } from '../../context/FormContext';
import { SOPORTES, METODOS_REPRODUCCION } from '../../types';

export default function StepTecnica() {
  const { state, dispatch } = useForm();

  return (
    <div className="animate-fade-in">
      <h2 className="font-serif text-3xl md:text-4xl text-ink-900 mb-2">
        Plano Técnico
      </h2>
      <p className="text-ink-500 mb-8 max-w-lg">
        Definí los requerimientos técnicos de reproducción y soporte para las tipografías del proyecto.
      </p>

      <div className="space-y-8">
        {/* Soporte */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">
            Soporte
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SOPORTES.map(soporte => {
              const checked = state.tecnica.soporte.includes(soporte.id);
              return (
                <label
                  key={soporte.id}
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
                    onChange={() => dispatch({ type: 'TOGGLE_TECNICA_SOPORTE', soporte: soporte.id })}
                    className="w-4 h-4 rounded mt-0.5"
                  />
                  <div>
                    <span className={`text-sm font-medium ${checked ? 'text-ink-900' : 'text-ink-700'}`}>
                      {soporte.label}
                    </span>
                    <p className="text-xs text-ink-500 mt-0.5">{soporte.desc}</p>
                  </div>
                </label>
              );
            })}
          </div>
        </section>

        {/* Método de reproducción */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">
            Método de reproducción
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {METODOS_REPRODUCCION.map(metodo => {
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
