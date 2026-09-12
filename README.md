# Loja Mobile — React Native + Expo

Aplicativo mobile desenvolvido para o trabalho de Mobile Development.

## Funcionalidades

- Login com validação de e-mail e senha.
- Armazenamento temporário do usuário com Redux Toolkit.
- Listagem de produtos por grupo masculino/feminino.
- Filtro por categorias.
- Consumo da API REST DummyJSON usando Axios.
- Tela de detalhes com ID do produto.
- Estados de carregamento, erro, lista vazia e atualização por pull-to-refresh.
- Logout com limpeza do estado de autenticação.
- Interface responsiva baseada no Figma fornecido.

## Tecnologias

- React Native
- Expo
- Axios
- Redux Toolkit
- React Redux
- React Navigation

## API

Base:
`https://dummyjson.com`

Listagem:
`GET /products/category/{categoria}`

Detalhes:
`GET /products/{id}`

Categorias masculinas:
- mens-shirts
- mens-shoes
- mens-watches

Categorias femininas:
- womens-bags
- womens-dresses
- womens-jewellery
- womens-shoes
- womens-watches

## Como executar

### 1. Instalar Node.js

Use uma versão LTS do Node.js.

### 2. Abrir a pasta

```bash
cd loja-mobile-expo
```

### 3. Instalar dependências

```bash
npm install
```

Se o npm da sua máquina apresentar conflito de peer dependency:

```bash
npm install --legacy-peer-deps
```

### 4. Iniciar

```bash
npx expo start
```

Depois:
- pressione `a` para Android;
- pressione `w` para Web;
- ou leia o QR Code com o Expo Go.

## Fluxo do aplicativo

1. Login
2. Produtos
3. Escolha Masculino ou Feminino
4. Escolha uma categoria
5. Toque em um produto
6. Visualize os detalhes
7. Vá para Perfil
8. Toque em Sair da conta
9. O app retorna para Login

## Estrutura

```text
src/
├── components/
│   ├── FormInput.js
│   ├── PrimaryButton.js
│   └── ProductCard.js
├── navigation/
│   ├── AppStack.js
│   ├── AuthStack.js
│   └── RootNavigator.js
├── screens/
│   ├── LoginScreen.js
│   ├── ProductDetailsScreen.js
│   ├── ProductListScreen.js
│   └── ProfileScreen.js
├── services/
│   └── api.js
├── store/
│   ├── index.js
│   └── slices/
│       └── authSlice.js
└── theme/
    └── colors.js
```

## Observação

A especificação do trabalho proíbe adicionar, editar ou excluir produtos. Por isso, essas funcionalidades não fazem parte desta versão.
