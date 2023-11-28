export const SEARCH_DEFAULT_OPTIONS = {
  configuration: { MINTOMAX: true, MAXTOMIN: false, MATCH: false },
};

export const COINCIDENCES = "COINCIDENCES";

export const CATEGORIES = [
  {value:-1, label:"Seleccione una categoria"},
  {value:1, label:"Tecnología / Electrónica"},
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
]

export const STORE_BY_CATEGORY = [
  {category:1, stores:[2,7,14,918,32,35]}
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
] 

const checkIcon=`<div class="checkIcon"><svg class="w-3.5 h-3.5 mr-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
</svg></div>`

export const AUTH_MESSAGES = [
  {
    id: "CredentialsSignin",
    title:"Ocurrió un error al autenticarse, favor verifique.",
    time:5000,
    type:"TIMER",
    message: "Ventana se cerrará en <b></b> segundos.",
  },
  {
    id:"UserDoesNotExist",
    title:"Usuario no existe, favor verifique.",
    time:5000,
    type:"TIMER",
    message: "Ventana se cerrará en <b></b> segundos.",
  },
  {
    id:"AuthBadProvider",
    title:"Utilizaste otro proveedor para la autenticación, favor verifica.",
    time:5000,
    type:"TIMER",
    message: "Ventana se cerrará en <b></b> segundos.",
  },
  {
    id:"BadPassword",
    title:"Credenciales incorrectas, favor verifica.",
    time:5000,
    type:"TIMER",
    message: "Ventana se cerrará en <b></b> segundos.",
  },
  {
    id:"UserDoesExist",
    title:"Usuario ya existe, favor verifica.",
    time:5000,
    type:"TIMER",
    message: "Ventana se cerrará en <b></b> segundos.",
  },
  {
    id: "PasswordValidationFormat",
    title:"Error en formato de contraseña",
    time:7000,
    type:"TIMER",
    message:
      `<h2 class="mb-2 text-lg font-semibold text-gray-900" >Su contraseña no cumple con las siguientes condiciones:</h2> <br/>
      <ul class="max-w-md space-y-1 text-red-500 list-disc ">
      <li class="li-list"> ${checkIcon} <p>Al menos una letra mayúscula</p></li>
      <li class="li-list" > ${checkIcon}Al menos una letra minúscula</li>
      <li class="li-list"> ${checkIcon}Al menos un número del 1 al 9</li>
      <li class="li-list"> ${checkIcon}Al menos una caracter especial</li>
      <li class="li-list"> ${checkIcon}Longitud mínima de 8 caracteres</li>
      </ul> <br/> Ventana se cerrará en <b></b> segundos.`,
  },
];  

export const NOT_CONTROLED_ERROR = "Error no controlado, favor intente nuevamente."

export const PASSWORD_VAL_MESSAGE = ""

export const AUTH_CREDENTIALS = "QZqynwDHyoKNAWWhnpydAkCBFYDtjOoSVHwPlwOuRRX2pcXPQFu0Sw1DGxdyoKzl2jjeKiplxE+QhxETejPRxhE4RkWh+UL13ufMZ0a4SDouzz3Uf1sS9ULpaUeG31fYlAabT9CUmV8z24fszNUqAPSHNJl62v7tREVZA+7SqAo=";

export const USER_ACCEPTED_CONFIGURATION = {userTerms:{userReviewedTerms:false, allCookies: false, esentialCookies:false, termsConditions:false}};