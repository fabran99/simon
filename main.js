var patron = [];
const botones=['rojo', 'azul', 'amarillo', 'verde'];
var nivel = 1;
var sp = [];

var audios=[new Audio('0.wav'), new Audio('1.wav'),new Audio('2.wav'), new Audio('3.wav'), new Audio('failsound.mp3')]


function iniciarJuego(){
    patron=[];
    var numeroNuevo = Math.floor(Math.random()*4);
    patron.push(numeroNuevo);
    console.log(patron);
    sp=[];
    nivel=1;
    document.querySelector('#nivel').innerHTML='Nivel:'+nivel;
    
    
    document.querySelector('.header button').innerHTML='Reiniciar juego';
    
    botones.forEach((valor, index) => {
    document.querySelector('.'+botones[index]).addEventListener('click', () => {clickBoton(index)
})});
    
    setTimeout(function(){
        
        document.querySelector('.mensajes').innerHTML='Sigue el patron';
        audios[numeroNuevo].play();
        document.querySelector('.'+botones[numeroNuevo]).classList.add('activo');
        setTimeout(function(){
     document.querySelector('.'+botones[numeroNuevo]).classList.remove('activo'); 
        },1000)
    }, 1000)
    
}


function clickBoton(id){
    sp.push(parseInt(id));
    audios[id].play();
    console.log(sp);
    
    document.querySelector('.'+botones[id]).classList.add('activo');
    setTimeout(function(){
        document.querySelector('.'+botones[id]).classList.remove('activo');
    }, 1000);
    
    if(sp.length==patron.length){
        if(comparar()){
        patron=[];
        sp=[];
        nivel=1;
        
        document.querySelector('.mensajes').innerHTML='Has fallado, vuelve a intentarlo';
        audios[4].play();
    }
    else{
        document.querySelector('.mensajes').innerHTML='Has avanzado al siguiente nivel';
        
        setTimeout(function(){
            siguienteNivel();
        }, 2000)
    }
    }
    
}

function comparar(){
    var error=false;
    patron.forEach((elemento,index) => {
        if(patron[index]!=sp[index]){
            error=true;
        }
    })
    
    return error;
}

function siguienteNivel(){
    sp=[];
    nivel=nivel+1;
    document.getElementById('nivel').innerHTML= 'Nivel:'+nivel;
    
    var numeroNuevo = Math.floor(Math.random()*4);
    
    patron.push(numeroNuevo);
    
    console.log(patron);
    
    for(let i=0; i<patron.length; i++){
        setTimeout(function(){
        audios[patron[i]].play();
        document.querySelector('.'+botones[patron[i]]).classList.add('activo');
        setTimeout(function(){
     document.querySelector('.'+botones[patron[i]]).classList.remove('activo'); 
        },900)
    }, 1200*i+1)
    }
    
}