## Descrição
Criado para mostrar os dias que tem aula.

## Instalar

```sh
    yarn install
```

## Testar

```
    yarn test
```

## Rotas
O padrão de resposta
```json
    ...Em caso de sucesso
    {
        data: array ou objeto
    }

    ...Em caso de erro
    {
        error: objeto ou string
    }
```
### User
> url-da-api/api/v1/user
---
| Method  | URL | Use to|
| - | - | -|
| GET  | / | Retorna todos os usuários|  
| GET  | / id  | Retorna apenas um usuario pelo id|
| POST  | / auth  | Faz login no sistema é retornado um token|
| POST  | / register  | Registra-se no sistema (não recebe o token aqui)|

> / POST **BODY** auth
``` json
    {
        "username":"username",
        "passowrd":"password"
    }
``` 

> / POST **RESPONSE** auth
``` json
    {
            "data": {
            "token": "token que deve ser colocado no cabeçalho x-auth",
            "user": {
                "id": "UUID",
                "username": "username",
                "password": "password MD5",
                "createdAt": "UTC",
                "updatedAt": "UTC"
            }
        }
    }
``` 

> / POST **BODY** register
``` json
    {
        "username":"username",
        "passowrd":"password"
    }
``` 

### Holiday
---
> url-da-api/api/v1/holiday

| Method  | URL | Use to|
| - | - | -|
| GET  | / | Retorna todos os dias que não terão aula|  
| GET  | / id  | Retorna apenas um dia pelo id do objeto|
| GET  | / today  | Retorna todos os dias do dia **ATUAL**|
| POST |/| Cria um dia que **NÃO** irá ter aula|
| PUT |/ id| Edita um dia pelo id|
| DELETE|/ id| Delete um dia


> / POST - PUT **BODY**
``` json
    {
        "dateHoliday":"dd/mm/yyyy",
        "description":"Descrição do item"
    }
```

É necessário fazer login com um usuário válido para dar post/delete/update.
Receberá no objeto uma propriedade _token_.

O token deve ir no cabeçalho da requisição
```json
    {
        x-auth: "Bearer _token_do_login_"
    }
```

Recebera um item como este em _get_by_id_ ou _get_all_
``` json
    {
        "id": "UUID",
        "dateHoliday":"dd/mm/yyyy",
        "description":"Descrição do item",
        "active": true,
        "createdAt": "UTC data",
        "updatedAt": "UTC data"
    }
```


