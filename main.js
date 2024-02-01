document.addEventListener("DOMContentLoaded",function()
{
    document.getElementById("btnTheme").addEventListener("click",function()
    {
        document.documentElement.classList.toggle("dark");
        document.getElementById("btnTheme").innerText = document.documentElement
    .classList.contains("dark")?"light":"dark"
    })
    document.getElementById("btnMenu").addEventListener("click",function()
    {
        document.getElementById("popUp").classList.toggle("hidden")
    })
})