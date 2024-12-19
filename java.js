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