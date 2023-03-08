//patron modulo
(()=>{
    'use strict'
    let deck=[];
    let tipos=["C","D","P","T"]
    let mayores=["A","J","Q","R"]
    let puntosJugador=0,puntosPC=0
    //Referenciad HTML
    const btnDet=document.querySelector("#btnDetener"),
    btnPedir=document.querySelector("#btnPedir"),
    btnNew=document.querySelector("#btnnewGame");
    const puntosHtml=document.querySelectorAll("small"),
    cartasPlayer=document.querySelector("#jugador-cartas"),
    cartasPC=document.querySelector("#computadora-cartas");
    
    
    const iniciarGame=()=>{
        crearDeck();
    }
    
    //Ccuando t imprime los elementos en morado hace referencia a un int
    //para llevar de string a int solo se multiplica por 1
    const crearDeck=()=>{
        for(let i=2;i<=10;i++){
            for(let j of tipos ){
                deck.push(i+j)
            }
        }
        for(let i of mayores){
            for(let j of tipos)
            deck.push(i+j) 
        }
       
      
       
        return _.shuffle(deck)//funcion que hace aleatorio el deck
    }
    crearDeck();
    
    const pedirCarta=()=>{
        if(deck.length===0){
            throw"no hay cartas en el deck"
        }
        return deck.pop() 
    }
    
    const valorCarta=(carta)=>{
        let valor=carta.substring(0,carta.length-1);
        return (isNaN(valor))?(valor==="A"?11:10):valor*1  
     
    }
    valorCarta(pedirCarta())
    
    
    
    
    //turno de la computadora
    const turnoComputadora=()=>{
    
        btnDet.disabled=true
        btnPedir.disabled=true
        if(puntosJugador>21||puntosJugador===0){
        const carta=pedirCarta();
        puntosPC+=valorCarta(carta);    
        puntosHtml[1].innerText=puntosPC
        const imgCarta=document.createElement("img")
        imgCarta.src=`assets/cartas/${carta}.png` 
        imgCarta.classList.add("carta")
        cartasPC.append(imgCarta)
        setTimeout(() => {
            alert("ha ganado el PC")
        
        }, 20);
        return
    
        
        }
        else{
            while(puntosPC<puntosJugador||(puntosJugador===puntosPC&&puntosPC<=18)){
                const carta=pedirCarta();
                puntosPC+=valorCarta(carta);    
                puntosHtml[1].innerText=puntosPC
                const imgCarta=document.createElement("img")
                imgCarta.src=`assets/cartas/${carta}.png` 
                imgCarta.classList.add("carta")
                cartasPC.append(imgCarta)
            }
        }
        setTimeout(() => {
    
        
            if((puntosJugador===puntosPC)){
                alert("empate")
            }
            else if(puntosPC>21){
                alert("ha ganado el jugador")
                return
            }
            else if(puntosPC>puntosJugador){
                alert("ha ganado la pc")
                return
        }
        }, 20);
    
    
    }
    
    //eventos
    btnPedir.addEventListener("click",()=>{
        const carta=pedirCarta();
        puntosJugador+=valorCarta(carta);    
        puntosHtml[0].innerText=puntosJugador
        const imgCarta=document.createElement("img")
        imgCarta.src=`assets/cartas/${carta}.png` 
        imgCarta.classList.add("carta")
        cartasPlayer.append(imgCarta)
        if(puntosJugador>21){
            //console.warn("you lost")
            btnPedir.disabled=true
            btnDet.disabled=true
            turnoComputadora()
        }
        if(puntosJugador===21){
            //console.warn("you win")
            btnPedir.disabled=true
            btnDet.disabled=true
            turnoComputadora()
        }
    })
    if(btnDet.disabled===false){
    btnDet.addEventListener("click",turnoComputadora)}
    btnNew.addEventListener("click",()=>{
        deck=[]
        deck=crearDeck();
        puntosPC=0
        puntosJugador=0
        puntosHtml[0].innerText=0
        puntosHtml[1].innerText=0
        cartasPC.innerHTML=""
        cartasPlayer.innerHTML=""
        btnDet.disabled=false
        btnPedir.disabled=false
    })
       
})();


(function(){

})



































