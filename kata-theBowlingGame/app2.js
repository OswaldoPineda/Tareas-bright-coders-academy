var tiro1, tiro2, tiro3, sumaTurno, puntaje = 0;
var cantTurnos = 10,
    turnos = [];
var t;
var strikeBono, spareBono = false;

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
    if (turnos[t + 1].tiro2 == null) {
        let bono = (turnos[t + 1].tiro1 + turnos[t + 2].tiro1);
        turnos[t].resultado += bono;
    } else {
        let bono = (turnos[t + 1].tiro1 + turnos[t + 1].tiro2);
        turnos[t].resultado += bono;
    }
};

const bonoSpare = () => {
    const bono = (turnos[t + 1].tiro1);
    turnos[t].resultado += bono;
};

const tiroExtra = () => {
    if (strike(turnos[t].tiro1)) {
        //let suma = turnos[t].tiro2 + turnos[t].tiro3;
        let bono = (turnos[t].tiro2 + turnos[t].tiro3);
        puntaje += (10 + bono);
        turnos[t].resultado = puntaje;
    } else if (spare(turnos[t].tiro1 + turnos[t].tiro2)) {
        puntaje += (turnos[t].tiro1 + turnos[t].tiro2 + turnos[t].tiro3)
        turnos[t].resultado = puntaje;
    } else {
        puntaje += (turnos[t].tiro1 + turnos[t].tiro2);
        turnos[t].resultado = puntaje; 
    }
};

const objTurno = (tiro1, tiro2 = 0, resultado = 0, tiro3 = 0) => {
    if (tiro3) {
        var turno = {
            tiro1,
            tiro2,
            tiro3,
            resultado
        }
    } else {
        var turno = {
            tiro1,
            tiro2,
            resultado
        }
    }
    turnos.push(turno);
};

const getPuntajes = () => {
    for (let i = 0; i < cantTurnos; i++) {
        do {
            var num1 = Number(prompt('Inserte tiro #1:\nTurno: ' + (i + 1)));
        } while (num1 > 10);
        if (i == 9) {
            if (strike(num1)) {
                var num2 = Number(prompt('Inserte tiro #2:\nTurno: ' + (i + 1)));
                var num3 = Number(prompt('Inserte tiro #3:\nTurno: ' + (i + 1)));
                objTurno(num1, num2, 0, num3);
            } else {
                var num2 = Number(prompt('Inserte tiro #2:\nTurno: ' + (i + 1)));
                if (spare(num1 + num2)) {
                    var num3 = Number(prompt('Inserte tiro #3:\nTurno: ' + (i + 1)));
                    objTurno(num1, num2, 0, num3);
                } else {
                    objTurno(num1, num2);
                }
            }
        } else {
            if (strike(num1)) {
                objTurno(num1, null);
            } else {
                do {
                    var num2 = Number(prompt('Inserte tiro #2:\nTurno: ' + (i + 1)));
                } while ((num1 + num2) > 10);
                sumaTurno = (num1 + num2);
                objTurno(num1, num2);
            }
        }

    }
    console.log(turnos);
};

const initGame = () => {
    getPuntajes();
    for (t = 0; t < cantTurnos; t++) {
        if (t == 9) {
            tiroExtra();
        } else {
            tiro1 = turnos[t].tiro1;
            if (strike(tiro1)) {
                puntaje += tiro1;
                turnos[t].resultado = puntaje;
                bonoStrike();
            } else {
                tiro2 = turnos[t].tiro2;
                sumaTurno = (tiro1 + tiro2);
                puntaje += sumaTurno;
                if (spare(sumaTurno)) {
                    turnos[t].resultado = puntaje;
                    bonoSpare();
                } else {
                    turnos[t].resultado = puntaje;
                }
            }
            puntaje = turnos[t].resultado;
        }
    }
}

initGame();

turnos.map(pts=>{
    console.log("Resultado: "+pts.resultado);
});

console.log('Puntaje final: '+puntaje);