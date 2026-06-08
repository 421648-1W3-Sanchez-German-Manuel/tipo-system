export type RoleId = 'titulo' | 'subtitulo' | 'cuerpo' | 'pie_imagen';

export interface RoleOption {
  id: RoleId;
  label: string;
  description: string;
}

export type EconomicoPrincipal = 'gratuita' | 'con_costo' | 'licencias';

export interface EconomicoData {
  principales: EconomicoPrincipal[];
  conCosto: string[];
  licencias: string[];
}

export interface CompetenciaOrtotipografica {
  versalitas: boolean;
  mayusculas: boolean;
  minusculas: boolean;
  numerosElzevirianos: boolean;
  ligaduras: boolean;
  caracteresMultilingue: boolean;
  numerosFracciones: boolean;
  signosMonetarios: boolean;
}

export interface CompetenciaFormal {
  alturaX: string;
  proporcionesHorizontales: string;
  espaciado: string;
  contraste: string;
}

export interface FormaFuncionRoleData {
  ortotipografica: CompetenciaOrtotipografica;
  formal: CompetenciaFormal;
}

export interface TecnicaData {
  compatibilidadMedios: string[];
  tiposPapel: string[];
  metodoReproduccion: string[];
}

export const TIPOS_PAPEL = [
  { id: 'poroso', label: 'Poroso', desc: 'Periodico, reciclado, offset sin estucar' },
  { id: 'encapado', label: 'Encapado / estucado', desc: 'Couche, satinado, arte' },
];

export interface EsteticaData {
  checklist: string[];
}

export const ESTETICA_CHECKLIST = [
  {
    id: 'relacion_contenido',
    label: 'Relacion con el contenido',
    desc: 'La forma tipografica acompania y refuerza el sentido del texto.',
  },
  {
    id: 'connotaciones',
    label: 'Connotaciones historico-culturales',
    desc: 'Evoca el periodo, contexto o referencia cultural adecuados.',
  },
  {
    id: 'tono_volumen',
    label: 'Tono y volumen',
    desc: 'La presencia visual (discreta o imponente) se ajusta al mensaje.',
  },
  {
    id: 'maridaje',
    label: 'Maridaje',
    desc: 'Combina coherentemente con las otras tipografias del sistema.',
  },
  {
    id: 'tipografia_acento',
    label: 'Tipografia de acento',
    desc: 'Existe una fuente de apoyo para destacar elementos puntuales.',
  },
];

export interface FormState {
  roles: RoleId[];
  economico: EconomicoData;
  formaFuncion: Record<RoleId, FormaFuncionRoleData>;
  tecnica: TecnicaData;
  estetica: EsteticaData;
}

export const ROLES: RoleOption[] = [
  { id: 'titulo', label: 'Titulo', description: 'Tipografia principal, mayor jerarquia visual' },
  { id: 'subtitulo', label: 'Subtitulo', description: 'Segundo nivel de jerarquia' },
  { id: 'cuerpo', label: 'Cuerpo', description: 'Texto de lectura continua' },
  { id: 'pie_imagen', label: 'Pie de imagen', description: 'Texto auxiliar y anotaciones' },
];

export const LICENCIAS = [
  { id: 'desktop', label: 'Desktop' },
  { id: 'webfont', label: 'Webfont' },
  { id: 'educativa', label: 'Licenciatura educativa' },
  { id: 'ong', label: 'Licenciatura ONG' },
  { id: 'oem', label: 'Licenciatura OEM' },
  { id: 'moviles', label: 'App moviles / Libros' },
];

export const CON_COSTO_OPCIONES = [
  { id: 'distribuciones_grandes', label: 'Distribuciones grandes' },
  { id: 'subscripcion', label: 'Modelo de subscripcion' },
  { id: 'compra_directa', label: 'Compra directa' },
  { id: 'alquiler', label: 'Alquiler' },
  { id: 'fuentes_medida', label: 'Fuentes a medida' },
];

export const ECONOMICO_PRINCIPALES: { id: EconomicoPrincipal; label: string; desc: string }[] = [
  { id: 'gratuita', label: 'Distribucion gratuita', desc: 'Tipografias de libre acceso' },
  { id: 'con_costo', label: 'Con costo', desc: 'Tipografias comerciales' },
  { id: 'licencias', label: 'Licencias', desc: 'Requerimientos de licencia de uso' },
];

export const STEPS = [
  { id: 'roles', label: 'Tipos de texto', shortLabel: 'Tipos' },
  { id: 'economico', label: 'Plano Economico', shortLabel: 'Economico' },
  { id: 'forma', label: 'Forma y Funcion', shortLabel: 'Forma' },
  { id: 'tecnica', label: 'Plano Tecnico', shortLabel: 'Tecnica' },
  { id: 'estetica', label: 'Plano Estetico', shortLabel: 'Estetica' },
  { id: 'resultado', label: 'Resultado', shortLabel: 'Resultado' },
];

export function createEmptyFormaFuncion(): FormaFuncionRoleData {
  return {
    ortotipografica: {
      versalitas: false,
      mayusculas: false,
      minusculas: false,
      numerosElzevirianos: false,
      ligaduras: false,
      caracteresMultilingue: false,
      numerosFracciones: false,
      signosMonetarios: false,
    },
    formal: {
      alturaX: '',
      proporcionesHorizontales: '',
      espaciado: '',
      contraste: '',
    },
  };
}

export function createInitialState(): FormState {
  return {
    roles: [],
    economico: {
      principales: [],
      conCosto: [],
      licencias: [],
    },
    formaFuncion: {
      titulo: createEmptyFormaFuncion(),
      subtitulo: createEmptyFormaFuncion(),
      cuerpo: createEmptyFormaFuncion(),
      pie_imagen: createEmptyFormaFuncion(),
    },
    tecnica: {
      compatibilidadMedios: [],
      tiposPapel: [],
      metodoReproduccion: [],
    },
    estetica: {
      checklist: [],
    },
  };
}
