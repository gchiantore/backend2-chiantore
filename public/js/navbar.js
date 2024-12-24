async function verifyOnLine() {
    try {
        const url = '/api/sessions/online';
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }
        let response = await fetch(url, options)
        response = await response.json()
        const {online} = response
        if (online) {
            if (online.role == "ADMIN") {   
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
        } else {
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
        return data
    } catch (error) {
        console.log(error);
    }
}

verifyOnLine()