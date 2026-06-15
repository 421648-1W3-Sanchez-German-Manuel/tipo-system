import { createContext, useContext, useReducer, type ReactNode } from 'react';
import { type FormState, type RoleId, type FormaFuncionRoleData, type EconomicoPrincipal, createInitialState } from '../types';

type Action =
  | { type: 'SET_NOMBRE_PROYECTO'; nombre: string }
  | { type: 'SET_ROLES'; roles: RoleId[] }
  | { type: 'TOGGLE_ECON_PRINCIPAL'; value: EconomicoPrincipal }
  | { type: 'TOGGLE_ECON_GRATUITA'; value: string }
  | { type: 'TOGGLE_ECON_CON_COSTO'; value: string }
  | { type: 'TOGGLE_LICENCIA'; licencia: string }
  | { type: 'SET_FORMA_FUNCION'; role: RoleId; data: Partial<FormaFuncionRoleData> }
  | { type: 'SET_ORTOTIPOGRAFICA'; role: RoleId; field: string; value: boolean }
  | { type: 'SET_FORMAL'; role: RoleId; field: string; value: string }
  | { type: 'TOGGLE_TECNICA_SOPORTE'; soporte: string }
  | { type: 'TOGGLE_TECNICA_METODO'; metodo: string }
  | { type: 'TOGGLE_ESTETICA'; id: string }
  | { type: 'RESET' };

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'SET_NOMBRE_PROYECTO':
      return { ...state, nombreProyecto: action.nombre };

    case 'SET_ROLES':
      return { ...state, roles: action.roles };

    case 'TOGGLE_ECON_PRINCIPAL': {
      const isOn = state.economico.principales.includes(action.value);
      const principales = isOn
        ? state.economico.principales.filter(p => p !== action.value)
        : [...state.economico.principales, action.value];
      const gratuita = isOn && action.value === 'gratuita' ? [] : state.economico.gratuita;
      const conCosto = isOn && action.value === 'con_costo' ? [] : state.economico.conCosto;
      const licencias = isOn && action.value === 'licencias' ? [] : state.economico.licencias;
      return { ...state, economico: { ...state.economico, principales, gratuita, conCosto, licencias } };
    }

    case 'TOGGLE_ECON_GRATUITA': {
      const gratuita = state.economico.gratuita.includes(action.value)
        ? state.economico.gratuita.filter(g => g !== action.value)
        : [...state.economico.gratuita, action.value];
      return { ...state, economico: { ...state.economico, gratuita } };
    }

    case 'TOGGLE_ECON_CON_COSTO': {
      const conCosto = state.economico.conCosto.includes(action.value)
        ? state.economico.conCosto.filter(c => c !== action.value)
        : [...state.economico.conCosto, action.value];
      return { ...state, economico: { ...state.economico, conCosto } };
    }

    case 'TOGGLE_LICENCIA': {
      const licencias = state.economico.licencias.includes(action.licencia)
        ? state.economico.licencias.filter(l => l !== action.licencia)
        : [...state.economico.licencias, action.licencia];
      return { ...state, economico: { ...state.economico, licencias } };
    }

    case 'SET_FORMA_FUNCION':
      return {
        ...state,
        formaFuncion: {
          ...state.formaFuncion,
          [action.role]: { ...state.formaFuncion[action.role], ...action.data },
        },
      };

    case 'SET_ORTOTIPOGRAFICA':
      return {
        ...state,
        formaFuncion: {
          ...state.formaFuncion,
          [action.role]: {
            ...state.formaFuncion[action.role],
            ortotipografica: {
              ...state.formaFuncion[action.role].ortotipografica,
              [action.field]: action.value,
            },
          },
        },
      };

    case 'SET_FORMAL':
      return {
        ...state,
        formaFuncion: {
          ...state.formaFuncion,
          [action.role]: {
            ...state.formaFuncion[action.role],
            formal: {
              ...state.formaFuncion[action.role].formal,
              [action.field]: action.value,
            },
          },
        },
      };

    case 'TOGGLE_TECNICA_SOPORTE': {
      const soporte = state.tecnica.soporte.includes(action.soporte)
        ? state.tecnica.soporte.filter(s => s !== action.soporte)
        : [...state.tecnica.soporte, action.soporte];
      return { ...state, tecnica: { ...state.tecnica, soporte } };
    }

    case 'TOGGLE_TECNICA_METODO': {
      const metodos = state.tecnica.metodoReproduccion.includes(action.metodo)
        ? state.tecnica.metodoReproduccion.filter(m => m !== action.metodo)
        : [...state.tecnica.metodoReproduccion, action.metodo];
      return { ...state, tecnica: { ...state.tecnica, metodoReproduccion: metodos } };
    }

    case 'TOGGLE_ESTETICA': {
      const checklist = state.estetica.checklist.includes(action.id)
        ? state.estetica.checklist.filter(x => x !== action.id)
        : [...state.estetica.checklist, action.id];
      return { ...state, estetica: { checklist } };
    }

    case 'RESET':
      return createInitialState();

    default:
      return state;
  }
}

interface FormContextType {
  state: FormState;
  dispatch: React.Dispatch<Action>;
}

const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useForm must be used within FormProvider');
  return ctx;
}
