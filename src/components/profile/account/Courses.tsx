import './Courses.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import verti from '../../../assets/verti.png';
import acro from '../../../assets/acro.png';

export default function Courses(props:any){

    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        async function getCourse() {
            const arrayCourses = props?.currentUser?.currentUser?.courses;
            const promises = arrayCourses.map(async (id: any) => {
              const res = await axios.get(`http://localhost:4000/api/activity/${id}`);
              return res.data; // Devuelve solo la información necesaria
            });
            const data = await Promise.all(promises); // Espera a que todas las promesas se resuelvan
            console.log(data);
            setCourses(data);
        }
        getCourse();
    }, []); // Dependencia vacía para que se ejecute solo una vez

    function buildCards(event:any){
        return(
            <div className='card'>
                <img className='card-img' src={event?.img} alt="imagen" />
                <h1 className='titulo-card'>{event?.name}</h1>
                <p className='texto-card'>{event?.date}</p>
                <p className='texto-card'>{event?.type}</p>
                <p className='texto-card'>{event?.location}</p>
            </div>
        )
    }

    return(
        <>
            <div className='courses-content'>
                <h1><b>Mis cursos adquiridos</b> </h1>
                <div className='cards-container'>
                    {
                        courses.map((e, key)=> (
                            <div className='card' key={key}>
                                <div className='card-img'/>
                                <h1 className='titulo-card'>{e?.data?.name}</h1>
                                <p className='texto-card'>Duración: {e?.data?.duration} horas.</p>
                                <p className='texto-card'>Modalidad: {e?.data?.format}</p>
                                <p className='texto-card'>Ubicación: {e?.data?.location}</p>
                                <p className='texto-card'>Tipo de Clase: {e?.data?.type}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}