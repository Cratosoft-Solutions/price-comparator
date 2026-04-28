import { chromium } from 'patchright';
import sparticuzChromium from '@sparticuz/chromium';
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
//                                SCRAPING WITH PATCHRIGHT (Playwright)         
//**************************************************************************************** */  
//**************************************************************************************** */
//**************************************************************************************** */

export async function scrapingWithPuppeteer(urlToScrap, company, params) {
  try {
    let productsListTemp = [];
    const executablePath = await sparticuzChromium.executablePath();
    const browser = await chromium.launch({
      headless: true,
      executablePath,
      args: sparticuzChromium.args,
    });
    const context = await browser.newContext({
      locale: 'es-CR',
      timezoneId: 'America/Costa_Rica',
    });
    const page = await context.newPage();
    // Block unnecessary resources for faster loading and reduced detection
    if (company.rejectRequestPattern && company.rejectRequestPattern.length > 0) {
      await page.route('**/*', (route) => {
        const url = route.request().url();
        if (company.rejectRequestPattern.some(pattern => url.includes(pattern))) {
          route.abort();
        } else {
          route.continue();
        }
      });
    }
    await page.goto(urlToScrap, { waitUntil: 'domcontentloaded' });
    try {
      await page.waitForSelector(company.mainSelector, { state: 'visible', timeout: 5000 });
    } catch (e) {
      await browser.close();
      return new Response(JSON.stringify(productsListTemp), { status: 200 })
    }
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
    await browser.close();
    if (productList.currentProducts.length > 0) {
      productList.currentProducts.forEach((element, index) => {
        productList.currentProducts[index]['formatedPrice'] = paseStoreNumber(element.productPrice);
        productList.currentProducts[index]['currency']= company.indMoneda;
      });
    }
    productsListTemp.push({
      companyName: company.name,
      companyLogo: productList.companyLogo,
      companyProducts: productList.currentProducts
    });
    return productsListTemp;
  } catch (error) {
    console.log('Patchright process failed - company.id ' + params.company + ' - ERROR ', error);
    if (error.name === 'TimeoutError') {
      console.log('Patchright TimeoutError', error);
      return new Response(JSON.stringify(productsListTemp), { status: 200 })
    }
    return new Response("Failed to fetch prompts created by user", { status: 500 })
  }

}