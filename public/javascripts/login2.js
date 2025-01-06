// Selecionando o formulário
const form = document.getElementById('login-form');

form.addEventListener('submit', function (event) {
    event.preventDefault();  // Previne o envio padrão do formulário

    // Pegando os dados do formulário
    const user = document.getElementById('inputUser2').value;
    const password = document.getElementById('inputPassword2').value;

    // Fazendo a requisição para o backend (login)
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: user,
            password: password
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.auth) {
                // Armazenando o token no localStorage
                localStorage.setItem('token', data.token);
                alert('Login bem-sucedido!');

                // Recuperando o token do localStorage
                const token = localStorage.getItem('token');

                if (token) {
                    // Fazendo a requisição para a rota /user com o token
                    fetch('http://localhost:3000/user', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`  // Envia o token no cabeçalho
                        }
                    })
                        // .then(response => response.text())
                        // .then(responseText => {
                        //     console.log(responseText);
                        // }) // Renderizou meu HTML, que era esperado, mas não foi pra ele;
                        .then(response => response.json())
                        .then(userData => {
                            if (userData.auth) {
                                console.log(userData.auth);
                                window.location.replace('/user');  // Redireciona para a rota que renderiza o dashboard // erro de DOCTYPE, não entendi...
                            } else {
                                console.log('Token inválido'); // Está parando aqui?
                            }
                        })
                        .catch(error => {
                            console.error('Erro ao acessar a rota /user:', error);
                        });
                }
            } else {
                alert('Falha no login!');
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao tentar fazer login');
        });
});