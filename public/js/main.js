function createFilghtSearchForm($fromInput, $toInput, $dateInput, $searchBtn, $resultList) {
    $fromInput = createAirportSearch($fromInput);
    $toInput = createAirportSearch($toInput);
    $dateInput = createDatePicker($dateInput);
    registerSubmitButton($searchBtn, $fromInput, $toInput, $dateInput, $resultList);
}

function registerSubmitButton ($searchBtn, $fromInput, $toInput, $dateInput, $resultList) {
    $searchBtn.click(function () {
        $resultList.empty();
        var $button = $(this);
        addLoadingIcon($button);

        var data = {
            from: $fromInput.val(), 
            to: $toInput.val(), 
            date: $dateInput.data('daterangepicker').startDate.format("YYYY-MM-DD")
        }

        if (data.from === null || data.to === null) {
            alert('Please select airport!');
            removeLoadingIcon($button);
            return;
        }

        $.get({
            url: '/api/search',
            dataType : 'json',
            data: data,
            async: true
        })
        .success(function(results) {
            for (var i = 0; i < results.length; i++) {                
                $(formatFlight(results[i])).appendTo($resultList);
            }
        })
        .always(function() { removeLoadingIcon($button); });
    });
}

function createDatePicker ($input) {
    return $input.daterangepicker({
        "singleDatePicker": true,
        locale: {
            format: 'DD/MM/YYYY'
        },
    });
}

function createAirportSearch ($input) {
    return $input.select2({
        theme: 'bootstrap',
        placeholder: 'City or Airport',
        ajax: {
            url: '/api/airports',
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return { q: params.term };
            },
            processResults: function (data) {
                return { results: data };
            }
        },
        escapeMarkup: function (markup) { return markup; },
        minimumInputLength: 2,
        templateResult: formatAirport,
        templateSelection: formatAirportSelection
    });
}

function formatFlight (data) {
    var depart = moment(data.depart).format('DD/MM/YYYY, h:mma');
    var arrive = moment(data.arrive).format('DD/MM/YYYY, h:mma');
    var flight = data.flight;
    var airline = data.airline
    return '<li class="list-group-item">' + 
        '<span>' + airline + '&nbsp;</strong>' +
        '<strong>' + flight + '&nbsp;</strong>' +
        '<span>(' + depart + ' - ' + arrive  + ')</span>' +
    '</li>';
}

function formatAirport (airport) {
    if (airport.loading) return airport.text;
    return "<div class='clearfix'>" +
        "<p><strong>" + airport.name + "&nbsp;(" + airport.id + ")</strong></p>" +
        "<p>" + airport.city + ", " + airport.country + "</p>" +
    "</div>"
    ;
}

function formatAirportSelection (airport) {
    if (!airport.id)
        return airport.text;
    return airport.name + ' (' + airport.id + ')';
}

function removeLoadingIcon ($button) {
    $button.find('.loading-icon').remove();
}

function addLoadingIcon ($button) {
    var $spiningIcon = $("<span class='loading-icon'>&nbsp;<i class='glyphicon glyphicon-refresh rotate'></i></span>");
    $spiningIcon.appendTo($button);
}