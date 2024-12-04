
const menu=document.getElementById("lista");
const index=document.getElementById("index-info");
const imgAvatar=document.getElementById("imgAvatar");

navContent()

async function navContent() {
    try {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json", token: localStorage.getItem("token") },
        };
        let response = await fetch("/api/sessions/online", options);
        response = await response.json()
        console.log(response);
        if (response.online) {
            imgAvatar.src=response.avatar
            console.log(response)
            if (token.role === "ADMIN") {
                console.log(token.role);
                menu.innerHTML = `
                        <li class="nav-item">
                            <a class="nav-link" href="index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="addproducts.html">Agregar Productos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="products.html">Productos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="">Usuarios</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" id="logOutLink">Log Out</a>
                        </li>
                `
                index.innerText=`${token.user_id}`
            }else{
                console.log(token.role);
                menu.innerHTML = `
                        <li class="nav-item">
                            <a class="nav-link" href="index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="">Productos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="">Carrito</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" id="logOutLink"> Log Out</a>
                        </li>
                ` 
                index.innerText=`${token.user_id}`
            }

            const logoutLink = document.getElementById("logOutLink");
            if (logoutLink) {
                logoutLink.addEventListener("click", function(event) {
                    event.preventDefault();  // Prevenir el comportamiento predeterminado del enlace
                    console.log("Entra aqui");
                    
                    // Enviar solicitud POST para cerrar sesión
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


        }else{
            menu.innerHTML = `
                        <li class="nav-item">
                            <a class="nav-link" href="index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="register.html">Register</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="login.html">Login</a>
                        </li>
                `
            index.innerText=``     
        }    

    } catch (error) {
        alert(error.message)
    }
}

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
/*
document.getElementById("logOutLink").addEventListener("click", function(event) {
    event.preventDefault();  // Prevenir el comportamiento predeterminado del enlace
    console.log('Logout link clicked');
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
*/