// script for navbar fetch into html pages
document.addEventListener("DOMContentLoaded", function() {
    fetch('/assets/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
            setActiveLink();
        });
});

function setActiveLink() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const currentUrl = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentUrl) {
            link.classList.add('active');
        }
    });
}

// script for footer fetch into html pages
document.addEventListener("DOMContentLoaded", function() {
    fetch('/assets/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
});

// General script
(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

//script for labs page----------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    // Example lab data
    const labs = [
        { id: 1, title: 'Collision', subject: 'physics', difficulty: 'medium', description: 'Explore the principles of momentum in our interactive lab.', img: 'img/collision.png' },
        { id: 2, title: 'Pendulum Motion', subject: 'physics', difficulty: 'easy', description: 'Study the periodic motion of a simple pendulum.', img: 'img/coming_soon.jpg' },
        { id: 3, title: 'Quantum Mechanics', subject: 'physics', difficulty: 'hard', description: 'Dive into the fundamentals of quantum phenomena.', img: 'img/coming_soon.jpg' },
        { id: 4, title: 'Acid-Base Titration', subject: 'chemistry', difficulty: 'easy', description: 'Explore acid-base neutralization through titration.', img: 'img/coming_soon.jpg' },
        { id: 5, title: 'Organic Synthesis', subject: 'chemistry', difficulty: 'medium', description: 'Practice the synthesis of simple organic compounds.', img: 'img/coming_soon.jpg' },
        { id: 6, title: 'Chromatography', subject: 'chemistry', difficulty: 'hard', description: 'Learn separation techniques using chromatography.', img: 'img/coming_soon.jpg' },
        { id: 7, title: 'Market Analysis', subject: 'business', difficulty: 'easy', description: 'Conduct basic market analysis for a startup.', img: 'img/coming_soon.jpg' },
        { id: 8, title: 'Investment Strategies', subject: 'business', difficulty: 'medium', description: 'Develop and test different investment strategies.', img: 'img/coming_soon.jpg' },
        { id: 9, title: 'Corporate Negotiations', subject: 'business', difficulty: 'hard', description: 'Engage in simulated high-stakes business negotiations.', img: 'img/coming_soon.jpg' }

    ];

    function displayLabs(labs) {
        const grid = document.querySelector('.labs-grid .row');
        grid.innerHTML = ''; // Clear existing entries
        labs.forEach(lab => {
            const labDiv = document.createElement('div');
            labDiv.className = 'col-md-4';
            labDiv.innerHTML = `
                <a href="labs/${lab.subject}/${lab.title.replace(/\s+/g, '').toLowerCase()}/${lab.title.replace(/\s+/g, '').toLowerCase()}.html?labId=${lab.id}" class="lab-item-link">
                    <div class="lab-item">
                        <img src="${lab.img}" alt="${lab.title}">
                        <h5>${lab.title}</h5>
                        <p>${lab.description}</p>
                    </div>
                </a>
            `;
            grid.appendChild(labDiv);
        });
    }

    // Event listeners for search and filters
    document.getElementById('searchInput').addEventListener('input', function(e) {
        const filteredLabs = labs.filter(lab => lab.title.toLowerCase().includes(e.target.value.toLowerCase()));
        displayLabs(filteredLabs);
    });

    document.getElementById('subjectFilter').addEventListener('change', function(e) {
        const value = e.target.value;
        const filteredLabs = labs.filter(lab => lab.subject === value || value === 'all');
        displayLabs(filteredLabs);
    });

    document.getElementById('difficultyFilter').addEventListener('change', function(e) {
        const value = e.target.value;
        const filteredLabs = labs.filter(lab => lab.difficulty === value || value === 'all');
        displayLabs(filteredLabs);
    });

    // Initially display all labs
    displayLabs(labs);
});

//script for evaluation
document.getElementById('lab-evaluation-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Perform validation or collect data here
    alert('Evaluation Submitted!');
});
