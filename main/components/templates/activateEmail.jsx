import React from "react";

const ActivateEmailTemplate = ({ to, guid }) => {
  return (
    <>
      <strong style={{color:"#40A826", fontStyle:"bold", fontSize:"28px"}}>¡Bienvenido a Encuéntralo Fácil CR!</strong>
      <br />
      <br />
      <span>
        {`Hola <<${to}>>, hemos recibido una solicitud de activación de cuenta, puedes finalizar el proceso mediante el siguiente link: `}
      </span>
      <br />
      <br />
      <div style={{padding:"10px", display:"flex", justifyContent:"center", width:"100%"}}>
      <button style={{backgroundColor:"black", color:"grat", border:"solid", borderRadius:"12px", width:"200px", height:"50px", fontSize:"bold"}}>
        <a style={{color:"white"}}
            href={`https://encuentralofacilcr.com/email/activate?ui=${guid}`}
        >
            Activar mi cuenta
        </a>
      </button>
      </div>
      <br />
      <span>Gracias por utilizar nuestra plataforma.</span>
      <br />
      <span>Equipo de Encuéntralo Fácil CR</span>
      <br />
      <br />
      <span style={{width:"100%", display:"flex", textAlign:"center"}}>{`https://encuentralofacilcr.com   @2024-2025 Todos los derechos reservados`} </span>

    </>
  );
};

export default ActivateEmailTemplate;
