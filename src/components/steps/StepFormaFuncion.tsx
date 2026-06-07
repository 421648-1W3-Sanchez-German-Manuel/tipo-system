import { useState } from 'react';
import { useForm } from '../../context/FormContext';
import { ROLES, type RoleId } from '../../types';

const TONOS = ['Formal', 'Informal', 'Tecnico', 'Neutro', 'Ludico', 'Elegante', 'Austero'];
const JERARQUIAS = ['Dominante', 'Subordinada', 'De apoyo', 'Decorativa'];
const VOLUMENES = ['Alto (mucho texto)', 'Medio', 'Bajo (poco texto)'];

const ORTO_FIELDS = [
  { key: 'bold', label: 'Bold' },
  { key: 'italica', label: 'Italica' },
  { key: 'versalitas', label: 'Versalitas' },
  { key: 'mayusculas', label: 'Mayusculas' },
  { key: 'minusculas', label: 'Minusculas' },
  { key: 'numerosElzevirianos', label: 'Numeros elzevirianos' },
  { key: 'ligaduras', label: 'Ligaduras (ae, oe, fi, fl, ss)' },
  { key: 'caracteresMultilingue', label: 'Caracteres para diversas lenguas' },
  { key: 'numerosFracciones', label: 'Numeros y fracciones' },
  { key: 'signosMonetarios', label: 'Signos monetarios ($, €, £, etc.)' },
];

const FORMAL_OPTIONS = {
  alturaX: { label: 'Altura de x', options: ['Alta', 'Media', 'Baja'] },
  proporcionesHorizontales: { label: 'Proporciones horizontales', options: ['Ancha', 'Media', 'Condensada'] },
  espaciado: { label: 'Espaciado', options: ['Mayor', 'Medio', 'Menor'] },
  contraste: { label: 'Contraste', options: ['Alto', 'Medio', 'Bajo'] },
};

export default function StepFormaFuncion() {
  const { state, dispatch } = useForm();
  const activeRoles = ROLES.filter(r => state.roles.includes(r.id));
  const [activeTab, setActiveTab] = useState<RoleId>(activeRoles[0]?.id ?? 'titulo');

  const roleData = state.formaFuncion[activeTab];

  return (
    <div className="animate-fade-in">
      <h2 className="font-serif text-3xl md:text-4xl text-ink-900 mb-2">
        Forma y Funcion
      </h2>
      <p className="text-ink-500 mb-6 max-w-lg">
        Configura las necesidades formales y funcionales para cada rol tipografico.
      </p>

      {/* Role tabs */}
      <div className="flex gap-2 mb-8 border-b border-ink-100 overflow-x-auto">
        {activeRoles.map(role => (
          <button
            key={role.id}
            type="button"
            onClick={() => setActiveTab(role.id)}
            className={`
              px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors
              ${activeTab === role.id
                ? 'border-terracotta-500 text-terracotta-600'
                : 'border-transparent text-ink-500 hover:text-ink-700'
              }
            `}
          >
            {role.label}
          </button>
        ))}
      </div>

      <div key={activeTab} className="space-y-8 animate-fade-in">
        {/* Paisaje tipografico */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">
            Paisaje tipografico
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Tono</label>
              <select
                value={roleData.tono}
                onChange={e => dispatch({ type: 'SET_FORMA_FUNCION', role: activeTab, data: { tono: e.target.value } })}
                className="w-full p-2.5 rounded-lg border border-ink-200 bg-white text-ink-900 text-sm focus:outline-none focus:border-terracotta-500 focus:ring-1 focus:ring-terracotta-500"
              >
                <option value="">Seleccionar...</option>
                {TONOS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Jerarquia</label>
              <select
                value={roleData.jerarquia}
                onChange={e => dispatch({ type: 'SET_FORMA_FUNCION', role: activeTab, data: { jerarquia: e.target.value } })}
                className="w-full p-2.5 rounded-lg border border-ink-200 bg-white text-ink-900 text-sm focus:outline-none focus:border-terracotta-500 focus:ring-1 focus:ring-terracotta-500"
              >
                <option value="">Seleccionar...</option>
                {JERARQUIAS.map(j => <option key={j} value={j}>{j}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Volumen</label>
              <select
                value={roleData.volumen}
                onChange={e => dispatch({ type: 'SET_FORMA_FUNCION', role: activeTab, data: { volumen: e.target.value } })}
                className="w-full p-2.5 rounded-lg border border-ink-200 bg-white text-ink-900 text-sm focus:outline-none focus:border-terracotta-500 focus:ring-1 focus:ring-terracotta-500"
              >
                <option value="">Seleccionar...</option>
                {VOLUMENES.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Competencia ortotipografica */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">
            Competencia ortotipografica
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ORTO_FIELDS.map(field => {
              const checked = roleData.ortotipografica[field.key as keyof typeof roleData.ortotipografica];
              return (
                <label
                  key={field.key}
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
                    onChange={() => dispatch({ type: 'SET_ORTOTIPOGRAFICA', role: activeTab, field: field.key, value: !checked })}
                    className="w-4 h-4 rounded"
                  />
                  <span className={`text-sm ${checked ? 'text-ink-900 font-medium' : 'text-ink-700'}`}>
                    {field.label}
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        {/* Competencia formal */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">
            Competencia formal
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(FORMAL_OPTIONS).map(([key, config]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-ink-700 mb-2">{config.label}</label>
                <div className="flex gap-2">
                  {config.options.map(opt => {
                    const selected = roleData.formal[key as keyof typeof roleData.formal] === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => dispatch({ type: 'SET_FORMAL', role: activeTab, field: key, value: opt })}
                        className={`
                          flex-1 py-2 px-3 text-sm rounded-lg border transition-all duration-200
                          ${selected
                            ? 'border-terracotta-500 bg-terracotta-500 text-white'
                            : 'border-ink-200 bg-white text-ink-700 hover:border-ink-300'
                          }
                        `}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
