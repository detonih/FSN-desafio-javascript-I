const alunosDaEscola = require('./database');

const adicionarAluno = (nomeAluno) => {
  if(nomeAluno) {
    alunosDaEscola.push({
      nome: nomeAluno,
      notas: [],
      cursos: [],
      faltas: 0
    });
    console.log('Aluno cadastrado com sucesso!');
  } else {
    console.log('Ops, algo deu errado!');
  }
}

adicionarAluno('Jonas');
adicionarAluno('Henrique');

const listarAlunos = () => {
  console.log(`Existem ${alunosDaEscola.length} alunos cadastrados na escola:`) 

  alunosDaEscola.forEach(currVal => {
    console.log(`------------
    ${currVal.nome}`);
  });
}

listarAlunos();

const buscarAluno = (nomeAluno) => {
  const aluno = alunosDaEscola.filter((elem) => {
    return elem.nome == nomeAluno;
  });
  if(aluno.length !== 0) {
    console.log(`Foram encontrados ${aluno.length} alunos correspondentes a pesquisa:`);
    aluno.forEach(currVal => {
      console.log(`
      ${currVal.nome}`);
    });
    
  } else {
    console.log('Ops, aluno não encontrado!');
  }
}

buscarAluno('Henrique')

const matricularAluno = (aluno, curso) => {
  const verificarAluno = alunosDaEscola.filter(elem => {
    return elem.nome == aluno.nome
  });
  const verificaCurso = aluno.cursos.map(currVal => {
     return currVal.nomeDoCurso
  });
  
  if(verificaCurso == curso) {
    console.log(`O aluno ${aluno.nome} já está matriculado no curso ${curso}`)
  } else {
    if(verificarAluno.length > 1) {
      console.log(`Foram encontrados ${verificarAluno.length} alunos que correspondem ao mesmo nome. Por favor, especifique com o sobrenome.`);
    } else {
      if(verificarAluno[0] === aluno) {
        verificarAluno[0].cursos.push({
          nomeDoCurso: curso,
          dataMatricula: new Date
        });
        console.log(`O aluno ${verificarAluno[0].nome} foi matriculado com sucesso no curso ${curso}`)
        console.log(`Detalhes:
        Aluno: ${verificarAluno[0].nome}
        ${verificarAluno[0].cursos.map(currVal => {
          return '\nCurso: ' + currVal.nomeDoCurso + ' \nData de matricula: ' + currVal.dataMatricula
        })}`);
      } else {
        console.log('Ops, não encontramos este aluno');
      }
    }
  }
}

matricularAluno(alunosDaEscola[5], 'Full Stack');
matricularAluno(alunosDaEscola[4], 'Full Stack');
matricularAluno(alunosDaEscola[0], 'Full Stack');
matricularAluno(alunosDaEscola[3], 'Full Stack');

const aplicarFalta = ({ nome, cursos, faltas}) => {
  if(cursos != 0) {
    faltas++
    console.log(`O aluno ${nome} recebeu uma falta. Total de faltas: ${faltas}`);
  } else {
    console.log('Somente é possível aplicar faltas a alunos matriculados em algum curso.');
  }
}

aplicarFalta(alunosDaEscola[5]);
aplicarFalta(alunosDaEscola[0]);

const aplicarNota = ({nome, cursos, notas}, addNota) => {
  if(cursos.length != 0) {
    notas.push(addNota)
    console.log(`Foi adicionado a nota ${addNota} ao aluno ${nome}. Notas deste aluno: ${notas}`)
  } else {
    console.log('Somente é possível aplicar notas a alunos matriculas em algum curso.')
  }
}

aplicarNota(alunosDaEscola[5], 7);

const aprovarAluno = ({nome, cursos, notas, faltas}) => {
  
  if(cursos.length != 0) {
    const media = (notas.reduce((acc, currVal) => {
      return acc + currVal
    }) / notas.length).toFixed(2);

    if(media >= 7 && faltas <= 3) {
      console.log(`Dê os parabéns ao aluno ${nome}, ele foi aprovado com média ${media}!`)
    } else {
      console.log(`Infelizmente o aluno ${nome} foi reprovado. A media dele ficou em ${media}!`)
    }
  } else {
    console.log('O aluno deve estar matriculado em algum curso para poder ser aprovado.')
  }
}

aprovarAluno(alunosDaEscola[5]);
aprovarAluno(alunosDaEscola[4]);
aprovarAluno(alunosDaEscola[1]);