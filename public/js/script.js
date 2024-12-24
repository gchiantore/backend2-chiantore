
const menu=document.getElementById("lista");
const index=document.getElementById("index-info");
const imgAvatar=document.getElementById("imgAvatar");

document.addEventListener("DOMContentLoaded", function() {
    const logoutLink = document.getElementById("logOutLink");
    if (logoutLink) {
        logoutLink.addEventListener("click", function(event) {
            event.preventDefault();  // Prevenir el comportamiento predeterminado del enlace
            console.log("Entra aqui")
            // Enviar solicitud POST
            fetch('/api/sessions/signout', { method: 'POST' })
                .then(() => {
                    // Redirigir después de logout
                    window.location.href = '/';  // O a donde necesites
                })
                .catch(error => {
                    console.error('Error al cerrar sesión:', error);
                });
        });
    }
});
