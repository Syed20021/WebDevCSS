/**
* styles.css
* Author: Kyan M, Syed Hassnat Ali
* Student Number: 100892329, 100835471
* Date Completed:
*/

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault(); 




        setTimeout(function() {
            window.location.href = 'index.html';
        }, 3000);
    });
});
document.addEventListener('DOMContentLoaded', (event) => {
 
    var hrListItem = document.createElement('li');
    hrListItem.className = 'nav-item';

    var hrLink = document.createElement('a');
    hrLink.className = 'nav-link';
    hrLink.href = 'HumanResources.html'; 
    hrLink.innerHTML = '<span class="fa fa-users"></span> Human Resources';

    hrListItem.appendChild(hrLink);

    var navbarNav = document.querySelector('.navbar-nav');


    var aboutUsListItem = navbarNav.querySelector('a[href="AboutUs.html"]').parentNode;

    
    navbarNav.insertBefore(hrListItem, aboutUsListItem.nextSibling);
});
document.addEventListener('DOMContentLoaded', function() {

    var navbar = document.createElement('nav');
    navbar.classList.add('navbar', 'navbar-expand-lg', 'navbar-dark', 'bg-dark', 'fixed-bottom');

  
    var container = document.createElement('div');
    container.classList.add('container-fluid');
    container.style.justifyContent = 'center';

 
    var currentYear = new Date().getFullYear(); 
    var copyText = document.createElement('span');
    copyText.classList.add('navbar-text');
    copyText.innerHTML = `&copy; Copyright ${currentYear}`;

   
    container.appendChild(copyText);
    navbar.appendChild(container);

   
    document.body.appendChild(navbar);
});
