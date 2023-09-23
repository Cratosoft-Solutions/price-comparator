export const SEARCH_DEFAULT_OPTIONS = {
  configuration: { MINTOMAX: false, MAXTOMIN: false, MATCH: false },
};

export const COINCIDENCES = "COINCIDENCES";

export const CATEGORIES = [
  {value:-1, label:"Categoria"},
  {value:1, label:"Tecnología / Electrónica"},
  {value:2, label:"Hogar / Linea Blanca"},
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
  //{value:13, label:"Otro Metodo Scraping"},
]

//PUPPETEER
//10,11,12,13,16,18,19,21,22,23,25

export const STORE_BY_CATEGORY = [
//{category:1, stores:[1,92]},
{category:1, stores:[910,911,912,913,901,2,3,4,5,6,7,8,9,17]},
//{category:1, stores:[10,11,12,13]},
{category:2, stores:[910,911,912,913,916,901,2,3,4,5,7,8,9,14,15]},
{category:3, stores:[910,911,912,901,2,3,4,5,7,9]},
{category:4, stores:[910,911,912,901,2,3,4,5,17]},
{category:5, stores:[916,918,19,901,4,8,14,15,26]}, 
//{category:6, stores:[4]}, 
{category:6, stores:[901,4,921,920,14]}, 
{category:7, stores:[901,3,4,920,8,14,24,922,923,912,913,921,25]},
//{category:7, stores:[23]},
{category:8, stores:[912,913,901,4,6,8,14]},
{category:9, stores:[912,4,8,14,17]},
{category:10, stores:[912,913,901,4,6,8,14]},
{category:11, stores:[913,901,8,14,17]},
//{category:11, stores:[13]},
{category:12, stores:[912,901,4,6,8]},
//{category:12, stores:[12]},
/* {category:13, stores:[901,910,911,912,913,916,918,920,921,922,923]} 
{category:13, stores:[922]}*/
] 
