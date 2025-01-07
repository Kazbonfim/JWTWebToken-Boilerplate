// Selecionando o formulário
const form = document.getElementById('login-form');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Pegando os dados do formulário
    const user = document.getElementById('inputUser2').value;
    const password = document.getElementById('inputPassword2').value;

    // Fazendo a requisição para o backend (login)
    // Ajustado para o Vercel :P
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: user,
            password: password,
        }),
        credentials: 'include', // Garante que cookies sejam enviados e recebidos
    })
        .then((response) => {

            console.log('Resposta do servidor:', response.status); //DEBUG

            if (response.ok) {
                alert('Login bem-sucedido!');

                // Redirecionando para o dashboard
                console.log("Redirecionando para '/user'");
                window.location.href = '/user';
               
            } else {
                alert('Falha no login!');
            }
        })
        .catch((error) => {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao tentar fazer login');
        });
});