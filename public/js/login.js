const btnLogin = document.querySelector("#login")
const btnLoginWithGoogle=document.querySelector("#loginWithGoogle")
const btnLoginWithGitHub=document.querySelector("#loginWithGitHub")

btnLogin.addEventListener("click", async (event)=>{
    try {
        event.preventDefault()
        const data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        }
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        // let response = await fetch("http://localhost:8080/api/sessions/login", options) 
        // si estan en otro repositorio de front tienen que fetchear la URL COMPLETA!!!
        // aca como estamos dentro del servidor ME AHORRO LOCALHOST
        let response = await fetch("/api/sessions/login", options) 
        response = await response.json()
        if (response.message == "USER LOGGUED IN") {
            location.replace("/");
        }else{
            alert("INVALID CREDENTIALS")
        }    
    } catch (error) {
        alert(error.message)
    }
})

btnLoginWithGoogle.addEventListener("click", (event)=>{
    event.preventDefault()
    window.location.href = '/api/sessions/google';
});

btnLoginWithGitHub.addEventListener("click", (event)=>{
    event.preventDefault()
    window.location.href = '/api/sessions/github';
});

