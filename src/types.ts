export type RoleId = 'titulo' | 'subtitulo' | 'bajada' | 'cuerpo' | 'pie_imagen' | 'numero_pagina';

export interface RoleOption {
  id: RoleId;
  label: string;
  description: string;
}

export type EconomicoPrincipal = 'gratuita' | 'con_costo' | 'licencias';

export interface EconomicoData {
  principales: EconomicoPrincipal[];
  gratuita: string[];
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
  ascendentes: string;
  descendentes: string;
}

export interface FormaFuncionRoleData {
  ortotipografica: CompetenciaOrtotipografica;
  formal: CompetenciaFormal;
}

export interface TecnicaData {
  soporte: string[];
  metodoReproduccion: string[];
}

export interface EsteticaData {
  checklist: string[];
}

export const ESTETICA_CHECKLIST = [
  {
    id: 'relacion_contenido',
    label: 'Relación con el contenido',
    desc: 'La forma tipográfica acompaña y refuerza el sentido del texto.',
  },
  {
    id: 'connotaciones',
    label: 'Connotaciones histórico-culturales',
    desc: 'Evoca el período, contexto o referencia cultural adecuados.',
  },
  {
    id: 'tono_volumen',
    label: 'Tono y volumen',
    desc: 'La presencia visual (discreta o imponente) se ajusta al mensaje.',
  },
  {
    id: 'maridaje',
    label: 'Maridaje',
    desc: 'Combina coherentemente con las otras tipografías del sistema.',
  },
  {
    id: 'tipografia_acento',
    label: 'Tipografía de acento',
    desc: 'Existe una fuente de apoyo para destacar elementos puntuales.',
  },
];

export interface FormState {
  nombreProyecto: string;
  roles: RoleId[];
  economico: EconomicoData;
  formaFuncion: Record<RoleId, FormaFuncionRoleData>;
  tecnica: TecnicaData;
  estetica: EsteticaData;
}

export const ROLES: RoleOption[] = [
  { id: 'titulo', label: 'Título', description: 'Tipografía principal, mayor jerarquía visual' },
  { id: 'subtitulo', label: 'Subtítulo', description: 'Segundo nivel de jerarquía' },
  { id: 'bajada', label: 'Bajada', description: 'Texto introductorio que acompaña al título' },
  { id: 'cuerpo', label: 'Cuerpo', description: 'Texto de lectura continua' },
  { id: 'pie_imagen', label: 'Pie de imagen', description: 'Texto auxiliar y anotaciones' },
  { id: 'numero_pagina', label: 'Número de página', description: 'Foliado y referencias de paginación' },
];

export const LICENCIAS = [
  { id: 'desktop', label: 'Desktop' },
  { id: 'webfont', label: 'Webfont' },
  { id: 'educativa', label: 'Licenciatura educativa' },
  { id: 'ong', label: 'Licenciatura ONG' },
  { id: 'oem', label: 'Licenciatura OEM' },
  { id: 'moviles', label: 'App móviles / Libros' },
];

export const CON_COSTO_OPCIONES = [
  { id: 'distribuciones_grandes', label: 'Distribuciones grandes' },
  { id: 'subscripcion', label: 'Modelo de suscripción' },
  { id: 'compra_directa', label: 'Compra directa' },
  { id: 'alquiler', label: 'Alquiler' },
  { id: 'fuentes_medida', label: 'Fuentes a medida' },
];

export const GRATUITA_OPCIONES = [
  { id: 'donacion', label: 'Distribución por donación' },
  { id: 'nube', label: 'Uso temporal en la nube' },
  { id: 'open_source', label: 'Open source' },
  { id: 'dominio_publico', label: 'Dominio público' },
];

export const ECONOMICO_PRINCIPALES: { id: EconomicoPrincipal; label: string; desc: string }[] = [
  { id: 'gratuita', label: 'Distribución gratuita', desc: 'Tipografías de libre acceso' },
  { id: 'con_costo', label: 'Con costo', desc: 'Tipografías comerciales' },
  { id: 'licencias', label: 'Licencias', desc: 'Requerimientos de licencia de uso' },
];

export const SOPORTES = [
  { id: 'papel', label: 'Papel', desc: 'Soportes impresos' },
  { id: 'pantallas', label: 'Pantallas', desc: 'Web, aplicaciones, dispositivos digitales' },
];

export const METODOS_REPRODUCCION = [
  { id: 'offset', label: 'Impresión Offset', desc: 'Impresión litográfica para grandes tiradas' },
  { id: 'digital', label: 'Impresión digital', desc: 'Impresión láser o inkjet, tiradas cortas' },
  { id: 'flexografia', label: 'Flexografía', desc: 'Impresión sobre envases, etiquetas y sustratos flexibles' },
  { id: 'serigrafia', label: 'Serigrafía', desc: 'Impresión por estarcido sobre superficies variadas' },
  { id: 'web', label: 'Web', desc: 'Sitios web, aplicaciones e interfaces digitales' },
];

export const STEPS = [
  { id: 'roles', label: 'Tipos de texto', shortLabel: 'Tipos' },
  { id: 'economico', label: 'Plano Económico', shortLabel: 'Económico' },
  { id: 'forma', label: 'Forma y Función', shortLabel: 'Forma' },
  { id: 'tecnica', label: 'Plano Técnico', shortLabel: 'Técnica' },
  { id: 'estetica', label: 'Plano Estético', shortLabel: 'Estética' },
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
      ascendentes: '',
      descendentes: '',
    },
  };
}

export function createInitialState(): FormState {
  return {
    nombreProyecto: '',
    roles: [],
    economico: {
      principales: [],
      gratuita: [],
      conCosto: [],
      licencias: [],
    },
    formaFuncion: {
      titulo: createEmptyFormaFuncion(),
      subtitulo: createEmptyFormaFuncion(),
      bajada: createEmptyFormaFuncion(),
      cuerpo: createEmptyFormaFuncion(),
      pie_imagen: createEmptyFormaFuncion(),
      numero_pagina: createEmptyFormaFuncion(),
    },
    tecnica: {
      soporte: [],
      metodoReproduccion: [],
    },
    estetica: {
      checklist: [],
    },
  };
}
