import React from 'react';
import React, { useState } from 'react';

    
    function ListaAlunos() {
        const [descricao, setDescricao] = useState('');
        const [alunos, setAlunos] = useState([]);

        function handleAdicionarClick() {
            window.location.href = 'aluno.html';
        }

        function handleBuscarClick() {
            if (descricao === '') {
                obterAlunos();
            } else {
                obterAlunosPorDescricao(descricao);
            }
        }

        function obterAlunosPorDescricao(descricao) {
            fetch(`https://localhost:7233/api/Alunos/AlunosPorNome?nome=${descricao}`)
                .then(response => response.json())
                .then(data => setAlunos(data))
                .catch(error => console.log(error));
        }

        function obterAlunos() {
            fetch(`https://localhost:7233/api/Alunos`)
                .then(response => response.json())
                .then(data => setAlunos(data))
                .catch(error => console.log(error));
        }

        return (
            <div>
                <button id="btn-adicionar" onClick={handleAdicionarClick}>Adicionar Aluno</button>
                <input type="text" id="texto" value={descricao} onChange={e => setDescricao(e.target.value)} />
                <button id="btn-buscar" onClick={handleBuscarClick}>Buscar</button>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Idade</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody id="resultList">
                        {alunos.map(aluno => (
                            <tr key={aluno.id}>
                                <td>{aluno.id}</td>
                                <td>{aluno.nome}</td>
                                <td>{aluno.email}</td>
                                <td>{aluno.idade}</td>
                                <td>
                                    <a href={`aluno.html?id=${aluno.id}&operacao=editar`} className="ms-4 btn btn-warning">Editar</a>
                                    <a href={`aluno.html?id=${aluno.id}&operacao=excluir`} className="ms-4 btn btn-danger">Excluir</a>
                                    <a href={`aluno.html?id=${aluno.id}&operacao=visualizar`} className="ms-4 btn btn-info">Detalhes</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    export default ListaAlunos;
