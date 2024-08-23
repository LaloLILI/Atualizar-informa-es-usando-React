// imports
import { useState } from 'react';
import './AtualizarPessoa.css';
import { useLocation, useNavigate } from 'react-router-dom'; // Inclui useNavigate 
import { formatarData } from "../../../util/Utilitario";
import PessoasRequests from '../../../fetch/PessoasRequests'; // Corrija o caminho conforme necessário

function AtualizarPessoa() {
    const location = useLocation();
    const navigate = useNavigate(); // Use useNavigate 
    const objPessoa = location.state.objeto;

    const [pessoa, setPessoa] = useState({
        id: objPessoa.id,
        nome: objPessoa.nome,
        cpf: objPessoa.cpf,
        dataNascimento: formatarData(new Date(objPessoa.dataNascimento)),
        telefone: objPessoa.telefone,
        endereco: objPessoa.endereco,
        altura: objPessoa.altura,
        peso: objPessoa.peso
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPessoa(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formPessoa = {
            ...pessoa,
            dataNascimento: pessoa.dataNascimento
        };

        if (await PessoasRequests.atualizarPessoa(formPessoa)) {
            alert(`${formPessoa.nome} atualizado com sucesso!`);
            navigate('/listagem', { replace: true });
        } else {
            alert('Erro ao atualizar informações');
        }
    }

    return (
        <>
            <h1>Atualizar Pessoa</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome
                    <input
                        type="text"
                        name="nome"
                        value={pessoa.nome}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    CPF
                    <input
                        type="number"
                        name="cpf"
                        value={pessoa.cpf}
                        onChange={handleChange}
                    />
                </label>
                <div className='group'>
                    <label>
                        Data de Nascimento
                        <input
                            type="date"
                            name="dataNascimento"
                            value={pessoa.dataNascimento}
                            onChange={handleChange}
                            style={{ width: '85%' }}
                        />
                    </label>
                    <label>
                        Telefone
                        <input
                            type="number"
                            name="telefone"
                            value={pessoa.telefone}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <label>
                    Endereço
                    <input
                        type="text"
                        name="endereco"
                        value={pessoa.endereco}
                        onChange={handleChange}
                    />
                </label>
                <div className='group'>
                    <label>
                        Altura
                        <input
                            type="number"
                            name="altura"
                            value={pessoa.altura}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Peso
                        <input
                            type="number"
                            name="peso"
                            value={pessoa.peso}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Enviar</button>
            </form>
        </>
    );
}

export default AtualizarPessoa;
