
// export default function Payments(props: any) {
//     return (
//         <div id="div-credits">
//             <div className="plan-div">
//                 {
//                     props?.currentUser?.plan === "" ? <p>Sin plan activo</p>
//                         : props?.currentUser?.plan === "free" ? <p>Plan "Trial Happy"</p>
//                             : props?.currentUser?.plan === "happy" ? <p>Plan "Happy"</p>
//                                 : <p>Plan: FULL</p>
//                 } y
//                 <p>{props?.currentUser?.credits} Moods</p>
//             </div>
//             <p>Le quedan {props?.currentUser.diference} dias a tu plan.</p>
//         </div>
//     )
// }
//BASICS
import React, { useContext, useEffect, useState, useRef } from "react";

//UTILITIES
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Payments(props: any){
  return (
    <>
      {props.currentUser && (
        <div className="w-full h-full bg-[#fafafa] py-4 min-h-4">
          <div className="change m-auto border w-3/4 min-h-96 bg-white flex items-start">
            <div className="nav-s min-h-full w-52 border-r flex flex-col self-stretch">
            <Link
                to={"/account/settings/"}
                className="w-full p-2 text-xs text-[#222] py-4 px-8"
              >
                Editar Perfil
              </Link>
              <Link
                to={"/account/settings/suscription"}
                className="w-full p-2 text-xs text-[#222] border-l-2 border-[#222] py-4 font-bold px-8"
              >
                Mi Suscripcion
              </Link>
              <Link
                to={"/account/settings/password"}
                className="w-full p-2 text-xs text-[#222] py-4 px-8"
              >
                Cambiar contraseña
              </Link>
              <Link
                to={"/account/settings/desactive"}
                className="w-full p-2 text-xs text-[#222] py-4 px-8"
              >
                Eliminar cuenta
              </Link>
              <p
                onClick={() => {
                  props.logOut();
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }}
                className="cursor-pointer w-full p-2 text-xs text-[#222] py-4 px-8"
              >
                Cerrar sesión
              </p>
            </div>
           </div>
           </div>
          
      )} </>)}