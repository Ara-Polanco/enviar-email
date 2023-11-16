document.addEventListener('DOMContentLoaded', function() {

    const campos = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    const inputEmail = document.querySelector('#email')
    const inputAsunto = document.querySelector('#asunto')
    const inputMensaje = document.querySelector('#mensaje')
    const formulario = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner')

    inputEmail.addEventListener('blur', validar)
    inputAsunto.addEventListener('blur', validar)
    inputMensaje.addEventListener('blur', validar)
    formulario.addEventListener('submit', enviarEmail)

    btnReset.addEventListener('click', (e) => {
        e.preventDefault()
        resetearCampos()
    })
  
    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement)
            campos[e.target.name] = ''
            comprobarCampo()
            return
        } 
        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement)
            campos[e.target.name] = ''
            comprobarCampo()
            return
        }
        limpiarAlerta(e.target.parentElement)

        /* Asignamos los valores */
        campos[e.target.name] = e.target.value.trim().toLowerCase()

        /* Comprobamos el objeto campos */
        comprobarCampo() 
    }

    function mostrarAlerta(mensaje, referenciaPadre) {
        limpiarAlerta(referenciaPadre) 

        const error = document.createElement('P')
        error.textContent = mensaje
        error.classList.add('bg-red-600','text-white', 'p-2', 'alerta')

        /* Añadiendo el elemento al DOM */
        referenciaPadre.appendChild(error) /* El elemento padre añadirá el elemento hijo al final */
    }

    function limpiarAlerta(referenciaPadre) {
         /* Comprobar la alerta ya existe */
        const alerta = referenciaPadre.querySelector('.alerta') /* Si la alerta no existe, retorna null */
        if(alerta) {
            alerta.remove() /* Si la alerta existe, la elimina */
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email)
        return resultado
    }

    function comprobarCampo() {
        console.log( Object.values(campos).includes('') ) /* Borrar */
        console.log(campos) /* Borrar */
        if(Object.values(campos).includes('')) {
            btnSubmit.classList.add('opacity-50')
            btnSubmit.disabled = true
            return
        } 
        btnSubmit.classList.remove('opacity-50')
        btnSubmit.disabled = false
    }

   //Aqui estaba el codigo
    function enviarEmail(e) {
        e.preventDefault()

        spinner.classList.add('flex')
        spinner.classList.remove('hidden')

        setTimeout(() => {
            spinner.classList.remove('flex')
            spinner.classList.add('hidden')

            resetearCampos()

            const alertaExito = document.createElement('P');
            alertaExito.textContent = 'Mensaje enviado correctamente';
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');

            formulario.appendChild(alertaExito);
            console.log(alertaExito)
            
            setTimeout(() => {
                alertaExito.remove();
                console.log(alertaExito)

            }, 3000);
        }, 3000);
    }

    function resetearCampos() {
           /* Reseteamos los valores del objeto campo */
           campos.email = ''
           campos.asunto = ''
           campos.mensaje = ''
           
           formulario.reset()
           comprobarCampo()
    }
})
