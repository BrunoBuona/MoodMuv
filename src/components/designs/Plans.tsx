import React from "react";
import { Link } from "react-router-dom";
import check from "../../assets/checkeds/check.png";
import disableCheck from "../../assets/checkeds/disableCheck.png";
import Checkout from "../../pages/FT3/Checkout";

import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PlanesMaqueta = (props: any) => {
  const key = props?.newUser;
  let id: string = key?.idNow;
  const navigate = useNavigate();

  const cancelPlan = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    
    if (id !== "") {

      //const url = `https://api.mercadopago.com/preapproval/${id}`;
      const url = `http://localhost:4000/api/cancelSubscription/${id}`;
          let data = {
            status: "cancelled"
      };

      axios
        .put(url, data)
        .then((res) => {
          console.log(res)
          const url = `http://localhost:4000/api/student`;
              let data = {
                id: key._id,
                idsAprove:[...key.idsAprove]
              };
              data.idsAprove = data.idsAprove.filter(i => i !== id);
              axios
              .put(url, data).then((res) => {
                setTimeout(function () {
                  navigate(`/home/?preapproval_id=${id}`);
                }, 2000);
              })
              .catch((error) => {
                console.error("Error:", error);
              })

        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response,
          });
        }); 
     
    }
  };

  return (
    <div className="bg-[#f3f3f3] w-full min-h-[90vh] flex flex-col justify-center items-center gap-2">
      <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B] drop-shadow-2xl text-4xl text-center">
        Planes disponibles
      </h1>
      <p className="text-[#666] w-1/2 text-sm">
        Al registrarte, puedes elegir entre nuestros planes más populares. Y,
        una vez completado el registro, tendrás más planes disponibles. Puedes
        cambiar o cancelar tu suscripción en cualquier momento.
      </p>
      <div className="flex flex-wrap justify-center items-end gap-8 w-full my-2 px-24">
        <div className="bg-[#f5f5f5] border rounded-xl w-52 h-64">
          <div className="flex items-center justify-center h-1/4 w-full bg-gradient-to-t from-[#563D81] to-[#6E5E8B] rounded-t-xl">
            <h3 className="font-bold text-white drop-shadow-[0_5px_12px_rgb(255,255,255)] text-3xl flex gap-2 justify-center items-center">
              <span className="text-sm font-light">$</span>
              {"0"}
              <span className="text-xs font-light">/mes</span>
            </h3>
          </div>
          <div className="h-[75%] w-full flex flex-col justify-around items-center px-2 ">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 justify-center items-center">
                <img className="w-3 h-3" src={check} alt="check" />
                <p className="text-xs text-[#999] break-normal">Plan FREE.</p>
              </div>
              <div className="flex gap-2 justify-center items-center">
                <img className="w-3 h-3" src={check} alt="check" />
                <p className="text-xs text-[#999] break-normal">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
              <div className="flex gap-2 justify-center items-center">
                <img className="w-3 h-3" src={disableCheck} alt="check" />
                <p className="text-xs text-[#999] break-normal">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
            {(key && (key?.plan === "free" || !key?.newUser)) ? (
              <button className="border rounded-md w-full text-[#563D81] font-bold">
                <Link to={"#"}>Adquirido</Link>
              </button>
            ) : (
              <button className="border rounded-md w-full text-[#563D81] font-bold">
                <Link to={"/activateAccount/checkout?free"}>Comprar</Link>
              </button>
            )}
          </div>
        </div>
        <div className="bg-[#f5f5f5] border rounded-xl w-52 h-80 mb-6">
          <div className="flex items-center justify-center h-1/4 w-full bg-gradient-to-t from-[#563D81] to-[#6E5E8B] rounded-t-xl">
            <h3 className="font-bold text-white drop-shadow-[0_0_25px_rgb(255,255,255)] text-5xl flex gap-2 justify-center items-center">
              <span className="text-sm font-light">$</span>
              {"400"}
              <span className="text-xs font-light">/mes</span>
            </h3>
          </div>
          <div className="h-[75%] w-full flex flex-col justify-around items-center px-2">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 justify-center items-center">
                <img className="w-3 h-3" src={check} alt="check" />
                <p className="text-xs text-[#999] break-normal">Plan HAPPY.</p>
              </div>
              <div className="flex gap-2 justify-center items-center">
                <img className="w-3 h-3" src={check} alt="check" />
                <p className="text-xs text-[#999] break-normal">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
              <div className="flex gap-2 justify-center items-center">
                <img className="w-3 h-3" src={check} alt="check" />
                <p className="text-xs text-[#999] break-normal">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
              <div className="flex gap-2 justify-center items-center">
                <img className="w-3 h-3" src={disableCheck} alt="check" />
                <p className="text-xs text-[#999] break-normal">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
            {key?.plan === "happy" ? (
              <button className="border rounded-md w-full text-[#563D81] font-bold" onClick={cancelPlan}>
               Cancelar plan
              </button>
            ) : (
              <button className="border rounded-md w-full text-[#563D81] font-bold">
                {" "}
                <Link to={"/activateAccount/checkout?happy"}>Comprar</Link>
              </button>
            )}
          </div>
        </div>
        <div className="bg-[#f5f5f5] border rounded-xl w-52 h-64">
          <div className="flex items-center justify-center h-1/4 w-full bg-gradient-to-t from-[#563D81] to-[#6E5E8B] rounded-t-xl">
            <h3 className="font-bold text-white drop-shadow-[0_5px_12px_rgb(255,255,255)] text-3xl flex gap-2 justify-center items-center">
              <span className="text-sm font-light">$</span>
              {"550"}
              <span className="text-xs font-light">/mes</span>
            </h3>
          </div>
          <div className="h-[75%] w-full flex flex-col justify-around items-center px-2">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 justify-center items-center">
                <img className="w-3 h-3" src={check} alt="check" />
                <p className="text-xs text-[#999] break-normal">Plan FULL.</p>
              </div>
              <div className="flex gap-2 justify-center items-center">
                <img className="w-3 h-3" src={disableCheck} alt="check" />
                <p className="text-xs text-[#999] break-normal">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>

              <div className="flex gap-2 justify-center items-center">
                <img className="w-3 h-3" src={disableCheck} alt="check" />
                <p className="text-xs text-[#999] break-normal">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
            {key?.plan === "full" ? (
              <button
                className="border rounded-md w-full text-[#563D81] font-bold"
                onClick={cancelPlan}
              >
                Cancelar plan
              </button>
            ) : (
              <button className="border rounded-md w-full text-[#563D81] font-bold">
                <Link to={"/activateAccount/checkout?full"}>Comprar</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanesMaqueta;
