(function (Drupal, $, once) {
  Drupal.behaviors.siteSettings = {
    attach: function (context, settings) {

      // -------------------------------------------------------------------- 
      // Back-to-top
      // -------------------------------------------------------------------- 
      $(window).on('scroll', function (e) {
        e.preventDefault();
        if ($(this).scrollTop() > 1500)
          $('#back-to-top').fadeIn();
        else $('#back-to-top').fadeOut();
      });

      $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('body,html').animate({ scrollTop: 0 }, 'slow');
      });
      $('#back-to-top').fadeOut();

      // -------------------------------------------------------------------- 
      // MEGA MENU
      // -------------------------------------------------------------------- 

      $('.icaret.nav-plus:not(.nav-minus)').click(function (e) {
        e.preventDefault(); // Prevent the default link behavior

        // Toggle the display property of the closest '.sub-menu'
        $(this).closest('.gva-mega-menu').find('.sub-menu').toggle();
      });


      // --------------------------------------------------------------------
      // KALENDARZ ZMIANA STRZAŁEK
      // -------------------------------------------------------------------- 
      setTimeout(function () {
        once('myCustomBehaviorLoad', context).forEach(function () {
          let prevArrow = document.querySelector('#block-gowilds-sub-eventscalendarblock nav .pmu-prev');
          let nextArrow = document.querySelector('#block-gowilds-sub-eventscalendarblock nav .pmu-next');
          if (prevArrow) {
            prevArrow.innerHTML = `
                                <svg class="h-auto w-9 sm:w-auto" width="101" height="12" viewBox="0 0 101 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0.469673 6.53032C0.176781 6.23743 0.176781 5.76255 0.469673 5.46966L5.24265 0.696691C5.53554 0.403797 6.01041 0.403797 6.30331 0.696691C6.5962 0.989584 6.5962 1.46446 6.30331 1.75735L2.06066 5.99999L6.30331 10.2426C6.5962 10.5355 6.5962 11.0104 6.30331 11.3033C6.01041 11.5962 5.53554 11.5962 5.24264 11.3033L0.469673 6.53032ZM101 6.75L1 6.74999L1 5.24999L101 5.25L101 6.75Z" fill="black"></path>
                                </svg>
                              `;

          }
          if (nextArrow) {
            nextArrow.innerHTML = `
                                <svg class="h-auto w-9 sm:w-auto" width="101" height="12" viewBox="0 0 101 12" fill="none" xmlns="XXXXXXXXXXXXXXXXXXXXXXXXXX">
                                  <path d="M100.530 6.53032C100.823 6.23743 100.823 5.76255 100.53 5.46966L95.7574 0.696691C95.4645 0.403797 94.9896 0.403797 94.6967 0.696691C94.4038 0.989584 94.4038 1.46446 94.6967 1.75735L98.9393 5.99999L94.6967 10.2426C94.4038 10.5355 94.4038 11.0104 94.6967 11.3033C94.9896 11.5962 95.4645 11.5962 95.7574 11.3033L100.53 6.53032ZM0 6.75L100 6.74999L100 5.24999L0 5.25L0 6.75Z" fill="black"></path>
                                </svg>
                              `;
          }

        });
      }, 400); 

      // -------------------------------------------------------------------- 
      // BIP - historia zmian
      // -------------------------------------------------------------------- 
      // $('#block-gowilds-sub-views-block-bip-zmiany-block-1 #pokaz').click(function (e) {
      //   $("#block-gowilds-sub-views-block-bip-zmiany-block-1 .content .view-content-wrapper").attr("style", "display:block");
      // });

      // Znajdź elementy, które będą reagować na kliknięcie
      $('#block-gowilds-sub-views-block-bip-zmiany-block-1 #pokaz').click(function (e) {
        // Znajdź element do pokazania/ukrycia
        var contentWrapper = $("#block-gowilds-sub-views-block-bip-zmiany-block-1 .content .view-content-wrapper");

        // Sprawdź, czy element jest obecnie ukryty
        if (contentWrapper.is(":hidden")) {
          // Jeśli jest ukryty, pokaż
          contentWrapper.show();
        } else {
          // Jeśli jest widoczny, ukryj
          contentWrapper.hide();
        }
      });


      // -------------------------------------------------------------------- 
      // Usunięcie przecinka
      // -------------------------------------------------------------------- 

      $(document).ready(function () {
        function removeComma() {
          $('.pmu-month.pmu-button').each(function () {
            var text = $(this).text();
            if (text.includes(',')) {
              var newText = text.replace(/,/, '');
              $(this).text(newText);
            }
          });
        }
  
        removeComma();
      
        $(document).on('click', '.pmu-next.pmu-button', function () {
          setTimeout(function() {
            removeComma();
          }, 500); // Opóźnienie 0.5 sekundy, dostosuj w razie potrzeby
        });
        
        var observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length > 0) {
              removeComma();
            }
          });
        });
    
        observer.observe(document.body, { childList: true, subtree: true });
      });
  
      // -------------------------------------------------------------------- 
      // Zmiana reakcji przycisku zapisywania zmian kolejności newsów na stronie DK
      // -------------------------------------------------------------------- 
      
      // #DK-newsID - dodane w pliku views-view--homepagenews.html.twig    
      //settings zdefiniowane w .theme gowilds_sub_preprocess_page
      // Znajdź formularze w kontekście
      var forms = $(context).find("#DK-newsID .view-content-2 form");
      if (forms.length > 0) {      
        forms.each(function () {
          $(this).attr('action', '');        
        });
      }
        

      // Wybierz wszystkie elementy z atrybutem data-drupal-selector zaczynającym się od "field-grupa-grupa-zajec-add-more"
      document.querySelectorAll('[data-drupal-selector^="field-grupa-grupa-zajec-add-more"]', context).forEach(function (button) {
        button.value = 'Dodaj więcej';
      });  
  

      //tytuły domów kultury - spacje      
      // once('siteSettings', '.field--name-field-osrodek', context).forEach(function (element) {
      //   let titles = element;

      //   if (titles) {
      //     let content = titles.innerHTML;
          
      //     if (!content.includes('Dom Kultury<br />')) {
      //       let updatedContent = content.replace('Dom Kultury', 'Dom Kultury<br />');
      //       titles.innerHTML = updatedContent;
      //     }
      //   }
      // }); 





            const colors = ['#5598C2', '#FFA500', '#a70dee', '#e68942', '#41AB3C', '#C32328', '#7268ff', '#da2d58', '#B1B1B2', '#f2df00'];

      const menuLink = document.querySelector('.GMNmenu');

      menuLink.style.backgroundColor = '#f3a820';
      menuLink.style.color = 'white';

      let colorInterval;
      let i = 0; // Zmienna, która przechowuje aktualny indeks koloru

      function changeBackgroundColor() {
          const currentColor = colors[i];
          menuLink.style.backgroundColor = currentColor;
          menuLink.style.color = 'white';
          
          // Przejdź do następnego koloru, wracając do początku, gdy dojdziesz do końca tablicy
          i = (i + 1) % colors.length;
      }

      function startColorChange() {
          colorInterval = setInterval(changeBackgroundColor, 2000); // zmiana koloru co 1 sekundę
      }

      function stopColorChange() {
          clearInterval(colorInterval); // zatrzymuje zmianę kolorów
      }

      // Rozpocznij zmianę kolorów automatycznie
      startColorChange();

      // Zatrzymaj zmianę kolorów najeżdżając myszką
      menuLink.addEventListener('mouseenter', stopColorChange);

      // Wznów zmianę kolorów po wyjściu kursora z obszaru linku
      menuLink.addEventListener('mouseleave', startColorChange);


      //Skontaktuj się z nami - hover features
      function bringBackBigSquare() {
        bigSquare.style.border = '';
        bigSquare.style.backgroundColor = '#63ab45';
        document.querySelector('.centralaDyrContent').innerHTML = '<p class="centralaTitleTwo" style="text-align: center; color: white;">Dyrekcja<br />i&nbsp;zesp&oacute;ł</p>';
      }


      const colorGrey = '#f5f5f5';

      const bigSquare = document.querySelector('.centralaDyr');
      if (bigSquare){
        bigSquare.addEventListener('click', function () {
          window.location.href = '/kontakt';
        });

        bigSquare.addEventListener('mouseenter', function () {
          bigSquare.style.border = '';
          bigSquare.style.backgroundColor = colorGrey;
          document.querySelector('.centralaDyrContent').innerHTML = '<p class="centralaTitleTwo" style="text-align: center; color: #63ab45;"><a href="/kontakt" style="color: #63ab45;">Zobacz...</a></p>';
        })
        bigSquare.addEventListener('mouseleave', bringBackBigSquare);
      }


      const lowerSquare = document.querySelector('.centralaRed');
      function bringBackLowerSquare () {
        lowerSquare.style.border = '';
        lowerSquare.style.backgroundColor = 'grey';
        document.querySelector('.centralaRedContent').innerHTML = '<p class="centralaTitleTwo" style="text-align: center; color: white;">Redakcja<br>strony</p>';
      }
      if (lowerSquare){
        lowerSquare.addEventListener('mouseenter', function () {
          lowerSquare.style.border = '';
          lowerSquare.style.backgroundColor = colorGrey;
          document.querySelector('.centralaRedContent').innerHTML = '<p style="text-align: center;"><span class="centralaTel"><a href="tel:338297651">33 829 76 51</a></span><br><span class="centralaMail"><a href="mailto:redaktor@mdk.bielsko.pl">redaktor@mdk.bielsko.pl</a></span></p>';
        })
        lowerSquare.addEventListener('mouseleave', bringBackLowerSquare);
      }
      

      const higherSquare = document.querySelector('.centralaSek');
      function bringBackHigherSquare () {
        higherSquare.style.border = '';
        higherSquare.style.backgroundColor = '#f3a820';
        document.querySelector('.centralaSekContent').innerHTML = '<p class="centralaTitleTwo" style="text-align: center; color: white; padding-bottom: 0.85rem; padding-top: 0.85rem;">Sekretariat</p>';
      }
      if (higherSquare){
        higherSquare.addEventListener('mouseenter', function () {
          higherSquare.style.border = '';
          higherSquare.style.backgroundColor = colorGrey;
          document.querySelector('.centralaSekContent').innerHTML = '<strong><p style="text-align: center; color: #f3a820; font-size: 12pt;"><div class="centralaOdstep" style="text-align: center;"><span class="centralaTel"><a href="tel:338297650">33 829 76 50</a></span><br><span class="centralaMail"><a href="mailto:mdk@mdk.bielsko.pl">mdk@mdk.bielsko.pl</a></span></div></p><strong>';
        })
        higherSquare.addEventListener('mouseleave', bringBackHigherSquare);
      }
      


      //zajęcia - po kliknięciu na placówke przenosi na kontakt danej placówki
      document.getElementById('placowkaLabel').addEventListener('click', function() {
        var link = document.querySelector('.dkKontaktMenuLink').getAttribute('href');
        if (link) {
          window.location.href = link;
        }
      });

      


      //Wyszukiwanie w googlemapsach po kliknieciu na blok z klasą .searchGoogleMaps
      function searchInGoogleMaps(searchQuery) {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
        window.open(googleMapsUrl, '_blank');
    }
    
    const element = document.querySelector('.searchGoogleMaps');

    element.addEventListener('click', function() {
      console.log("Test")
        const text = "Bielsko-Biała " + document.querySelector('.gsc-heading__desc').innerText.trim();
        searchInGoogleMaps(text);
    });

      

    }
  }
})(Drupal, jQuery, once);
