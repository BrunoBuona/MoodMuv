import BotonPrimario from "../designs/Buttons/PrimaryButton";
import { Fade, Slide } from "react-awesome-reveal";
import BotonSecundario from "../designs/Buttons/SecondaryButton";
import Why from "../designs/Why";
import sample from "../../assets/video.mp4";
import GridTalleres from "../designs/EventsHome";
//STYLES
import "../../styles/mediaqueriesTalleresSection.css";
import "../../styles/mediaqueriesHome.css";

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";


const Home = ({ title,newUser }: any) => {

  let key = newUser
  let idUser:string=key?._id 
  const [preapprovalId, setPreapprovalId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("preapproval_id");
    if (id) {
      if(key.aprove){
        setPreapprovalId(id);
        const accessToken =
          "APP_USR-2687418290941497-122012-3c28388c0004367b9e643811411b4cee-1269149927";
  
        const url = `https://api.mercadopago.com/preapproval/${id}?access_token=${accessToken}`;
        
        axios
        .get(url)
        .then((response) => {
          const subscriptionStatus = response.data.status;
         
          if (subscriptionStatus === "authorized") {
            const url = `http://localhost:4000/api/student`;

            let data={
              id:idUser,
              newUser:key.newUser,
              plan: response.data.reason,
              aprove:false
            }

            axios
              .put(url, data)
              .then((res) => {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Su plan fue aprobado!",
                  showConfirmButton: false,
                  timer: 1500,
                });
              })
              .catch((error) => {
                console.error("Error fetching subscription status:", error);
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: error.response,
                });
              });
            }
        })
        .catch((error) => {
          console.error("Error fetching subscription status:", error);
        });
      }
    }  
  }  , []);

  document.title = title;
  return (
    <>
      <div
        className="div-home relative min-h-[86vh] flex flex-col
       justify-center items-center sm:flex-wrap md:flex-nowrap bg-transparent gap-8 bg-[#f3f3f3]"
      >
        {/* 100vh */}
        <video
          className="-bottom-0 absolute h-full object-cover w-full opacity-70"
          autoPlay
          loop
          muted
        >
          <source src={sample} type="video/mp4" />
        </video>
        <h1 className=" text-main text-6xl sm:w-[25rem] lg:w-[62rem] font-bold text-[#323232] drop-shadow-2xl">
          Una ventana de exhibición para expandir tus conocimientos.
        </h1>
        <Fade>
          <div className="z-10 buttons flex gap-2 ">
            <BotonSecundario text="Clases disponibles" />
            <BotonPrimario text="Conocer Plataforma" />
          </div>
        </Fade>
        {/* 200vh */}
      </div>
      <div className="py-16 px-12 bg-[#f3f3f3]">
        <Slide direction="down" triggerOnce>
          <h2 className="p-8 pb-14 text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B]">
            Eventos / Festivales
          </h2>
        </Slide>
        <GridTalleres />
      </div>
      <Why />
    </>
  );
};

export default Home;
