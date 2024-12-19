let szavazatok = {};

$(document).ready(function() {
    
    $(".nav-link").click(function() {
        if ($("#story").is(":visible")) {
            $("#story").slideUp(); 
        } else {
            
            if (!$("#story").prev().hasClass("text-center")) {
                $("#story").insertBefore(".text-center");
            }
            $("#story").slideDown();
        }
    });

  
    $('.voteBtn').click(function() {
        let giftId = $(this).data('id');

        if (!szavazatok[giftId]) {
            szavazatok[giftId] = 0;
        }
        szavazatok[giftId]++;

        $('#vote-' + giftId).text(szavazatok[giftId] + ' szavazat');

        updateMaxVote();
    });

    updateMaxVote();
});

function updateMaxVote() {
    let maxVote = 0;
    let maxVoteGiftId = null;

    for (let giftId in szavazatok) {
        if (szavazatok[giftId] > maxVote) {
            maxVote = szavazatok[giftId];
            maxVoteGiftId = giftId;
        }
    }

    if (maxVoteGiftId !== null) {
        $('#max-vote').text('A legtöbb szavazatot a "' + $('#vote-' + maxVoteGiftId).closest('.card').find('.card-title').text() + '" kapta (' + maxVote + ' szavazat)');
    } else {
        $('#max-vote').text('Még nincs szavazat.');
    }
}


$(document).ready(function () {
    let szavazatok = {};

    // Új ajándék hozzáadása
    $('#add-gift-form').submit(function (event) {
        event.preventDefault();

        const giftName = $('#gift-name').val();
        const giftImage = $('#gift-image').val();
        const newGiftId = Object.keys(szavazatok).length + 1;

        if (giftName && giftImage) {
            // Ajándék hozzáadása a DOM-hoz
            $('#gift-container').append(`
                <div class="col-md-3">
                    <div class="card">
                        <img src="${giftImage}" class="card-img-top" alt="Ajándék ${newGiftId}">
                        <div class="card-body">
                            <h5 class="card-title">${giftName}</h5>
                            <button class="btn btn-primary voteBtn" data-id="${newGiftId}">Erre szavazok</button>
                            <p class="vote-count" id="vote-${newGiftId}">0 szavazat</p>
                        </div>
                    </div>
                </div>
            `);

            // Szavazatok inicializálása
            szavazatok[newGiftId] = 0;

            // Gomb eseménykezelő hozzáadása
            $(`.voteBtn[data-id='${newGiftId}']`).click(function () {
                const giftId = $(this).data('id');

                szavazatok[giftId]++;
                $(`#vote-${giftId}`).text(`${szavazatok[giftId]} szavazat`);

                updateMaxVote();
            });

            // Form mezők törlése
            $('#gift-name').val('');
            $('#gift-image').val('');
        } else {
            alert('Kérlek töltsd ki mindkét mezőt!');
        }
    });

    function updateMaxVote() {
        let maxVote = 0;
        let maxVoteGiftId = null;

        for (let giftId in szavazatok) {
            if (szavazatok[giftId] > maxVote) {
                maxVote = szavazatok[giftId];
                maxVoteGiftId = giftId;
            }
        }

        if (maxVoteGiftId !== null) {
            $('#max-vote').text(
                `A legtöbb szavazatot a "${$(`#vote-${maxVoteGiftId}`).closest('.card').find('.card-title').text()}" kapta (${maxVote} szavazat)`
            );
        } else {
            $('#max-vote').text('Még nincs szavazat.');
        }
    }
});