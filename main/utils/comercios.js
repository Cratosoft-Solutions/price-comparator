export const scrapCompanyConfiguration = [
    /*     {
            id: 1,
            name: "WALMART CR",
            url: 'https://www.walmart.co.cr/SEARCH_TEXT?_q=SEARCH_TEXT&map=ft',
            scrapType: 'QUERY_PARAMETER',
            indHowToScrape: 'JSDOM',
            replaceTextOnURL: 'SEARCH_TEXT',
            indLogoSelector: false,
            logoSelector: "https://walmartcr.vtexassets.com/assets/vtex/assets-builder/walmartcr.store-theme/0.1.35/waltmart-logo___a095e1f47875aea1c10fcc867f8ac7ac.png",
            //logoSelector: ".vtex-store-components-3-x-logoImage",
            attributeLogoSelector: 'src',
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
        }, */
    {
        id: 2,
        name: "INTELEC",
        url: 'https://www.intelec.co.cr/index.php?route=product/search&search=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: "#logo img",
        attributeLogoSelector: 'src',
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
        id: 3,
        name: "MEXPRESS",
        url: 'https://www.tiendamexpress.com/filterSearch?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo img",
        attributeLogoSelector: 'src',
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
        id: 4,
        name: "Pricesmart",
        url: 'https://www.pricesmart.com/site/cr/es/busqueda?_sq=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo.px-0 img",
        attributeLogoSelector: 'src',
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
    },
    {
        id: 5,
        name: "EXTREMETECH",
        url: 'https://extremetechcr.com/tienda/index.php?fc=module&module=leoproductsearch&controller=productsearch&orderby=position&orderway=desc&cate=&search_query=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo.img-responsive",
        attributeLogoSelector: 'src',
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
        id: 6,
        name: "EKONO",
        url: 'https://www.tiendasekono.com/catalogsearch/result/?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo img",
        attributeLogoSelector: 'src',
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
        id: 7,
        name: "Artelec",
        url: 'https://www.artelec.cr/search/?field=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo.fitThisOnMenu",
        attributeLogoSelector: 'src',
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
        id: 8,
        name: "El Rey",
        url: 'https://almaceneselrey.com/catalogsearch/result/?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo picture img",
        attributeLogoSelector: 'src',
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
        id: 9,
        name: "Gollo Tiendas",
        url: 'https://www.gollo.com/catalogsearch/result/?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo img",
        attributeLogoSelector: 'src',
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
    }/* ,
    {
        id: 10,
        name: "MONGE",
        url: 'https://www.tiendamonge.com/catalogsearch/result/?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'PUPPETEER',
        rejectRequestPattern: ['api.ocularsolution.com',
            'cm.teads.tv',
            'content.syndigo.com',
            'dpm.demdex.net',
            'ocular-prod.api.rocio.ai',
            'rum-collector-2.pingdom.net',
            'stats.g.doubleclick.net',
            'google-analytics.com',
            'wlt832ea3j-2.algolianet.com'
        ],
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo img",
        attributeLogoSelector: 'src',
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
        id: 11,
        name: "EL VERDUGO",
        url: 'https://www.verdugotienda.com/catalogsearch/result/?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'PUPPETEER',
        rejectRequestPattern: ['assets.adobedtm.com',
            'widget.ocularsolution.com',
            'connect.facebook.net',
            'googleads.g.doubleclick.net',
            'polyfill.io',
            'wlt832ea3j-2.algolianet.com',
            'wlt832ea3j-2.algolianet.com',
            'facebook.com',
            'google-analytics.com',
            'google.co.cr',
            'googletagmanager.com'
        ],
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo img",
        attributeLogoSelector: 'src',
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
        id: 12,
        name: 'SIMAN',
        url: 'https://cr.siman.com/SEARCH_TEXT?_q=SEARCH_TEXT&map=ft',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'PUPPETEER',
        rejectRequestPattern: [
            'af-origin.vtex.com',
            'analytics.google.com',
            'cdn.frizbit.com',
            'd.la4-c1-ia5.salesforceliveagent.com',
            'fonts.googleapis.com',
            'rc.vtex.com',
            'service.force.com',
            'stats.g.doubleclick.net',
            'strapi-prod-2.onrender.com',
            'google.co.cr',
            'google.com'
        ],
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: 'https://simancrc.vtexassets.com/arquivos/logo-footer.png',
        attributeLogoSelector: 'src',
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
        id: 13,
        name: 'UNIVERSAL',
        url: 'https://tiendauniversal.com/search?type=product&q=SEARCH_TEXT',
        //'https://tiendauniversal.com/pages/search-results-page?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'PUPPETEER',
        rejectRequestPattern: [
            'api.speedien.com',
            'pagead2.googlesyndication.com',
            'codeblackbelt.com',
            'a.mailmunch.co',
            'forms.mailmunch.co',
            'stats.g.doubleclick.net',
            'codeblackbelt.com'
        ],
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: 'https://tiendauniversal.com/cdn/shop/files/universal-logotipo_d4fbc676-9771-47f0-919f-49e8b8eb65c3_180x.png',
        attributeLogoSelector: 'src',
        mainSelector: '.product-item.product-item--vertical',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.price.price--highlight',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.price',
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
                        selector: '.product-item__title.text--strong.link',
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
                        selector: '.product-item__primary-image.image--fade-in.lazyautosizes.lazyloaded',
                        selectorValueFrom: "ATTRIBUTE",
                        attribute: 'srcset'
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-item__title.text--strong.link',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    } */,
    {
        id: 14,
        name: "Pequeño Mundo",
        url: 'https://tienda.pequenomundo.com/catalogsearch/result/?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo img",
        attributeLogoSelector: 'src',
        mainSelector: '.products.wrapper.grid.products-grid.columns4 ol li',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.price',
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
    },
    {
        id: 15,
        name: "Ferreteria EPA",
        url: 'https://cr.epaenlinea.com/catalogsearch/result/?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo img",
        attributeLogoSelector: 'src',
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
    /* {
        id: 16,
        name: "EL LAGAR",
        url: 'https://www.ellagar.com/ECOMMERCE/ItemSearch?search=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'PUPPETEER',
        rejectRequestPattern: [
            'maps.googleapis.com',
            'scontent.fsjo11-1.fna.fbcdn.net',
            'static.xx.fbcdn.net',
            'facebook.com'
        ],
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: 'https://www.ellagar.com/SERV_ADMIN_FILES/Archivos/Imagenes/Parametro/Suc_1/LOGO LAGAR.png',//".img-fluid",
        attributeLogoSelector: 'src',
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
    }, */
    {
        id: 17,
        name: "Office Depot",
        url: 'https://www.officedepot.co.cr/officedepotCR/en/search/?text=SEARCH_TEXT',
        //absoluteUrl:'https://www.officedepot.co.cr',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: 'https://www.officedepot.co.cr/_ui/responsive/theme-officedepot/images/header-footer/footer2022/LG_ODMX2lineas.svg',//".hidden-md.hidden-lg.js-mobile-logo a img",
        attributeLogoSelector: 'src',
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
    /* {
        id: 18,
        name: "CONSTRUPLAZA",
        url: 'https://www.construplaza.com/Construplaza/Pedidos?busqueda=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'PUPPETEER',
        rejectRequestPattern: [
            'accounts.google.com',
            'analytics.google.com',
            'cdn.jsdelivr.net',
            'fonts.gstatic.com',
            'insights.algolia.io',
            'mucjnsqczh-dsn.algolia.net',
            'play.google.com',
            'stats.g.doubleclick.net',
            'google-analytics.com',
            'google.co.cr',
            'googletagmanager.com'
        ],
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: "https://www.construplaza.com/Content/Images/logo.webp",
        attributeLogoSelector: 'src',
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
    }, */
    {
        id: 19,
        name: "NOVEX",
        url: 'https://novex.cr/search?term=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'PUPPETEER',
        rejectRequestPattern: [
            'app.b2chat.io',
            'b2chat-filesrepo.s3.amazonaws.com',
            'c.tenor.com',
            'cdn.jsdelivr.net',
            'chimpstatic.com',
            'code.jquery.com',
            'connect.facebook.net',
            'connect.nosto.com',
            'd1cocw0250tpxv.cloudfront.net',
            'fonts.googleapis.com',
            'livechat.b2chat.io',
            'pagead2.googlesyndication.com',
            'livechat.b2chat.io',
            'script.hotjar.com',
            'static.hotjar.com',
            'thumbs.nosto.com',
            'use.fontawesome.com',
            'google-analytics.com',
            'googletagmanager.com'
        ],
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".Logo_img",
        attributeLogoSelector: 'src',
        mainSelector: '.productCardGrid-container',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.price.productCardControlsGrid__Price',
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
                        selector: '.productCardGrid-container__Img a',
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
                        selector: '.productCardGrid-container__Img--size',
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
                        selector: '.productCardMain__Name',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    /* {
        id: 20,
        name: "MASXMENOS",
        url: 'https://www.masxmenos.cr/SEARCH_TEXT?_q=SEARCH_TEXT&map=ft',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".vtex-store-components-3-x-logoImage",
        attributeLogoSelector: 'data-src',
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
        id: 21,
        name: "AUTOMERCADO",
        url: 'https://www.automercado.cr/buscar?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'PUPPETEER',
        rejectRequestPattern: [
            'ad.360yield.com',
            'ade.clmbtech.com',
            'ads.stickyadstv.com',
            'analytics.clickdimensions.com',
            'c.bing.com',
            'cdnjs.cloudflare.com',
            'cl.qualaroo.com',
            'cm.g.doubleclick.net',
            'cm.adgrx.com',
            'cms-production.azurewebsites.net',
            'connect.facebook.net',
            'contextual.media.net',
            'criteo-partners.tremorhub.com',
            'criteo-sync.teads.tv',
            'd27c6j8064skg9.cloudfront.net',
            'dev.visualwebsiteoptimizer.com',
            'dntcl.qualaroo.com',
            'dpm.demdex.net',
            'dynamic.criteo.com',
            'eb2.3lift.com',
            'edge.fullstory.com',
            'exchange.mediavine.com',
            'firebase.googleapis.com',
            'firebaseinstallations.googleapis.com',
            'fledge.us.criteo.com',
            'fu5xfx7knl-dsn.algolia.net',
            'gum.criteo.com',
            'i.liadm.com',
            'ib.adnxs.com',
            'ka-f.fontawesome.com',
            'maps.googleapis.com',
            'match.sharethrough.com',
            'matching.ivitrack.com',
            'measurement-api.criteo.com',
            'pixel.rubiconproject.com',
            'r.casalemedia.com',
            'rs.fullstory.com',
            'rtb-csync.smartadserver.com',
            's.ad.smaato.net',
            'secure.adnxs.com',
            'simage2.pubmatic.com',
            'stats.g.doubleclick.net',
            'sync-criteo.ads.yieldmo.com',
            'sync-t1.taboola.com',
            'sync.outbrain.com',
            'tags.bluekai.com',
            'tg.socdm.com',
            'trends.revcontent.com',
            'ups.analytics.yahoo.com',
            'visitor.omnitagjs.com',
            'google-analytics.com',
            'googletagmanager.com',
            'x.bidswitch.net'
        ],
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".navbar-brand img",
        attributeLogoSelector: 'src',
        mainSelector: '.card-body',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.text-currency.h5-am',
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
        id: 22,
        name: 'FISCHEL',
        url: 'https://www.fischelenlinea.com/busqueda?p=SEARCH_TEXT&c=0',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'PUPPETEER',
        rejectRequestPattern: [
            'maps.googleapis.com',
            'y.clarity.ms/collect',
            'cms.salesmanago.com',
            'stats.g.doubleclick.net'
        ],
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: '.logo img',
        attributeLogoSelector: 'src',
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
        id: 23,
        name: 'LA BOMBA FARMACIA',
        url: 'https://farmacialabomba.com/busqueda?p=SEARCH_TEXT&c=0',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'PUPPETEER',
        rejectRequestPattern: ['cms.salesmanago.com',
            'script.crazyegg.com',
            'stackpath.bootstrapcdn.com',
            't.clarity.ms',
            'clarity.ms'],
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: '.logo img',
        attributeLogoSelector: 'src',
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
    }, */
    {
        id: 24,
        name: 'SUCRE EN LINEA',
        url: 'https://sucreenlinea.com/catalogsearch/result/?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: '.logo img',
        attributeLogoSelector: 'src',
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
        id: 25,
        name: 'HI BEAUTY COSMETICS',
        url: 'https://hibeautycr.com/search?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'PUPPETEER',
        rejectRequestPattern: [
            'cdn.shopify.com',
            'code.jquery.com',
            'vaultcdn.electricapps.net',
            'cloudflare.com'
        ],
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false, //true,
        logoSelector: 'https://hibeautycr.com/cdn/shop/files/phonto_03d167e9-aca5-4063-8d43-08961074f97a.jpg',//'.logo__image img',
        attributeLogoSelector: 'src',
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
    },
    {
        id: 26,
        name: "ALMACEN MAURO",
        url: 'https://mauroenlinea.com/?s=SEARCH_TEXT&post_type=product',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".attachment-full.size-full.wp-image-464763",
        attributeLogoSelector: 'src',
        mainSelector: '.products.elementor-grid.columns-4 li',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.woocommerce-Price-amount.amount',
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
                        selector: '.ast-loop-product__link',
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
                        selector: '.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail',
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
                        selector: '.woocommerce-loop-product__title',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 912,
        name: 'SIMAN',
        url: 'https://cr.siman.com/SEARCH_TEXT/s?_q=SEARCH_TEXT&map=ft&__pickRuntime=Cquery%2CqueryData',
        //PARAMETROS REQUEST
        //HEADERS
        accept: "application/json",
        acceptLanguage: null,
        contentType: null,
        secChUa: "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
        secChUaMobile: "?0",
        secChUaPlatform: "\"Windows\"",
        secFetchDest: "empty",
        secFetchMode: "cors",
        secFetchSite: "same-origin",
        xRequestedWith: "XMLHttpRequest",
        xAlgoliaApiKey: null,
        xAlgoliaApplicationId: null,
        //OTROS
        referrer: "https://cr.siman.com/SEARCH_TEXT?_q=SEARCH_TEXT&map=ft",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "omit",
        //FIN PARAMETROS REQUEST
        linkUrl: 'https://cr.siman.com/',
        imageUrl: null,
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSON',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: 'https://simancrc.vtexassets.com/arquivos/logo-footer.png',
        attributeLogoSelector: 'src',
        mainSelector: 'queryData.data.productSearch.products',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'priceRange.sellingPrice.lowPrice',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: 'priceRange.sellingPrice.highPrice',
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
                        selector: 'link',
                        selectorValueFrom: "TEXTCONTENT",
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
                        //selector: 'items.images[0].imageUrl',
                        selector: 'items.images.imageUrl',
                        selectorValueFrom: "TEXTCONTENT",
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
                        selector: 'productName',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 910,
        name: "MONGE",
        url: 'https://wlt832ea3j-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.13.1)%3B%20Browser%3B%20instantsearch.js%20(4.41.0)%3B%20Magento2%20integration%20(3.9.0)%3B%20JS%20Helper%20(3.8.2)',
        //PARAMETROS REQUEST
        //HEADERS
        accept: "*/*",
        acceptLanguage: "en-US,en;q=0.9,es-CR;q=0.8,es;q=0.7",
        contentType: "application/x-www-form-urlencoded",
        secChUa: "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
        secChUaMobile: "?0",
        secChUaPlatform: "\"Windows\"",
        secFetchDest: "empty",
        secFetchMode: "cors",
        secFetchSite: "cross-site",
        xRequestedWith: null,
        xAlgoliaApiKey: "YTYwZjI3ODFjOTI3YWQ0MjJmYzQ3ZjBiNmY1Y2FiYjRhZjNiMmM3NmMxYTMyNDUwOGUxYjhkMWFhMzFlOGExNnRhZ0ZpbHRlcnM9",
        xAlgoliaApplicationId: "WLT832EA3J",
        //OTROS
        referrer: "https://www.tiendamonge.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: "{\"requests\":[{\"indexName\":\"monge_upgrade_prod_default_products\",\"params\":\"highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&hitsPerPage=9&query=SEARCH_TEXT&page=0&maxValuesPerFacet=40&facets=%5B%22price.CRC.default%22%2C%22categoria%22%2C%22tipo_de_producto%22%2C%22marca%22%2C%22tamano_pantallas%22%5D&tagFilters=&numericFilters=%5B%22visibility_search%3D1%22%5D\"}]}",
        method: "POST",
        mode: "cors",
        credentials: "omit",
        //FIN PARAMETROS REQUEST    
        linkUrl: 'https://www.tiendamonge.com/',
        imageUrl: null,
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSON',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: "https://www.tiendamonge.com/static/version1694655550/frontend/Omnipro/monge/es_CR/images/logo.svg",
        attributeLogoSelector: 'src',
        mainSelector: 'results.hits',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'price.CRC.default',
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
                        selector: 'url',
                        selectorValueFrom: "TEXTCONTENT",
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
                        selector: 'image_url',
                        selectorValueFrom: "TEXTCONTENT",
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
                        selector: 'name',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 911,
        name: "EL VERDUGO",
        url: 'https://wlt832ea3j-1.algolianet.com/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.13.1)%3B%20Browser%3B%20instantsearch.js%20(4.41.0)%3B%20Magento2%20integration%20(3.9.0)%3B%20JS%20Helper%20(3.8.2)',
        //PARAMETROS REQUEST
        //HEADERS
        accept: "*/*",
        acceptLanguage: "en-US,en;q=0.9,es-CR;q=0.8,es;q=0.7",
        contentType: "application/x-www-form-urlencoded",
        secChUa: "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
        secChUaMobile: "?0",
        secChUaPlatform: "\"Windows\"",
        secFetchDest: "empty",
        secFetchMode: "cors",
        secFetchSite: "cross-site",
        xRequestedWith: null,
        xAlgoliaApiKey: "YTYwZjI3ODFjOTI3YWQ0MjJmYzQ3ZjBiNmY1Y2FiYjRhZjNiMmM3NmMxYTMyNDUwOGUxYjhkMWFhMzFlOGExNnRhZ0ZpbHRlcnM9",
        xAlgoliaApplicationId: "WLT832EA3J",
        //OTROS
        referrer: "https://www.verdugotienda.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: "{\"requests\":[{\"indexName\":\"monge_upgrade_prod_verdugo_products\",\"params\":\"highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&hitsPerPage=9&query=SEARCH_TEXT&page=0&maxValuesPerFacet=40&facets=%5B%22price.CRC.default%22%2C%22categoria%22%2C%22tipo_de_producto%22%2C%22marca%22%2C%22tamano_pantallas%22%5D&tagFilters=&numericFilters=%5B%22visibility_search%3D1%22%5D\"}]}",
        method: "POST",
        mode: "cors",
        credentials: "omit",
        //FIN PARAMETROS REQUEST    
        linkUrl: 'https://www.verdugotienda.com/',
        imageUrl: null,
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSON',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: "https://www.verdugotienda.com/static/version1694655550/frontend/Omnipro/verdugo/es_CR/images/logo.svg",
        attributeLogoSelector: 'src',
        mainSelector: 'results.hits',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'price.CRC.default',
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
                        selector: 'url',
                        selectorValueFrom: "TEXTCONTENT",
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
                        selector: 'image_url',
                        selectorValueFrom: "TEXTCONTENT",
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
                        selector: 'name',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 913,
        name: "UNIVERSAL",
        url: "https://searchserverapi.com/getresults?api_key=7H5U4o0w1P&q=SEARCH_TEXT&sortBy=relevance&sortOrder=desc&startIndex=0&maxResults=15&items=true&pages=true&categories=true&suggestions=true&queryCorrection=true&suggestionsMaxResults=3&pageStartIndex=0&pagesMaxResults=20&categoryStartIndex=0&categoriesMaxResults=20&facets=true&facetsShowUnavailableOptions=true&recentlyViewedProducts=7021400883283%2C7015115980883%2C7015399194707%2C7015455457363%2C6953829826643%2C6815284953171%2C6869979496531%2C6932114702419%2C6852126310483&recentlyAddedToCartProducts=&recentlyPurchasedProducts=&ResultsTitleStrings=2&ResultsDescriptionStrings=2&timeZoneName=America%2FCosta_Rica&output=jsonp",
        //url: "https://searchserverapi.com/getresults?api_key=7H5U4o0w1P&q=SEARCH_TEXT&sortBy=relevance&sortOrder=desc&startIndex=0&maxResults=15&items=true&pages=true&categories=true&suggestions=true&queryCorrection=true&suggestionsMaxResults=3&pageStartIndex=0&pagesMaxResults=20&categoryStartIndex=0&categoriesMaxResults=20&facets=true&facetsShowUnavailableOptions=true&recentlyViewedProducts=7021400883283%2C7015115980883%2C7015399194707%2C7015455457363%2C6953829826643%2C6815284953171%2C6869979496531%2C6932114702419%2C6852126310483&recentlyAddedToCartProducts=&recentlyPurchasedProducts=&ResultsTitleStrings=2&ResultsDescriptionStrings=2&timeZoneName=America%2FCosta_Rica&output=jsonp&callback=jQuery36006702242308187536_1694490457791&_=1694490457792",
        //PARAMETROS REQUEST
        //HEADERS
        accept: "*/*",
        acceptLanguage: "en-US,en;q=0.9,es-CR;q=0.8,es;q=0.7",
        contentType: null,
        secChUa: "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
        secChUaMobile: "?0",
        secChUaPlatform: "\"Windows\"",
        secFetchDest: "script",
        secFetchMode: "no-cors",
        secFetchSite: "cross-site",
        xRequestedWith: null,
        xAlgoliaApiKey: null,
        xAlgoliaApplicationId: null,
        //OTROS
        referrer: "https://tiendauniversal.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "omit",
        //FIN PARAMETROS REQUEST
        linkUrl: 'https://tiendauniversal.com',
        imageUrl: null,
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSON',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: 'https://tiendauniversal.com/cdn/shop/files/universal-logotipo_d4fbc676-9771-47f0-919f-49e8b8eb65c3_180x.png',
        attributeLogoSelector: 'src',
        mainSelector: 'items',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'price',
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
                        selector: 'link',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'image_link',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'title',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 916,
        name: "EL LAGAR",
        url: "https://www.ellagar.com/ECOMMERCE/API/Articulo/ObtenerArticulosPorNombre",
        //PARAMETROS REQUEST
        //HEADERS
        accept: "*/*",
        acceptLanguage: "en-US,en;q=0.9,es-CR;q=0.8,es;q=0.7",
        contentType: "application/json",
        secChUa: "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
        secChUaMobile: "?0",
        secChUaPlatform: "\"Windows\"",
        secFetchDest: "empty",
        secFetchMode: "cors",
        secFetchSite: "same-origin",
        xRequestedWith: null,
        xAlgoliaApiKey: null,
        xAlgoliaApplicationId: null,
        //OTROS
        referrer: "https://www.ellagar.com/ECOMMERCE/ItemSearch?search=SEARCH_TEXT",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: "{\"ArticuloNombre\":\"SEARCH_TEXT\",\"CategoriaIds\":null,\"Pagina\":1,\"TamanoPagina\":\"24\",\"Ordenamiento\":\"5\"}",
        method: "POST",
        mode: "cors",
        credentials: "include",
        //FIN PARAMETROS REQUEST  
        linkUrl: "https://www.ellagar.com/ECOMMERCE/ItemDetail?id=",
        imageUrl: null,
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSON',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: 'https://www.ellagar.com/SERV_ADMIN_FILES/Archivos/Imagenes/Parametro/Suc_1/LOGO LAGAR.png',//".img-fluid",
        attributeLogoSelector: 'src',
        mainSelector: 'Data.PaginaItems',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'Precio',
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
                        selector: 'ID',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'URLImagen',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'Nombre',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 918,
        name: "CONSTRUPLAZA",
        url: "https://mucjnsqczh-3.algolianet.com/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.5.1)%3B%20Browser%20(lite)%3B%20instantsearch.js%20(4.56.7)%3B%20JS%20Helper%20(3.13.5)&x-algolia-api-key=548b5dedba445fcdb9435d2dd720562a&x-algolia-application-id=MUCJNSQCZH",
        //PARAMETROS REQUEST
        //HEADERS
        accept: "*/*",
        acceptLanguage: "en-US,en;q=0.9,es-CR;q=0.8,es;q=0.7",//NO CAMBIAN
        contentType: "application/x-www-form-urlencoded",
        secChUa: "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",//NO CAMBIAN
        secChUaMobile: "?0",//NO CAMBIA
        secChUaPlatform: "\"Windows\"",//NO CAMBIA
        secFetchDest: "empty",
        secFetchMode: "cors",
        secFetchSite: "cross-site",
        xRequestedWith: null,
        xAlgoliaApiKey: null,
        xAlgoliaApplicationId: null,
        //OTROS
        referrer: "https://www.construplaza.com/",
        referrerPolicy: "strict-origin-when-cross-origin",   //NO CAMBIA
        body: "{\"requests\":[{\"indexName\":\"Products\",\"params\":\"clickAnalytics=true&facets=%5B%22Marca%22%2C%22Unidad%22%2C%22Precio%22%2C%22Departamento%22%5D&highlightPostTag=__%2Fais-highlight__&highlightPreTag=__ais-highlight__&hitsPerPage=28&maxValuesPerFacet=10000&page=0&query=SEARCH_TEXT&tagFilters=&userToken=anonymous-592540cc-6bbd-482d-8ea7-9fd6a5e354d4\"}]}",
        method: "POST",
        mode: "cors",
        credentials: "omit",
        //FIN PARAMETROS REQUEST  
        linkUrl: "https://www.construplaza.com/Construplaza/Pedidos?busqueda=",
        imageUrl: null,
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSON',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: "https://www.construplaza.com/Content/Images/logo.webp",
        attributeLogoSelector: 'src',
        mainSelector: 'results.hits',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'Precio',//PrecioDescuento
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
                        selector: 'Descripcion',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'Image',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'Descripcion',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 923,
        name: "FARMACIA LA BOMBA",
        url: "https://farmacialabomba.com/GetSearchDocumentProduct",
        //PARAMETROS REQUEST
        //HEADERS
        accept: "application/json, text/plain, */*",
        acceptLanguage: "en-US,en;q=0.9,es-CR;q=0.8,es;q=0.7",
        contentType: "application/json",
        secChUa: "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
        secChUaMobile: "?0",
        secChUaPlatform: "\"Windows\"",
        secFetchDest: "empty",
        secFetchMode: "cors",
        secFetchSite: "same-origin",
        xRequestedWith: "XMLHttpRequest",
        xAlgoliaApiKey: null,
        xAlgoliaApplicationId: null,
        //OTROS
        referrer: "https://farmacialabomba.com/busqueda?p=SEARCH_TEXT&c=0",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: "{\"jsonData\":\"{\\\"brandName\\\":null,\\\"catName\\\":\\\"0\\\",\\\"subCatName\\\":null,\\\"tagName\\\":null,\\\"productName\\\":\\\"SEARCH_TEXT\\\"}\"}",
        method: "POST",
        mode: "cors",
        credentials: "include",
        //FIN PARAMETROS REQUEST  
        linkUrl: "https://farmacialabomba.com/detalle-producto/",
        imageUrl: null,
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSON',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: "https://farmacialabomba.com/LaBombaResources/img/logos/logo-full-color.svg",
        attributeLogoSelector: 'src',
        mainSelector: 'product.productsList',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'ProductAttributes.PriceWithDiscount',//AddedPrice
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
                        selector: 'URL',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'ProductImages.WebPath',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'Name',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 921,
        name: "AUTOMERCADO",
        url: "https://fu5xfx7knl-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.12.0)%3B%20Browser%20(lite)&x-algolia-api-key=113941a18a90ae0f17d602acd16f91b2&x-algolia-application-id=FU5XFX7KNL",
        //PARAMETROS REQUEST
        //HEADERS
        accept: "*/*",
        acceptLanguage: "en-US,en;q=0.9,es-CR;q=0.8,es;q=0.7",
        contentType: "application/x-www-form-urlencoded",
        secChUa: "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
        secChUaMobile: "?0",
        secChUaPlatform: "\"Windows\"",
        secFetchDest: "empty",
        secFetchMode: "cors",
        secFetchSite: "cross-site",
        xRequestedWith: null,
        xAlgoliaApiKey: null,
        xAlgoliaApplicationId: null,
        //OTROS
        referrer: "https://www.automercado.cr/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: "{\"requests\":[{\"indexName\":\"Product_CatalogueV2\",\"params\":\"query=SEARCH_TEXT&optionalWords=%5B%22SEARCH_TEXT%22%5D\"}]}",
        //"{\"requests\":[{\"indexName\":\"Product_CatalogueV2\",\"params\":\"query=SEARCH_TEXT&optionalWords=%5B%22SEARCH_TEXT%22%5D&filters=NOT%20marca%3AMASTERCHEF&getRankingInfo=true&facets=%5B%22marca%22%2C%22addedSugarFree%22%2C%22fiberSource%22%2C%22lactoseFree%22%2C%22lfGlutemFree%22%2C%22lfOrganic%22%2C%22lfVegan%22%2C%22lowFat%22%2C%22lowSodium%22%2C%22preservativeFree%22%2C%22sweetenersFree%22%2C%22parentProductid%22%2C%22parentProductid2%22%2C%22parentProductid_URL%22%2C%22catecom%22%5D&facetFilters=%5B%5B%22storeDetail.06.storeid%3A06%22%5D%5D\",\"clickAnalytics\":true}]}",
        method: "POST",
        mode: "cors",
        credentials: "omit",
        //FIN PARAMETROS REQUEST  
        linkUrl: "https://www.automercado.cr/p/productName/id/vendorLink",//"https://www.automercado.cr/buscar?q=", 
        imageUrl: null,
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSON',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: "https://www.automercado.cr/content/images/logoAM.svg",
        attributeLogoSelector: 'src',
        mainSelector: 'results.hits',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'storeDetail.09.amount',//AddedPrice
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: 'storeDetail.03.amount',//AddedPrice
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: 'storeDetail.04.amount',//AddedPrice
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: 'storeDetail.21.amount',//AddedPrice
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: 'storeDetail.08.amount',//AddedPrice
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'ecomDescription',
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
                        selector: 'objectID',//'ecomDescription',//
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: 'specialLink'
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'imageUrl',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 922,
        name: "FISCHEL",
        url: "https://www.fischelenlinea.com/SearchProductsByQueryParam",
        //PARAMETROS REQUEST
        //HEADERS
        accept: "application/json, text/plain, */*",
        acceptLanguage: "en-US,en;q=0.9,es-CR;q=0.8,es;q=0.7",
        contentType: "application/json",
        secChUa: "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
        secChUaMobile: "?0",
        secChUaPlatform: "\"Windows\"",
        secFetchDest: "empty",
        secFetchMode: "cors",
        secFetchSite: "same-origin",
        xRequestedWith: "XMLHttpRequest",
        xAlgoliaApiKey: null,
        xAlgoliaApplicationId: null,
        //OTROS
        referrer: "https://www.fischelenlinea.com/busqueda?p=SEARCH_TEXT&c=0",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: "{\"jsonData\":\"{\\\"productName\\\":\\\"SEARCH_TEXT\\\"}\"}",
        method: "POST",
        mode: "cors",
        credentials: "include",
        //FIN PARAMETROS REQUEST  
        linkUrl: "https://www.fischelenlinea.com/detalle-producto/detalle-producto/",
        imageUrl: null,
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSON',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: "https://www.fischelenlinea.com/FishelResources/img/fischel.png",
        attributeLogoSelector: 'src',
        mainSelector: 'product.productsList',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'ProductAttributes.PriceWithTaxes',//AddedPrice
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
                        selector: 'URL',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'ProductImages.WebPath',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'Name',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 901,
        name: "WALMART",
        url: "https://www.walmart.co.cr/SEARCH_TEXT?_q=SEARCH_TEXT&map=ft&__pickRuntime=query%2CqueryData",
        //  url: "https://www.walmart.co.cr/_v/segment/graphql/v1?workspace=master&maxAge=short&appsEtag=remove&domain=store&locale=es-CR&__bindingId=17dd0832-2127-4686-ad3a-09850b413565&operationName=productSearchV3&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%225582a05af7ee7b8a43406c6041335d5e4f0a6eea4a16f4bef9d2599218766e82%22%2C%22sender%22%3A%22vtex.store-resources%400.x%22%2C%22provider%22%3A%22vtex.search-graphql%400.x%22%7D%7D",
        //url: "https://www.walmart.co.cr/_v/segment/graphql/v1?workspace=master&maxAge=short&appsEtag=remove&domain=store&locale=es-CR&__bindingId=17dd0832-2127-4686-ad3a-09850b413565&operationName=productSearchV3&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%225582a05af7ee7b8a43406c6041335d5e4f0a6eea4a16f4bef9d2599218766e82%22%2C%22sender%22%3A%22vtex.store-resources%400.x%22%2C%22provider%22%3A%22vtex.search-graphql%400.x%22%7D%2C%22variables%22%3A%22eyJoaWRlVW5hdmFpbGFibGVJdGVtcyI6ZmFsc2UsInNrdXNGaWx0ZXIiOiJBTEwiLCJzaW11bGF0aW9uQmVoYXZpb3IiOiJkZWZhdWx0IiwiaW5zdGFsbG1lbnRDcml0ZXJpYSI6Ik1BWF9XSVRIT1VUX0lOVEVSRVNUIiwicHJvZHVjdE9yaWdpblZ0ZXgiOmZhbHNlLCJtYXAiOiJmdCIsInF1ZXJ5IjoiYWNldGFtaW5vZmVuIiwib3JkZXJCeSI6Ik9yZGVyQnlTY29yZURFU0MiLCJmcm9tIjowLCJ0byI6OSwic2VsZWN0ZWRGYWNldHMiOlt7ImtleSI6ImZ0IiwidmFsdWUiOiJhY2V0YW1pbm9mZW4ifV0sImZ1bGxUZXh0IjoiYWNldGFtaW5vZmVuIiwiZmFjZXRzQmVoYXZpb3IiOiJTdGF0aWMiLCJjYXRlZ29yeVRyZWVCZWhhdmlvciI6ImRlZmF1bHQiLCJ3aXRoRmFjZXRzIjpmYWxzZSwidmFyaWFudCI6IiJ9%22%7D",
        //PARAMETROS REQUEST
        //HEADERS
        accept: "application/json",
        acceptLanguage: null,
        contentType: null,
        secChUa: "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
        secChUaMobile: "?0",
        secChUaPlatform: "\"Windows\"",
        secFetchDest: null,
        secFetchMode: null,
        secFetchSite: null,
        xRequestedWith: null,
        xAlgoliaApiKey: null,
        xAlgoliaApplicationId: null,
        //OTROS
        referrer: "https://www.walmart.co.cr/SEARCH_TEXT?_q=SEARCH_TEXT&map=ft",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "omit",
        //FIN PARAMETROS REQUEST  
        linkUrl: "https://www.walmart.co.cr",
        imageUrl: null,
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSON',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: "https://walmartcr.vtexassets.com/assets/vtex/assets-builder/walmartcr.store-theme/1.0.417/waltmart-logo___e887a7c223ca5d5111202f45453db619.png",
        attributeLogoSelector: 'src',
        mainSelector: 'queryData.data.productSearch.products',//'data.productSearch.products',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'priceRange.sellingPrice.lowPrice',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: 'priceRange.sellingPrice.highPrice',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 3,
                        selector: 'priceRange.listPrice.lowPrice',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 4,
                        selector: 'priceRange.listPrice.highPrice',
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
                        selector: 'link',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'items.images.imageUrl',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'productName',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 920,
        name: "MASXMENOS",
        url: "https://www.masxmenos.cr/SEARCH_TEXT?_q=SEARCH_TEXT&map=ft&__pickRuntime=query%2CqueryData",
        //PARAMETROS REQUEST
        //HEADERS
        accept: "application/json",
        acceptLanguage: null,
        contentType: null,
        secChUa: "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
        secChUaMobile: "?0",
        secChUaPlatform: "\"Windows\"",
        secFetchDest: null,
        secFetchMode: null,
        secFetchSite: null,
        xRequestedWith: null,
        xAlgoliaApiKey: null,
        xAlgoliaApplicationId: null,
        //OTROS
        referrer: "https://www.masxmenos.cr/SEARCH_TEXT?_q=SEARCH_TEXT&map=ft",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "omit",
        //FIN PARAMETROS REQUEST  
        linkUrl: null,
        imageUrl: null,
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSON',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: "https://supermxmcr.vtexassets.com/assets/vtex.file-manager-graphql/images/3ded2a1c-d612-4f03-8a2b-45ed6cbc7ca4___cfba4950414c4e5734e110da25e4900b.svg",
        attributeLogoSelector: 'src',
        mainSelector: 'queryData.data.productSearch.products',//'data.productSearch.products',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'priceRange.sellingPrice.lowPrice',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: 'priceRange.sellingPrice.highPrice',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 3,
                        selector: 'priceRange.listPrice.lowPrice',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 4,
                        selector: 'priceRange.listPrice.highPrice',
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
                        selector: 'link',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'productImage',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'items.images.imageUrl',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
            {
                fieldName: 'productName',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'productName',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    }
]