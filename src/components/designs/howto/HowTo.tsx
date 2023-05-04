import React from "react";
import HowToVideo from "../../../assets/Estudiantes_A_1.mp4";
import HowToVideoProfe from "../../../assets/Instructores_A.mp4";
import Section from './Section'
import Faq from './Faq'
import Vector from '../../../assets/Vector.png'
//CSS
import '../../../styles/mediaqueriesHowTo.css'

const HowTo = (props:any) => {
  return (
    
    <div className="min-h-screen w-full break-all flex flex-col items-center gap-28">
      <div className="flex w-full h-full justify-center items-center flex-wrap">
        <div className="flex flex-col gap-4 h-full w-1/3 justify-center section-1">
          <h2 className="outline-4 flex flex-col font-bold text-4xl tracking-widest text-transparent bg-clip-text bg-gradient-to-t from-[#dd941e] to-[#e6b243]">
            Como usar{" "}
            <span className="flex flex-col font-bold text-6xl text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B] tracking-tighter">
              MOODMUV?
            </span>
          </h2>
        </div>
        {
        props?.currentUser?.type == 'Teacher' ?
        <video controls  loop
          className="h-13  w-1/3 outline-4"
          src={HowToVideoProfe}
        />
        :
        <video controls loop
        className="h-13  w-1/3 outline-4"
        src={HowToVideo}
        />
        }
      </div>
      <Section/>
      {/* <h2 className="text-howto text-[#323232] px-6 relative z-20 text-6xl w-80 font-bold flex flex-col break-normal">Preguntas <span className="text-4xl font-light text-[#323232]">Frecuentes</span></h2> */}
      <div className="w-[90%] h-full pb-28 ">
        {/* <Faq/> */}
      </div>
    </div>
  );
};

export default HowTo;
