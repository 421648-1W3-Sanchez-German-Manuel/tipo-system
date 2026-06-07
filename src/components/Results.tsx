import { useForm } from '../context/FormContext';
import { ROLES, LICENCIAS, type RoleId } from '../types';

const ORTO_LABELS: Record<string, string> = {
  bold: 'Bold',
  italica: 'Italica',
  versalitas: 'Versalitas',
  mayusculas: 'Mayusculas',
  minusculas: 'Minusculas',
  numerosElzevirianos: 'Numeros elzevirianos',
  ligaduras: 'Ligaduras',
  caracteresMultilingue: 'Caracteres multilingue',
  numerosFracciones: 'Numeros y fracciones',
  signosMonetarios: 'Signos monetarios',
};

const MEDIO_LABELS: Record<string, string> = {
  papel_poroso: 'Papel poroso',
  papel_encapado: 'Papel encapado/estucado',
};

const METODO_LABELS: Record<string, string> = {
  offset: 'Offset',
  digital: 'Digital',
  web: 'Web / Pantalla',
};

const OPT_LABELS: Record<string, string> = {
  cuerpos_pequenos: 'Cuerpos pequenos',
  cuerpos_grandes: 'Cuerpos grandes (display)',
  pantalla_retina: 'Pantallas alta densidad',
  pantalla_baja: 'Pantallas baja resolucion',
};

function RoleCard({ roleId }: { roleId: RoleId }) {
  const { state } = useForm();
  const role = ROLES.find(r => r.id === roleId)!;
  const data = state.formaFuncion[roleId];
  const activeOrto = Object.entries(data.ortotipografica)
    .filter(([, v]) => v)
    .map(([k]) => ORTO_LABELS[k]);
  const formalEntries = Object.entries(data.formal).filter(([, v]) => v);

  return (
    <div className="bg-white rounded-xl border border-ink-100 p-5 shadow-sm">
      <h4 className="font-serif text-xl text-ink-900 mb-3 pb-2 border-b border-ink-100">
        {role.label}
      </h4>
      <div className="space-y-3 text-sm">
        {data.tono && (
          <div className="flex gap-2">
            <span className="text-ink-500 w-24 flex-shrink-0">Tono:</span>
            <span className="text-ink-900">{data.tono}</span>
          </div>
        )}
        {data.jerarquia && (
          <div className="flex gap-2">
            <span className="text-ink-500 w-24 flex-shrink-0">Jerarquia:</span>
            <span className="text-ink-900">{data.jerarquia}</span>
          </div>
        )}
        {data.volumen && (
          <div className="flex gap-2">
            <span className="text-ink-500 w-24 flex-shrink-0">Volumen:</span>
            <span className="text-ink-900">{data.volumen}</span>
          </div>
        )}
        {activeOrto.length > 0 && (
          <div>
            <span className="text-ink-500 block mb-1">Competencia ortotipografica:</span>
            <div className="flex flex-wrap gap-1.5">
              {activeOrto.map(label => (
                <span key={label} className="px-2 py-0.5 bg-cream-100 text-ink-700 rounded text-xs">
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}
        {formalEntries.length > 0 && (
          <div>
            <span className="text-ink-500 block mb-1">Competencia formal:</span>
            <div className="flex flex-wrap gap-1.5">
              {formalEntries.map(([key, val]) => (
                <span key={key} className="px-2 py-0.5 bg-cream-100 text-ink-700 rounded text-xs">
                  {key === 'alturaX' ? 'Altura X' :
                   key === 'proporcionesHorizontales' ? 'Proporcion' :
                   key === 'espaciado' ? 'Espaciado' : 'Contraste'}: {val}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Results() {
  const { state, dispatch } = useForm();
  const licLabels = state.economico.licencias.map(id => LICENCIAS.find(l => l.id === id)?.label ?? id);

  const handlePrint = () => window.print();
  const handleReset = () => {
    if (confirm('Esto borrara todos los datos del formulario. Continuar?')) {
      dispatch({ type: 'RESET' });
    }
  };

  const hasEstetica = state.estetica.tono || state.estetica.estilo || state.estetica.epoca ||
    state.estetica.personalidadVisual || state.estetica.connotaciones || state.estetica.maridaje ||
    state.estetica.relacionContenido || state.estetica.morfologiaTono;

  return (
    <div className="animate-fade-in">
      <div className="flex items-start justify-between mb-2">
        <h2 className="font-serif text-3xl md:text-4xl text-ink-900">
          Brief Tipografico
        </h2>
        <div className="flex gap-2 no-print">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 text-sm font-medium text-ink-700 bg-white border border-ink-200 rounded-lg hover:bg-cream-100 transition-colors"
          >
            Imprimir
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-terracotta-600 bg-white border border-terracotta-500 rounded-lg hover:bg-red-50 transition-colors"
          >
            Reiniciar
          </button>
        </div>
      </div>
      <p className="text-ink-500 mb-8 max-w-lg">
        Resumen de todas las especificaciones seleccionadas a lo largo del embudo tipografico.
      </p>

      <div className="space-y-8">
        {/* Plano Economico */}
        <section className="bg-white rounded-xl border border-ink-100 p-5 shadow-sm">
          <h3 className="font-serif text-xl text-ink-900 mb-3 pb-2 border-b border-ink-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-ink-900 text-white text-xs flex items-center justify-center">1</span>
            Plano Economico
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="text-ink-500 w-28 flex-shrink-0">Presupuesto:</span>
              <span className="text-ink-900 capitalize">{state.economico.presupuesto || '—'}</span>
            </div>
            <div>
              <span className="text-ink-500 block mb-1">Licencias:</span>
              {licLabels.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {licLabels.map(l => (
                    <span key={l} className="px-2 py-0.5 bg-cream-100 text-ink-700 rounded text-xs">{l}</span>
                  ))}
                </div>
              ) : (
                <span className="text-ink-300 text-sm">Ninguna seleccionada</span>
              )}
            </div>
          </div>
        </section>

        {/* Forma y Funcion por rol */}
        <section>
          <h3 className="font-serif text-xl text-ink-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-ink-900 text-white text-xs flex items-center justify-center">2</span>
            Forma y Funcion
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.roles.map(roleId => (
              <RoleCard key={roleId} roleId={roleId} />
            ))}
          </div>
        </section>

        {/* Plano Tecnico */}
        <section className="bg-white rounded-xl border border-ink-100 p-5 shadow-sm">
          <h3 className="font-serif text-xl text-ink-900 mb-3 pb-2 border-b border-ink-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-ink-900 text-white text-xs flex items-center justify-center">3</span>
            Plano Tecnico
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-ink-500 block mb-1">Medios:</span>
              <div className="flex flex-wrap gap-1.5">
                {state.tecnica.compatibilidadMedios.length > 0
                  ? state.tecnica.compatibilidadMedios.map(m => (
                      <span key={m} className="px-2 py-0.5 bg-cream-100 text-ink-700 rounded text-xs">
                        {MEDIO_LABELS[m] ?? m}
                      </span>
                    ))
                  : <span className="text-ink-300">—</span>
                }
              </div>
            </div>
            <div>
              <span className="text-ink-500 block mb-1">Metodos de reproduccion:</span>
              <div className="flex flex-wrap gap-1.5">
                {state.tecnica.metodoReproduccion.length > 0
                  ? state.tecnica.metodoReproduccion.map(m => (
                      <span key={m} className="px-2 py-0.5 bg-cream-100 text-ink-700 rounded text-xs">
                        {METODO_LABELS[m] ?? m}
                      </span>
                    ))
                  : <span className="text-ink-300">—</span>
                }
              </div>
            </div>
            <div>
              <span className="text-ink-500 block mb-1">Optimizacion:</span>
              <div className="flex flex-wrap gap-1.5">
                {state.tecnica.optimizacion.length > 0
                  ? state.tecnica.optimizacion.map(o => (
                      <span key={o} className="px-2 py-0.5 bg-cream-100 text-ink-700 rounded text-xs">
                        {OPT_LABELS[o] ?? o}
                      </span>
                    ))
                  : <span className="text-ink-300">—</span>
                }
              </div>
            </div>
          </div>
        </section>

        {/* Plano Estetico */}
        <section className="bg-white rounded-xl border border-ink-100 p-5 shadow-sm">
          <h3 className="font-serif text-xl text-ink-900 mb-3 pb-2 border-b border-ink-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-ink-900 text-white text-xs flex items-center justify-center">4</span>
            Plano Estetico
          </h3>
          {hasEstetica ? (
            <div className="space-y-3 text-sm">
              {state.estetica.tono && (
                <div className="flex gap-2">
                  <span className="text-ink-500 w-28 flex-shrink-0">Tono:</span>
                  <span className="text-ink-900">{state.estetica.tono}</span>
                </div>
              )}
              {state.estetica.estilo && (
                <div className="flex gap-2">
                  <span className="text-ink-500 w-28 flex-shrink-0">Estilo:</span>
                  <span className="text-ink-900">{state.estetica.estilo}</span>
                </div>
              )}
              {state.estetica.epoca && (
                <div className="flex gap-2">
                  <span className="text-ink-500 w-28 flex-shrink-0">Epoca:</span>
                  <span className="text-ink-900">{state.estetica.epoca}</span>
                </div>
              )}
              {state.estetica.personalidadVisual && (
                <div className="flex gap-2">
                  <span className="text-ink-500 w-28 flex-shrink-0">Personalidad:</span>
                  <span className="text-ink-900">{state.estetica.personalidadVisual}</span>
                </div>
              )}
              {state.estetica.connotaciones && (
                <div>
                  <span className="text-ink-500 block mb-1">Connotaciones historico-culturales:</span>
                  <p className="text-ink-900 bg-cream-50 rounded p-2">{state.estetica.connotaciones}</p>
                </div>
              )}
              {state.estetica.maridaje && (
                <div>
                  <span className="text-ink-500 block mb-1">Maridaje tipografico:</span>
                  <p className="text-ink-900 bg-cream-50 rounded p-2">{state.estetica.maridaje}</p>
                </div>
              )}
              {state.estetica.relacionContenido && (
                <div>
                  <span className="text-ink-500 block mb-1">Relacion con el contenido:</span>
                  <p className="text-ink-900 bg-cream-50 rounded p-2">{state.estetica.relacionContenido}</p>
                </div>
              )}
              {state.estetica.morfologiaTono && (
                <div>
                  <span className="text-ink-500 block mb-1">Tono y volumen (morfologia):</span>
                  <p className="text-ink-900 bg-cream-50 rounded p-2">{state.estetica.morfologiaTono}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-ink-300 text-sm">Sin datos esteticos configurados.</p>
          )}
        </section>
      </div>
    </div>
  );
}
