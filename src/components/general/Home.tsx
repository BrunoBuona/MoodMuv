//STYLES
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Home = ({ title, newUser }: any) => {
  let key = newUser;
  let idUser: string = key?._id;
  //const [preapprovalId, setPreapprovalId] = useState("");

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
              newUser: key.newUser,
              plan: "",
              idNow: "",
            };
            axios
              .put(url, data)
              .then((res) => {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Su plan fue cancelado satisfactoriamente",
                  showConfirmButton: false,
                  timer: 1500,
                });
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
        })
        .catch((error) => {
          console.error("Error fetching subscription status:", error);
        });
    }
  }, []);

  document.title = title;
  return (
    <>
      <div className="div-home relative min-h-[86vh] flex flex-col
       justify-center items-center sm:flex-wrap md:flex-nowrap bg-transparent gap-8 bg-[#f3f3f3]"
      >
        <h1 className=" text-main text-6xl sm:w-[25rem] lg:w-[62rem] font-bold text-[#323232] drop-shadow-2xl">
          El Home fue desactivado dado que se modificará en la versión final.
        </h1>
      </div>
    </>
  );
};

export default Home;
