async function login() {
    const email_value = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const url = 'https://garden-management.onrender.com/api/v1/admin/login';
    const data = {
        email: email_value,
        password: password
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) // Convert data to JSON string
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        console.log(response.status);

        if (response.status == 200) {
            localStorage.setItem("token",responseData.token);
            window.location.replace("./users1.html");
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
