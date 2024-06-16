import { FaColonSign } from "react-icons/fa6";
import { IoMdDoneAll } from "react-icons/io";
import { MdOutlineContactPhone } from "react-icons/md";
import { FaUsersLine } from "react-icons/fa6";


//MESSAGING STORE
export const IMAGES_FORMAT_ACCEPTED = [
  "image/svg+xml",
  "image/png",
  "image/jpeg",
];
export const IMAGE_PRINCIPAL_STORE_DIMENSION = { width: 3840, height: 2160 };
export const IMAGE_PRODUCT_STORE_DIMENSION = { width: 3840, height: 2160 };
export const IMAGE_CATEGORY_STORE_DIMENSION = { width: 3840, height: 2160 };
export const CAROUSEL_STORE_DIMENSION = { width: 3840, height: 2160 };
export const STORE_SAVE_CONFIRM_ACTION = {
  message: "¿Seguro de guardar los cambios?",
  showCancelButton: true,
  okText: "Estoy Seguro",
  cancelText: "Cancelar",
  processToExecute: "SAVESTORE",
};
export const IMAGE_LOADED_CONFIRM_ACTION = {
  message: "¡Imagen cargada correctamente!",
  showCancelButton: false,
  okText: "¡Entendido!",
  cancelText: "Cancelar",
};
export const IMAGE_FAILED_CONFIRM_ACTION = {
  showCancelButton: false,
  okText: "¡Entendido!",
  cancelText: "Cancelar",
};
export const IMAGE_MAX_PASSED = {
  message: "¡Solamente puedes subir 5 imágenes por producto!",
  showCancelButton: false,
  okText: "¡Entendido!",
  cancelText: "Cancelar",
};
export const DROPDOWN_NEED_TB_SELECTED = {
  showCancelButton: false,
  okText: "¡Entendido!",
  cancelText: "Cancelar",
};
export const GENERAL_UKNOWN_ERROR = {
  showCancelButton: false,
  okText: "¡Entendido!",
  cancelText: "Cancelar",
};
export const GENERAL_SUCCESS_PROCESS = {
  message: "Proceso ejecutado correctamante.",
  showCancelButton: false,
  okText: "¡Entendido!",
  cancelText: "Cancelar",
};
export const PRODUCT_SAVE_CONFIRM_ACTION = {
  message: "¿Seguro de guardar los cambios?",
  showCancelButton: true,
  okText: "Estoy Seguro",
  cancelText: "Cancelar",
  processToExecute: "SAVEPRODUCT",
};
export const CATEGORY_SAVE_CONFIRM_ACTION = {
  message: "¿Seguro de guardar los cambios?",
  showCancelButton: true,
  okText: "Estoy Seguro",
  cancelText: "Cancelar",
  processToExecute: "SAVECATEGORY",
};
export const CAROUSEL_SAVE_CONFIRM_ACTION = {
  message: "¿Seguro de guardar los cambios?",
  showCancelButton: true,
  okText: "Estoy Seguro",
  cancelText: "Cancelar",
  processToExecute: "SAVECAROUSEL",
};

//LISTS
export const CURRENCY_LIST = [
  { value: "CRC", label: "Colones", feSimbol: "₡" },
  { value: "USD", label: "Dólares", feSimbol: "$" },
];
export const CATEGORY_TYPES = [
  { value: "PRODUCT", label: "Productos" },
  { value: "CAR", label: "Autos" },
  { value: "SERVICES", label: "Servicios" },
  { value: "HOUSES", label: "Casas / Apartamentos" },
];
export const SERVICES_TYPES = [
  { value: "ACA", label: "Académicos" },
  { value: "TRA", label: "Transporte" },
  { value: "TUR", label: "Turismo" },
  { value: "ENT", label: "Entretenimiento" },
  { value: "HOT", label: "Hoteleros" },
  { value: "MANT", label: "Mantenimiento" },
  { value: "LIM", label: "Limpieza" },
  { value: "INF", label: "Informáticos" },
  { value: "GAS", label: "Gastronómicos" },
];
export const PROVINCES = [
  { value: "ALA", label: "Alajuela" },
  { value: "CAR", label: "Cartago" },
  { value: "GUA", label: "Guanacaste" },
  { value: "HER", label: "Heredia" },
  { value: "LIM", label: "Limón" },
  { value: "PUN", label: "Puntarenas" },
  { value: "SJO", label: "San José" },
];
export const MODALITY_TYPES = [
  { value: "FIS", label: "Física" },
  { value: "VIR", label: "Virtual" },
  { value: "AMB", label: "Física y Virtual" },
];
export const CATEGORY_DEFAULT_LIST = [
  { value: "SELECT", label: "Seleccione una categoria" },
];
export const STORE_BACKGROUND_DIRECTION = [
  { value: "bbg-gradient-to-r", label: "Izquierda a Derecha" },
  { value: "bbg-gradient-to-t", label: "Hacia arriba" },
  { value: "bbg-gradient-to-tr", label: "De Arriba hacia Derecha" },
  { value: "bbg-gradient-to-br", label: "Izquierda a Derecha" },
  { value: "bbg-gradient-to-b", label: "De Abajo a Derecha" },
  { value: "bbg-gradient-to-bl", label: "De Arriba a Izquierda" },
  { value: "bbg-gradient-to-l", label: "Hacia la Izquierda" },
  { value: "bbg-gradient-to-tl", label: "Hacia Arriba e Izquierda" },
];

export const GENERAL_YESNO = [
  { value: "NO", label: "NO" },
  { value: "YES", label: "SI" },
];
export const GENERAL_PROVINCES = [
  { value: "SJO", label: "SAN JOSÉ" },
  { value: "HEREDIA", label: "HEREDIA" },
  { value: "HRD", label: "HEREDIA" },
  ,
  { value: "ALJ", label: "ALAJUELA" },
  { value: "CTG", label: "CARTAGO" },
  ,
  { value: "PTO", label: "PUNTARENAS" },
  ,
  { value: "GNC", label: "GUANACASTE" },
  { value: "LMN", label: "LIMÓN" },
];

export const CARD_BRANDS = [
  { value: "SELECT", label: "Seleccione una marca" },
  { value: "1", label: "ACURA" },
  { value: "2", label: "ALFA ROMEO" },
];
export const CARD_STYLES = [
  { value: "SELECT", label: "Seleccione un estílo" },
  { value: "1", label: "SEDÁN" },
  { value: "2", label: "PÁNEL" },
];
export const CARD_STATUS = [
  { value: "1", label: "Excelente" },
  { value: "2", label: "Muy bueno" },
  { value: "3", label: "Bueno" },
  { value: "4", label: "Regular" },
];
export const CARD_COMBUSTIBLE = [
  { value: "1", label: "Gasolina" },
  { value: "2", label: "Diesel" },
  { value: "3", label: "Híbrido" },
  { value: "4", label: "Eléctrico" },
];
export const CARD_TRANSMITION = [
  { value: "1", label: "Manual" },
  { value: "2", label: "Automática" },
];
export const CARD_KMMI = [
  { value: "1", label: "Kilómetros", label2: "km" },
  { value: "2", label: "Millas", label2: "mi" },
];
export const CARD_EQUIPMENT = [
  { value: "1", label: "Dirección Hidráulica" },
  { value: "2", label: "Cierre Central" },
  { value: "3", label: "Asientos Eléctricos" },
  { value: "4", label: "Vidrios Tintados" },
  { value: "5", label: "Bolsa(s) de Aire" },
  { value: "6", label: "Vidrios Eléctricos" },
  { value: "7", label: "Espejos Eléctricos" },
  { value: "8", label: "Alarma" },
  { value: "9", label: "Frenos ABS" },
  { value: "10", label: "Aire Acondicionado" },
  { value: "11", label: "Desempañador Trasero" },
  { value: "12", label: "Sunroof/techo panorámico" },
  { value: "13", label: "Aros de Lujo" },
  { value: "14", label: "Turbo" },
  { value: "15", label: "Tapicería de Cuero" },
  { value: "16", label: "Halógenos" },
  { value: "17", label: "Cassette" },
  { value: "18", label: "Disco Compacto (DVD)" },
  { value: "19", label: "Cruise Control" },
  { value: "20", label: "Radio con USB/AUX" },
  { value: "21", label: "Revisión Técnica al día" },
  { value: "22", label: "Control Electrónico de Estabilidad" },
  { value: "23", label: "Control de Descenso" },
  { value: "24", label: "Caja de Cambios Dual" },
  { value: "25", label: "Cámara de Retroceso" },
  { value: "26", label: "Sensores de Retroceso" },
  { value: "27", label: "Sensores Frontales" },
  { value: "28", label: "Control de Radio en el Volante" },
  { value: "29", label: "Volante Multifuncional" },
  { value: "30", label: "Aire Acondicionado Climatizado" },
  { value: "31", label: "Asiento(s) con Memoria" },
  { value: "32", label: "Retrovisores Auto-Retractibles" },
  { value: "33", label: "Luces de Xenón/Bixenón" },
  { value: "34", label: "Sensor de Lluvia" },
  { value: "35", label: "Llave Inteligente/Botón de Arranque" },
  { value: "36", label: "Monitor de Presión de Llantas" },
  { value: "37", label: "Computadora de Viaje" },
  { value: "38", label: "Volante Ajustable" },
  { value: "39", label: "Bluetooth" },
];

export const HOUSE_VENDOR_TYPE = [
  { value: "1", label: "Propietario" },
  { value: "2", label: "Agente" },
  { value: "3", label: "Constructora" },
  { value: "4", label: "Promotora" },
];
export const HOUSE_FLOOR_TYPE = [
  { value: "1", label: "Piedra" },
  { value: "2", label: "Mármol" },
  { value: "3", label: "Granito" },
  { value: "4", label: "Cerámica" },
  { value: "5", label: "Porcelanato" },
  { value: "6", label: "Madera" },
  { value: "7", label: "Alfombra" },
  { value: "8", label: "Vinyl" },
  { value: "9", label: "Otro" },
];
export const HOUSE_BALCONY_TERRACE = [
  { value: "SELECT", label: "Ninguno" },
  { value: "1", label: "Balcón" },
  { value: "2", label: "Terraza" },
];
export const HOUSE_PROPERTY_TYPE = [
  { value: "1", label: "Edificio" },
  { value: "2", label: "Condominio" },
  { value: "3", label: "Urbanización" },
  { value: "4", label: "Otro" },
];
export const HOUSE_BENEFITS = [
  { value: "1", label: "Cerca de Escuela" },
  { value: "2", label: "Pet Friendly" },
  { value: "3", label: "Cerca del Tráfico" },
  { value: "4", label: "Vista al Mar" },
  { value: "5", label: "Vista al Lago" },
  { value: "6", label: "Vista a las Montañas" },
  { value: "7", label: "Frente al Mar" },
  { value: "8", label: "Frente al Lago" },
  { value: "9", label: "Frente al Río" },
  { value: "10", label: "Parking bajo techo" },
  { value: "11", label: "Parking de visitas" },
  { value: "12", label: "Cuarto y baño de empleada" },
  { value: "13", label: "Seguridad 24 Horas" },
  { value: "14", label: "2 o más elevadores" },
  { value: "15", label: "Lavandería interna" },
  { value: "16", label: "1 Studio" },
  { value: "17", label: "2 o más estudios" },
  { value: "18", label: "Depósito" },
  { value: "19", label: "Salón de fiestas" },
  { value: "20", label: "Jardín" },
  { value: "21", label: "Parque Infantil" },
  { value: "22", label: "Gimnasio" },
  { value: "23", label: "Desayunador" },
  { value: "24", label: "Aire acondicionado" },
  { value: "25", label: "Patio" },
  { value: "26", label: "Aire acondicionado central" },
  { value: "27", label: "Terreno en esquina" },
  { value: "28", label: "Calle sin salida" },
  { value: "29", label: "Garaje techado" },
  { value: "30", label: "Sala y Comedor" },
  { value: "31", label: "Área Social" },
  { value: "32", label: "Walk-in closet" },
  { value: "33", label: "Área de BBQ" },
  { value: "34", label: "Lobby" },
  { value: "35", label: "Planta Eléctrica" },
  { value: "36", label: "Jacuzzi" },
  { value: "37", label: "Bar" },
  { value: "38", label: "Nevera" },
  { value: "39", label: "Microondas" },
  { value: "40", label: "Estufa" },
  { value: "41", label: "Lavaplatos" },
  { value: "42", label: "Dispensador de agua caliente" },
  { value: "43", label: "Calentador de agua" },
  { value: "44", label: "Lavadora" },
  { value: "45", label: "Secadora" },
];

//SCRAP
export const SEARCH_DEFAULT_OPTIONS = {
  configuration: { MINTOMAX: true, MAXTOMIN: false, MATCH: false },
};

export const VERTICAL_NAV_STATUS = {
  myStoreNav: { selectedOption: "configuration", expandedNavBar: false },
  productSearch: { expandedNavBar: false },
};

import { IoMdSettings } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { MdAddShoppingCart } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { translateCategory } from "./functions";

export const COINCIDENCES = "COINCIDENCES";

export const CATEGORIES = [
  /*{value:-1, label:"Seleccione una categoria"},*/
  { value: 1, label: "Tecnología / Electrónica" },
  /* {value:2, label:"Hogar / Linea Blanca"},
  {value:3, label:"Celulares"},
  {value:4, label:"Computación"},
  {value:5, label:"Ferreteria"},
  {value:6, label:"Supermercados"},
  {value:7, label:"Farmacias / Cuidado Personal / Belleza"},
  {value:8, label:"Departamental"},
  {value:9, label:"Oficina"},
  {value:10, label:"Juguetería"},
  {value:11, label:"Escolar"},
  {value:12, label:"Ropa / Calzado"},
  {value:13, label:"Fitness"}, */
];

export const STORE_BY_CATEGORY = [
  { category: 1, stores: [2, 7, 14, 918, 32, 35] },
  /* {category:1, stores:[912,913,901,2,3,4,5,6,7,8,9,17,29,30,32,933,934,35,910,911]},
{category:2, stores:[912,913,916,901,2,3,4,5,7,8,9,14,15,30,31,32,933,35,910,911]},
{category:3, stores:[912,901,2,3,4,5,7,9,29,32,933,934,35,910,911]},
{category:4, stores:[912,901,2,3,4,5,17,29,32,933,934,35,910,911]},
{category:5, stores:[916,918,901,4,8,14,15,26]}, 
{category:6, stores:[901,4,921,920,14]}, 
{category:7, stores:[901,3,4,920,8,14,24,922,923,912,913,921,25,927,30,933,35]},
{category:8, stores:[912,913,901,4,6,8,14,30,933]},
{category:9, stores:[912,4,8,14,17,933,934]},
{category:10, stores:[28,912,913,901,4,6,8,14,30,933]},
{category:11, stores:[913,901,8,14,17,30]},
{category:12, stores:[912,901,4,6,8,30]},
 {category:13, stores:[901,2,4,6,35,8,912,913,14,30,933,910,911]} */
];

const checkIcon = `<div class="checkIcon"><svg class="w-3.5 h-3.5 mr-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
</svg></div>`;

export const AUTH_MESSAGES = [
  {
    id: "CredentialsSignin",
    title: "Ocurrió un error al autenticarse, favor verifique.",
    time: 5000,
    type: "TIMER",
    message: "Ventana se cerrará en <b></b> segundos.",
  },
  {
    id: "UserDoesNotExist",
    title: "Usuario no existe, favor verifique.",
    time: 5000,
    type: "TIMER",
    message: "Ventana se cerrará en <b></b> segundos.",
  },
  {
    id: "AuthBadProvider",
    title: "Utilizaste otro proveedor para la autenticación, favor verifica.",
    time: 5000,
    type: "TIMER",
    message: "Ventana se cerrará en <b></b> segundos.",
  },
  {
    id: "BadPassword",
    title: "Credenciales incorrectas, favor verifica.",
    time: 5000,
    type: "TIMER",
    message: "Ventana se cerrará en <b></b> segundos.",
  },
  {
    id: "UserDoesExist",
    title: "Usuario ya existe, favor verifica.",
    time: 5000,
    type: "TIMER",
    message: "Ventana se cerrará en <b></b> segundos.",
  },
  {
    id: "PasswordValidationFormat",
    title: "Error en formato de contraseña",
    time: 7000,
    type: "TIMER",
    message: `<h2 class="mb-2 text-lg font-semibold text-gray-900" >Su contraseña no cumple con las siguientes condiciones:</h2> <br/>
      <ul class="max-w-md space-y-1 text-red-500 list-disc ">
      <li class="li-list"> ${checkIcon} <p>Al menos una letra mayúscula</p></li>
      <li class="li-list" > ${checkIcon}Al menos una letra minúscula</li>
      <li class="li-list"> ${checkIcon}Al menos un número del 1 al 9</li>
      <li class="li-list"> ${checkIcon}Al menos una caracter especial</li>
      <li class="li-list"> ${checkIcon}Longitud mínima de 8 caracteres</li>
      </ul> <br/> Ventana se cerrará en <b></b> segundos.`,
  },
];

export const NOT_CONTROLED_ERROR =
  "Error no controlado, favor intente nuevamente.";

export const PASSWORD_VAL_MESSAGE = "";

export const AUTH_CREDENTIALS =
  "QZqynwDHyoKNAWWhnpydAkCBFYDtjOoSVHwPlwOuRRX2pcXPQFu0Sw1DGxdyoKzl2jjeKiplxE+QhxETejPRxhE4RkWh+UL13ufMZ0a4SDouzz3Uf1sS9ULpaUeG31fYlAabT9CUmV8z24fszNUqAPSHNJl62v7tREVZA+7SqAo=";

export const USER_ACCEPTED_CONFIGURATION = {
  userTerms: {
    userReviewedTerms: true,
    allCookies: false,
    esentialCookies: false,
    termsConditions: false,
  },
};

export const VERTICAL_NAV_CONFIGURATION = [
  {
    btnNAVPage: "myStore",
    btnDescription: "Regresar",
    btnID: "HOME",
    isPrincipal: true,
    icon: <IoMdHome className="w-4 h-4" color="black" />,
  },
  {
    btnNAVPage: "myStore",
    btnDescription: "Configuración",
    btnID: "CONFIG",
    isPrincipal: false,
    icon: <IoMdSettings className="w-4 h-4" color="black" />,
  },
  {
    btnNAVPage: "myStore",
    btnDescription: "Agregar Item",
    btnID: "ADDPRODUCT",
    isPrincipal: false,
    icon: <MdAddShoppingCart className="w-4 h-4" color="black" />,
  },
  {
    btnNAVPage: "myStore",
    btnDescription: "Mis items",
    btnID: "LISTITEM",
    isPrincipal: false,
    icon: <FaList className="w-4 h-4" color="black" />,
  },

  {
    btnNAVPage: "productSearch",
    btnDescription: "Nueva Búsqueda",
    btnID: "NEWSEARCH",
    isPrincipal: true,
    icon: <IoMdHome className="w-4 h-4" color="black" />,
  },
  {
    btnNAVPage: "productSearch",
    btnDescription: "Precio Menor",
    btnID: "MINTOMAX",
    isPrincipal: false,
    icon: <IoMdSettings className="w-4 h-4" color="black" />,
  },
  {
    btnNAVPage: "productSearch",
    btnDescription: "Precio Mayor",
    btnID: "MAXTOMIN",
    isPrincipal: false,
    icon: <MdAddShoppingCart className="w-4 h-4" color="black" />,
  },
  {
    btnNAVPage: "productSearch",
    btnDescription: "Exacto",
    btnID: "MATCH",
    isPrincipal: false,
    icon: <FaList className="w-4 h-4" color="black" />,
  },

  {
    btnNAVPage: "home",
    btnDescription: "Publica tu producto / Servicio",
    btnID: "PUBLISH",
    isPrincipal: true,
    icon: <IoMdHome className="w-4 h-4" color="black" />,
  },
  {
    btnNAVPage: "home",
    btnDescription: "Promociona tu sitio web",
    btnID: "PROMOTION",
    isPrincipal: false,
    icon: <IoMdSettings className="w-4 h-4" color="black" />,
  },
  {
    btnNAVPage: "home",
    btnDescription: "Vender con EncuentráloFácilCR",
    btnID: "SALE",
    isPrincipal: false,
    icon: <MdAddShoppingCart className="w-4 h-4" color="black" />,
  },
  {
    btnNAVPage: "home",
    btnDescription: "¿Cómo funciona?",
    btnID: "HOWITWORKS",
    isPrincipal: false,
    icon: <FaList className="w-4 h-4" color="black" />,
  },
];

export const BLACK_LISTED_KEYWORDS = [
  "puta",
  "puto",
  "perra",
  "bitch",
  "fuck",
  "picha",
  "malparido",
];

export const PAGES_WITH_NAV = ["/search/results", "/mystore"];

export const EXCLUDE_SITE_MAP = ["/"];

export const SITE_MAP = [
  {
    path:"/search/results",
    mapTree:[
      {
       order:1,
       text:"Home",
       url: "/",
       lastPath:false
      },
      {
        order:2,
        text:"TRANSLATECATEGORY",
        url: "",
        lastPath:true
       }
    ]
  },
  {
    path:"/login",
    mapTree:[
      {
       order:1,
       text:"Home",
       url: "/",
       lastPath:false
      },
      {
        order:2,
        text:"Registro - Ingreso",
        url: "",
        lastPath:true
       }
    ]
  },
  {
    path:"/register",
    mapTree:[
      {
       order:1,
       text:"Home",
       url: "/",
       lastPath:false
      },
      {
        order:2,
        text:"Registro - Ingreso",
        url: "",
        lastPath:true
       }
    ]
  },
  {
    path:"/termsandconditions",
    mapTree:[
      {
       order:1,
       text:"Home",
       url: "/",
       lastPath:false
      },
      {
        order:2,
        text:"Términos y condiciones",
        url: "",
        lastPath:true
       }
    ]
  },
  {
    path:"/termsrejected",
    mapTree:[
      {
       order:1,
       text:"Home",
       url: "/",
       lastPath:false
      },
      {
        order:2,
        text:"Términos Rechazados",
        url: "",
        lastPath:true
       }
    ]
  },
  {
    path:"/unauthorized",
    mapTree:[
      {
       order:1,
       text:"Home",
       url: "/",
       lastPath:false
      },
      {
        order:2,
        text:"Página no autorizada",
        url: "",
        lastPath:true
       }
    ]
  },
  ,
  {
    path:"/_not-found",
    mapTree:[
      {
       order:1,
       text:"Home",
       url: "/",
       lastPath:false
      },
      {
        order:2,
        text:"Página no encontrada",
        url: "",
        lastPath:true
       }
    ]
  },
  {
    path:"/promotion",
    mapTree:[
      {
       order:1,
       text:"Home",
       url: "/",
       lastPath:false
      },
      {
        order:2,
        text:"Promociones",
        url: "",
        lastPath:true
       }
    ]
  },
  {
    path:"/sale",
    mapTree:[
      {
       order:1,
       text:"Home",
       url: "/",
       lastPath:false
      },
      {
        order:2,
        text:"Ventas",
        url: "",
        lastPath:true
       }
    ]
  },
  {
    path:"/howtouse",
    mapTree:[
      {
       order:1,
       text:"Home",
       url: "/",
       lastPath:false
      },
      {
        order:2,
        text:"Forma de uso",
        url: "",
        lastPath:true
       }
    ]
  },
  {
    path:"/mystore",
    mapTree:[
      {
       order:1,
       text:"Home",
       url: "/",
       lastPath:false
      },
      {
        order:2,
        text:"Mi tienda",
        url: "",
        lastPath:true
       }
    ]
  }

];



export const BASIC_PRODUCT_MODEL = {
  storeId: null,
  productId: null,
  isLocal: null,
  productPrice: null,
  vendorLink: null,
  productImage: null,
  productName: null,
  productDescription: null,
  formatedPrice: null,
  currency: null,
  formatedEspecialPrice: null,
  productSpecialPrice: null,
};


export const MAIN_PAGE_INFO_CARD=[
  {icon:FaColonSign, title:"No pagas caprichos", description:"Libérate de los precios exorbitantes al publicitar tu anuncio. Descubre nuestras opciones de paquetes promocionales, diseñadas para adaptarse a tus necesidades a partir de un producto. "},
  {icon:MdOutlineContactPhone, title:"Agilidad en comunicación", description:"No restringimos el acceso a tu información de contacto. Tus clientes potenciales pueden comunicarse contigo al instante, sin ninguna limitación."},
  {icon:IoMdDoneAll, title:"Todo en un solo lugar", description:"Deshazte de la preocupación de tener que publicar tus productos o servicios en múltiples plataformas. Disfruta de la comodidad y confianza que te brinda una plataforma diseñada específicamente para ti."},
  {icon:FaUsersLine, title:"Audiencia", description:"Benefíciate de una plataforma con alcance nacional, donde cualquier persona en el país pueda acceder a tus anuncios de manera rápida y sencilla."},
]

export const BTN_SEARCH_DEFAULT_BEHAVIOUR = {
  size:'w-full',
  height:'h-10',
  fSize:'text-sm',
  displayImage:false,
  style:{},
  bgColor:'bg-[#E9E9E9]',
  bSize:'border-1',
  textColor:'text-gray-900',
  borderColor:'border-[#E9E9E9]',
  iconSearchColor:'currentcolor',
  placeHolderColor:'placeholder-gray-900',
  placeHolderText:'placeholder:text-left'}

export const DEFAULT_ITEMS_INFORMATION =[
  {
    redirectLink: `/sale`,
    productImage: 'https://encuentralofacilcr.com/assets/images/local-prom-item-1.svg',
    text:"¡Quiero vender!"
  },
  {
    redirectLink: `/`,
    productImage: 'https://encuentralofacilcr.com/assets/images/local-prom-item-2.svg',
    text:"¡A buscar!"
  },
  {
    redirectLink: `/promotion`,
    productImage: 'https://encuentralofacilcr.com/assets/images/local-prom-item-3.svg',
    text:"¡A ahorrar!"
  }

]