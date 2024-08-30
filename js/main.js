let fomulario = document.querySelector("#form");
let mensaje1= document.querySelector(".mensaje")
let mensaje2 = document.querySelector(".mensaje2")
let p = document.querySelector(".mensaje2 p");
let btnCopiar = document.querySelector("#copy")

fomulario.addEventListener("submit", function(e){
    try{
        let btn = e.submitter.dataset.action
        console.log(btn)
        let textoIngresado = Object.fromEntries(new FormData(e.target));
        console.log(textoIngresado)
        if(btn=="encriptar") {
            console.log("hii")
            mensaje1.classList.remove("active")
            mensaje2.classList.add("active")
            p.innerHTML = Encriptar(textoIngresado);
        }else if(btn=="desencriptar") {
            mensaje1.classList.remove("active")
            mensaje2.classList.add("active")
            p.innerHTML = Desencriptar(textoIngresado);
        }
        e.preventDefault();
    } catch(error){
        console.error('error en formulario', error)
    }
})

function Encriptar(object){
    let palabra = object.chain.split(" ");
    let resultado = palabra.map((value, index) => {
        value = value.split('');
        return value.map((caracter)=>{
            if(caracter == "e") return "enter"
            else if(caracter == "i") return "imes"
            else if(caracter == "a") return "ai"
            else if(caracter == "o") return "ober"
            else if(caracter == "u") return "ufat"
            else return caracter
        }).join("")
    }).join(" ");
    return resultado;
}
function Desencriptar(object){
    let palabra = object.chain.split(" ");
    let resultado = palabra.map((value, index) => {
        value = value.replace(/enter/gi, "e");
        value = value.replace(/imes/gi, "i");
        value = value.replace(/ai/gi, "a");
        value = value.replace(/ober/gi, "o");
        value = value.replace(/ufat/gi, "u");
        return value;
    }).join(" ");
    return resultado;
}
btnCopiar.addEventListener("click", function(e){
    let range = document.createRange();
    range.selectNode(p);
    let selection = window.getSelection();
    selection.removeAllRanges();  
    selection.addRange(range);
    document.execCommand('copy');  
    selection.removeAllRanges();  
    p.innerHTML = ""
    mensaje2.classList.remove("active")
    mensaje1.classList.add("active")
})