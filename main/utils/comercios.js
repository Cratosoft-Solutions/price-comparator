export const scrapCompanyConfiguration = [
    {
        id: 2,
        name: "Intelec",
        url: 'https://www.intelec.co.cr/index.php?route=product/search&search=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: "#logo img",
        attributeLogoSelector: 'src',
        indMoneda: 'CRC',
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
        name: "MExpress",
        url: 'https://www.tiendamexpress.com/filterSearch?adv=true&q=SEARCH_TEXT&sid=true',
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
        name: "Extremetech",
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
                        selector: '.price.product-price',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
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
        name: "Ekono",
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
                        selector: '.special-price span span span',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.old-price span span span',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 3,
                        selector: '.normal-price span span span',
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
                        selector: '.product.photo.product-item-photo',
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
        indMoneda: 'CRC',
        indMoneda: 2,
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
        name: "Gollo",
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
    },
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
        indMoneda: 'CRC',
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
        name: "Epa",
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
                        selector: '.product.details.product-item-details span .price-wrapper ',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.product.details.product-item-details span .price',
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
                        selector: '.product.name.product-item-name a',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 17,
        name: "Office Depot",
        url: 'https://www.officedepot.co.cr/officedepotCR/en/search/?text=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: 'https://www.officedepot.co.cr/_ui/responsive/theme-officedepot/images/header-footer/footer2022/LG_ODMX2lineas.svg',
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
    {
        id: 19,
        name: "Novex",
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
    {
        id: 24,
        name: 'Sucre',
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
        id: 9999,
        name: 'Hi Beauty',
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
        indLogoSelector: false,
        logoSelector: 'https://hibeautycr.com/cdn/shop/files/phonto_03d167e9-aca5-4063-8d43-08961074f97a.jpg',
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
        name: "Almacen Mauro",
        url: 'https://mauroenlinea.com/?s=SEARCH_TEXT&post_type=product',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: "https://mauroenlinea.com/wp-content/uploads/2022/10/Logo-Mauro-300x300.png",
        attributeLogoSelector: 'src',
        mainSelector: '.elementor.elementor-465875 div',
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
                        selector: '.product_title.entry-title a',
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
                        selector: '.elementor-widget-container a img',
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
                        selector: '.product_title.entry-title a',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 912,
        name: 'Siman',
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
        linkUrl: "https://cr.siman.com/productName/p",
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
                        selector: 'linkText',
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
        name: "Monge",
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
        indRoundNumber: true,        
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
        name: "Verdugo",
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
        indRoundNumber: true,
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
        name: "Universal",
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
        name: "El Lagar",
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
        logoSelector: 'https://www.ellagar.com/SERV_ADMIN_FILES/Archivos/Imagenes/Parametro/Suc_1/LOGO LAGAR.png',
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
        name: "Construplaza",
        url: "https://mucjnsqczh-3.algolianet.com/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.5.1)%3B%20Browser%20(lite)%3B%20instantsearch.js%20(4.56.7)%3B%20JS%20Helper%20(3.13.5)&x-algolia-api-key=548b5dedba445fcdb9435d2dd720562a&x-algolia-application-id=MUCJNSQCZH",
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
        indRoundNumber: true,
        indLogoSelector: false,
        logoSelector: "https://www.construplaza.com/Content/Images/logo.webp",
        attributeLogoSelector: 'src',
        indMoneda: 'CRC',
        mainSelector: 'results.hits',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'PrecioDescuento',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
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
                        selector: 'Descripcion',//'CodBarras',
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
        name: "La Bomba",
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
                        selector: 'ProductAttributes.PriceWithDiscount',
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
        name: "Automercado",
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
        method: "POST",
        mode: "cors",
        credentials: "omit",
        //FIN PARAMETROS REQUEST  
        linkUrl: "https://www.automercado.cr/p/productName/id/vendorLink",
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
                        selector: 'storeDetail.09.amount',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: 'storeDetail.03.amount',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 3,
                        selector: 'storeDetail.04.amount',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 4,
                        selector: 'storeDetail.21.amount',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 5,
                        selector: 'storeDetail.08.amount',
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
                        selector: 'objectID',
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
        name: "Fischel",
        url: "https://fischelenlinea.com/GetSearchDocumentProduct",
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
        referrer: "https://fischelenlinea.com/busqueda?p=SEARCH_TEXT&c=0",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: "{\"jsonData\":\"{\\\"brandName\\\":null,\\\"catName\\\":\\\"0\\\",\\\"subCatName\\\":null,\\\"tagName\\\":null,\\\"productName\\\":\\\"SEARCH_TEXT\\\"}\"}",// "{\"jsonData\":\"{\\\"productName\\\":\\\"SEARCH_TEXT\\\"}\"}",
        method: "POST",
        mode: "cors",
        credentials: "include",
        //FIN PARAMETROS REQUEST  
        linkUrl: "https://www.fischelenlinea.com/detalle-producto/",
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
                        selector: 'ProductAttributes.PriceWithTaxes',
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
        name: "Walmart",
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
        name: "Masxmenos",
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
        linkUrl: "https://www.masxmenos.cr/productName/p",
        imageUrl: null,
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSON',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: "https://supermxmcr.vtexassets.com/assets/vtex.file-manager-graphql/images/3ded2a1c-d612-4f03-8a2b-45ed6cbc7ca4___cfba4950414c4e5734e110da25e4900b.svg",
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
                        selector: 'linkText',
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
        id: 927,
        name: "La Botica",
        url: "https://laboticacrapi.clavisco.com/api/Items/GetItems?ItmsGrpCod=0&searchItem=SEARCH_TEXT&SubMenu=&selectedCategory=Todos&userId=&currentLang=es&selectedSubCategory=&selectedLaboratory=&StartPos=1&StepPos=12&priceFromFC=0&priceToFC=0&order=SD",
        //PARAMETROS REQUEST
        //HEADERS
        accept: "application/json, text/plain, */*",
        acceptLanguage: "en-US,en;q=0.9,es-CR;q=0.8,es;q=0.7",
        contentType: "application/json",
        secChUa: "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
        secChUaMobile: "?0",
        secChUaPlatform: "\"Windows\"",
        secFetchDest:"empty",
        secFetchMode: "cors",
        secFetchSite: "cross-site",
        xRequestedWith: null,
        xAlgoliaApiKey: null,
        xAlgoliaApplicationId: null,
        //OTROS
        referrer: "https://laboticacr.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "omit",
        //FIN PARAMETROS REQUEST  
        linkUrl: "https://laboticacr.com/#/products/vendorLink/productName",
        imageUrl: null,
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSON',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: "https://clvsapps.blob.core.windows.net/appfiles/GrupoMontecristo/ICEM/ECM/notfound.png",
        attributeLogoSelector: 'src',
        mainSelector: 'ItemsList',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'PriceFCWithTax',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: 'PriceMSFCWithTax',
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
                        selector: 'ItemName',
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
                        selector: 'ItemCode',
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
                        selector: 'Url',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            }
        ]
    },
    {
        id: 28,
        name: "Toys",
        url: 'https://www.tiendatoys.com/search/?field=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo.fitThisOnMenu",
        attributeLogoSelector: 'src',
        mainSelector: '.product-item',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.price ins .amount',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.price del .amount',
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
                        selector: '.buttons a',
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
        id: 29,
        name: "Ishop",
        url: 'https://tiendasishop.com/cr/catalogsearch/result/?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        //indRigthAmountFormat: true,
        indLogoSelector: true,
        logoSelector: ".logo img",
        attributeLogoSelector: 'src',
        mainSelector: '.product-item-info',
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
                    }
                ],
            },
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-item-link',
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
                        selector: '.product-image-wrapper img',
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
                        selector: '.product-item-link',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 30,
        name: "Aliss",
        url: 'https://aliss.cr/catalogsearch/result/?q=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: "https://i.imgur.com/kfxM1gN.png",
        attributeLogoSelector: 'src',
        mainSelector: '.products.wrapper.grid.products-grid ol li',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.special-price span span span',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.old-price span span span',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 3,
                        selector: '.normal-price span span span',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 4,
                        selector: '.price-container-group span span span',
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
                        selector: '.product-item-link',
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
        id: 31,
        name: "CEMACO",
        url: 'https://www.cemaco.co.cr/search/?field=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".logo.fitThisOnMenu",
        attributeLogoSelector: 'src',
        mainSelector: '.product-item',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.product-body.price ins span',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.price ins span',
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
                        selector: '.buttons a',
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
                        selector: '.img-responsive',
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
        id: 32,
        name: "RADIOSHACK",
        url: 'https://www.radioshackcr.com/buscar?s=SEARCH_TEXT&c=0&resultsPerPage=24',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".elementor-image a img",
        attributeLogoSelector: 'src',
        indMoneda: 'CRC',
        mainSelector: '.item',
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
                        selector: '.price ins span',
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
                        selector: '.product_name a',
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
                        selector: '.img-placeholder.home_default img',
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
                        selector: '.product_name a',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 933,
        name: "Unimart",
        url: "https://services.mybcapps.com/bc-sf-filter/search?q=SEARCH_TEXT&_=pf&shop=comprasmax.myshopify.com&page=1&limit=48&product_available=true",
        //PARAMETROS REQUEST
        //HEADERS
        accept: "*/*",
        acceptLanguage: "en-US,en;q=0.9,es-CR;q=0.8,es;q=0.7",
        contentType: null,
        secChUa: "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
        secChUaMobile: "?0",
        secChUaPlatform: "\"Windows\"",
        secFetchDest:"script",
        secFetchMode: "no-cors",
        secFetchSite: "cross-site",
        xRequestedWith: null,
        xAlgoliaApiKey: null,
        xAlgoliaApplicationId: null,
        //OTROS
        referrer: "https://www.unimart.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "omit",
        //FIN PARAMETROS REQUEST  
        linkUrl: "https://www.unimart.com/products/",
        imageUrl: null,
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSON',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: "https://www.unimart.com/cdn/shop/t/60/assets/logo.png",
        attributeLogoSelector: null,
        mainSelector: 'products',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'price_min',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: 'price_max',
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
            {
                fieldName: 'vendorLink',
                type: 'String',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: 'handle',
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
                        selector: 'images.1',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            }
        ]
    },
    {
        id: 934,
        name: "Cococo",
        url: "https://cococo.co.cr/api/shop/products?page=1&productName=SEARCH_TEXT&sort=name&order=asc&currency=2",
        //PARAMETROS REQUEST
        //HEADERS
        accept: "application/json, text/plain, */*",
        acceptLanguage: "en",
        secChUa: "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
        secChUaMobile: "?0",
        secChUaPlatform: "\"Windows\"",
        secFetchDest:"empty",
        secFetchMode: "cors",
        secFetchSite: "same-origin",
        xRequestedWith: "XMLHttpRequest",
        xAlgoliaApiKey: null,
        xAlgoliaApplicationId: null,
        xXsrfToken : "eyJpdiI6IlBSQjNvSzF5TVdsNDV2ckJMYXEyYWc9PSIsInZhbHVlIjoicVc2RStKTHBhdVdJVTRxUThzVlJSKzhUd0U4M1JFNlA5cjd1d0Z2eEdFZlg5d1Z5UnZwamFWSitqRXUwS0pLSXlNbWNqVVlJeGMrT2dXVnNrZ3hmMkY5UEJHR3ZNQmtDc3hLVDlpeHBqUlJueVU4K3R1OUNVdkpHU1dEUWtyb2QiLCJtYWMiOiJlN2E0ZGU1NGM3YzFlNGNkOGVlZWMyMDE5YjU2NTk0MTNkM2ViNjkzMGM3MTcyZWRhYzE4YzNhZmFiZGMyNzMyIiwidGFnIjoiIn0=",
        //OTROS
        referrer: "https://cococo.co.cr/shop",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
        //FIN PARAMETROS REQUEST  
        linkUrl: "https://cococo.co.cr/shop/producto/productName/vendorLink",
        imageUrl: null,
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSON',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: "https://cococo.co.cr/img/cococo_Store_full-color.png",
        attributeLogoSelector: 'src',
        mainSelector: 'data',
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
                    },
                    {
                        order: 2,
                        selector: 'price_original',
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
                        selector: 'name',
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
                        selector: 'id',
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
                        selector: 'featured_image.url',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            }
        ]
    },
    {
        id: 35,
        name: "Vicortech",
        url: 'https://www.vicortechcr.com/?s=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".site-logo",
        attributeLogoSelector: 'src',
        indMoneda: 'CRC',
        mainSelector: '.wrap-product-loop-content',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.price ins .woocommerce-Price-amount.amount',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.price del .woocommerce-Price-amount.amount',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 3,
                        selector: '.price .woocommerce-Price-amount.amount',
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
                        selector: '.product-loop-title a',
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
                        selector: '.wrap-img img',
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

                        selector: '.product-loop-title a',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },
    {
        id: 36,
        name: "Edrop",
        url: 'https://edropcr.com/?s=SEARCH_TEXT&&post_type=product&search_limit_to_post_titles=0&fs=1&post_type=product',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: false,
        logoSelector: "https://edropcr.com/wp-content/uploads/2021/12/logoeDrop-1-300x120.png",
        attributeLogoSelector: 'src',
        mainSelector: '.fusion-product-wrapper',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.price ins .woocommerce-Price-amount.amount',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.price del .woocommerce-Price-amount.amount',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 3,
                        selector: '.price .woocommerce-Price-amount.amount',
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
                        selector: '.attachment-shop_catalog.size-shop_catalog',
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

                        selector: '.product-title a',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },        
    {
        id: 9999,
        name: "Adn Tienda",
        url: 'https://www.adntienda.com/shop?search=SEARCH_TEXT',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        indLogoSelector: true,
        logoSelector: ".img.img-fluid",
        attributeLogoSelector: 'src',
        mainSelector: '.asp-inner',
        scrapingFields: [
            {
                fieldName: 'productPrice',
                type: 'Numeric',
                fieldSelectors: [
                    {
                        order: 1,
                        selector: '.oe_currency_value',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    },
                    {
                        order: 2,
                        selector: '.old-price span span span',
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
                        selector: '.o_wsale_products_item_title a',
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
                        selector: '.img.img-fluid',
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
                        selector: '.o_wsale_products_item_title a',
                        selectorValueFrom: "TEXTCONTENT",
                        attribute: null
                    }
                ],
            },
        ]
    },    
    {
        id: 99999,
        name: "Icon",
        url: 'https://www.icon.co.cr/?s=SEARCH_TEXT&post_type=product',
        scrapType: 'QUERY_PARAMETER',
        indHowToScrape: 'JSDOM',
        replaceTextOnURL: 'SEARCH_TEXT',
        //indRigthAmountFormat: true,
        indLogoSelector: false,
        logoSelector: "https://i.imgur.com/JBIG8qE.png",
        attributeLogoSelector: 'src',
        mainSelector: '.elementor-widget-container ul li',
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
                        selector: '.woocommerce-LoopProduct-link.woocommerce-loop-product__link',
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
                        selector: '.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail.wvs-archive-product-image',
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
    }        
]