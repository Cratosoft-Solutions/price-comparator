import { JSDOM } from 'jsdom';
import { paseStoreNumber } from '@utils/functions';

export async function scrapeWithJsdom(urlToScrap, company, products) {
    const regex = /(http(?:s?):\/\/(?:[\w]+(?:\.|\:|\-)){1}(?:(\:|)[\w\d]+(?:\.|\-)?)+)/;

    const dom = await JSDOM.fromURL(urlToScrap, {
      runScripts: 'dangerously'
    });
    
    
    //const companyStoreBody = await companyStoreHTML.text();
    //console.log('CONTROL JM - PAGINA CARGADA ', companyStoreBody) 
    //const dom = new JSDOM(companyStoreBody, { runScripts: "dangerously", resources: "usable"})
    /* .window
    window.onload = function () {
    console.log('******CONTROL JM - PAGINA CARGADA*******')
    }  */;
    const document = dom.window.document;
    
    //const mapHtml = dom.serialize();
    //console.log('Control JM - after evaluate', dom.serialize());
    const companyProducts = document.querySelectorAll(company.mainSelector);//('.products.wrapper.grid.products-grid ol li');//
    let companyLogo = undefined;
    if (company.indLogoSelector) {
      companyLogo = document.querySelector(company.logoSelector)?.getAttribute('src');//('.logo img')?.getAttribute('src');//
      companyLogo = String(companyLogo).search(regex) == -1 ? urlToScrap.match(regex)[0] + companyLogo : companyLogo;
      //companyLogo = regex.test(companyLogo)?companyLogo:urlToScrap.match(regex)[0] + companyLogo;
    } else (
      companyLogo = company.logoSelector
    )
    
    //console.log('Control JM - logo ', companyLogo);
    let currentProducts = [];
    companyProducts.forEach((product, index) => {
      const temProduct = {};
      //Going through the fields configuration
      company.scrapingFields.forEach((field) => {
          let fieldValue = undefined;
          //for (let index = 1; index < 3; index++) {  
          field.fieldSelectors.forEach(currentSelector => {
              if (fieldValue == undefined) {
                  switch (currentSelector.selectorValueFrom) {
                      case "ATTRIBUTE":
                          //const regex = /(http(?:s?):\/\/(?:[\w]+(?:\.|\:|\-)){1}(?:(\:|)[\w\d]+(?:\.|\-)?)+)/;
                          //fieldValue = currentSelector.attribute == 'src'?product.querySelector(currentSelector.selector)?.getAttribute(currentSelector.attribute):
                          const pattern =
                              /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
                          fieldValue = product.querySelector(currentSelector.selector)?.getAttribute(currentSelector.attribute);
                          if ((company.name == 'UNIVERSAL' && field.fieldName == 'productImage') || (company.name == 'HI BEAUTY COSMETICS' && field.fieldName == 'productImage')) {
                              //las urls de estos comercios no tienen el formato correcto
                              fieldValue = pattern.test(fieldValue) ? fieldValue : urlToScrap.match(regex)[0] + fieldValue;
                          } else {
                              fieldValue = regex.test(fieldValue) ? fieldValue : urlToScrap.match(regex)[0] + fieldValue;
                          }
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
      currentProducts.push(temProduct);
    });
    
    if (currentProducts.length > 0) {
      currentProducts.forEach((element, index) => {
          currentProducts[index]['formatedPrice'] = paseStoreNumber(element.productPrice) * 1;
      });
    }
    
    products.push({
      companyName: company.name,
      companyLogo: companyLogo,
      companyProducts: currentProducts
    });
    }