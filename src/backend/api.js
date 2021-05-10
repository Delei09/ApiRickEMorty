const axios = require('axios')

Consulta(3 ,{consulta : 'name' , name : 'Rick'})
function  Consulta(funcao , props){

const api = axios.create({
    baseURL : 'https://rickandmortyapi.com/api'
})
const caracter = '/character'
const localizacao = '/location'
const episodios = '/episode'

    if(funcao == 1){
        consultaCaracter()
        function consultaCaracter(){
            api.get(caracter)
                .then(resposta => resposta.data)
                .then(dados => {
                    const resultado = dados.results
                    const name = resultado.filter(personagem =>{
                                return personagem[props.consulta].includes(props.name)
                    })
                    const teste =  !name.length == true ? 'não encontrado' : name  
                    console.log(teste)
                    return !name.length == true ? 'não encontrado' : name     
                } )
                
        }
    }

    if(funcao == 2){
        consultalocalizacao()
        function consultalocalizacao(){
            api.get(localizacao)
                .then(resposta => resposta.data)
                .then(dados => {
                    
                    const resultado = dados.results
                    const name = resultado.filter(personagem =>{
                                    return personagem[props.consulta].includes(props.name) 
                    })
                    const teste =  !name.length == true ? 'não encontrado' : name  ;
                    console.log(teste)
                    return !name.length == true ? 'não encontrado' : name     
                } )
        }
    }

    if(funcao == 3){
        consultaEpisodio()
        function consultaEpisodio(){
            api.get(episodios)
                .then(resposta => resposta.data)
                .then(dados => {
                    const resultado = dados.results
                    const name = resultado.filter(personagem =>{
                                    return personagem[props.consulta].includes(props.name) 
                    })
                    const teste =  !name.length == true ? 'não encontrado' : name  
                    console.log(teste)
                    return !name.length == true ? 'não encontrado' : name     
                } )
        }
    }

}
module.exports = Consulta()



