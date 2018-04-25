function fade(txt){
    $('.message').text(txt)
    $('.message').animate({
        top:0
    })
    setTimeout(function(){
        $('.message').animate({
            top: '-100%'
        })
    },1500)
}