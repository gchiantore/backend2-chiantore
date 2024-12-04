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
            // pregunto si es admin
            // si es admin
                // renderizo el navbar de admin
            // si no es admin
                // renderizo el navbar de user
        } else {
            // renderizo el navbar de invitado
        }
        return data
    } catch (error) {
        console.log(error);
    }
}