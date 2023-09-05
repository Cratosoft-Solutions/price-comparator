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
]

//PUPPETEER
//10,11,12,13,16,18,19,21,22,23,25

export const STORE_BY_CATEGORY = [
{category:1, stores:[10,11,12,13,1,2,3,4,5,6,7,8,9]},
//{category:1, stores:[10,11,12,13]},
{category:2, stores:[10,11,12,13,16,1,2,3,4,5,7,8,9,14,15]},
{category:3, stores:[10,11,12,1,2,3,4,5,7,9]},
{category:4, stores:[10,11,12,1,2,3,4,5,17]},
{category:5, stores:[16,18,19,1,4,8,14,15,26]}, 
{category:6, stores:[1,4,20,14,21]}, 
{category:7, stores:[1,3,4,20,8,14,24,12,13,21,22,23,25]},
{category:8, stores:[1,4,6,8,14,12,13]},
{category:9, stores:[4,8,14,12,17]},
{category:10, stores:[1,4,6,8,14,12,13]},
//{category:11, stores:[1,8,14,17,13]},
{category:11, stores:[13]},
{category:12, stores:[1,4,6,8,12]}
]

