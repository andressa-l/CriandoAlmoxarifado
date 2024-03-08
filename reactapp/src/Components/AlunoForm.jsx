import React from 'react';
import React, { useState, useEffect } from 'react';

function AlunoForm() {
  
    function AlunoForm() {
        const [operacao, setOperacao] = useState('');
        const [aluno, setAluno] = useState({
            id: 0,
            nome: '',
            email: '',
            idade: ''
        });

        useEffect(() => {
            const params = new URLSearchParams(window.location.search);
            const id = parseInt(params.get('id'));

            setOperacao(params.get('operacao'));

            if (id > 0) {
                obterAluno(id);
            }
        }, []);

        function handleChange(event) {
            const { name, value } = event.target;
            setAluno(prevAluno => ({
                ...prevAluno,
                [name]: value
            }));
        }

        function handleSubmit(event) {
            event.preventDefault();

            if (aluno.id === 0) {
                adicionarAluno();
            } else if (operacao === 'editar') {
                atualizarAluno(aluno.id);
            } else if (operacao === 'excluir') {
                deletarAluno(aluno.id);
            } else if (operacao === 'visualizar') {
                window.location.href = 'index.html';
            }
        }

        function obterAluno(id) {
            fetch(`https://localhost:7233/api/Alunos/${id}`)
                .then(response => response.json())
                .then(data => {
                    setAluno(data);
                    mostrarAluno(data);
                })
                .catch(error => console.log(error));
        }

        function mostrarAluno(data) {
            // Atualizar campos do formulário com os dados do aluno
            document.getElementById('nome').value = data.nome;
            document.getElementById('email').value = data.email;
            document.getElementById('idade').value = data.idade;

            if (operacao === 'editar') {
                document.getElementById('btn-submit').innerHTML = "Salvar";
            } else if (operacao === 'excluir') {
                document.getElementById('btn-submit').innerHTML = "Excluir";
            } else if (operacao === 'visualizar') {
                document.getElementById('btn-submit').innerHTML = "Voltar";
            }

            if (operacao !== 'editar') {
                document.getElementById('nome').disabled = true;
                document.getElementById('email').disabled = true;
                document.getElementById('idade').disabled = true;
            }
        }

        function adicionarAluno() {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aluno)
            };

            fetch('https://localhost:7233/api/Alunos/', options)
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        window.location.href = 'index.html';
                    } else {
                        alert('Falha ao adicionar');
                    }
                })
                .catch(error => console.log(error));
        }

        function atualizarAluno(id) {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aluno)
            };

            fetch(`https://localhost:7233/api/Alunos/${id}`, options)
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        window.location.href = 'index.html';
                    } else {
                        alert('Falha ao atualizar');
                    }
                })
                .catch(error => console.log(error));
        }

        function deletarAluno(id) {
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            fetch(`https://localhost:7233/api/Alunos/${id}`, options)
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        window.location.href = 'index.html';
                    } else {
                        alert('Falha ao tentar excluir');
                    }
                })
                .catch(error => console.log(error));
        }

        return (
            <form id="form-aluno" onSubmit={handleSubmit}>
                <input type="hidden" id="id-aluno" name="id" value={aluno.id} />
                <input type="text" id="nome" name="nome" value={aluno.nome} onChange={handleChange} />
                <input type="email" id="email" name="email" value={aluno.email} onChange={handleChange} />
                <input type="number" id="idade" name="idade" value={aluno.idade} onChange={handleChange} />
                <button type="submit" id="btn-submit">Submit</button>
            </form>
        );
    }
}
export default AlunoForm;