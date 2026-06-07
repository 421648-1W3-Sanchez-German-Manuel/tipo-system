import { useForm } from '../../context/FormContext';
import { ROLES, type RoleId } from '../../types';

export default function StepRoles() {
  const { state, dispatch } = useForm();

  function toggleRole(id: RoleId) {
    const next = state.roles.includes(id)
      ? state.roles.filter(r => r !== id)
      : [...state.roles, id];
    dispatch({ type: 'SET_ROLES', roles: next });
  }

  return (
    <div className="animate-fade-in">
      <h2 className="font-serif text-3xl md:text-4xl text-ink-900 mb-2">
        Paisaje tipografico
      </h2>
      <p className="text-ink-500 mb-8 max-w-lg">
        Selecciona los roles tipograficos que necesitas para tu proyecto.
        Cada rol recibira su propia configuracion a lo largo del embudo.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ROLES.map(role => {
          const selected = state.roles.includes(role.id);
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => toggleRole(role.id)}
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
                  <h3 className={`font-semibold text-lg ${selected ? 'text-terracotta-600' : 'text-ink-900'}`}>
                    {role.label}
                  </h3>
                  <p className="text-sm text-ink-500 mt-1">{role.description}</p>
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

      {state.roles.length === 0 && (
        <p className="text-sm text-terracotta-500 mt-4">
          Selecciona al menos un rol para continuar.
        </p>
      )}
    </div>
  );
}
