import puppeteer from 'puppeteer';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import { paseStoreNumber } from '@utils/functions';
import { getNestedPropertyValue } from '@utils/functions';
import { getProductList } from '@utils/functions';
import { checkImage } from '@utils/functions';

const regex = /(http(?:s?):\/\/(?:[\w]+(?:\.|\:|\-)){1}(?:(\:|)[\w\d]+(?:\.|\-)?)+)/;

function getLogo(company, document, urlToScrap) {
  let companyLogo = undefined;
  if (company.indLogoSelector) {
    companyLogo = document.querySelector(company.logoSelector)?.getAttribute(company.attributeLogoSelector);
    companyLogo = String(companyLogo).search(regex) == -1 ? urlToScrap.match(regex)[0] + companyLogo : companyLogo;
  } else (
    companyLogo = company.logoSelector
  )
  return companyLogo;
}

//**************************************************************************************** */
//**************************************************************************************** */
//**************************************************************************************** */
//                                SCRAPING WITH JSDOM            
//**************************************************************************************** */  
//**************************************************************************************** */
//**************************************************************************************** */
export async function scrapingWithJsdom(urlToScrap, company, params) {
  try {
    let productsList = [];
    const dom = await JSDOM.fromURL(urlToScrap,/* {
    runScripts: 'dangerously'
} */);
    //console.log('#PASER 3 - JSDOM - dom - ', dom);
    const document = dom.window.document;
    //console.log('#PASER 4 - JSDOM');
    //const mapHtml = dom.serialize(); 
    const companyProducts = document.querySelectorAll(company.mainSelector);
    if (companyProducts.length === 0) {
      console.log('#PASER 6 - JSDOM - element probably not exists', company.name);
      return new Response(JSON.stringify(productsList), { status: 200 })
    }
    //console.log('#PASER 7 - JSDOM');
    let companyLogo = getLogo(company, document, urlToScrap)
    //console.log('#PASER 8 - JSDOM');
    //console.log('#PASER 4 - JSDOM - urlToScrap', urlToScrap);
    let currentProducts = [];
    //console.log('#PASER 9 - JSDOM');
    companyProducts.forEach((product, index) => {
      const temProduct = {};
      //Going through the fields configuration
      company.scrapingFields.forEach((field) => {
        let fieldValue = undefined;
        field.fieldSelectors.forEach(currentSelector => {
          if (fieldValue == undefined) {
            switch (currentSelector.selectorValueFrom) {
              case "ATTRIBUTE":
                const pattern =
                  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
                fieldValue = product.querySelector(currentSelector.selector)?.getAttribute(currentSelector.attribute);
                fieldValue = regex.test(fieldValue) ? fieldValue : urlToScrap.match(regex)[0] + fieldValue;
                break;
              case "TEXTCONTENT":
                fieldValue = product.querySelector(currentSelector.selector)?.textContent.replace(/(\r\n|\n|\r)/gm, "").trim().slice();
                break;
              case "INNERHTML":
                fieldValue = product.querySelector(currentSelector.selector)?.innerHTML;
                break;
              default:
                break;
            }
          }
        });
        temProduct[field.fieldName] = fieldValue;
      })
      //Solo mapeamos productos con precio
      //console.log('#PASER 10 - JSDOM - temProduct[productName]  - ', temProduct['productName']);
      //console.log('#PASER 9 - JSDOM - temProduct[productPrice]  - ',temProduct['productPrice'] );
      if ((temProduct['productPrice'] > 0 || temProduct['productPrice'] != '0') && (temProduct['productPrice'] != undefined)) {
        currentProducts.push(temProduct);
      }
    });
    //if (!company.indRigthAmountFormat) {
    if (currentProducts.length > 0) {
      currentProducts.forEach((element, index) => {
        currentProducts[index]['formatedPrice'] = paseStoreNumber(element.productPrice)/*  * 1 */;
        currentProducts[index]['currency']= company.indMoneda;
      });
    }
    //console.log('#PASER 10 - JSDOM');
    //}
    productsList.push({
      companyName: company.name,
      companyLogo: companyLogo,
      companyProducts: currentProducts
    });
    //console.log('#PASER 11 - JSDOM');
    return productsList;
  } catch (error) {
    console.log("#PASER 10 - params.company  " + params.company + " error: " + error);
    return new Response("Failed to fetch prompts created by user COMPANY.ID " + params.company + 'ERROR: ' + error, { status: 500 })
  }
}


//**************************************************************************************** */
//**************************************************************************************** */
//**************************************************************************************** */
//                                SCRAPING WITH HTTP REQUEST / JSON            
//**************************************************************************************** */  
//**************************************************************************************** */
//**************************************************************************************** */
export async function scrapingWithHttpRequest(urlToScrap, company, params) {
  try {
    //t1 = performance.now();
    //console.log("#PASER JSON - 2 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
    //
    let productsList = [];
    const companyStoreHTML = await fetch(urlToScrap, {
      "headers": {
        "accept": company.accept,
        "content-type": company.contentType,
        "sec-ch-ua": company.secChUa,
        "sec-ch-ua-mobile": company.secChUaMobile,
        "sec-ch-ua-platform": company.secChUaPlatform,
        "sec-fetch-dest": company.secFetchDest,
        "sec-fetch-mode": company.secFetchMode,
        "sec-fetch-site": company.secFetchSite,
        "x-algolia-api-key": company.xAlgoliaApiKey,
        "x-algolia-application-id": company.xAlgoliaApplicationId,
        "x-xsrf-token": company.xXsrfToken,
      },
      "referrer": (company.referrer)?.replace(/SEARCH_TEXT/g, params.text),
      "referrerPolicy": company.referrerPolicy,
      "body": (company.body)?.replace(/SEARCH_TEXT/g, params.text),
      "method": company.method,
      "mode": company.mode,
      "credentials": company.credentials
    });
    let companyStoreBody = await companyStoreHTML.text();
    //console.log("#PASER JSON - 4 - JSON ", companyStoreBody);
    //t1 = performance.now();
    //console.log("#PASER JSON - 4 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
    const companyStoreJson = JSON.parse(companyStoreBody);
    //console.log('#PASER JSON - 5 - companyStoreJson ', companyStoreJson);//JSON.stringify(companyStoreBody));      
    let companyLogo = undefined;
    companyLogo = company.logoSelector;
    let currentProducts = [];
    let productList = getProductList(companyStoreJson, company.mainSelector);
    if (productList?.length > 0) {
      /* console.log('$$$$$$$$$$$$$$$$$')
      console.log('ECOMMERCE ' + company.name);
      console.log('--------> productList ', productList.length); */
      productList.forEach((product, index) => {
        //console.log("#PASER JSON - 4 - Tiempo en responder ");  
        const temProduct = {};
        //Going through the fields configuration
        let tmpNameForUrl = undefined;
        company.scrapingFields.forEach((field) => {
          let fieldValue = undefined;
          //console.log("#PASER JSON - 5 - Tiempo en responder ");
          field.fieldSelectors.forEach(currentSelector => {
            //console.log("#PASER JSON - 6 - Tiempo en responder ");  
            if (fieldValue == undefined) {
              switch (currentSelector.selectorValueFrom) {
                case "TEXTCONTENT":
                  fieldValue = getNestedPropertyValue(productList, currentSelector.selector, index);
                  //MIGRAR ESTOS  IF A UNA FUNCION PARA QUE SE HAGA TODO EL MANEJO EN LA FUNCIÓN. SE DEBE ENVIAR POR PARAMETRO LO SIGUIENTE:
                  //company.name
                  //fieldValue
                  //field.fieldName
                  //currentSelector.attribute
                  /* if (field.fieldName == 'productPrice') {
                      fieldValue = fieldValue;
                  } */
                  //MANEJO PRODUCT_NAME                                        
                  if (field.fieldName == 'productName') {
                    tmpNameForUrl = fieldValue;
                    //console.log("#PASER JSON - 7 - "+ field.fieldName + " : ",tmpNameForUrl); 
                  }
                  //MANEJO PRODUCT_IMAGE
                  if (field.fieldName == 'productImage') {
                    //console.log("#PASER JSON - 7 - "+ field.fieldName + " : ",fieldValue); 
                    fieldValue = regex.test(fieldValue) ? fieldValue : company.linkUrl + fieldValue;
                    //console.log("#PASER JSON - 8 - "+ field.fieldName + " : ",fieldValue); 
                  }
                  //MANEJO VENDOR_LINK
                  //CASOS PARTICULARES PARA ALGUNOS COMERCIOS
                  if (field.fieldName == 'vendorLink' && currentSelector.attribute == 'specialLink') {
                    //
                    if (company.name == "Automercado") {
                      tmpNameForUrl = tmpNameForUrl.replace(/\s/g, "-").replace(/\%/g, "%2525");
                      fieldValue = (company.linkUrl)?.replace(/productName/g, tmpNameForUrl).replace(/vendorLink/g, fieldValue);
                    }
                    //
                    else if (company.name == "Masxmenos" || company.name == "Siman") {
                      fieldValue = (company.linkUrl).replace(/productName/g, fieldValue);
                    }
                    //
                    else if (company.name == "La Botica") {
                      tmpNameForUrl = tmpNameForUrl.replace(/\%/g, "%2525").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\//g, "%2F");
                      //console.log("#PASER JSON - 7 - "+ field.fieldName + " : ",tmpNameForUrl); 
                      fieldValue = (company.linkUrl)?.replace(/productName/g, tmpNameForUrl).replace(/vendorLink/g, fieldValue);
                    }
                    else if (company.name == "Cococo") {
                      //console.log("#PASER JSON - 7 - "+ field.fieldName + " : ",tmpNameForUrl); 
                      tmpNameForUrl = tmpNameForUrl.replace(/\s/g, "-").replace(/\,/g, "-").replace(/\./g, "-").replace(/\"/g, "-").replace(/\//g, "-").replace(/\#/g, "-").replace(/\:/g, "%3A");
                      fieldValue = (company.linkUrl)?.replace(/productName/g, tmpNameForUrl).replace(/vendorLink/g, fieldValue);
                      //console.log("#PASER JSON - 8 - "+ field.fieldName + " : ",tmpNameForUrl); 
                      //console.log("#PASER JSON - 8 - "+ field.fieldName + " : ",fieldValue); 
                    }
                    //
                  } else if (field.fieldName == 'vendorLink') {
                    fieldValue = regex.test(fieldValue) ? fieldValue : company.linkUrl + fieldValue;
                  }
                  break;
                default:
                  break;
              }
            }
          });
          temProduct[field.fieldName] = fieldValue;
        })
        //Solo mapeamos productos con precio
        if ((temProduct['productPrice'] > 0 || temProduct['productPrice'] != '0') && (temProduct['productPrice'] != undefined)) {
          currentProducts.push(temProduct);
        }
      });
      if (currentProducts.length > 0) {
        currentProducts.forEach((element, index) => {
          currentProducts[index]['formatedPrice'] = paseStoreNumber(element.productPrice)/*  * 1 */;
          currentProducts[index]['currency']= company.indMoneda;
        });
      }
      //console.log(currentProducts);
      productsList.push({
        companyName: company.name,
        companyLogo: companyLogo,
        companyProducts: currentProducts
      });
    }
    //console.log(products);
    //t1 = performance.now();
    //console.log("#PASER JSON - 9999 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);  
    return productsList;
  } catch (error) {
    console.log("#PASER 999 - params.company  " + params.company + " error: " + error);
    return new Response(" 1 EXCEPTION - CATCH - Failed to fetch prompts created by user " + error, { status: 500 })
  }
}

//**************************************************************************************** */
//**************************************************************************************** */
//**************************************************************************************** */
//                                SCRAPING WITH PUPPETEER         
//**************************************************************************************** */  
//**************************************************************************************** */
//**************************************************************************************** */

export async function scrapingWithPuppeteer(urlToScrap, company, params) {
  try {
    let productsListTemp = [];
    let t1 = performance.now();
    //console.log("#PASER 2 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
    const browser = await puppeteer.launch({
      headless: 'true'//'new',
    });
    t1 = performance.now();
    //console.log("#PASER 2.1 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
    const page = await browser.newPage();
    t1 = performance.now();
    //console.log("#PASER 3 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
    await page.goto(urlToScrap, { waitUntil: 'domcontentloaded' }); //UNDEFINED> load:12, domcontentloaded:12, networkidle0:6, networkidle2:6
    //Blocking Images and CSS. turns request interceptor on
    t1 = performance.now();
    //console.log("#PASER 3.1 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
    try {
      await page.waitForSelector(company.mainSelector, { visible: true, timeout: 5000 });
      // do what you have to do here
    } catch (e) {
      //console.log('PUPPETEER - element probably not exists', company.name);
      await browser.close();
      return new Response(JSON.stringify(products), { status: 200 })
    }
    t1 = performance.now();
    //console.log("#PASER 5 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
    // all the web scraping will happen here  
    const productList = await page.evaluate((company, urlToScrap) => {
      //regular expresion to get an absolute url
      const regex = /(http(?:s?):\/\/(?:[\w]+(?:\.|\:|\-)){1}(?:(\:|)[\w\d]+(?:\.|\-)?)+)/;
      const companyProducts = document.querySelectorAll(company.mainSelector);
      let companyLogo = undefined;
      if (company.indLogoSelector) {
        companyLogo = document.querySelector(company.logoSelector)?.getAttribute(company.attributeLogoSelector);
        companyLogo = String(companyLogo).search(regex) == -1 ? urlToScrap.match(regex)[0] + companyLogo : companyLogo;

      } else (
        companyLogo = company.logoSelector
      )
      let currentProducts = [];
      companyProducts.forEach((product, index) => {
        const temProduct = {};
        //Going through the fields configuration
        company.scrapingFields.forEach((field) => {
          let fieldValue = undefined;
          field.fieldSelectors.forEach(currentSelector => {
            if (fieldValue == undefined) {
              switch (currentSelector.selectorValueFrom) {
                case "ATTRIBUTE": const pattern =
                  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
                  fieldValue = product.querySelector(currentSelector.selector)?.getAttribute(currentSelector.attribute);
                  //las urls de estos comercios no tienen el formato correcto
                  if ((company.name == 'UNIVERSAL' && field.fieldName == 'productImage') || (company.name == 'HI BEAUTY COSMETICS' && field.fieldName == 'productImage')) {
                    if ((fieldValue === undefined) || (fieldValue === '') || (fieldValue === null)) {
                      fieldValue = companyLogo;
                    } else {
                      fieldValue = pattern.test(fieldValue) ? fieldValue : urlToScrap.match(regex)[0] + fieldValue;
                    }

                  } else {
                    fieldValue = regex.test(fieldValue) ? fieldValue : urlToScrap.match(regex)[0] + fieldValue;
                  }
                  break;
                case "TEXTCONTENT":
                  //Se controla cuando se hace click en el producto de esta tienda, es un manejo diferente
                  if (company.name == 'CONSTRUPLAZA' && field.fieldName == 'vendorLink') {
                    fieldValue = (company.url).replace(/SEARCH_TEXT/g, product.querySelector(currentSelector.selector)?.textContent.replace(/(\r\n|\n|\r)/gm, "").trim().slice())
                  } else {
                    fieldValue = product.querySelector(currentSelector.selector)?.textContent.replace(/(\r\n|\n|\r)/gm, "").trim().slice();
                  }
                  break;
                case "INNERHTML":
                  fieldValue = product.querySelector(currentSelector.selector)?.innerHTML;
                  break;
                default:
                  break;
              }
            }
          });
          temProduct[field.fieldName] = fieldValue;
        })
        currentProducts.push(temProduct);
      });
      return { companyLogo, currentProducts };
    }, company, urlToScrap)
    //console.log(productList.currentProducts);
    t1 = performance.now();
    //console.log("#PASER 6 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
    await browser.close();
    t1 = performance.now();
    //console.log("#PASER 7 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
    if (productList.currentProducts.length > 0) {
      productList.currentProducts.forEach((element, index) => {
        productList.currentProducts[index]['formatedPrice'] = paseStoreNumber(element.productPrice)/* * 1 */;
        currentProducts[index]['currency']= company.indMoneda;
      });
    }
    t1 = performance.now();
    //console.log("#PASER 7 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
    productsListTemp.push({
      companyName: company.name,
      companyLogo: productList.companyLogo,
      companyProducts: productList.currentProducts
    });
    //console.log(products);
    //t1 = performance.now();
    //console.log("#PASER 8 - PUPPETEER - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
    return productsListTemp;
  } catch (error) {
    //await browser.close();
    console.log('Puppeteer process failed - company.id ' + params.company + ' - ERROR ', error);
    //if (error instanceof puppeteer.errors.TimeoutError) {
    if (error instanceof puppeteer.error.timeout) {
      console.log('puppeteer.error.timeout', error);
      return new Response(JSON.stringify(products[0]), { status: 200 })
    }
    //console.log('ERROR CONTROLADO ' + params.company,error);
    return new Response("Failed to fetch prompts created by user", { status: 500 })
  }

}