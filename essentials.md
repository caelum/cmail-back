criar usuario OK
    name
    surname
    email
    telefone
    avatar
    password (colocar chumbado 123)
pegar dados do usuario por id OK
listar todos os usuarios OK
fazer login OK
criar email - OK
    - criar o middleware pra validar se tem um token nos headers OK
    - extrair os dados do token 
    - montar email
        - pegar o usuario e pegar o email para o from
        - pegar o content
        - pegar o to
        - pegar o subject
apagar email - PENDENTE
    - pegar id do email e fazer um delete
ver todos os emails - OK (tratar quando o token é inválido)
    - Dado o token, listar emails de um usuário