/* Markben Hotel – site scripts
   Every feature checks that its elements exist first, so this one file
   is safe to load on every page. */

document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Mobile menu ---------- */
    var toggle = document.querySelector('.nav-toggle');
    var navbar = document.getElementById('primary-nav');
    if (toggle && navbar) {
        toggle.addEventListener('click', function () {
            var open = navbar.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    /* ---------- Footer year ---------- */
    document.querySelectorAll('.year').forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

    /* ---------- Booking forms: date rules ---------- */
    function toISO(d) {
        // local date as YYYY-MM-DD (avoids timezone shifts)
        var m = String(d.getMonth() + 1).padStart(2, '0');
        var day = String(d.getDate()).padStart(2, '0');
        return d.getFullYear() + '-' + m + '-' + day;
    }
    function addDays(isoDate, n) {
        var p = isoDate.split('-');
        var d = new Date(+p[0], +p[1] - 1, +p[2] + n);
        return toISO(d);
    }

    document.querySelectorAll('form[data-booking]').forEach(function (form) {
        var arrival = form.querySelector('[name="arrivaldate"]');
        var departure = form.querySelector('[name="departuredate"]');
        if (!arrival || !departure) return;

        var today = toISO(new Date());
        arrival.min = today;
        departure.min = addDays(today, 1);

        arrival.addEventListener('change', function () {
            if (!arrival.value) return;
            var minDeparture = addDays(arrival.value, 1);
            departure.min = minDeparture;
            if (departure.value && departure.value < minDeparture) {
                departure.value = '';
            }
            departure.setCustomValidity('');
        });

        departure.addEventListener('change', function () {
            departure.setCustomValidity('');
        });

        form.addEventListener('submit', function (event) {
            if (arrival.value && arrival.value < today) {
                arrival.setCustomValidity('Please choose today or a later date.');
                arrival.reportValidity();
                event.preventDefault();
                return;
            }
            arrival.setCustomValidity('');

            if (arrival.value && departure.value && departure.value <= arrival.value) {
                departure.setCustomValidity('Departure must be after your arrival date.');
                departure.reportValidity();
                event.preventDefault();
                return;
            }
            departure.setCustomValidity('');
            // otherwise the form submits normally to form.php
        });
    });

    /* ---------- Room cards: read more / read less ---------- */
    document.querySelectorAll('.roomcard').forEach(function (card) {
        var button = card.querySelector('.toggle');
        var shortText = card.querySelector('.short');
        var fullText = card.querySelector('.full');
        if (!button || !shortText || !fullText) return;

        button.addEventListener('click', function () {
            var expanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            button.textContent = expanded ? 'Read more' : 'Read less';
            shortText.hidden = !expanded;
            fullText.hidden = expanded;
        });
    });
});
