import { useForm } from '../../context/FormContext';

const MEDIOS = [
  { id: 'papel_poroso', label: 'Papel poroso', desc: 'Periodico, papel reciclado, offset sin estucar' },
  { id: 'papel_encapado', label: 'Papel encapado/estucado', desc: 'Couche, papel satinado, arte' },
];

const METODOS = [
  { id: 'offset', label: 'Offset', desc: 'Impresion litografica para grandes tiradas' },
  { id: 'digital', label: 'Digital', desc: 'Impresion laser o inkjet, tiradas cortas' },
  { id: 'web', label: 'Web / Pantalla', desc: 'Sitios web, aplicaciones, interfaces digitales' },
];

const OPTIMIZACIONES = [
  { id: 'cuerpos_pequenos', label: 'Cuerpos pequenos (< 9pt)', desc: 'Legibilidad en tamaños reducidos' },
  { id: 'cuerpos_grandes', label: 'Cuerpos grandes (display)', desc: 'Titulares y usos a gran escala' },
  { id: 'pantalla_retina', label: 'Pantallas de alta densidad', desc: 'Retina, 4K y superiores' },
  { id: 'pantalla_baja', label: 'Pantallas de baja resolucion', desc: 'Monitores estandar, hinting necesario' },
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

        {/* Optimizacion */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">
            Optimizacion para cuerpos y soportes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {OPTIMIZACIONES.map(opt => {
              const checked = state.tecnica.optimizacion.includes(opt.id);
              return (
                <label
                  key={opt.id}
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
                    onChange={() => dispatch({ type: 'TOGGLE_TECNICA_OPTIMIZACION', opt: opt.id })}
                    className="w-4 h-4 rounded mt-0.5"
                  />
                  <div>
                    <span className={`text-sm font-medium ${checked ? 'text-ink-900' : 'text-ink-700'}`}>
                      {opt.label}
                    </span>
                    <p className="text-xs text-ink-500 mt-0.5">{opt.desc}</p>
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
