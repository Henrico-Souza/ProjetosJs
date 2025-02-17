const calcular = document.getElementById('calcular');

function imc () {
    const nomeinput = document.getElementById('nome');
    const alturaCminput = document.getElementById('altura');
    const pesoinput = document.getElementById('peso');
    const resultado = document.getElementById('resultado');

    const nome = nomeinput.value;
    const alturaCm = alturaCminput.value;
    const peso = pesoinput.value;

    if (nome !== '' && altura !=='' && peso !== '') {
        let alturaM = alturaCm/100;
        let valorImc =  peso / (alturaM * alturaM);   
        
        let classificacao = '';

        if (valorImc < 18.5) {
            classificacao = "você está abaixo do peso";
        } else if (valorImc < 24.9) {
            classificacao = "você está com o peso normal";
        } else if (valorImc < 29.9) {
            classificacao = "você está sobrepeso";
        } else if (valorImc < 34.9) {
            classificacao = "você está com obesidade grau 1";
        } else if (valorImc < 39.9) {
            classificacao = "você está com obesidade grau 2";
        } else {
            classificacao = "você está com obesidade grau 3 (mórbida)";
        }
    
        resultado.textContent = `${nome} seu IMC é ${valorImc.toFixed(2)}, ${classificacao}`;

        nomeinput = '';
        alturaCminput = '';
        pesoinput = '';
        
    } else {
      resultado.textContent = 'Preencha todos os campos!'
    } 
    
        
}

calcular.addEventListener('click', imc);
