let szavazatok = {};
$(document).ready(function() {
    // Szavazás gombok eseménykezelője
    $('.voteBtn').click(function() {
        let giftId = $(this).data('id');
        
        if (!szavazatok[giftId]) {
            szavazatok[giftId] = 0;
        }
        szavazatok[giftId]++;
        
        // Frissítjük a szavazatot a megfelelő kártyán
        $('#vote-' + giftId).text(szavazatok[giftId] + ' szavazat');

        // Frissítjük a legnagyobb szavazatot
        updateMaxVote();
    });

    // Kezdeti legnagyobb szavazat frissítése
    updateMaxVote();
});

// Funkció, ami frissíti a legnagyobb szavazatot
function updateMaxVote() {
    let maxVote = 0;
    let maxVoteGiftId = null;

    // Végigmegyünk a szavazatokon, hogy megtaláljuk a legnagyobbat
    for (let giftId in szavazatok) {
        if (szavazatok[giftId] > maxVote) {
            maxVote = szavazatok[giftId];
            maxVoteGiftId = giftId;
        }
    }

    // A legnagyobb szavazattal rendelkező ajándék megjelenítése
    if (maxVoteGiftId !== null) {
        $('#max-vote').text('A legtöbb szavazatot a "' + $('#vote-' + maxVoteGiftId).closest('.card').find('.card-title').text() + '" kapta (' + maxVote + ' szavazat)');
    } else {
        $('#max-vote').text('Még nincs szavazat.');
    }
}
