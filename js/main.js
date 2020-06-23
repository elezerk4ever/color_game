$(function(){
    $(window).on('keyup',function(e){
        let key = e.which;
        if(key==32){
            $('button').click();
        }
    })
    $('#banner').hide();
    let notRolling = false;
    let history;
    let players = ['ace','aj','may','unknown','unknown','unknown'];
    let ready = [];
    let i = 0;
    let playersInit = setInterval(function(){
        let randP = Math.ceil(Math.random()*players.length)-1;
        while(ready.includes(randP)){
            randP = Math.ceil(Math.random()*players.length)-1;
        }
        ready.push(randP);
        $(`#players div:nth-child(${i+1})`).css({'background':`url('/img/${players[randP]}.jpg'),white`,'backgroundPosition':'center','backgroundSize':'200px',});4
        i++;
        if(i== players.length) {
            clearInterval(playersInit);
            i = 0;
        }
    },500);
    let colors = ['red','green','yellow','blue','purple','orange'];
    function setLucky(){
        $('.box').removeClass('active');
        let rand = Math.ceil(Math.random()*colors.length)-1;
        $(`.${colors[rand]}`).addClass('active');
        
        setTimeout(function(){
            $('.win').text(`${colors[rand]}`);
        $('#banner').removeClass(colors[history]);
        $(`#players div`).css('opacity','0.2');
        $(`#players div:nth-child(${rand+1})`).addClass('winner');
        $('#banner').addClass(`${colors[rand]}`);
        history = rand;
        $('#banner').show(100);
        setTimeout(function(){
            $('#banner').hide(100);
            $(`#players div:nth-child(${history+1})`).removeClass('winner');
            $(`#players div`).css('opacity','1');
            
        },4000);
        ready = [];
       
        setTimeout(function(){
            $("#players div").css({'background':`black`,'backgroundPosition':'center','backgroundSize':'150px'});
            $('button').text('PICKING COLORS...');
            $('button').css('background','green');
            playersInit = setInterval(function(){
                let randP = Math.ceil(Math.random()*players.length)-1;
                while(ready.includes(randP)){
                    randP = Math.ceil(Math.random()*players.length)-1;
                }
                ready.push(randP);
                $(`#players div:nth-child(${i+1})`).css({'background':`url('/img/${players[randP]}.jpg'),white`,'backgroundPosition':'center','backgroundSize':'200px',});4
                i++;
                if(i== players.length) {
                    clearInterval(playersInit);
                    i = 0;

                    setTimeout(function(){
                        $('button').text('ROLL AGAIN!');
                        $('button').css('background','blue');
                        notRolling = false;
                        $('#timer').text(10);
                    });
                }
            },700);
            
        },5000);
        },1000);
        
    }
    $('button').click(function(){
        if(!notRolling){
            $('button').text('ROLLING...');
            $('button').css('background','#333');
            $("button").attr('disabled','true');
            let counter = 0;
            let random = setInterval(function(){
                $('.box').removeClass('active');
                $(`.${colors[counter++]}`).addClass('active');
                
                if(counter >= colors.length) counter= 0;
            },40);
            let count =9;
            let timer = setInterval(function(){
                $('#timer').text(count--);
                if(count == -1){
                    count = 9;
                    clearInterval(random);
                    clearInterval(timer);
                    $("button").attr('disabled',false);
                    $('button').css('background','rgb(16, 73, 230)');
                    setLucky();
                }
            },1000);
            notRolling = true;
        }
    })
})