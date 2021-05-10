import React, { Component } from 'react'
import axios from 'axios'
import './Pesquisa.css'

const api = axios.create({
    baseURL : 'https://rickandmortyapi.com/api'
})
const caracter = '/character'
const localizacao = '/location'
const episodios = '/episode'
const estadoInicial = {
    listaCaracteristica  : [],
    listaEpisodios : [],
    listaLocalizacao : [],
    texto: "",
    valorSelect : "personagem",
    valorTabela : ''
    
}
 class Pesquisa extends Component{

state = { ...estadoInicial}

componentWillMount(){
    api.get(caracter)
        .then(resposta => resposta.data)
        .then(dados => {
            this.setState({listaCaracteristica : dados.results})
        }) 

    api.get(episodios)
        .then(resposta => resposta.data)
        .then(dados => {
            this.setState({listaEpisodios : dados.results})
        })

    api.get(localizacao)
        .then(resposta => resposta.data)
        .then(dados => {
            this.setState({listaLocalizacao : dados.results})
        })
}

lista(){
    const {texto, valorSelect,listaCaracteristica,listaEpisodios,listaLocalizacao} = this.state
   
    if(valorSelect == 'personagem'){
            const listaNomes = listaCaracteristica.filter(personagem => {
                return personagem.name.includes(texto)
            })
            const listaFinal = !listaNomes.length == true 
                ? 'Não contém ' 
                : listaNomes.map((personagem , i)=>{
                     return (
                         <tr key = {personagem.id}>
                             <td> {i + 1} </td>
                             <td>{personagem.name}</td>
                             <td><img className = 'img-fluid img-thumbnail' max src = {personagem.image} /></td>
                        </tr>
                     )
                  })
            return listaFinal 
    }
    if(valorSelect == 'episodio'){
        const listaNomes = listaEpisodios.filter(personagem => {
            return personagem.name.includes(texto)
        })
        const listaFinal = !listaNomes.length == true 
            ? 'Não contém ' 
            : listaNomes.map((episodio,i) =>{
                 return (
                    <tr key = {episodio.id}>
                        <td> {i + 1} </td>
                        <td> {episodio.name} </td>
                        <td>{episodio.episode}</td>
                        <td> {episodio.created} </td>
                    </tr>
                 )
              })
        return listaFinal
    }
    if(valorSelect == 'planeta'){
        const listaNomes = listaLocalizacao.filter(planeta => {
            return planeta.name.includes(texto)
        })
        console.log(listaNomes)
        const listaFinal = !listaNomes.length == true 
            ? 'Não contém ' 
            : listaNomes.map((planeta  , i)=>{
                 return (
                     <tr key = {planeta.id}>
                         <td>{i + 1}</td>
                         <td>{planeta.name}</td>
                         <td>{planeta.type} </td>
                     </tr>
                 )
              })
        return listaFinal
    }   
}

textoPesquisa(evento){
        const texto = evento.target.value
        this.setState({texto : texto})
}
selectPesquisa(evento){
   const valor = evento.target.value
    this.setState({valorSelect : valor})
    
}
pesquisar(evento){
  evento.preventDefault()
  this.Tabela()
  

}
tabelaCorpo(){
    const {valorSelect} = this.state
    if (valorSelect == 'personagem'){
        
        const ok = (
        <table class="table  table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Imagem</th>
                </tr>
            </thead>
            <tbody >
                {this.lista()}
            </tbody>
        </table>
        )
        this.setState({valorTabela : ok})
    }

    if (valorSelect == 'episodio'){
        const ok = (
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Episodio</th>
                    <th scope="col">Data de Lançamento</th>
                </tr>
            </thead>
            <tbody>
                {this.lista()}
            </tbody>
        </table>
        )
        this.setState({valorTabela : ok})
    }

    if (valorSelect == 'planeta'){
        const ok = (
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Tipo</th>
                </tr>
            </thead>
            <tbody>
                {this.lista()}
            </tbody>
        </table>
        )
        this.setState({valorTabela : ok})
    }
    
}
Tabela(){
    this.tabelaCorpo()
    
}
    render(){
        return (<div className="container principal">
                    <h1>Api Rick and Morty</h1>
                    <h2>Formulario de Pesquisa</h2>
                    <form className = 'form-control' onSubmit = {evento => this.pesquisar(evento)}>
                        <select className = 'form-select' value ={this.state.valorSelect} onChange = {evento => this.selectPesquisa(evento)} >
                            <option value="personagem" >Personagem</option>
                            <option value="planeta">Planeta</option>
                            <option value="episodio">Episodio</option>
                        </select>
                        <input className = 'form-control' placeholder = 'digite aqui...' name = 'texto' onChange = {evento => this.textoPesquisa(evento)} />
                        <button className = 'btn btn-primary' type="submit" >Pesquisar</button>
                    </form>
                    {this.state.valorTabela}
                </div>
        )
    }
}

export default Pesquisa
