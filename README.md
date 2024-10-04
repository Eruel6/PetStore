# PetStore

## Framework

Utilizado o framework NestJS para construção da aplicação.

Utilizado também requisições via terminal para verificar a funcionalidade do programa.

## Requisitos:

   - Cadastrar um animal com os seguintes dados: Nome, data de nascimento, espécie (gato, cachorro, etc...);
   - Lista todos os animais cadastrados;
   - Buscar um animal específico;
   - Deletar um animal;
   - Lista todos os animais por um filtro de nome, espécie ou data de nascimento;

## "Arquitetura"

Seguindo a estrutura do framework de "modularização", a definição de Pet é realizada em pet.Sechema, com isso são criados seus controladores para interação (controller) com as requisições http, além da criação das funções que serão utilizadas para a interação (lógica de busca, cadastro...).

## Utilização 

Para correta utilização do programa é necessário estar com uma instância de mongoDB funcional, no projeto foi utilizada um docker compose simples, a definição da URL deve ficar em um .env na raiz do projeto, em caso de utilização do docker fornecido em DB do repositório atente-se para a porta e credenciais do banco.