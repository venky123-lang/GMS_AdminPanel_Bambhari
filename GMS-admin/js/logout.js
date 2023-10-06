function logout()
{
    localStorage.setItem("token","");
    window.location.replace("./index.html");
}