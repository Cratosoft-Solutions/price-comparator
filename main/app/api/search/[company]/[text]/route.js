import puppeteer from 'puppeteer';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import { paseStoreNumber } from '@utils/functions';
import { getNestedPropertyValue } from '@utils/functions';
import { getProductList } from '@utils/functions';
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
                    console.log('Control JM - URL ', urlToScrap);
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
            let t1 = performance.now();
            //console.log("#PASER 1 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
            if (company.indHowToScrape == 'JSDOM') {
                const dom = await JSDOM.fromURL(urlToScrap, /* {
                    runScripts: 'dangerously'
                } */);
                const document = dom.window.document;
                //const mapHtml = dom.serialize(); 
                const companyProducts = document.querySelectorAll(company.mainSelector);
                if (companyProducts.length === 0) {
                    console.log('JSDOM - element probably not exists', company.name);
                    return new Response(JSON.stringify(products), { status: 200 })
                }
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
            } else if (company.indHowToScrape == 'PUPPETEER') {
                try {
                    let t1 = performance.now();
                    //console.log("#PASER 2 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
                    const browser = await puppeteer.launch({
                        headless: 'true'//'new',
                    });
                    t1 = performance.now();
                    //console.log("#PASER 2.1 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
                    const page = await browser.newPage();
                    //page.setJavaScriptEnabled(false);
                    //page.setDefaultNavigationTimeout(20000);
                    // Add Headers 
                    //await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36');
                    //('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');                
                    // await page.setExtraHTTPHeaders({ 
                    //     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36', 
                    //     //'upgrade-insecure-requests': '1', 
                    //     'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8', 
                    //     'accept-encoding': 'gzip, deflate, br', 
                    //     'accept-language': 'en-US,en;q=0.9,en;q=0.8' 
                    //  });
                    t1 = performance.now();
                    //console.log("#PASER 3 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
                    await page.goto(urlToScrap, { waitUntil: 'domcontentloaded' }); //UNDEFINED> load:12, domcontentloaded:12, networkidle0:6, networkidle2:6
                    //await page.goto(urlToScrap, { waitUntil: 'domcontentloaded' }); //UNDEFINED> load:12, domcontentloaded:12, networkidle0:6, networkidle2:6
                    //Blocking Images and CSS. turns request interceptor on
                    t1 = performance.now();
                    //console.log("#PASER 3.1 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
                    /*                     await page.setRequestInterception(true);
                                        //if the page makes a  request to a resource type of image or network request then abort that request
                                        const blockList = [];     
                                        t1 = performance.now();
                                        console.log("#PASER 3.2 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company );                                         
                                        page.on('request', request => {
                                            if ((['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1) || (company.rejectRequestPattern.find((pattern) => request.url().match(pattern)))){
                                            //if (request.resourceType() === 'image' || company.rejectRequestPattern.find((pattern) => request.url().match(pattern))){
                    /*                          const u = request.url();
                                                console.log(`MARCA JM - 1 - request to ${u.substring(0, 50)}...${u.substring(u.length - 5)} is aborted-`,company.name); */
                    //request.abort();
                    /*                             request.respond({status: 200, body: 'aborted'})
                                            }else{
                                                request.continue();
                                            }
                                        });
                                        t1 = performance.now(); */
                    //console.log("#PASER 4 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
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
                            productList.currentProducts[index]['formatedPrice'] = paseStoreNumber(element.productPrice) * 1;
                        });
                    }
                    t1 = performance.now();
                    //console.log("#PASER 7 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
                    products.push({
                        companyName: company.name,
                        companyLogo: productList.companyLogo,
                        companyProducts: productList.currentProducts
                    });
                    console.log(products);
                    t1 = performance.now();
                   //console.log("#PASER 8 - PUPPETEER - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
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
                //**************************************************************************************** */
                //**************************************************************************************** */
                //**************************************************************************************** */
                //                                SCRAPING WITH JSON            
                //**************************************************************************************** */
                //**************************************************************************************** */
                //**************************************************************************************** */                
            } else if (company.indHowToScrape == 'JSON') {
                try {
                    t1 = performance.now();
                    //console.log("#PASER JSON - 2 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
                    //
                    const companyStoreHTML = await fetch(urlToScrap, {
                        "headers": {
                            "accept": "application/json",
                            "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": "\"Windows\"",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "x-requested-with": "XMLHttpRequest",
                        },
                        "referrer": (company.referrerUrl).replace(/SEARCH_TEXT/g, params.text),
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": null,
                        "method": company.requestMethod,
                        "mode": "cors",
                        "credentials": "omit"
                    });
                    console.log('referrerUrl',(company.referrerUrl).replace(/SEARCH_TEXT/g, params.text));
                    t1 = performance.now();
                    //console.log("#PASER JSON - 3 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
                    //console.log('MARCA 2.0.2',companyStoreHTML);
                    let companyStoreBody = await companyStoreHTML.text();
                    t1 = performance.now();
                    //console.log("#PASER JSON - 4 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);
                    const companyStoreJson = JSON.parse(companyStoreBody);
                    //console.log('#PASER JSON - 5 - companyStoreBody ', JSON.parse(companyStoreBody));//JSON.stringify(companyStoreBody));      
                    //mainSelector
                    //let queryData = companyStoreJson[company.mainSelector];
                    //console.log(queryData);
                    //console.log("#PASER JSON - 2 - Tiempo en responder -company.indLogoSelector",company.indLogoSelector);   
                    //const companyProducts = queryData;
                    let companyLogo = undefined;
                    if (company.indLogoSelector) {
                        companyLogo = document.querySelector(company.logoSelector)?.getAttribute(company.attributeLogoSelector);
                        companyLogo = String(companyLogo).search(regex) == -1 ? urlToScrap.match(regex)[0] + companyLogo : companyLogo;

                    } else {
                        companyLogo = company.logoSelector;
                        //console.log("#PASER JSON - 2.1 - Tiempo en responder - companyLogo ",companyLogo);   
                    }

                    //console.log("#PASER JSON - 3 - Tiempo en responder ");                    
                    let currentProducts = [];
                    //console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
                    let productList = getProductList(companyStoreJson,company.mainSelector);
                    //console.log('--------> productList ',productList)
                    //console.log('--------> productList ',productList.length)
                    //console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
                    productList.forEach((product,index) => {
                        //console.log("#PASER JSON - 4 - Tiempo en responder ");  
                        const temProduct = {};
                        //Going through the fields configuration
                        company.scrapingFields.forEach((field) => {
                            let fieldValue = undefined;
                            //console.log("#PASER JSON - 5 - Tiempo en responder ");  
                            field.fieldSelectors.forEach(currentSelector => {
                                //console.log("#PASER JSON - 6 - Tiempo en responder ");  
                                if (fieldValue == undefined) {
                                    switch (currentSelector.selectorValueFrom) {
                                        case "ATTRIBUTE":
                                            const pattern =
                                                /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
                                            fieldValue = product.querySelector(currentSelector.selector)?.getAttribute(currentSelector.attribute);
                                            fieldValue = regex.test(fieldValue) ? fieldValue : urlToScrap.match(regex)[0] + fieldValue;
                                            break;
                                        case "TEXTCONTENT":
                                            fieldValue = getNestedPropertyValue(productList,currentSelector.selector,index);
                                            //console.log("#PASER JSON - 7 - "+ field.fieldName + " : ",fieldValue);   
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
                    //console.log(currentProducts);
                    if (currentProducts.length > 0) {
                        currentProducts.forEach((element, index) => {
                            currentProducts[index]['formatedPrice'] = paseStoreNumber(element.productPrice) * 1;
                        });
                    }
                    products.push({
                        companyName: company.name,
                        companyLogo: companyLogo,
                        productList: currentProducts
                    });
                    //console.log(products);
                    //t1 = performance.now();
                    //console.log("#PASER JSON - 9999 - Tiempo en responder " + (t1 - t0) + " milliseconds." + params.company);  
                } catch (error) {
                    return new Response(" 1 EXCEPTION - CATCH - Failed to fetch prompts created by user " + error, { status: 500 })
                }
            }
        };
        //console.log(products[0]);
        //console.timeEnd();
        let t1 = performance.now();
        console.log("#PASER 9 - Tiempo en responder - GENERAL " + (t1 - t0) + " milliseconds." + params.company);
        return new Response(JSON.stringify(products[0]), { status: 200 })
    } catch (error) {
        //await browser.close();
        console.log("#PASER 10 - error",error);
        return new Response("Failed to fetch prompts created by user COMPANY.ID " + params.company + 'ERROR: ' + error, { status: 500 })
    }
}