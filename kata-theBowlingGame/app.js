var tiro1, tiro2, tiro3, sumaTurno, puntaje = 0;
var cantTurnos = 10,
    turnos = [];
var strikeBono, spareBono = false;
var strikeAcumulado = 0;
var i;

const strike = (tiro) => {
    if (tiro == 10) {
        return true;
    } else {
        return false;
    }
};

const spare = (suma) => {
    if (suma == 10) {
        return true;
    } else {
        return false;
    }
};


const bonoStrike = () => {
    if (strikeBono) {
        var bono = (turnos[i].tiro1 + turnos[i].tiro2);
        turnos[i - 1].resultado += bono;
        turnos[i].resultado = (turnos[i - 1].resultado + bono);
        puntaje = turnos[i].resultado;
        // strikeAcumulado>0 ? turnos[i-1].resultado+=bono: '';
        strikeBono = false;
    }

}

const bonoSpare = () => {
    if (spareBono) {
        var bono = turnos[i].tiro1;
        turnos[i - 1].resultado += bono;
        turnos[i].resultado += tiro1;
        puntaje = turnos[i].resultado;
        spareBono = false;
    }
}

const tiroExtra = (tiro1, tiro2, suma) => {
    tiro3 = Number(prompt('Inserte el tiro #3 \nTurno: 10'));
    var resultado = (tiro1 + tiro2 + tiro3);
    puntaje += resultado;
    var tiro = {
        tiro1,
        tiro2,
        tiro3,
        resultado
    }
    turnos.push(tiro);
}

const strikesAcumulados = (tiro1) => {
    for (let u = 0; u > strikeAcumulado ; u++) {
        turnos[i - u].resultado += tiro1;
    }
}

const objTurno = (tiro1, tiro2, resultado) => {
    var turno = {
        tiro1,
        tiro2,
        resultado
    }
    turnos.push(turno);
};


const initGame = () => {
    for (i = 0; i < cantTurnos; i++) {
        tiro1 = Number(prompt('Inserte tiro #1:\nTurno: ' + (i + 1)));
        if (strike(tiro1)) {
            puntaje += tiro1;
            objTurno(tiro1, 0, puntaje);
            strikeBono ? strikeAcumulado++ : strikeAcumulado = 0;
        } else {
            // strikeAcumulado=0;
            tiro2 = Number(prompt('Inserte tiro #2:\nTurno: ' + (i + 1)));
            sumaTurno = (tiro1 + tiro2);
            if (strikeAcumulado>0) {
                strikesAcumulados(tiro1);
                // turnos[i - 2].resultado += tiro1;
                // turnos[i - 1].resultado += tiro1;
            }
            if (i == 9) {
                tiroExtra(tiro1, tiro2, sumaTurno);
                return;
            } else {
                if (spare(sumaTurno)) {
                    puntaje += sumaTurno;
                    objTurno(tiro1, tiro2, puntaje);
                } else {
                    puntaje += sumaTurno;
                    objTurno(tiro1, tiro2, puntaje);
                }
            }
        }
        if (i > 0) {
            bonoStrike();
            bonoSpare();
        }
        if (strike(tiro1)) {
            strikeBono = true;
        } else if (spare(sumaTurno)) {
            spareBono = true;
        }
    };
};

initGame();
console.log(turnos);
console.log('Puntaje final del juego: ' + puntaje);