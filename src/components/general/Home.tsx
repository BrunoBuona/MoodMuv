//STYLES
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Home = ({ title, newUser }: any) => {
  let key = newUser;
  let idUser: string = key?._id;
  //const [preapprovalId, setPreapprovalId] = useState("");
  let navigate = useNavigate()
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("preapproval_id");
    let idsAprove = key?.idsAprove;
    if (key && id && !idsAprove.includes(id)) {
      const accessToken =
        "APP_USR-2687418290941497-122012-3c28388c0004367b9e643811411b4cee-1269149927";
      const url = `https://api.mercadopago.com/preapproval/${id}?access_token=${accessToken}`;
      axios
        .get(url)
        .then((response) => {
          const subscriptionStatus = response.data.status;

          if (subscriptionStatus === "authorized") {
            const url = `http://localhost:4000/api/student`;
            let data = {
              id: idUser,
              newUser: key.newUser,
              plan: response.data.reason,
              test: key.test,
              idNow: id,
              idsAprove: [...key.idsAprove],
            };

            data.idsAprove.push(id);

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
          if (subscriptionStatus == "cancelled") {
            const url = `http://localhost:4000/api/student`;
            let data = {
              id: idUser,
              plan: "",
              idNow: "",
              test:false
            };
            axios
              .put(url, data)
              .then((res) => {
                
              })
          }
        })
        .catch((error) => {
          console.error("Error fetching subscription status:", error);
        });
    }
  }, []);

  document.title = title;
  
  return (
    <>
      <div className="div-home w-full  h-[90vh] flex flex-col
       justify-center items-start sm:flex-wrap md:flex-nowrap bg-transparent gap-8 bg-[#f3f3f3] relative"
      >
        <img className="pointer-events-none absolute w-full h-full object-cover object-bottom " src="https://user-images.githubusercontent.com/91817152/226061080-78c7f2df-3b10-4d4c-89a7-f45bbdf49e89.png" alt="bkg" />
        <div className="relative z-10 w-[50%] h-full flex flex-col gap-3 items-start justify-center p-8">
          <h1 className="font-extrabold text-6xl text-[#2C2C2C]">Explora y aprende con nuestra ventana de exhibición</h1>
          <br/>
          <button onClick={()=> navigate("/explore")} className="bg-[#563d81] hover:bg-[#523d81] hover:shadow-xl text-xl w-fit text-white font-bold py-5 px-4 rounded cursor-pointer call">Ver nuestro cursos</button>
        </div>
      </div>
    </>
  );
};

export default Home;
