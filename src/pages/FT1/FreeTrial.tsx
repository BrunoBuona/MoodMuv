import { Link } from 'react-router-dom';
import './FreeTrial.css';

export default function FreeTrial(props: any) {
    let key = props.newUser
    return (
        <div className='contenedor-ft'>
            <div className='cft-col1'>

                <div className='cftc2-intern'>
                    <div className='pad-intern'>
                    <span>¿Que incluye la <br /> prueba GRATIS?</span>
                    <p>Durante <span>1 MES</span>, dispondrás de <span>
                        Moodmuvs gratis</span> para practicar yoga, pilates y otras actividades en los mejores centros de Chile.</p>
                    <h6>100% <span>GRATIS</span></h6>
                    <div className='cftc2-i-radio'>

                        <input type="radio" name="" id="" checked disabled />  <input type="radio" name="" id="" disabled />  <input type="radio" name="" id="" disabled />
                    </div>
                    <button className='btn-next-1'><Link to='/activateAccount/2'>Siguiente</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}