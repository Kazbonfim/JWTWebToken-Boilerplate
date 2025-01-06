// Selecionando o formulário
const form = document.getElementById('login-form');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o envio padrão do formulário

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

                // Redirecionando para o dashboard
                window.location.replace('/user');
            } else {
                alert('Falha no login!');
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao tentar fazer login');
        });
});