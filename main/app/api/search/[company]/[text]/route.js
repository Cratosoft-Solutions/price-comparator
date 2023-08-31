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
            if (company.IndHowToScrape == 'JSDOM') {

                const dom = await JSDOM.fromURL(urlToScrap, {
                    runScripts: 'dangerously'
                });
                const document = dom.window.document;
                //const mapHtml = dom.serialize();
                const companyProducts = document.querySelectorAll(company.mainSelector);//('.products.wrapper.grid.products-grid ol li');//
                let companyLogo = undefined;
                if (company.indLogoSelector) {
                    companyLogo = document.querySelector(company.logoSelector)?.getAttribute('src');
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
                                    case "ATTRIBUTE":
                                        const pattern =
                                            /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
                                        fieldValue = product.querySelector(currentSelector.selector)?.getAttribute(currentSelector.attribute);
                                        /*if ((company.name == 'UNIVERSAL' && field.fieldName == 'productImage') || (company.name == 'HI BEAUTY COSMETICS' && field.fieldName == 'productImage')) {
                                                                                    //las urls de estos comercios no tienen el formato correcto
                                                                                    fieldValue = pattern.test(fieldValue) ? fieldValue : urlToScrap.match(regex)[0] + fieldValue;
                                                                                } else { */
                                        fieldValue = regex.test(fieldValue) ? fieldValue : urlToScrap.match(regex)[0] + fieldValue;
                                        //}
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
                //**************************************************************************************** */
                //**************************************************************************************** */
                //**************************************************************************************** */
                //                                SCRAPING WITH PUPPETEER            
                //**************************************************************************************** */
                //**************************************************************************************** */
                //**************************************************************************************** */
            } else if (company.IndHowToScrape == 'PUPPETEER') {
                const browser = await puppeteer.launch({
                    //headless:false,
                    //userDataDir: './dataPuppeteerJM',
                    headless: "new"//, slowMo: 800
                    //slowMo: 500
                    //ignoreDefaultArgs: ['--mute-audio'],
                    //headless: true,
                    //defaultViewport: null//, slowMo: 400,
                });
                const page = await browser.newPage();
                // // Add Headers 
                // HAY QUE PROBAR ESTOS HEADERS
                // await page.setExtraHTTPHeaders({ 
                //     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36', 
                //     'upgrade-insecure-requests': '1', 
                //     'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8', 
                //     'accept-encoding': 'gzip, deflate, br', 
                //     'accept-language': 'en-US,en;q=0.9,en;q=0.8' 
                // });
                await page.goto(urlToScrap);

                //Blocking Images and CSS. turns request interceptor on
                await page.setRequestInterception(true);

                //if the page makes a  request to a resource type of image or stylesheet then abort that request
                page.on('request', request => {
                    if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet')
                        request.abort();
                    else
                        request.continue();
                });

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
                await page.waitForSelector(company.mainSelector);
                // all the web scraping will happen here  
                const productList = await page.evaluate((company, urlToScrap) => {
                    //regular expresion to get an absolute url
                    const regex = /(http(?:s?):\/\/(?:[\w]+(?:\.|\:|\-)){1}(?:(\:|)[\w\d]+(?:\.|\-)?)+)/;
                    const companyProducts = document.querySelectorAll(company.mainSelector);
                    let companyLogo = undefined;
                    if (company.indLogoSelector) {
                        companyLogo = document.querySelector(company.logoSelector)?.getAttribute('src');
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
                            for (let index = 1; index < 3; index++) {
                                field.fieldSelectors.forEach(currentSelector => {

                                    if (fieldValue == undefined) {
                                        switch (currentSelector.selectorValueFrom) {
                                            case "ATTRIBUTE": const pattern =
                                                /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
                                                fieldValue = product.querySelector(currentSelector.selector)?.getAttribute(currentSelector.attribute);
                                                //las urls de estos comercios no tienen el formato correcto
                                                if ((company.name == 'UNIVERSAL' && field.fieldName == 'productImage') || (company.name == 'HI BEAUTY COSMETICS' && field.fieldName == 'productImage')) {
                                                    fieldValue = pattern.test(fieldValue) ? fieldValue : urlToScrap.match(regex)[0] + fieldValue;
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
                            }
                            temProduct[field.fieldName] = fieldValue;
                        })
                        currentProducts.push(temProduct);
                    });
                    return { companyLogo, currentProducts };
                }, company, urlToScrap)

                await browser.close();

                if (productList.currentProducts.length > 0) {
                    productList.currentProducts.forEach((element, index) => {
                        productList.currentProducts[index]['formatedPrice'] = paseStoreNumber(element.productPrice) * 1;
                    });
                }

                products.push({
                    companyName: company.name,
                    companyLogo: productList.companyLogo,
                    companyProducts: productList.currentProducts
                });

            }
        };
        const t1 = performance.now();
        //console.log("Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company );
        return new Response(JSON.stringify(products[0]), { status: 200 })
    } catch (error) {
        //console.log('ERROR CONTROLADO ' + params.company,error);
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
}