import { useForm } from '../../context/FormContext';
import { ESTETICA_CHECKLIST } from '../../types';

export default function StepEstetica() {
  const { state, dispatch } = useForm();
  const { checklist } = state.estetica;

  return (
    <div className="animate-fade-in">
      <h2 className="font-serif text-3xl md:text-4xl text-ink-900 mb-2">
        Plano Estético
      </h2>
      <p className="text-ink-500 mb-8 max-w-xl">
        Verificá que las tipografías candidatas cumplan con estos criterios estéticos.
        Marcá cada ítem a medida que confirmes que la fuente lo satisface.
      </p>

      <div className="flex flex-col gap-3 max-w-2xl">
        {ESTETICA_CHECKLIST.map(item => {
          const checked = checklist.includes(item.id);
          return (
            <label
              key={item.id}
              className={`
                flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all duration-200
                ${checked
                  ? 'border-terracotta-500 bg-white shadow-sm'
                  : 'border-ink-100 bg-white hover:border-ink-200'
                }
              `}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => dispatch({ type: 'TOGGLE_ESTETICA', id: item.id })}
                className="w-5 h-5 rounded mt-0.5 flex-shrink-0"
              />
              <div>
                <div className={`font-medium ${checked ? 'text-ink-900' : 'text-ink-700'}`}>
                  {item.label}
                </div>
                <p className="text-sm text-ink-500 mt-0.5">{item.desc}</p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
