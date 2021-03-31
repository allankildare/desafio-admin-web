# Realização do desafio Stone para Desenvolvedor Front-end
**[Desafio técnico 🔗](https://desafio-frontend-stone-kildare.herokuapp.com/)**

Durante 2 semanas tive a oportunidade de desenvolver uma aplicação front-end como desafio técnico para a [Stone](https://www.stone.com.br/), foram diversos momentos desafiadores e muito aprendizado na jornada, pude abordar bastante coisa e trabalhar com o que amo usar.

As tecnologidas envolvidas foram:
- React
- react-router-dom
- styled-components
- TypeScript
- CSS (Flexbox e Grid)

Infelizmente nas duas semanas disponíveis tive um problema com o tempo, mas consegui superar e entregar o desafio da melhor forma possível, adaptando ao tempo que tive. Mesmo assim o resultado foi bem satisfatório e pude colher diversos frutos nessa jornada. Independente do resultado é um projeto que seguirei melhorando para chegar no resultado que almejo.

O deploy foi feito e pode ser visualizado [clicando aqui](https://desafio-frontend-stone-kildare.herokuapp.com/).
## Qual o desafio?
Alguns pontos foram enumerados para que consigamos fornecer ao nosso operador um sistema robusto de administração de Cartao de crédito.

### Parte 1 - O Analista deve ser capaz de:
> Recursos do contexto **users**, **cards**, **audits**

1. **Visualizar** usuários da base. ✔️
  - GET http://localhost:3001/users
2. **Visualizar** cartoes disponíveis. ✔️
  - GET http://localhost:3001/cards
3. **Visualizar** Auditoria. Esta deve conter o histórico de ações do operador (Item 4). ✔️
  - GET http://localhost:3001/audits
4. **Aprovar**, **rejeitar** um pedido de cartão. Essas acoes alteram somente o status do pedido e devem gerar logs em auditoria. O status inicial de um pedido é "requested", mas pode ser alterado para "approved" ou "rejected". ✔️
  - PUT http://localhost:3001/cards/:id
  - POST http://localhost:3001/audits
 
<br />

### Parte 2 - O Analista deve ser capaz de: **(Recursos adicionais desejaveis mas nao requeridos)**
> Recursos do contexto **features**, **analysts**

1. **Entrar** na aplicacao com email e senha. Utilizar a rota "/analysts" como auxílio e fazer a validação direto no client, ou seja a sessao do usuário deverá ser implementada no front e pode seguir um caminho simples sem problemas. A tela de login deverá conter os campos email e senha.
 - GET http://localhost:3001/analysts ✔️
2. **Excluir** e **Criar** um pedido de cartão. A acao de excluir, remove um elemento por inteiro e a de criar, gera um novo pedido de cartao com status "requested. Um cartao só pode ser criado para usuários que tenham "card" em enabledFeatures. A rota "/features" pode ser utilizada como auxilio para entender cada enabledFeatures do usuário.
 - POST http://localhost:3001/cards
 - DELETE http://localhost:3001/cards/:id
 - GET http://localhost:3000/features
3. **Atualizar** o "nome impresso" do usuário de um pedido de cartão.
 - PUT http://localhost:3001/cards/:id
4. Analista que tem somente a role **n1 nao deve ser capaz de visualizar** auditoria.
5. Analista que tem somente a role **n1 nao deve ser capaz de visualizar** salário base do usuário.
6. Analista que tem somente a role **n1 nao deve ser capaz de visualizar** limite do cartão de crédito dos usuários.
7. Analista que tem somente a role **n1 nao deve ser capaz de excluir** um pedido de cartão.
8. O operador deve ser capaz de visualizar em auditoria o nome do usuário que executou a ação. Utilizar o campo requestedBy, que representa o identificador do usuário que executou tal acao.
9. **Sair** da aplicação. Redirecionar o usuário para tela de login. Voce deverá remover a sessao do usuário no front e direcioná-lo para a tela de login.

<br />

Observações
- Tente exibir informacoes que acredite que sejam relevantes para o analista, no caso de usuário, é essencial exibir nome, documento e email, por exemplo.
- Toda operacao gera um novo item na lista de auditoria, ou seja tudo deve ser rastreável. A sua aplicação deverá fornecer uma área para auditoria e usar a rota "/audits" existente no desafio.
- Analista com roles (n1 e n2) ou (n2) é resumida em n2. Podemos inferir que roles de n2 implicam em mais responsabilidades. Uma role pode ser entendido como um grupo de acesso.
- Este projeto conta com uma aplicacao cliente servidor. O servidor disponibilizará as rotas necessárias para todo o desenvolvimento, tanto da parte 1 quanto da parte 2. A aplicacao front presente conta com um App start do react que voce deverá substituir pelo sistema elaborado no desafio.

## Projeto

### Como rodar o APP Cliente-Servidor

```sh
1- yarn build
2- yarn dev

ou

npm run build
npm run start
```

output:

```
// CRA - Acessar pelo navegador
  http://localhost:3000/

// Api
  Resources:
  http://localhost:3001/users
  http://localhost:3001/analysts
  http://localhost:3001/cards
  http://localhost:3001/features
  http://localhost:3001/audits
```

### **Estrutura de dados**

- **Users**
> Usuários da base

```json
{
  "name": "Nome do usuário",
  "email": "Email do usuário",
  "BirthDate": "Data de Nascimento do usuário",
  "createdAt": "Data de criação do usuário",
  "updatedAt": "Data da última atualização do usuário",
  "enabledFeatures": "Lista de recursos habilitados",
  "document": "Documento do usuário",
  "metadatas": {
    "validDocument": "O documento é válido? A IA é quem define este campo.",
    "verified": "O usuário foi verificado pela IA da empresa?"
  },
  "address": "Endereço",
  "salaryBase": "Salário em centavos",
  "id": "Identificador único do usuário"
}
```

- **Analysts**
> Analistas ou operadores que utilizarão o web-app

```json
{
  "id": "Id do analista",
  "user_id": "Id do usuário",
  "email": "Email de autenticação do analista",
  "password": "Senha do analista",
  "roles": "Cada role representa um grupo de acesso"
}
```

- **Cards**
> Cartões solicitados para alguns usuários da base

```json
{
  "createdAt": "Data de criação do cartão",
  "updatedAt": "Data de atualização do cartão",
  "status": "Status do cartão",
  "id": "Id do cartão",
  "user_id": "Id do usuário",
  "metadatas": {
    "name": "Nome impresso no cartão usuário",
    "digits": "Dígitos do cartão",
    "limit": "Limite do cartao de crédito em reais"
  }
}
```

- **Features**
> Lista dos recursos que a empresa pode oferecer aos seus clientes

```json
{
  "result": [
    {
      "id": "id da feature",
      "name": "Nome da feature disponibilizada pela empresa"
    }
  ],
  "status": 200
}
```

- **Audits**
> Histórico das Ações realizadas pelos operadores

```json
{
  "id": "Id único deste evento",
  "createdAt": "Data que esta ação foi executada",
  "type": "Nome da ação executada pelo usuário, esse campo pode ser definido por voce, ex: cartao_removido, status_alterado",
  "before": "Valor antigo, antes da alteração",
  "after": "Valor novo, o que foi alterado, também pode conter todos os campos do cartao que foi alterado por exemplo",
  "requestedBy": "Id do analyst que executou a ação",
}
```

Observações

- Cada cartão tem seu próprio estado e sempre parte do estado "requested" (solicitado).
- Uma feature habilitada - que é retornada dentro de usuário - diz ao operador quais recursos aquele usuário tem disponível.

### **Desenvolvimento**
Realize um Fork deste projeto para começar o seu desafio. O projeto do desafio conta com react-scripts e Typescript para lhe ajudar durante o desenvolvimento.

### **Layout**

Fique à vontade para definir seu próprio layout. Mas vamos deixar algumas dicas:

- O layout precisa "escalar", ou seja, qual a visão de futuro para o App caso precise adicionar mais informações?
- Não se prenda a algum layout específico que tenha encontrado pela internet, deixe sua criatividade tomar conta.
- O tratamento dos campos é por sua conta, por exemplo CPF: "58395591055" -> "583.955.910-55" 

### **Entrega**

- O código possui algum controle de dependências?
- O resultado final está completo para ser executado?
- O resultado final atende ao que se propõe fazer?
- O resultado final atende totalmente aos requisitos propostos?
- O resultado final é visualmente elegante?

### **Boas Práticas**

- O código está de acordo com o guia de estilo da linguagem?
- O código está bem estruturado?
- O código faz bom uso de _Design Patterns_?
- A separacao dos componentes visam atender o modelo implementado?

### **Documentação**

- O código foi entregue com um arquivo de README claro de como se guiar?
- O código possui comentários pertinentes?
- O código está em algum controle de versão?
- Os commits são pequenos e consistentes?
- As mensagens de commit são claras?

### **Deploy**

- Publique seu código no seu perfil no GitHub
- Publique sua aplicação [heroku](https://www.heroku.com/)
  - Crie uma conta no Heroku 
  - Habilite o [Heroku Github Action](https://github.com/marketplace/actions/deploy-to-heroku)
  - Edite o template em "workflows/node.js.yml" para realizar o deploy de forma automática

### **Outras informações**

- Utilize React + TypeScript ou JavaScript
- Ferramentas como BootStrap, Material Ui, MaterializeCSS e [React-Admin](https://marmelab.com/react-admin/) podem ser utilizadas
- Testes são legais, mas não são obrigatórios

### **Material de Estudo**

- [Boas Práticas de commit](https://github.com/stone-payments/stoneco-best-practices/blob/master/gitStyleGuide/README_pt.md)
- [Airbnb Javascript](https://github.com/airbnb/javascript)
- [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React-Admin](https://marmelab.com/react-admin/)
- [REST](https://pt.wikipedia.org/wiki/REST)
- [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)

