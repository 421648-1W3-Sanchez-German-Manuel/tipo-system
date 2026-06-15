import { useForm } from '../context/FormContext';
import { ROLES, LICENCIAS, CON_COSTO_OPCIONES, GRATUITA_OPCIONES, ECONOMICO_PRINCIPALES, SOPORTES, METODOS_REPRODUCCION, ESTETICA_CHECKLIST, type RoleId, type FormState } from '../types';

const ORTO_LABELS: Record<string, string> = {
  versalitas: 'Versalitas',
  mayusculas: 'Mayúsculas',
  minusculas: 'Minúsculas',
  numerosElzevirianos: 'Números elzevirianos',
  ligaduras: 'Ligaduras',
  caracteresMultilingue: 'Caracteres multilingüe',
  numerosFracciones: 'Números y fracciones',
  signosMonetarios: 'Signos monetarios',
};

const SOPORTE_LABELS: Record<string, string> = Object.fromEntries(SOPORTES.map(s => [s.id, s.label]));
const METODO_LABELS: Record<string, string> = Object.fromEntries(METODOS_REPRODUCCION.map(m => [m.id, m.label]));

const FORMAL_LABELS: Record<string, string> = {
  alturaX: 'Altura de x',
  proporcionesHorizontales: 'Proporciones horizontales',
  espaciado: 'Espaciado',
  contraste: 'Contraste',
  ascendentes: 'Ascendentes',
  descendentes: 'Descendentes',
};

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'proyecto';
}

function generateMarkdown(state: FormState): string {
  const now = new Date();
  const fecha = now.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
  const nombre = state.nombreProyecto.trim() || 'Sin nombre';

  const principalLabels = state.economico.principales.map(id => ECONOMICO_PRINCIPALES.find(p => p.id === id)?.label ?? id);
  const gratuitaLabels = state.economico.gratuita.map(id => GRATUITA_OPCIONES.find(g => g.id === id)?.label ?? id);
  const conCostoLabels = state.economico.conCosto.map(id => CON_COSTO_OPCIONES.find(c => c.id === id)?.label ?? id);
  const licLabels = state.economico.licencias.map(id => LICENCIAS.find(l => l.id === id)?.label ?? id);

  let md = `# Brief Tipográfico — ${nombre}\n\n`;
  md += `> Generado con Selección Tipográfica — ${fecha}\n\n`;
  md += `**Proyecto:** ${nombre}\n\n`;
  md += `---\n\n`;

  // Plano Económico
  md += `## 1. Plano Económico\n\n`;
  md += `| Campo | Valor |\n`;
  md += `| --- | --- |\n`;
  md += `| Opciones principales | ${principalLabels.length ? principalLabels.join(', ') : '—'} |\n`;
  if (state.economico.principales.includes('gratuita')) {
    md += `| Distribución gratuita — modalidades | ${gratuitaLabels.length ? gratuitaLabels.join(', ') : '—'} |\n`;
  }
  if (state.economico.principales.includes('con_costo')) {
    md += `| Con costo — modalidades | ${conCostoLabels.length ? conCostoLabels.join(', ') : '—'} |\n`;
  }
  if (state.economico.principales.includes('licencias')) {
    md += `| Licencias requeridas | ${licLabels.length ? licLabels.join(', ') : '—'} |\n`;
  }
  md += `\n`;

  // Forma y Función por rol
  md += `## 2. Forma y Función\n\n`;
  if (state.roles.length === 0) {
    md += `_Sin tipos de texto configurados._\n\n`;
  } else {
    for (const roleId of state.roles) {
      const role = ROLES.find(r => r.id === roleId)!;
      const data = state.formaFuncion[roleId];

      md += `### ${role.label}\n\n`;
      const activeOrto = Object.entries(data.ortotipografica)
        .filter(([, v]) => v)
        .map(([k]) => ORTO_LABELS[k]);
      md += `**Competencia ortotipográfica**\n\n`;
      if (activeOrto.length > 0) {
        for (const item of activeOrto) md += `- ${item}\n`;
      } else {
        md += `_Ninguna seleccionada_\n`;
      }
      md += `\n`;

      md += `**Competencia formal**\n\n`;
      md += `| Aspecto | Valor |\n`;
      md += `| --- | --- |\n`;
      for (const [key, label] of Object.entries(FORMAL_LABELS)) {
        const val = data.formal[key as keyof typeof data.formal];
        md += `| ${label} | ${val || '—'} |\n`;
      }
      md += `\n`;
    }
  }

  // Plano Técnico
  md += `## 3. Plano Técnico\n\n`;
  const soportes = state.tecnica.soporte.map(s => SOPORTE_LABELS[s] ?? s);
  const metodos = state.tecnica.metodoReproduccion.map(m => METODO_LABELS[m] ?? m);
  md += `| Campo | Valor |\n`;
  md += `| --- | --- |\n`;
  md += `| Soporte | ${soportes.length ? soportes.join(', ') : '—'} |\n`;
  md += `| Método de reproducción | ${metodos.length ? metodos.join(', ') : '—'} |\n\n`;

  // Plano Estético
  md += `## 4. Plano Estético\n\n`;
  md += `Checklist de criterios cumplidos por las candidatas tipográficas:\n\n`;
  for (const item of ESTETICA_CHECKLIST) {
    const mark = state.estetica.checklist.includes(item.id) ? 'x' : ' ';
    md += `- [${mark}] **${item.label}** — ${item.desc}\n`;
  }
  md += `\n`;

  md += `---\n\n_Documento generado automáticamente. Usá este brief como guía al evaluar candidatas tipográficas._\n`;

  return md;
}

function downloadFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

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
        {activeOrto.length > 0 && (
          <div>
            <span className="text-ink-500 block mb-1">Competencia ortotipográfica:</span>
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
                  {FORMAL_LABELS[key] ?? key}: {val}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Results({ onReset }: { onReset?: () => void }) {
  const { state, dispatch } = useForm();
  const nombre = state.nombreProyecto.trim();
  const principalLabels = state.economico.principales.map(id => ECONOMICO_PRINCIPALES.find(p => p.id === id)?.label ?? id);
  const gratuitaLabels = state.economico.gratuita.map(id => GRATUITA_OPCIONES.find(g => g.id === id)?.label ?? id);
  const conCostoLabels = state.economico.conCosto.map(id => CON_COSTO_OPCIONES.find(c => c.id === id)?.label ?? id);
  const licLabels = state.economico.licencias.map(id => LICENCIAS.find(l => l.id === id)?.label ?? id);
  const showGrat = state.economico.principales.includes('gratuita');
  const showCC = state.economico.principales.includes('con_costo');
  const showLic = state.economico.principales.includes('licencias');

  const slug = slugify(nombre);
  const baseName = `brief-tipografico-${slug}`;

  const handlePrint = () => window.print();
  const handleReset = () => {
    if (confirm('Esto borrará todos los datos del formulario. ¿Continuar?')) {
      dispatch({ type: 'RESET' });
      onReset?.();
    }
  };
  const handleDownloadMd = () => {
    const md = generateMarkdown(state);
    downloadFile(`${baseName}.md`, md, 'text/markdown;charset=utf-8');
  };
  const handleDownloadJson = () => {
    const json = JSON.stringify(state, null, 2);
    downloadFile(`${baseName}.json`, json, 'application/json;charset=utf-8');
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-start justify-between mb-2 gap-4 flex-wrap">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-ink-900">
            Brief Tipográfico
          </h2>
          {nombre && (
            <p className="font-serif text-lg text-terracotta-600 mt-1">{nombre}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2 no-print justify-end">
          <button
            type="button"
            onClick={handleDownloadMd}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-terracotta-500 rounded-lg hover:bg-terracotta-600 transition-colors shadow-sm"
            title="Descargar brief como Markdown con tablas"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Descargar (.md)
          </button>
          <button
            type="button"
            onClick={handleDownloadJson}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-ink-700 bg-white border border-ink-200 rounded-lg hover:bg-cream-100 transition-colors"
            title="Descargar datos como JSON"
          >
            JSON
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 text-sm font-medium text-ink-700 bg-white border border-ink-200 rounded-lg hover:bg-cream-100 transition-colors"
          >
            Imprimir / PDF
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
        Resumen de todas las especificaciones seleccionadas a lo largo del embudo tipográfico.
      </p>

      <div className="space-y-8">
        {/* Plano Económico */}
        <section className="bg-white rounded-xl border border-ink-100 p-5 shadow-sm">
          <h3 className="font-serif text-xl text-ink-900 mb-3 pb-2 border-b border-ink-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-terracotta-500 text-white text-xs flex items-center justify-center">1</span>
            Plano Económico
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-ink-500 block mb-1">Opciones principales:</span>
              {principalLabels.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {principalLabels.map(l => (
                    <span key={l} className="px-2 py-0.5 bg-cream-100 text-ink-700 rounded text-xs">{l}</span>
                  ))}
                </div>
              ) : (
                <span className="text-ink-300 text-sm">Ninguna seleccionada</span>
              )}
            </div>
            {showGrat && (
              <div>
                <span className="text-ink-500 block mb-1">Distribución gratuita — modalidades:</span>
                {gratuitaLabels.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {gratuitaLabels.map(l => (
                      <span key={l} className="px-2 py-0.5 bg-cream-100 text-ink-700 rounded text-xs">{l}</span>
                    ))}
                  </div>
                ) : (
                  <span className="text-ink-300 text-sm">Ninguna seleccionada</span>
                )}
              </div>
            )}
            {showCC && (
              <div>
                <span className="text-ink-500 block mb-1">Con costo — modalidades:</span>
                {conCostoLabels.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {conCostoLabels.map(l => (
                      <span key={l} className="px-2 py-0.5 bg-cream-100 text-ink-700 rounded text-xs">{l}</span>
                    ))}
                  </div>
                ) : (
                  <span className="text-ink-300 text-sm">Ninguna seleccionada</span>
                )}
              </div>
            )}
            {showLic && (
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
            )}
          </div>
        </section>

        {/* Forma y Función por rol */}
        <section>
          <h3 className="font-serif text-xl text-ink-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-terracotta-500 text-white text-xs flex items-center justify-center">2</span>
            Forma y Función
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.roles.map(roleId => (
              <RoleCard key={roleId} roleId={roleId} />
            ))}
          </div>
        </section>

        {/* Plano Técnico */}
        <section className="bg-white rounded-xl border border-ink-100 p-5 shadow-sm">
          <h3 className="font-serif text-xl text-ink-900 mb-3 pb-2 border-b border-ink-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-terracotta-500 text-white text-xs flex items-center justify-center">3</span>
            Plano Técnico
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-ink-500 block mb-1">Soporte:</span>
              <div className="flex flex-wrap gap-1.5">
                {state.tecnica.soporte.length > 0
                  ? state.tecnica.soporte.map(s => (
                      <span key={s} className="px-2 py-0.5 bg-cream-100 text-ink-700 rounded text-xs">
                        {SOPORTE_LABELS[s] ?? s}
                      </span>
                    ))
                  : <span className="text-ink-300">—</span>
                }
              </div>
            </div>
            <div>
              <span className="text-ink-500 block mb-1">Métodos de reproducción:</span>
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
          </div>
        </section>

        {/* Plano Estético */}
        <section className="bg-white rounded-xl border border-ink-100 p-5 shadow-sm">
          <h3 className="font-serif text-xl text-ink-900 mb-3 pb-2 border-b border-ink-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-terracotta-500 text-white text-xs flex items-center justify-center">4</span>
            Plano Estético
          </h3>
          <p className="text-xs text-ink-500 mb-3">Criterios cumplidos por las candidatas:</p>
          <ul className="space-y-2 text-sm">
            {ESTETICA_CHECKLIST.map(item => {
              const checked = state.estetica.checklist.includes(item.id);
              return (
                <li key={item.id} className="flex items-start gap-2.5">
                  <span className={`
                    w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5
                    ${checked ? 'bg-terracotta-500 border-terracotta-500' : 'border-ink-300'}
                  `}>
                    {checked && (
                      <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7l3 3 5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className={checked ? 'text-ink-900' : 'text-ink-400'}>
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
