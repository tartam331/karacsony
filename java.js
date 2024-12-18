let szavazatok = {};
$(document).ready(function() {
    $('.voteBtn').click(function() {
        let giftId = $(this).data('id');
        
        if (!szavazatok[giftId]) {
            szavazatok[giftId] = 0;
        }
        szavazatok[giftId]++;

        $('#vote-' + giftId).text(szavazatok[giftId] + ' szavazat');
    });
});

function showStory() {
    $('#story').toggle();
}

