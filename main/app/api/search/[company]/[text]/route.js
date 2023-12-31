import { isTokenValid } from '@utils/authFunctionsServer';
import { getCompanyConfiguration } from '@utils/functions';
import { tokenizeSearch } from '@utils/search/utils';
import { scrapingWithJsdom } from '@utils/webScrapingFunctions';
import { scrapingWithHttpRequest } from '@utils/webScrapingFunctions';
import { scrapingWithPuppeteer } from '@utils/webScrapingFunctions';

export const GET = async (request, { params }) => {
    try {
        //Endpoint Token Validation
        const tokenStatus = await isTokenValid();
        if(!tokenStatus) return new Response("Unauthorized access " + request.method, { status: 401});
        
        let products = [];
        for (const company of getCompanyConfiguration(params.company)) {
            let urlToScrap;
            urlToScrap = (company.url).replace(/SEARCH_TEXT/g, params.text);
            switch (company.indHowToScrape) {
                //**************************************************************************************** */
                //                                SCRAPING WITH JSDOM            
                //**************************************************************************************** */                    
                case 'JSDOM':
                    products = await scrapingWithJsdom(urlToScrap, company, params);
                    break;
                //**************************************************************************************** */
                //                                SCRAPING WITH HTTP REQUEST / JSON          
                //**************************************************************************************** */                      
                case 'JSON':
                    products = await scrapingWithHttpRequest(urlToScrap, company, params);
                    break;
                //**************************************************************************************** */
                //                                SCRAPING WITH PUPPETEER        
                //**************************************************************************************** */                      
                case 'PUPPETEER':
                    products = await scrapingWithPuppeteer(urlToScrap, company, params);
                    break;                    
                default:
                    urlToScrap = '';
                    break;
            }
        };
        //let t1 = performance.now();
        const productFiltered = await tokenizeSearch(params.text,products[0].companyProducts);
        products[0].companyProducts = productFiltered;
        console.log("voy a retornar", productFiltered);

        return new Response(JSON.stringify(products[0]), { status: 200 })
    } catch (error) {
        //console.log("#PASER 10 - params.company  " + params.company + " error: " + error);
        return new Response("Failed to fetch prompts created by user COMPANY.ID " + params.company + ' ERROR: ' + error, { status: 500 })
    }
}