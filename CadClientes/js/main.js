'use strict'

let indexToDelete = null;

//*Local Storage
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));

//* Modal
const openModal = () => {
    createTitle();
    document.getElementById('modal').classList.add('active');
    if (!document.getElementById("nome").dataset.index) {
        document.getElementById("nome").dataset.index = "new";
    }
} 

const openDeleteModal = (index) => {
    indexToDelete = index;
    const client = readClient()[index];
    document.getElementById('confirm-message').textContent = `Deseja excluir o cliente ${client.nome}?`
    document.getElementById('delete_modal').classList.add('active');
}

const closeModal = () => {
    clearFields();
    createTitle();
    document.getElementById('modal').classList.remove('active');
    document.getElementById("nome").dataset.index = "new";
}

const closeDeleteModal = () => {
    document.getElementById('delete_modal').classList.remove('active');
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal_field');
    fields.forEach(field => field.value = "");
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = 
    `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.estado}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="editar-${index}">Editar</button>
            <button type="button" class="button red" id="excluir-${index}">Excluir</button>
        </td>
    `;
    document.querySelector('#table-client>tbody').appendChild(newRow);
}

const clearTable = () => {
    const rows = document.querySelectorAll('#table-client>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

const tempClient = {
    nome: 'Henrico de Souza',
    email: 'henrico@gmail.com',
    celular: '17 991123456',
    cidade: 'São José do Rio Preto',
    estado: 'São Paulo'
}

//*Create
const createClient = (client) => {
    const dbClient = getLocalStorage();
    dbClient.push(client);
    setLocalStorage(dbClient);
}

//*Read
const readClient = () => getLocalStorage();

//*Update
const updateClient = (index, client) => {
    const dbClient = readClient();
    dbClient[index] = client;
    setLocalStorage(dbClient);
}

//*Delete
const deleteClient = (index) => {
    const dbClient = readClient();
    dbClient.splice(index, 1);
    setLocalStorage(dbClient);
}

//*Update table
const updateTable = () => {
    const dbClient = readClient();
    clearTable();
    dbClient.forEach((client, index) => createRow(client, index));
}

//*Validação de campos
const isValidFields = () => {
    return document.getElementById('form').reportValidity();
}

//*Interações c/ interface

const saveClient = () => {
    if(isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('e-mail').value,
            celular: document.getElementById('celular').value,
            estado: document.getElementById('estado').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index
        if(index === 'new'){
            createClient(client);
        } else{
            updateClient(Number(index), client);
        }
        updateTable();
        closeModal();
        createTitle();
    }
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome;
    document.getElementById('e-mail').value = client.email;
    document.getElementById('celular').value = client.celular;
    document.getElementById('estado').value = client.estado;
    document.getElementById('cidade').value = client.cidade;
    document.getElementById('nome').dataset.index = client.index;
}

const editClient = (index) => {
    index = Number(index);
    const client = readClient()[index];
    client.index = index;
    fillFields(client);
    openModal();
}

const confirmDelete = () => {
    if(indexToDelete !== null){
        deleteClient(indexToDelete);
        updateTable();            
        closeDeleteModal();
    }
}

const rowAction = (event) => {
    if(event.target.type == 'button'){
        const [action, index] = event.target.id.split('-');
        if(action == 'editar') {
            editClient(index);
            editTitle();
        } else if(action == 'excluir'){
            openDeleteModal(index);
        }
    }
}

const editTitle = () => document.getElementById('title-client').textContent = `Editar Cliente`;
const createTitle = () => document.getElementById('title-client').textContent = `Novo Cliente`;


updateTable();


//*Eventos
document.getElementById('cad-cli')
    .addEventListener('click', openModal);

document.getElementById('modal-close')
    .addEventListener('click', closeModal);

document.getElementById('salvar')
    .addEventListener('click', saveClient);

document.getElementById('cancelar')
    .addEventListener('click', closeModal);

document.querySelector('#table-client>tbody')
    .addEventListener('click', rowAction)

    document.getElementById("confirm-delete")
    .addEventListener("click", confirmDelete);

document.getElementById("cancel-delete")
    .addEventListener("click", closeDeleteModal);