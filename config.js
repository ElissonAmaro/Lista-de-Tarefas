const BtnAdd = document.getElementById('BtnAdd');
const ContainerPai = document.querySelector('.itens');
const InutText = document.getElementById('InutText');
const itens = document.querySelector('.itens');
const Inputsearch = document.getElementById('Inputsearch');


let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function mostraTarefas() {
    itens.innerHTML = '';

    tarefas.forEach((tarefa, index) => {
        const Divtarefas = document.createElement('div');
        Divtarefas.classList.add("card");

        const tarefass = document.createElement('li');
        tarefass.textContent = tarefa.texto;

        if (tarefa.concluida) {
            tarefass.style.textDecoration = 'line-through';
            tarefass.style.color = '#999';
        } else {
            tarefass.style.textDecoration = 'none';
            tarefass.style.color = 'black';
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.concluida;
        checkbox.onchange = () => {
            tarefas[index].concluida = checkbox.checked;
            localStorage.setItem("tarefas", JSON.stringify(tarefas));

            if (checkbox.checked) {
                tarefass.style.textDecoration = 'line-through';
                tarefass.style.color = 'green';
            } else {
                tarefass.style.textDecoration = 'none';
                tarefass.style.color = 'black';
            }
        };

        const excluir = document.createElement('button');
        excluir.textContent = 'Excluir';
        excluir.classList.add('btnexcluir');
        excluir.addEventListener('click', () => {
            remover(index);
        });

        itens.prepend(Divtarefas);
        Divtarefas.appendChild(checkbox);
        Divtarefas.appendChild(tarefass);
        Divtarefas.appendChild(excluir);
    });
}

function adicionar() {
    const input = InutText.value.trim();

    if (input !== "") {
        tarefas.push({ texto: input, concluida: false });
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        mostraTarefas();
    }
}

function remover(index) {
    tarefas.splice(index, 1);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    mostraTarefas();
}

mostraTarefas();

BtnAdd.addEventListener('click', () => {
    adicionar();
    InutText.value = '';
});

Inputsearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        Inputsearch.value = '';
        Inputsearch.style.width = '40px';
        
    }
});

InutText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        adicionar();
        InutText.value = '';
    }
});

function ativo() {
    if (Inputsearch.style.width === '40px') {
        Inputsearch.style.width = '230px';
       
    } else {
        Inputsearch.style.width = '40px';
      
    }
}

ContainerPai.addEventListener('click', () => {
    Inputsearch.style.width = '40px';
    Inputsearch.disabled = true;
});

Inputsearch.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const itensLi = document.querySelectorAll('.itens li');

    itensLi.forEach(item => {
        const itemText = item.textContent.toLowerCase();
        const divPai = item.parentElement;
        divPai.style.display = itemText.includes(searchTerm) ? 'flex' : 'none';
    });
});
  InutText.addEventListener("input", () => {
    const palavras = input.value.trim().split(/\s+/);
    if (palavras.length > 23) {
      input.value = palavras.slice(0, 23).join(" ");
    }
  });
ativo();