import { createContext, useContext, useReducer, type ReactNode } from 'react';
import { type FormState, type RoleId, type FormaFuncionRoleData, createInitialState } from '../types';

type Action =
  | { type: 'SET_ROLES'; roles: RoleId[] }
  | { type: 'SET_PRESUPUESTO'; value: FormState['economico']['presupuesto'] }
  | { type: 'TOGGLE_LICENCIA'; licencia: string }
  | { type: 'SET_FORMA_FUNCION'; role: RoleId; data: Partial<FormaFuncionRoleData> }
  | { type: 'SET_ORTOTIPOGRAFICA'; role: RoleId; field: string; value: boolean }
  | { type: 'SET_FORMAL'; role: RoleId; field: string; value: string }
  | { type: 'TOGGLE_TECNICA_MEDIO'; medio: string }
  | { type: 'TOGGLE_TECNICA_METODO'; metodo: string }
  | { type: 'TOGGLE_TECNICA_OPTIMIZACION'; opt: string }
  | { type: 'SET_ESTETICA'; field: string; value: string }
  | { type: 'RESET' };

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'SET_ROLES':
      return { ...state, roles: action.roles };

    case 'SET_PRESUPUESTO':
      return { ...state, economico: { ...state.economico, presupuesto: action.value } };

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

    case 'TOGGLE_TECNICA_MEDIO': {
      const medios = state.tecnica.compatibilidadMedios.includes(action.medio)
        ? state.tecnica.compatibilidadMedios.filter(m => m !== action.medio)
        : [...state.tecnica.compatibilidadMedios, action.medio];
      return { ...state, tecnica: { ...state.tecnica, compatibilidadMedios: medios } };
    }

    case 'TOGGLE_TECNICA_METODO': {
      const metodos = state.tecnica.metodoReproduccion.includes(action.metodo)
        ? state.tecnica.metodoReproduccion.filter(m => m !== action.metodo)
        : [...state.tecnica.metodoReproduccion, action.metodo];
      return { ...state, tecnica: { ...state.tecnica, metodoReproduccion: metodos } };
    }

    case 'TOGGLE_TECNICA_OPTIMIZACION': {
      const opts = state.tecnica.optimizacion.includes(action.opt)
        ? state.tecnica.optimizacion.filter(o => o !== action.opt)
        : [...state.tecnica.optimizacion, action.opt];
      return { ...state, tecnica: { ...state.tecnica, optimizacion: opts } };
    }

    case 'SET_ESTETICA':
      return { ...state, estetica: { ...state.estetica, [action.field]: action.value } };

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
