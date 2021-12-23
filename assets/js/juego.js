miModulo = (() => {
    'use strict'

    let deck        = [];
    const tipos     = ['C','D','H','S'],
        reales    = ['A','J','Q','K'];

    let puntosJugadores = [];
    
    
    //Referencias del HTML
    const btnNew = document.querySelector('#btnNew'),
        btnGet = document.querySelector('#btnGet'),
        btnStop = document.querySelector('#btnStop'),
        pointsHTML = document.querySelectorAll('small');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');
    
    //Asignar o crear HTML
    
    //Esta función inicializa el juego
    const inicializarJuego = (nPlayers = 2) => {
        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i<nPlayers; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnGet.disabled = false;
        btnStop.disabled = false;

    }


    
    //Funcion para crear baraja aleatoria
    const crearDeck = () => {
    
        deck = [];
        for (let i = 2; i <=10; i++ ){
            for(let tipo of tipos){
                deck.push(i+tipo);           
            } 
    
        }
        for (let tipo of tipos) {
            for(let real of reales){
                deck.push(real+tipo);
            }
        }
        return _.shuffle(deck);
    }
    
    //Funcion para tomar una carta
    
    const pedirCarta = () => {
    
        if(deck.length === 0){
            throw 'No hay cartas en la baraja';
        }
        return deck.pop();
    
    }
    
    const valorCarta = (carta) => {
    
        const valor = carta.substring(0, carta.length - 1);
        // let puntos = 0;
    
        return (isNaN(valor)) ?
                (valor === 'A' ? 11: 10) :
                 valor * 1;
    }

    //Turno: 0 = player one, el ultimo pc
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta (carta);        
        pointsHTML[turno].innerText=puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.classList.add('carta');
        imgCarta.src=`assets/cartas/${ carta }.png`;
        divCartasJugadores[turno].append(imgCarta);
    }

    const detGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if(puntosComputadora === puntosMinimos) {
                alert('Nadie gana:(');
            } else if (puntosMinimos > 21) {
                alert('Computadora gana');
            }else if (puntosComputadora > 21){
                alert('Jugador gana');
            } else if (puntosComputadora < puntosMinimos){
                alert('Jugador gana');
            }else {
                alert('Computadora gana');
            }
            }, 100);
    }
    
    //Turno pc
    const turnoComputadora = (puntosMinimos) => {
    
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);

            crearCarta(carta, puntosJugadores.length - 1);
    
        }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );
        
        detGanador();
    }

    //Eventos
    btnGet.addEventListener('click',() => {
    
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0 );
        
        crearCarta(carta, 0);
    
        if (puntosJugador > 21){
            console.warn('Lo siento mucho, perdiste');
            btnGet.disabled = true;
            btnStop.disabled = true;
            turnoComputadora(puntosJugador);
        }else if (puntosJugador === 21) {
            console.warn('21, genial!');
            btnGet.disabled = true;
            btnStop.disabled = true;
            turnoComputadora(puntosJugador);
        }
    
    });
    
    btnStop.addEventListener('click',() => {
        const carta = pedirCarta();
        // const puntosJugador = acumularPuntos (carta, puntosJugadores.length - 1);
        btnGet.disabled = true;
        btnStop.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });
    
    
    // btnNew.addEventListener('click',() => {
    //     inicializarJuego();
    // });

    return {
        nuevoJuego: inicializarJuego
    }

})();

