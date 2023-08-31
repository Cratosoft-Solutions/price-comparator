export const  scrapCompanyConfiguration = [
    {
        id: 1,
        name: "Pequeño Mundo",
        url: 'https://tienda.pequenomundo.com/catalogsearch/result/?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo img",
        mainSelector: '.products.wrapper.grid.products-grid.columns4 ol li',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-item-info div .price-box.price-final_price .special-price .price-wrapper .price',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.product-item-info div .price-box.price-final_price span span span',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-item-info a',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-item-info .product-item-photo a img',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'data-src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-item-info div strong a',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    }, {
        id: 2,
        name: "Pricesmart",
        url: 'https://www.pricesmart.com/site/cr/es/busqueda?_sq=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo.px-0 img",
        mainSelector: '.search-product-box',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.currency',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'a',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        //selector:'.col-md-4.col-sm-6 meta div meta a div div img',
                        selector: '.search-product-image img',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        //selector:'.col-md-4.col-sm-6 meta div meta a div div div h3',
                        //selector:'.product.details.product-item-detail strong a',
                        selector: '.search-product-description',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    }, {
        id: 3,
        name: "WALMART CR",
        url: 'https://www.walmart.co.cr/SEARCH_TEXT?_q=SEARCH_TEXT&map=ft',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: "https://walmartcr.vtexassets.com/assets/vtex/assets-builder/walmartcr.store-theme/0.1.35/waltmart-logo___a095e1f47875aea1c10fcc867f8ac7ac.png",
        //logoSelector: ".vtex-store-components-3-x-logoImage",
        mainSelector: '.vtex-product-summary-2-x-container',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.vtex-store-components-3-x-sellingPrice',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.vtex-store-components-3-x-listPrice',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.vtex-product-summary-2-x-clearLink',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.vtex-product-summary-2-x-imageNormal',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.vtex-product-summary-2-x-productBrand',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 4,
        name: "MASXMENOS",
        url: 'https://www.masxmenos.cr/SEARCH_TEXT?_q=SEARCH_TEXT&map=ft',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".vtex-store-components-3-x-logoImage",
        mainSelector: '.vtex-product-summary-2-x-container',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.vtex-store-components-3-x-sellingPrice',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.vtex-store-components-3-x-listPrice',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.vtex-product-summary-2-x-clearLink',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.vtex-product-summary-2-x-imageNormal',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.vtex-product-summary-2-x-productBrand',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 5,
        name: "AUTOMERCADO",
        url: 'https://www.automercado.cr/buscar?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'PUPPETEER',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".navbar-brand img",
        mainSelector: '.card-body',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.text-currency',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.ng-star-inserted',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.title-product',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.img-product img',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.title-product',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 6,
        name: 'SUCRE EN LINEA',
        url: 'https://sucreenlinea.com/catalogsearch/result/?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: '.logo img',
        mainSelector: '.product-item-info',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.price-wrapper span',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'a',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-image-photo',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-item-link',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },    
    {
        id: 7,
        name: 'FISCHEL',
        url: 'https://www.fischelenlinea.com/busqueda?p=SEARCH_TEXT&c=0',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'PUPPETEER',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: '.logo img',
        mainSelector: '.card.col-4.ng-scope',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.price.txt-lightred.ng-binding',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.price.off.ng-binding.ng-scope',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.card-body a',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'figure a .card-img-top.lazyload.ng-scope',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.title.ng-binding',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 8,
        name: 'LA BOMBA FARMACIA',
        url: 'https://farmacialabomba.com/busqueda?p=SEARCH_TEXT&c=0',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'PUPPETEER',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: '.logo img',
        mainSelector: '.flex-col.card.ng-scope',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.h5.fw-700.text-light-blue.ng-binding',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.p-small.text-light-blue.ng-binding.ng-scope',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.card-body a',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'figure a .card-img-top.lazyload.ng-scope',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.text-blue.ng-binding',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 99999,
        name: 'FARMACIA LA BOTICA',
        url: 'https://laboticacr.com/#/',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'PUPPETEER',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: 'https://medismart.net/wp-content/uploads/2021/05/La-botica-farmacia-medismart-1.png',
        mainSelector: '.mat-card-content.m-0.cursor-pointer',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.principal-price.text-left',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.red-color.secondary-price.text-left',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'a',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'img',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.title.blue-color.wrap-text-into-two-lines',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 11,
        name: "Gollo Tiendas",
        url: 'https://www.gollo.com/catalogsearch/result/?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo img",
        mainSelector: '.products.wrapper.grid.products-grid ol li',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-item-info div .price-box.price-final_price .special-price .price-wrapper .price',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.product-item-info div .price-box.price-final_price span span span',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-item-info a',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-item-info a span span img',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-item-info div strong a',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 12,
        name: "Artelec",
        url: 'https://www.artelec.cr/search/?field=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo.fitThisOnMenu",
        mainSelector: '.row.grid div article',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-body span .amount',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-body .buttons a',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-overlay img',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-body h2',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 13,
        name: "EKONO",
        url: 'https://www.tiendasekono.com/catalogsearch/result/?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo img",
        mainSelector: '.products.wrapper.grid.products-grid ol li',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        //selector:'.result-wrapper div .price-wrapper .after_special.promotion',
                        selector: '.special-price span span span',
                        //selector:'.row span span .amount',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.old-price span span span',
                        //selector:'.result-wrapper div .price-wrapper .before_special',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 3,
                        selector: '.normal-price span span span',
                        //selector:'.result-wrapper div .price-wrapper .before_special',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        //selector:'.product.name.product-item-name a',
                        selector: '.product.photo.product-item-photo',//'.product-item-info a',
                        //selector:'.result-wrapper a',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        //selector:'.col-md-4.col-sm-6 meta div meta a div div img',
                        selector: '.product.photo.product-item-photo img',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        //selector:'.col-md-4.col-sm-6 meta div meta a div div div h3',
                        //selector:'.product.details.product-item-detail strong a',
                        selector: '.product.details.product-item-details a',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 14,
        name: "EXTREMETECH",
        url: 'https://extremetechcr.com/tienda/index.php?fc=module&module=leoproductsearch&controller=productsearch&orderby=position&orderway=desc&cate=&search_query=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo.img-responsive",
        //mainSelector: '.product_list.grid.row.product-list-default div',
        //mainSelector: '.ajax_block_product.col-sp-12.col-sm-6.col-md-4.first-in-line.first-item-of-tablet-line.last-item-of-mobile-line.col-xs-12',
        mainSelector: '.product-container.product-block',

        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        //selector:'.product-container.product-block div div div div .content_price .price.product-price',
                        selector: '.price.product-price',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        //selector:'.product-container.product-block div div div div .content_price .old-price.product-price',
                        selector: '.old-price.product-price',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        //selector:'.product.name.product-item-name a',
                        //selector:'.product-container.product-block div .product-image-container.image a',
                        selector: '.product_img_link',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    },
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        //selector:'.product-container.product-block div .product-image-container.image a img',
                        selector: '.replace-2x.img-responsive',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        //selector:'.product-container.product-block div div div h5 a',
                        selector: '.product-name',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 15,
        name: "MEXPRESS",
        url: 'https://www.tiendamexpress.com/filterSearch?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo img",
        mainSelector: '.product-item',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.price.actual-price',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.price.old-price',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-title a',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.picture-img',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'data-lazyloadsrc'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-title',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 16,
        name: "Office Depot",
        url: 'https://www.officedepot.co.cr/officedepotCR/en/search/?text=SEARCH_TEXT',
        //absoluteUrl:'https://www.officedepot.co.cr',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: 'https://www.officedepot.co.cr/_ui/responsive/theme-officedepot/images/header-footer/footer2022/LG_ODMX2lineas.svg',//".hidden-md.hidden-lg.js-mobile-logo a img",
        mainSelector: '.product-cnt.clearfix',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.discountedPrice-grid.cont-price-grid.bp-original',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-description.heigh-grid',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.lazy',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'data-src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.name.description-style',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 17,
        name: "INTELEC",
        url: 'https://www.intelec.co.cr/index.php?route=product/search&search=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: "#logo img",
        mainSelector: '.product-layout.has-extra-button',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.price-new',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.price-old',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 3,
                        selector: '.price-normal',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.name a',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.image img',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'data-src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.name a',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 18,
        name: "MONGE",
        url: 'https://www.tiendamonge.com/catalogsearch/result/?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'PUPPETEER',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo img",
        mainSelector: '.result-wrapper',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.after_special.promotion ',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.before_special',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 3,
                        selector: '.after_special ',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.result',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.result-thumbnail img',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.result-title',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 19,
        name: "EL VERDUGO",
        url: 'https://www.verdugotienda.com/catalogsearch/result/?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'PUPPETEER',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo img",
        mainSelector: '.result-wrapper',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.after_special.promotion ',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.before_special',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 3,
                        selector: '.after_special ',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.result',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.result-thumbnail img',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.result-title',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 20,
        name: 'SIMAN',
        url: 'https://cr.siman.com/SEARCH_TEXT?_q=SEARCH_TEXT&map=ft',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'PUPPETEER',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: 'https://simancrc.vtexassets.com/arquivos/logo-footer.png',
        mainSelector: '.vtex-product-summary-2-x-container',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.vtex-store-components-3-x-sellingPrice',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.vtex-store-components-3-x-listPrice',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.vtex-product-summary-2-x-clearLink',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.vtex-product-summary-2-x-imageNormal',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.ProductNameCard',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 21,
        name: 'UNIVERSAL',
        url: //'https://tiendauniversal.com/search?type=product&q=SEARCH_TEXT',
            'https://tiendauniversal.com/pages/search-results-page?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'PUPPETEER', 
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: 'https://tiendauniversal.com/cdn/shop/files/universal-logotipo_d4fbc676-9771-47f0-919f-49e8b8eb65c3_180x.png',
        mainSelector: '.snize-search-results-main-content div ul li',//'.snize-product.snize-product-in-stock',//'.product-item',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.snize-price.snize-price-with-discount.money ',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.snize-discounted-price.money ',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 3,
                        selector: '.snize-price.money ',//'.price',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.snize-view-link',//'.product-item__vendor.link',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.snize-item-image ',//'.product-item__primary-image',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.snize-title',//'.product-item__title',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 22,
        name: "El Rey",
        url: 'https://almaceneselrey.com/catalogsearch/result/?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'JSDOM', 
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo picture img",
        mainSelector: '.products.wrapper.grid.products-grid ol li',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-item-info div .price-box.price-final_price .special-price .price-wrapper .price',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.product-item-info div .price-box.price-final_price span span span',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-item-info a',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-item-info a span span img',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-item-info div strong a',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 23,
        name: "Ferreteria EPA",
        url: 'https://cr.epaenlinea.com/catalogsearch/result/?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'JSDOM', 
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo img",
        mainSelector: '.products.wrapper.grid.products-grid ol li',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        //selector:'.result-wrapper div .price-wrapper .after_special.promotion',
                        selector: '.product.details.product-item-details span .price-wrapper ',
                        //selector:'.row span span .amount',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.product.details.product-item-details span .price',
                        //selector:'.result-wrapper div .price-wrapper .before_special',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        //selector:'.product.name.product-item-name a',
                        selector: '.product-item-info a',
                        //selector:'.result-wrapper a',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        //selector:'.col-md-4.col-sm-6 meta div meta a div div img',
                        selector: '.product-item-info img',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        //selector:'.col-md-4.col-sm-6 meta div meta a div div div h3',
                        //selector:'.product.details.product-item-detail strong a',
                        selector: '.product.name.product-item-name a',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 24,
        name: "EL LAGAR",
        url: 'https://www.ellagar.com/ECOMMERCE/ItemSearch?search=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'PUPPETEER', 
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".img-fluid",
        mainSelector: '.item',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-price-discount',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.precio',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.item a',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.imagen img',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.name',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 25,
        name: "CONSTRUPLAZA",
        url: 'https://www.construplaza.com/Construplaza/Pedidos?busqueda=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'PUPPETEER', 
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: "https://www.construplaza.com/Content/Images/logo.webp",
        mainSelector: '.Producto',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.Precio p',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.Descripcion a',
                        selectorValueFrom: "TEXTCONTENT",//"ATTRIBUTE",
                        attribute: null//'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.Foto img',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.Descripcion a',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },      
    {
        id: 27,
        name: 'HI BEAUTY COSMETICS',
        url: 'https://hibeautycr.com/search?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        IndHowToScrape: 'PUPPETEER', 
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false, //true,
        logoSelector: 'https://hibeautycr.com/cdn/shop/files/phonto_03d167e9-aca5-4063-8d43-08961074f97a.jpg',//'.logo__image img',
        mainSelector: '.product-item.easylockdown-item',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-item__price--original',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.product-item__price--compare',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'a',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'href'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-item__thumbnail figure img',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'src'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-item__caption h3',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    }
]