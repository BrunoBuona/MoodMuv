import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import './Plans.css'

const PlanesMaqueta = (props: any) => {
  const key = props?.newUser;
  let id: string = key?.idNow;
  const navigate = useNavigate();

  class PaymentDataSub {
    reason: string;
    auto_recurring: {
      frequency: number;
      frequency_type: string;
      transaction_amount: number;
      //start_date: string;
      //end_date: string;
      free_trial: {
        frequency: number;
        frequency_type: string;
      }
      currency_id: string;
    };
    back_url: string;
    payer_email: string;

    constructor(reason: string, email: string, price: number) {
      (this.reason = reason),
        (this.auto_recurring = {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: price,
          //start_date: "2023-02-06T15:59:52.581Z",
          //end_date: "2023-02-08T15:59:52.581Z",
          free_trial: {
            frequency: 30,
            frequency_type: "days"
          },
          currency_id: "CLP",
        }),
        (this.back_url = "https://www.google.com/"),
        (this.payer_email = email);
    }
  }

  class PaymentDataSub2 {
    reason: string;
    auto_recurring: {
      frequency: number;
      frequency_type: string;
      transaction_amount: number;
      currency_id: string;
    };
    back_url: string;
    payer_email: string;

    constructor(reason: string, email: string, price: number) {
      (this.reason = reason),
        (this.auto_recurring = {
          frequency: 30,
          frequency_type: "days",
          transaction_amount: price,
          currency_id: "CLP",
        }),
        (this.back_url = "https://www.google.com/"),
        (this.payer_email = email);
    }
  }

  class PaymentDataFull {
    reason: string;
    auto_recurring: {
      frequency: number;
      frequency_type: string;
      transaction_amount: number;
      currency_id: string;
    };
    back_url: string;
    payer_email: string;

    constructor(reason: string, email: string, price: number, frequency: number) {
      (this.reason = reason),
        (this.auto_recurring = {
          frequency: frequency,
          frequency_type: "days",
          transaction_amount: price,
          currency_id: "CLP",
        }),
        (this.back_url = "https://www.google.com/"),
        (this.payer_email = email);
    }
  }

  const planHappy = new PaymentDataSub(
    "Plan Happy",
    "moodmuv@gmail.com",
    3500
  );
  const planHappy2 = new PaymentDataSub2(
    "Plan Happy",
    "moodmuv@gmail.com",
    3500
  );
  const planFull = new PaymentDataFull(
    "Plan Full",
    "moodmuv@gmail.com",
    3500, 12
  );

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    paymentData: any
  ) => {

    try {
      const url = `http://localhost:4000/api/student/subscription`;
      const res = await axios.post(url, paymentData);

      if (res.status && res.status === 200) {
        window.location.assign(res.data.init_point);
      }
    } catch (error: any) {
      console.log(error.response);
    }

  };

  const cancelPlan = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (id !== "") {
      Swal.fire({
        title: "Esta seguro?",
        text: "Esta accion no podra ser revertida",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.isConfirmed) {
          const url = `http://localhost:4000/api/cancelSubscription/${id}`;
          let data = {
            status: "cancelled",
          };

          axios
            .put(url, data)
            .then((res) => {
              const url = `http://localhost:4000/api/student`;
              let data = {
                id: key._id,
                idsAprove: [...key.idsAprove],
                test: false,
              };
              data.idsAprove = data.idsAprove.filter((i) => i !== id);
              axios
                .put(url, data)
                .then((res) => {
                  Swal.fire(
                    "Cancelado!",
                    "Su plan ha sido cancelado",
                    "success"
                  );
                  setTimeout(function () {
                    navigate(`/home/?preapproval_id=${id}`);
                  }, 2000);
                })
                .catch((error) => {
                  console.error("Error:", error);
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
      });
    }
  };

  return (
    <div className="cont-price">
      <h2>Nuestros Planes</h2>
      <p>Sin contratos. Ni cobros sorpresa. Solo lo que ves aquí.</p>
      <div className="cards-container">
        <div className="card">
          <div className="card-body">
            <div className="bkg-happy">
              <h5 className="card-title">Plan Happy</h5>
            </div>
            <h6 className="card-subtitle mb-2 text-muted priced">
              CLP$950 <span>/Month</span>
            </h6>
            {/* <h3>Recommended</h3> */}
            <div className="card-text">
              <div className="items-plan">
                <img style={{ width: '20px', display: 'inline' }} src="https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png" alt="Check Item" />
                <p style={{ display: 'inline' }}>  Acceso al perfil del profesor</p>
              </div>
              <div className="items-plan">
                <img style={{ width: '20px', display: 'inline' }} src="https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png" alt="Check Item" />
                <p style={{ display: 'inline' }}>  Acceso al calendario del profesor</p>
              </div>
              <div className="items-plan">
                <img style={{ width: '20px', display: 'inline' }} src="https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png" alt="Check Item" />
                <p style={{ display: 'inline' }}>  Acceso al paquete de clases gratuito</p>
              </div>
              <div className="items-plan">
                <img style={{ width: '20px', display: 'inline' }} src="https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png" alt="Check Item" />
                <p style={{ display: 'inline' }}>  Acceso a todas las clases premium</p>
              </div>
              <div className="items-plan">
                <img style={{ width: '20px', display: 'inline' }} src="https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png" alt="Check Item" />
                <p style={{ display: 'inline' }}>  +40 Moods por mes</p>
              </div>
            </div>
              <button
                className="btn-priced"
                onClick={(e) => handleClick(e, planHappy)}
              >
                Comprar
              </button>
          </div>
        </div>


        <div className="card">
          <div className="card-body">
            <div className="bkg-full">
              <h5 className="card-title">Plan Full</h5>
            </div>
            <h6 className="card-subtitle mb-2 text-muted priced">
              CLP$10.000 <span>/Year</span>
            </h6>
            {/* <h3>Recommended</h3> */}
            <div className="card-text">
              <div className="items-plan">
                <img style={{ width: '20px', display: 'inline' }} src="https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png" alt="Check Item" />
                <p style={{ display: 'inline' }}>  Acceso al perfil del profesor</p>
              </div>
              <div className="items-plan">
                <img style={{ width: '20px', display: 'inline' }} src="https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png" alt="Check Item" />
                <p style={{ display: 'inline' }}>  Acceso al calendario del profesor</p>
              </div>
              <div className="items-plan">
                <img style={{ width: '20px', display: 'inline' }} src="https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png" alt="Check Item" />
                <p style={{ display: 'inline' }}>  Acceso al paquete de clases gratuito</p>
              </div>
              <div className="items-plan">
                <img style={{ width: '20px', display: 'inline' }} src="https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png" alt="Check Item" />
                <p style={{ display: 'inline' }}>  Acceso a todas las clases premium</p>
              </div>
              <div className="items-plan">
                <img style={{ width: '20px', display: 'inline' }} src="https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png" alt="Check Item" />
                <p style={{ display: 'inline' }}>  +70 Moods por mes</p>
              </div>
            </div>
            <button
              className="btn-priced"
              onClick={(e) => handleClick(e, planFull)}
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanesMaqueta;
