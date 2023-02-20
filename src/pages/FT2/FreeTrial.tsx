import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import './FreeTrial.css';
import {useNavigate} from "react-router-dom";

export default function FreeTrial2(props: any) {
    let key = props.newUser
    let id:string=key.currentUser._id

    let fechaActual: Date = new Date();
    let fechaUnMesDespues: Date = new Date();
    fechaUnMesDespues.setMonth(fechaActual.getMonth() + 1);
    fechaUnMesDespues.setDate(fechaActual.getDate());

    const navigate = useNavigate();
    
    let data={
        id:id,
        newUser:props.newUser.currentUser.newUser,
        plan:'free',
        dateInit: fechaActual,
        dateFin: fechaUnMesDespues,
    }

    const handleClick = async (
        e: React.MouseEvent<HTMLButtonElement>,id:string
      ) => {
            try {
                const url = `http://localhost:4000/api/student`;
                const res = await axios.put(url,data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Su prueba fue activada con exito",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(function () {
                    navigate("/home");
                  }, 2000);
            } catch (error: any) {
              //console.log(error.response);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response,
                });
            }
      };
    return (
        <div className='contenedor-ft'>
            <div className='cft-col1'>

                <div className='cftc2-intern'>
                    <div className='pad-intern'>
                    <span>Personalizá tu plan</span>
                    <p>Los planes estan pensados para adaptarse a ti.
                    Puedes comprar creditos adicionales, aprovechar los que te sobraron del ciclo anterior y cambiar o cancelar el plan en cualquier momento.</p>
                    <h6>&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                    <div className='cftc2-i-radio'>

                        <input type="radio" name="" id="" disabled />  <input type="radio" name="" id="" disabled  checked  />  <input type="radio" name="" id="" disabled />
                    </div>
                    {/* <button className='btn-next-1'><Link to='/activateAccount/checkout'>Siguiente</Link></button> */}
                    <button className='btn-next-1' onClick={e=>handleClick(e,id)}>Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    )
}