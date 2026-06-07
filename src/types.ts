export type RoleId = 'titulo' | 'subtitulo' | 'cuerpo' | 'pie_imagen';

export interface RoleOption {
  id: RoleId;
  label: string;
  description: string;
}

export interface EconomicoData {
  presupuesto: 'gratuita' | 'con_costo' | '';
  licencias: string[];
}

export interface CompetenciaOrtotipografica {
  bold: boolean;
  italica: boolean;
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
  tono: string;
  jerarquia: string;
  volumen: string;
  ortotipografica: CompetenciaOrtotipografica;
  formal: CompetenciaFormal;
}

export interface TecnicaData {
  compatibilidadMedios: string[];
  metodoReproduccion: string[];
  optimizacion: string[];
}

export interface EsteticaData {
  tono: string;
  estilo: string;
  epoca: string;
  personalidadVisual: string;
  connotaciones: string;
  maridaje: string;
  relacionContenido: string;
  morfologiaTono: string;
}

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
  { id: 'webfont', label: 'Estaciones de trabajo (Webfont)' },
  { id: 'educativa', label: 'Licencia educativa' },
  { id: 'ong', label: 'Licencia ONG' },
  { id: 'moviles', label: 'Aplicaciones moviles / Libros' },
  { id: 'oem', label: 'Licencia OEM' },
];

export const STEPS = [
  { id: 'roles', label: 'Roles', shortLabel: 'Roles' },
  { id: 'economico', label: 'Plano Economico', shortLabel: 'Economico' },
  { id: 'forma', label: 'Forma y Funcion', shortLabel: 'Forma' },
  { id: 'tecnica', label: 'Plano Tecnico', shortLabel: 'Tecnica' },
  { id: 'estetica', label: 'Plano Estetico', shortLabel: 'Estetica' },
  { id: 'resultado', label: 'Resultado', shortLabel: 'Resultado' },
];

export function createEmptyFormaFuncion(): FormaFuncionRoleData {
  return {
    tono: '',
    jerarquia: '',
    volumen: '',
    ortotipografica: {
      bold: false,
      italica: false,
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
      presupuesto: '',
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
      metodoReproduccion: [],
      optimizacion: [],
    },
    estetica: {
      tono: '',
      estilo: '',
      epoca: '',
      personalidadVisual: '',
      connotaciones: '',
      maridaje: '',
      relacionContenido: '',
      morfologiaTono: '',
    },
  };
}
