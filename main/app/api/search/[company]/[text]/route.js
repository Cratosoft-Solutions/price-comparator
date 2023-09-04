import puppeteer from 'puppeteer';
import { JSDOM } from 'jsdom';
import { paseStoreNumber } from '@utils/functions';
import { scrapCompanyConfiguration } from "@utils/comercios";


const getCompanyConfiguration = (companyID) => {
    return scrapCompanyConfiguration.filter(element => element.id == companyID);
}

export const GET = async (request, { params }) => {
    try {
        const t0 = performance.now();
        let products = [];
        for (const company of getCompanyConfiguration(params.company)) {
            let urlToScrap;
            switch (company.scrapType) {
                case 'QUERY_PARAMETER':
                    urlToScrap = (company.url).replace(/SEARCH_TEXT/g, params.text);
                    //console.log('Control JM - URL ', urlToScrap);
                    break;
                default:    
                    urlToScrap = '';
                    break;
            }
            const regex = /(http(?:s?):\/\/(?:[\w]+(?:\.|\:|\-)){1}(?:(\:|)[\w\d]+(?:\.|\-)?)+)/;
            //**************************************************************************************** */
            //**************************************************************************************** */
            //**************************************************************************************** */
            //                                SCRAPING WITH JSDOM            
            //**************************************************************************************** */
            //**************************************************************************************** */
            //**************************************************************************************** */
            if (company.indHowToScrape == 'JSDOM') {
/*                 console.log('MARCA JM - JSDOM - COMPANY NAME',company.name);
                console.log('MARCA JM - JSDOM - URL',urlToScrap);      */           

                const dom = await JSDOM.fromURL(urlToScrap, /* {
                    runScripts: 'dangerously'
                } */);
                //console.log('MARCA JM - JSDOM - 1');      
                const document = dom.window.document;
                //const mapHtml = dom.serialize();
                //console.log('MARCA JM - JSDOM - 2');    
                const companyProducts = document.querySelectorAll(company.mainSelector);
                //console.log('MARCA JM - JSDOM - 3 - companyProducts.length', companyProducts.length);    
                if (companyProducts.length === 0) {
                    console.log('MARCA JM - JSDOM - 6 - element probably not exists',company.name);
                    //return new Response(JSON.stringify(products[0]), { status: 200 })
                    return new Response(JSON.stringify(products), { status: 200 })
                }                             
                //console.log('MARCA JM - JSDOM - 4');  
                let companyLogo = undefined;
                if (company.indLogoSelector) {
                    //console.log('MARCA JM - JSDOM - 4.0 - attributeLogoSelector ', attributeLogoSelector);  
                    companyLogo = document.querySelector(company.logoSelector)?.getAttribute(company.attributeLogoSelector);
                    //console.log('MARCA JM - JSDOM - 4.1 - LOGO ', companyLogo);  
                    companyLogo = String(companyLogo).search(regex) == -1 ? urlToScrap.match(regex)[0] + companyLogo : companyLogo;
                    //console.log('MARCA JM - JSDOM - 4.2 - LOGO ', companyLogo);  
                } else (
                    companyLogo = company.logoSelector
                )
                let currentProducts = [];
                //console.log('MARCA JM - JSDOM - 5');                  
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
                    currentProducts.push(temProduct);
                });

                if (currentProducts.length > 0) {
                    currentProducts.forEach((element, index) => {
                        currentProducts[index]['formatedPrice'] = paseStoreNumber(element.productPrice) * 1;
                    });
                }
                //console.log('MARCA JM - JSDOM - 6');  
                products.push({
                    companyName: company.name,
                    companyLogo: companyLogo,
                    companyProducts: currentProducts
                });
                //console.log('MARCA JM - JSDOM - 7');  
                //**************************************************************************************** */
                //**************************************************************************************** */
                //**************************************************************************************** */
                //                                SCRAPING WITH PUPPETEER            
                //**************************************************************************************** */
                //**************************************************************************************** */
                //**************************************************************************************** */
            } else if (company.indHowToScrape == 'PUPPETEER') {
/*                 console.log('MARCA JM - PUPPETEER - COMPANY NAME',company.name);
                console.log('MARCA JM - PUPPETEER - URL',urlToScrap); */
                const browser = await puppeteer.launch({
                    headless: 'new',
                });
                //console.log('MARCA JM - 1');
                const page = await browser.newPage();
                //page.setDefaultNavigationTimeout(10000); 
                //console.log('MARCA JM - 2');
                // // Add Headers 
                // HAY QUE PROBAR ESTOS HEADERS
                await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36');
                //('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');                
                // await page.setExtraHTTPHeaders({ 
                //     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36', 
                //     //'upgrade-insecure-requests': '1', 
                //     'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8', 
                //     'accept-encoding': 'gzip, deflate, br', 
                //     'accept-language': 'en-US,en;q=0.9,en;q=0.8' 
                // });
                await page.goto(urlToScrap);//, { waitUntil: 'networkidle0' }); //UNDEFINED> load:12, domcontentloaded:12, networkidle0:6, networkidle2:6
                //console.log('MARCA JM - 3');
                //Blocking Images and CSS. turns request interceptor on
                await page.setRequestInterception(true);
                //console.log('MARCA JM - 4');
                //if the page makes a  request to a resource type of image or stylesheet then abort that request
                page.on('request', request => {
                    if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet')
                        request.abort();
                    else
                        request.continue();
                });
                //console.log('MARCA JM - 5');
                /* //Listado de request que hacen las paginas se pueden bloquear, esto mejora los tiempos de respuesta, VALIDAR
                    const rejectRequestPattern = [
                        'bam.nr-data.net',
                        'cdn.segment.com',
                        'maps.googleapis.com',
                        'google-analytics.com',
                        'api.segment.io',
                        'google-analytics.com',
                        '/*.groovinads.com',
                        '/*.criteo.com/',
                        '/*.hotjar.com'
                        ];
                        const blockList = [];            
                    
                    page.on('requesads', requesads => {
                        if (rejectRequestPattern.find((pattern) => requesads.url().match(pattern))) {
                        blockList.push(requesads.url());
                        requesads.abort();
                        } else requesads.continue();
                    }); */

                try {
                    await page.waitForSelector(company.mainSelector,{visible: true, timeout: 3000 });
                    // do what you have to do here
                    } catch (e) {
                        console.log('MARCA JM - PUPPETEER - element probably not exists',company.name);
                        //return new Response(JSON.stringify(products[0]), { status: 200 })
                        return new Response(JSON.stringify(products), { status: 200 })
                    }
                //await page.waitForSelector(company.mainSelector,{visible: true, timeout: 5000 });
                //console.log('MARCA JM - 6');
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
                                                    if ((fieldValue === undefined) || (fieldValue === '')||(fieldValue === null)) {
                                                        fieldValue = companyLogo;
                                                    }else{
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
                //console.log('MARCA JM - 7');
                await browser.close();
                //console.log('MARCA JM - 8');
                if (productList.currentProducts.length > 0) {
                    productList.currentProducts.forEach((element, index) => {
                        productList.currentProducts[index]['formatedPrice'] = paseStoreNumber(element.productPrice) * 1;
                    });
                }
                //console.log('MARCA JM - 9');
                products.push({
                    companyName: company.name,
                    companyLogo: productList.companyLogo,
                    companyProducts: productList.currentProducts
                });
                //console.log('MARCA JM - 10');
            }
        };
        //console.log('MARCA JM - 11');
        const t1 = performance.now();
        //console.log('MARCA JM - 12 - products.length ',products);
        console.log("Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company );
        return new Response(JSON.stringify(products[0]), { status: 200 })
    } catch (error) {
        //await browser.close();
        console.log('MARCA JM - 13  COMPANY '+ params.company+ ' - ERROR ',error);
        //console.log('MARCA JM - 13.1',error.messages);
        //if (error instanceof puppeteer.errors.TimeoutError) {
/*             if (error instanceof puppeteer.error.timeout) {
            console.log('MARCA JM - 14 ERRO R CONTROLADO');
            return new Response(JSON.stringify(products[0]), { status: 200 })
          } */
        //console.log('ERROR CONTROLADO ' + params.company,error);
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
}