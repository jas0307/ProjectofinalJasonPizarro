
function verificarCredenciales() {
  const usuario = document.getElementById("usuario").value.toLowerCase();
  const contraseña = document.getElementById("contraseña").value;
  console.log(usuario)
  if (usuario === "juanito" && contraseña === "coder") {
    Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire({
      icon: "success",
      title: "Inicio de sesion exitosa!",
    });
    setTimeout(() => {
      window.location.href = "inventario.html";
      sessionStorage.setItem("nombreUsuario", usuario);
      
    }, 2100);
    
  } else {
    Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire({
      icon: "error",
      title: "Credenciales incorrectas",
    });
  }
}

