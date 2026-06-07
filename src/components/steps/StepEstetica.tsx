import { useForm } from '../../context/FormContext';

const TONOS_ESTETICOS = [
  'Formal y serio', 'Informal y cercano', 'Elegante y sofisticado',
  'Ludico y dinamico', 'Tecnico y funcional', 'Expresivo y artistico',
  'Minimalista y neutro', 'Clasico y atemporal',
];

const ESTILOS = [
  'Clasico', 'Moderno', 'Contemporaneo', 'Minimalista',
  'Decorativo', 'Geometrico', 'Humanista', 'Industrial',
];

const EPOCAS = [
  'Antigua (pre-siglo XVIII)', 'Neoclasica (siglo XVIII)',
  'Moderna (siglo XIX)', 'Vanguardia (principios s. XX)',
  'Mid-century (1940-1970)', 'Posmoderna (1970-2000)',
  'Contemporanea (2000-presente)',
];

export default function StepEstetica() {
  const { state, dispatch } = useForm();

  const set = (field: string, value: string) =>
    dispatch({ type: 'SET_ESTETICA', field, value });

  return (
    <div className="animate-fade-in">
      <h2 className="font-serif text-3xl md:text-4xl text-ink-900 mb-2">
        Plano Estetico
      </h2>
      <p className="text-ink-500 mb-8 max-w-lg">
        Define la personalidad visual, el tono estetico y las relaciones culturales de la tipografia con el contenido.
      </p>

      <div className="space-y-8">
        {/* Relacion con el contenido */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">
            Relacion con el contenido
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Tono</label>
              <select
                value={state.estetica.tono}
                onChange={e => set('tono', e.target.value)}
                className="w-full p-2.5 rounded-lg border border-ink-200 bg-white text-ink-900 text-sm focus:outline-none focus:border-terracotta-500 focus:ring-1 focus:ring-terracotta-500"
              >
                <option value="">Seleccionar...</option>
                {TONOS_ESTETICOS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Estilo</label>
              <select
                value={state.estetica.estilo}
                onChange={e => set('estilo', e.target.value)}
                className="w-full p-2.5 rounded-lg border border-ink-200 bg-white text-ink-900 text-sm focus:outline-none focus:border-terracotta-500 focus:ring-1 focus:ring-terracotta-500"
              >
                <option value="">Seleccionar...</option>
                {ESTILOS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Epoca</label>
              <select
                value={state.estetica.epoca}
                onChange={e => set('epoca', e.target.value)}
                className="w-full p-2.5 rounded-lg border border-ink-200 bg-white text-ink-900 text-sm focus:outline-none focus:border-terracotta-500 focus:ring-1 focus:ring-terracotta-500"
              >
                <option value="">Seleccionar...</option>
                {EPOCAS.map(ep => <option key={ep} value={ep}>{ep}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Personalidad visual</label>
              <input
                type="text"
                value={state.estetica.personalidadVisual}
                onChange={e => set('personalidadVisual', e.target.value)}
                placeholder="Ej: Robusta, ligera, organica..."
                className="w-full p-2.5 rounded-lg border border-ink-200 bg-white text-ink-900 text-sm focus:outline-none focus:border-terracotta-500 focus:ring-1 focus:ring-terracotta-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              Connotaciones historico-culturales
            </label>
            <textarea
              value={state.estetica.connotaciones}
              onChange={e => set('connotaciones', e.target.value)}
              rows={3}
              placeholder="Describe las asociaciones historicas o culturales que deberia evocar la tipografia..."
              className="w-full p-2.5 rounded-lg border border-ink-200 bg-white text-ink-900 text-sm focus:outline-none focus:border-terracotta-500 focus:ring-1 focus:ring-terracotta-500 resize-none"
            />
          </div>
        </section>

        {/* Maridaje tipografico */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">
            Estilo — Maridaje tipografico
          </h3>
          <textarea
            value={state.estetica.maridaje}
            onChange={e => set('maridaje', e.target.value)}
            rows={3}
            placeholder="Notas sobre como debe combinarse con otras fuentes del proyecto. Ej: Necesita contrastar con una sans-serif geometrica para titulos..."
            className="w-full p-2.5 rounded-lg border border-ink-200 bg-white text-ink-900 text-sm focus:outline-none focus:border-terracotta-500 focus:ring-1 focus:ring-terracotta-500 resize-none"
          />
        </section>

        {/* Morfologia */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">
            Morfologia
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Relacion con el contenido
              </label>
              <textarea
                value={state.estetica.relacionContenido}
                onChange={e => set('relacionContenido', e.target.value)}
                rows={3}
                placeholder="Como debe reflejar la forma de la tipografia el sentido del contenido..."
                className="w-full p-2.5 rounded-lg border border-ink-200 bg-white text-ink-900 text-sm focus:outline-none focus:border-terracotta-500 focus:ring-1 focus:ring-terracotta-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Tono y volumen
              </label>
              <textarea
                value={state.estetica.morfologiaTono}
                onChange={e => set('morfologiaTono', e.target.value)}
                rows={3}
                placeholder="Describe la presencia visual deseada: discreta, imponente, susurro, grito..."
                className="w-full p-2.5 rounded-lg border border-ink-200 bg-white text-ink-900 text-sm focus:outline-none focus:border-terracotta-500 focus:ring-1 focus:ring-terracotta-500 resize-none"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
