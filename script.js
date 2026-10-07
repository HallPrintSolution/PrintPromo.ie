// script.js

// Track contact-link clicks without sending the destination or other personal data.
document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || typeof gtag !== 'function') return;

    const href = link.getAttribute('href').toLowerCase();
    if (href.startsWith('tel:')) {
        gtag('event', 'phone_click');
    } else if (href.startsWith('mailto:')) {
        gtag('event', 'email_click');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        closeMenu();
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll Arrow Functionality
const scrollArrow = document.getElementById('scroll-arrow');
const firstSection = document.querySelector('.section');

scrollArrow.addEventListener('click', () => {
    firstSection.scrollIntoView({
        behavior: 'smooth'
    });
});


// Carousel Functionality with Navigation Arrows
let carouselIndex = 1;
const slidesContainer = document.querySelector('.carousel .slides');
const slides = document.querySelectorAll('.carousel .slide');
const indicators = document.querySelectorAll('.carousel-indicators .indicator');
const prevArrow = document.querySelector('.arrow.prev');
const nextArrow = document.querySelector('.arrow.next');
const totalSlides = slides.length;

function updateCarouselIndicators(index) {
    indicators.forEach(indicator => indicator.classList.remove('active'));
    indicators[(index - 1) % (totalSlides - 2)].classList.add('active');
}

function moveToSlide(index) {
    slidesContainer.style.transition = 'transform 0.5s ease-in-out';
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
}

function moveToNextSlide() {
    if (carouselIndex >= totalSlides - 1) {
        carouselIndex = 1;
        slidesContainer.style.transition = 'none';
        slidesContainer.style.transform = `translateX(-${carouselIndex * 100}%)`;
    }
    setTimeout(() => {
        slidesContainer.style.transition = 'transform 0.5s ease-in-out';
        carouselIndex++;
        moveToSlide(carouselIndex);
        updateCarouselIndicators(carouselIndex);
    }, 20);
}

function moveToPrevSlide() {
    if (carouselIndex <= 0) {
        carouselIndex = totalSlides - 2;
        slidesContainer.style.transition = 'none';
        slidesContainer.style.transform = `translateX(-${carouselIndex * 100}%)`;
    }
    setTimeout(() => {
        slidesContainer.style.transition = 'transform 0.5s ease-in-out';
        carouselIndex--;
        moveToSlide(carouselIndex);
        updateCarouselIndicators(carouselIndex);
    }, 20);
}

// Event listener for previous arrow
prevArrow.addEventListener('click', moveToPrevSlide);

// Event listener for next arrow
nextArrow.addEventListener('click', moveToNextSlide);

// Event listeners for indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        carouselIndex = index + 1;
        moveToSlide(carouselIndex);
        updateCarouselIndicators(carouselIndex);
    });
});

// Automatically cycle through images
setInterval(() => {
    moveToNextSlide();
}, 4500);

// Initial setup
moveToSlide(carouselIndex);
updateCarouselIndicators(carouselIndex);

// Dynamic Content for Products
const productDetails = {
    product1: { 
        link: "https://www.morethangiftscatalogue.com/INTERSHOP/web/WFS/midocean-UK-Site/en_GB/catalog/GBP/ViewParametricSearch-Browse?CatalogCategoryID=&SearchParameter=%26%40QueryTerm%3D*%26ContextCategoryUUID%3DFccKCAByVcEAAAGKuTAWRPB__or_TLMKCAByP.UAAAF0QOiIAyD0%26OnlineFlag%3D1%26%40P.BOOST.BoostValues_PLCStatus%3D11%26%40P.BOOST.BoostFactor_PLCStatus%3D100.0%26%40P.BOOST.BoostFactor_DefaultVariation%3D1.1%26%40P.BOOST.BoostValues_DefaultVariation%3Dtrue&PageSize=20&SortingAttribute=&SearchTerm=*", 
        button: "View the full range", 
        header: "APPAREL & ACCESSORIES", 
        image: "images/apparel_accessories.gif",
        text: "At PrintPromo.ie, we offer a diverse range of apparel and accessories, perfect for showcasing your brand in style. From custom printed t-shirts, Printed Jackets, logo’s on hats and custom jackets, our high-quality screen printing ensures your logo lasts, whether it’s for corporate events, sports teams, or promotional giveaways.<br><br> • Custom printing on a wide range of clothing and accessories<br><br> • High-quality, durable screen printing<br><br> • Short run DTF or Transfers<br><br> • Ideal for uniforms, events, or branded giveaways<br><br> • Last minute branding, no problem!",
    },
    product2: { 
        link: "https://www.morethangiftscatalogue.com/uk-catalog/gb/gbp/bags-travel/", 
        button: "View the full range", 
        header: "BAGS & TRAVEL", 
        image: "images/bags_travel.gif",
        text: "Promote your brand on the go with our stylish bags and travel accessories. Whether it’s tote bags, backpacks, or travel essentials, we offer custom printing to make your brand visible wherever your customers travel. We can print on cloth, leather, leatherette, plastic bags, and offer luxury paper bag printing services.<br><br> • Wide selection of bags, backpacks, and travel gear<br><br> • High-quality screen printing for lasting visibility<br><br> • Ideal for business, leisure, or promotional events<br><br> • Durable materials designed for daily use, or recycling<br><br> • Paper laminated paper bags printed with pantone and special colors for small MOQs.",
    },
    product3: { 
        link: "https://www.morethangiftscatalogue.com/uk-catalog/gb/gbp/eating-drinking/", 
        button: "View the full range", 
        header: "EATING & DRINKING", 
        image: "images/eating_drinking.gif",
        text: "Add a personal touch to your promotional campaigns with our custom-branded eating and drinking products. We supply branded reusable bottles, printed mugs, and lunch boxes that offer practical, eco-friendly options for branding that stays with your customers every day.<br><br> • Reusable drinking flasks and bottles, mugs, lunch boxes, including individual names<br><br> • Printed eco-friendly options available<br><br> • Perfect for offices, giveaways, and corporate gifts<br><br> • Custom printing that withstands daily use<br><br> • Personalized coffee and water bottles for personal or corporate use.",
    },
    product4: { 
        link: "https://www.morethangiftscatalogue.com/uk-catalog/gb/gbp/christmas-winter/", 
        button: "View the full range", 
        header: "SEASONAL RANGE", 
        image: "images/seasonal.gif",
        text: "Celebrate the seasons with our themed range of custom-printed products. Whether it’s festive decorations, summer essentials, or winter warmers, our seasonal items help your brand stand out all year round.<br><br> • Seasonal items for year-round promotions<br><br> • Custom branding on holiday-themed products<br><br> • Perfect for festive gifts and summer events<br><br> • Wide variety of products for any occasion<br><br> • Stay in touch with products most suited and trending for your clients.",
    },
    product5: { 
        link: "https://www.morethangiftscatalogue.com/uk-catalog/gb/gbp/technology-accessories/", 
        button: "View the full range", 
        header: "TECHNOLOGY & ACCESSORIES", 
        image: "images/technology.gif",
        text: "Stay ahead of the game with our cutting-edge technology and accessories. From power banks to phone cases, we offer premium products that can be custom-branded to keep your logo in sight while adding functionality to your customers' lives.<br><br> • Custom-branded tech gadgets and accessories<br><br> • Ideal for corporate gifts and tech-savvy promotions<br><br> • High-quality printing on chargers, cases, and more<br><br> • Practical and stylish options for all tech lovers<br><br> • Send us a job brief, and leave the rest to us.",
    },
    product6: { 
        link: "https://www.morethangiftscatalogue.com/uk-catalog/gb/gbp/umbrellas-rain-garments/", 
        button: "View the full range", 
        header: "UMBRELLAS & RAIN GARMENTS", 
        image: "images/umbrellas.gif",
        text: "Don’t let the Irish weather dampen your branding opportunities. Our range of umbrellas and rain garments keeps your customers dry and your logo visible. We offer durable, custom-printed solutions designed to withstand even the rainiest days, with everything from branded welly boots to ponchos.<br><br> • Durable umbrellas and rain jackets<br><br> • Perfect for outdoor events or daily use<br><br> • High-quality screen printing for lasting visibility<br><br> • Range of sizes and colours to match your brand.",

    },
    product7: { 
        link: "https://www.morethangiftscatalogue.com/uk-catalog/gb/gbp/themes/conscious-promotions/", 
        button: "View the full range", 
        header: "ECO PRODUCT RANGE", 
        image: "images/eco.gif",
        text: "Make a sustainable impact with our eco-friendly product range. From reusable bags to bamboo drinkware, all items are designed and printed with the environment in mind while still offering premium branding opportunities.<br><br> • Eco-friendly products made from sustainable materials<br><br> • Reusable, recyclable, and environmentally conscious<br><br> • Perfect for eco-aware promotions and corporate gifts<br><br> • Show your commitment to sustainability with branded products.",
    },
    product8: { 
        link: "https://www.morethangiftscatalogue.com/uk-catalog/gb/gbp/office-writing/", 
        button: "View the full range", 
        header: "OFFICE & WRITING", 
        image: "images/office.gif",
        text: "Equip your team or clients with premium office and writing supplies, all custom-printed to keep your brand front and center. From notebooks to pens and desk accessories, our high-quality items are practical and professional.<br><br> • Custom-branded pens, notebooks, and desk items<br><br> • Ideal for corporate gifts and office supplies<br><br> • High-quality printing for a professional finish<br><br> • Perfect for everyday use in the office or at home<br><br> • Urgent printed notebooks, Low MOQ, and printing in colour or metallic inks, we have it covered!",
    }, 
};

const serviceDetails = {
    service1: { 
        header: "Outdoor Display & Events", 
        image: "images/outdoor-displays.gif",
        keyfeatures: "<strong>Key Features: </strong>Printed Signs boards, Printed Gazebo, outdoor pullup banners, Printed Banners, pitch popups, printed hoarding, Printed café Barriers, printed traditional flags, printed feather flags, teardrop flags, oversized flags, backdrop printed displays.",
        description: "<strong>Description: </strong>Our outdoor displays are designed to create maximum exposure for your brand at any event or outdoor space. From flags and banners to branded gazebos, our high-quality, weather-resistant products are made to last and are perfect for festivals, trade shows, and promotional events. With fast turnaround times and durable materials, we ensure your brand is always visible.",
        bullets: "• Printed Flags, banners, parasols, pitch popups<br><br>• Reusable and easy to assemble<br><br>• Perfect for outdoor promotions and events<br><br>• Custom sizes and designs available<br><br>• Last minute product range.<br><br>"
    },  

    service2: {  
        header: "Internal Display & Finishing", 
        image: "images/internal.gif",
        keyfeatures: "<strong>Key Features: </strong>Printed Exhibition Display Stands, Printed fabric walls, Printed roll-up banners.",
        description: "<strong>Description: </strong>Elevate your indoor spaces with our range of internal printed displays and branding solutions. From printed fabric walls to roll-up banners, we provide visually appealing, high-impact display solutions ideal for expos, corporate events, or retail environments. Our displays are lightweight, portable, and reusable, offering a cost-effective solution for long-term branding.",
        bullets: "• Printed fabric walls, printed pop-up banners, Printed display banners, Printed flags<br><br>• High-resolution printing for vibrant colors<br><br>• Easy setup and transportation<br><br>• Custom product solutions available based on functional requirements.<br><br>"
    },  
    
    service3: {  
        header: "Vehicle Wraps", 
        image: "images/vehicle.jpg",
        keyfeatures: "<strong>Key Features: </strong>Custom Designs, Expert Installation, High-Impact Advertising, Protective Coating.",
        description: "<strong>Description: </strong>Turn your vehicles into moving billboards with our custom vehicle wraps. Whether you need to wrap an entire fleet or a single vehicle, our durable, high-quality wraps boost your brand’s visibility while protecting your vehicles from wear and tear.",
        bullets: "• Using premium brands like 3M, Oracal, and Metamark for long-lasting finishes<br><br>• Custom designs to fit any vehicle<br><br>• Full and partial wraps available<br><br>• Expert fitting services<br><br>• Fleet discounts available.<br><br>"
    },  
    
    service4: {  
        header: "Sign Panels & Advertising", 
        image: "images/signs.gif",
        keyfeatures: "<strong>Key Features: </strong>Rigid printed panels of all thicknesses available, last-minute printed panels, ultra high-quality Giclee print finishes, up to 9 color printing, white printing available.",
        description: "<strong>Description: </strong>Our sign panels are built to last and designed to make an impact. Ideal for advertising on hoardings, in retail spaces, or at construction sites, our sign panels are available in materials like Corriboard, Foamex, and Dibond, offering maximum visibility for long-term branding.",
        bullets: "• High-quality fine artwork printing for any wall space or standard quality signage<br><br>• Premium product finishes and over-lamination options available<br><br>• Custom sizes and finishes available<br><br>• Suitable for outdoor and indoor applications.<br><br>"
    },  
    
    service5: {  
        header: "Branded Glassware", 
        image: "images/glassware.jpg",
        keyfeatures: "<strong>Key Features: </strong>Full design, print, and product supply services, in-house glassware printing for a full range of products.",
        description: "<strong>Description: </strong>We specialize in industrial glassware printing in Dublin, catering for small batch requirements or large volume packaging. From pint glasses to reusable water bottles, we offer high-quality, durable printing for personal or corporate use.",
        bullets: "• Custom-branded glassware, printed bottles for water refill points, hotels, and meeting rooms<br><br>• High-quality, durable printing in Dublin, Ireland<br><br>• Low MOQ and volume discount services available<br><br>• Various styles and sizes available<br><br>• Check out www.glassprinting.ie for more.<br><br>"
    },  
    
    service6: { 
        header: "Large Format Print", 
        image: "images/largeformat.gif",
        keyfeatures: "<strong>Key Features: </strong>Fast Turnaround, Design services, and a full range of finishes available.",
        description: "<strong>Description: </strong>Our large format printing services create maximum impact with custom banners, posters, window graphics, and wall murals. Whether for large-scale advertising or decorative elements, we provide expert design and installation services nationwide.",
        bullets: "• Custom banners, posters, and more<br><br>• Nationwide fitting and installation<br><br>• Design services available<br><br>• Suitable for both indoor and outdoor use<br><br>• Last-minute urgent inquiries welcome.<br><br>"
    },  
    
    service7: { 
        header: "Last Minute Print", 
        image: "images/lastminute.jpg",
        keyfeatures: "<strong>Key Features: </strong>Onsite printing in Dublin, Quick Turnaround, Same-Day Printing, Emergency Services for trade and end customers.",
        description: "<strong>Description: </strong>In need of last-minute printing? We provide fast, efficient services to ensure you never miss a deadline. From business cards to banners and promotional materials, we can print and deliver quickly without compromising on quality.",
        bullets: "• Same-day printing available<br><br>• Ideal for urgent projects and deadlines<br><br>• Wide range of products available<br><br>• Quick, reliable service with no compromise on quality.<br><br>"
    },  
    
    service8: {
        header: "Wall & Glass Manifestations", 
        image: "images/manifestations.gif",
        keyfeatures: "<strong>Key Features: </strong>Internal and external wall printing, office fitout finishes, external murals, glass and window graphics, frosted etch, one-way films, full color manifestations.",
        description: "<strong>Description: </strong>Transform your office or retail space with our custom wall and glass manifestations. From privacy graphics to decorative elements, our high-quality prints meet safety and visibility requirements, giving your space a professional and branded look.",
        bullets: "• Custom glass and wall designs<br><br>• Interior wall graphics and prints, ideal for offices and retail environments<br><br>• Custom wallpaper, wall graphics, floor graphics, and printed window blinds<br><br>• Expert installation services available.<br><br>"
    }
    
};

function showProduct(product) {
    const details = productDetails[product];
    const productDetailsDiv = document.getElementById('product-details');
    
    // If the product details div exists
    if (productDetailsDiv) {
        productDetailsDiv.innerHTML = `
            <div class="product-about-section">
                <img src="${details.image}" alt="${details.header}" class="productimage">
                <div class="product-description">
                    <h3><strong>${details.header}</strong></h3>
                    <div>
                        <p >${details.text}</p>
                    </div>
                    <a href="${details.link}" class="product-button" target="_blank">${details.button}</a>
                </div>
            </div>
        `;
    }

    // Set the active button
    document.querySelectorAll('.promo-products .button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.promo-products .button[onclick="showProduct('${product}')"]`).classList.add('active');
}

// Show initial product details
showProduct('product1');


function showService(service) {
    const details = serviceDetails[service];
    const productServicesDiv = document.getElementById('services-details');

    // If the services details div exists
    if (productServicesDiv) {
        productServicesDiv.innerHTML = `
            <div class="product-about-section">
                <img src="${details.image}" alt="${details.header}" class="productimage">
                <div class="product-description">
                    <h3 style="color:#5cbdfd"><strong>${details.header}</strong></h3>
                    <div>
                        <p >${details.keyfeatures}</p>
                        <p >${details.description}</p>
                        <p >${details.bullets}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Set the active button
    document.querySelectorAll('.printing-services .button2').forEach(button2 => {
        button2.classList.remove('active');
    });
    document.querySelector(`.printing-services .button2[onclick="showService('${service}')"]`).classList.add('active');
}


// Show initial product details
showService('service1');

// Toggle mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const closeMenuButton = document.querySelector('.close-menu');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

closeMenuButton.addEventListener('click', () => {
    navbar.classList.remove('active');
});

function closeMenu() {
    navbar.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
    // Header animations for h2 and h3
    const headers = document.querySelectorAll('.section h2, .about-us h3');

    const observerOptions = {
        threshold: 0.1 // Trigger when 10% of the element is in the viewport
    };

    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-header');
            } else {
                entry.target.classList.remove('animate-header');
            }
        });
    }, observerOptions);

    headers.forEach(header => {
        headerObserver.observe(header);
    });

    // Images in Recent Work section (already implemented)
    const recentWorkImages = document.querySelectorAll('.recent-work .grid img');

    const imageObserverOptions = {
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.setProperty('--animation-delay', `${index * 0.2}s`);
                entry.target.classList.add('animate-recent-work-image');
            } else {
                entry.target.classList.remove('animate-recent-work-image');
            }
        });
    }, imageObserverOptions);

    recentWorkImages.forEach(image => {
        imageObserver.observe(image);
    });

    // About Us section animations
    const aboutUsImages = document.querySelectorAll('.about-us .about-topic img');
    const aboutUsTexts = document.querySelectorAll('.about-us .about-topic div');

    const aboutUsObserverOptions = {
        threshold: 0.1
    };

    const aboutUsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.tagName === 'IMG') {
                    entry.target.classList.add('animate-about-us-image');
                } else {
                    entry.target.classList.add('animate-about-us-text');
                }
            } else {
                if (entry.target.tagName === 'IMG') {
                    entry.target.classList.remove('animate-about-us-image');
                } else {
                    entry.target.classList.remove('animate-about-us-text');
                }
            }
        });
    }, aboutUsObserverOptions);

    aboutUsImages.forEach(image => aboutUsObserver.observe(image));
    aboutUsTexts.forEach(text => aboutUsObserver.observe(text));
        
    // Core Values section animations
    const coreValues = document.querySelectorAll('.core-values .value');

    const coreValuesObserverOptions = {
        threshold: 0.1
    };

    const coreValuesObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.setProperty('--animation-delay', `${index * 0.2}s`);
                entry.target.classList.add('animate-core-value');
            } else {
                entry.target.classList.remove('animate-core-value');
            }
        });
    }, coreValuesObserverOptions);

    coreValues.forEach(value => {
        coreValuesObserver.observe(value);
    });

    // Support Local section animations
    const supportLocal = document.querySelectorAll('.support-local .value');

    const supportLocalObserverOptions = {
        threshold: 0.1
    };

    const supportLocalObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.setProperty('--animation-delay', `${index * 0.2}s`);
                entry.target.classList.add('animate-support-local');
            } else {
                entry.target.classList.remove('animate-support-local');
            }
        });
    }, supportLocalObserverOptions);

    supportLocal.forEach(value => {
        supportLocalObserver.observe(value);
    });
});

// Gallery functionality
const galleries = Array.from(document.querySelectorAll('.gallery'));
const totalGalleryImages = galleries[0].children.length;
const imagesPerRow = 4; // Number of images per row
let galleryIndices = [0, 0]; // Separate index for each gallery

// Clone the first set of images for each gallery and append them to create a seamless loop
const cloneImages = () => {
    galleries.forEach(gallery => {
        Array.from(gallery.children).forEach(image => {
            const clone = image.cloneNode(true);
            gallery.appendChild(clone);
        });
    });
};
cloneImages();

function updateGallery(index, gallery) {
    const translateXValue = -(galleryIndices[index] * (100 / imagesPerRow));
    gallery.style.transform = `translateX(${translateXValue}%)`; // Scroll one image at a time
}

function moveGallery(direction) {
    galleries.forEach((gallery, index) => {
        if (direction === 'next') {
            galleryIndices[index]++;
            if (galleryIndices[index] >= totalGalleryImages) {
                galleryIndices[index] = 0;
                gallery.style.transition = 'none';
                gallery.style.transform = `translateX(0)`;
            } else {
                gallery.style.transition = 'transform 1s linear';
                updateGallery(index, gallery);
            }
        } else if (direction === 'prev') {
            galleryIndices[index]--;
            if (galleryIndices[index] < 0) {
                galleryIndices[index] = totalGalleryImages - 1;
                gallery.style.transition = 'none';
                gallery.style.transform = `translateX(${-(galleryIndices[index] * (100 / imagesPerRow))}%)`;
            } else {
                gallery.style.transition = 'transform 1s linear';
                updateGallery(index, gallery);
            }
        }
    });
}

// Automatically scroll the galleries
setInterval(() => {
    moveGallery('next');
}, 3000); // Adjust the interval for slower scrolling

// Event listeners for arrows
document.querySelector('.gallery-prev').addEventListener('click', () => {
    moveGallery('prev');
});
document.querySelector('.gallery-next').addEventListener('click', () => {
    moveGallery('next');
});


// Handle glossary modals
const glossaryItems = document.querySelectorAll('.glossary-item');
const glossaryModals = document.querySelectorAll('.glossary-modal');

// Open glossary modal
glossaryItems.forEach(item => {
    item.addEventListener('click', () => {
        const modalId = item.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
        }
    });
});

// Close glossary modals
glossaryModals.forEach(modal => {
    modal.addEventListener('click', (event) => {
        if (event.target.classList.contains('glossary-modal') || event.target.classList.contains('close-btn')) {
            modal.style.display = 'none';
        }
    });
});
