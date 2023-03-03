import './Courses.css'
import axios from 'axios'
import { useEffect } from 'react'
import verti from '../../../assets/verti.png'
import acro from '../../../assets/acro.png'
export default function Courses(props:any){

     async function getCourse(){
          const arrayCourses:any = props.currentUser.currentUser.courses
          let data2 = await arrayCourses.map(
              async (id: any) => {
                    await axios.get(`http://localhost:4000/api/activity/${id}`).then((res) => {
                       console.log(res)
                });
              }
            )
      }
      function buildCards(event:any){
        return(
            <div className='card'>
                <img className='card-img' src="https://polotecnologico.net/capacitaciones/wp-content/uploads/sites/2/2022/01/curso-react_Mesa-de-trabajo-1-800x800.png" alt="imagen" />
                <h1 className='titulo-card'>{event.name}</h1>
                <p className='texto-card'>{event.description}</p>
                <p className='texto-card'>{event.date}</p>
                <p className='texto-card'>{event.type}</p>
            </div>
        )
      }
     let data = getCourse()
    return(
        <>
        <div className='courses-content'>
            <h1><b>Mis cursos adquiridos</b> </h1>
        <div className='cards-container'>
            <div className='card'>
                <img className='card-img' src={verti} alt="imagen" />
                <h1 className='titulo-card'>Verticales</h1>
                <p className='texto-card'>This is the good one</p>
                <p className='texto-card'>Duración: 3 Horas</p>
                <p className='texto-card'>Modalidad: Presencial</p>
            </div>
            <div className='card'>
                <img className='card-img' src={acro} alt="imagen" />
                <h1 className='titulo-card'>Taller de Introduccion al AcroYoga</h1>
                <p className='texto-card'>TALLER DE ACROYOGA WASHING MACHINE CON RO “VO VELA”</p>
                <p className='texto-card'>Duración: 3 Horas</p>
                <p className='texto-card'>Modalidad: Presencial</p>
            </div>
        </div>
        </div>
        </>
    )
}