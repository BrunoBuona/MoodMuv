import { Link } from "react-router-dom";
import "./Checkout.css";
import { useState } from "react";
import { width } from "@mui/system";
import axios from "axios";
import { months } from "moment";

export default function Checkout(props: any) {
  let theId = location.search.slice(1);
  let price;
  let plan;
  let planimg;
  let key=props.newUser.currentUser
  theId === "happy"
    ? (price = 400)
    : theId === "full"
    ? (price = 3500)
    : theId === "free"
    ? (price = 0)
    : (price = 0);
  theId === "happy"
    ? (plan = "HAPPY")
    : theId === "full"
    ? (plan = "FULL")
    : theId === "free"
    ? (plan = "FREE")
    : (plan = "FREE");
  theId === "happy"
    ? (planimg =
        "http://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg")
    : theId === "full"
    ? (planimg =
        "https://images.hola.com/imagenes/mascotas/20221020219416/razas-perros-toy/1-154-385/razas-de-perro-toy-t.jpg")
    : theId === "free"
    ? (planimg =
        "https://humanidades.com/wp-content/uploads/2017/02/perro-3-e1561679226953.jpg")
    : (planimg =
        "https://imagenes.elpais.com/resizer/iTvj-2_NqCqbV8Q8KxaC7uafCB0=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/ZM2ZBNP5XUKH63E4MNQDBLV3SI.jpg");
  
  const [methodcc, setMethodcc] = useState(true);
  const [methodmp, setMethodmp] = useState(false);

  class PaymentDataSub {
    reason: string;
    auto_recurring: {
      frequency: number;
      frequency_type: string;
      transaction_amount: number;
      //start_date: string;
      //end_date: string;
      free_trial?:{
        frequency:number;
        frequency_type:string;
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
              frequency: 1,
              frequency_type: "months"
            },
            currency_id: "ARS",
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
            frequency: 1,
            frequency_type: "months",
            transaction_amount: price,
            currency_id: "ARS",
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

    constructor(reason: string, email: string, price: number, frequency:number) {
        (this.reason = reason),
        (this.auto_recurring = {
            frequency: frequency,
            frequency_type: "months",
            transaction_amount: price,
            currency_id: "ARS",
        }),
        (this.back_url = "https://www.google.com/"),
        (this.payer_email = email);
    }
  }

  const planHappy = new PaymentDataSub(
    "Plan Happy",
    "test_user_1304323011@testuser.com",
    400
  );
  const planHappy2 = new PaymentDataSub2(
    "Plan Happy",
    "test_user_1304323011@testuser.com",
    400
  );
  const planFull = new PaymentDataFull(
    "Plan Full",
    "test_user_1304323011@testuser.com",
    3500,12
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

  return (
    <div className="checkout-general">
      <div className="cg-col1">
        <div className="cgc1-block">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Eo_circle_purple_checkmark.svg/2048px-Eo_circle_purple_checkmark.svg.png"
            alt=""
          />
          <h2>Shipping</h2>
        </div>
        <hr />
        <div className="cgc1-block">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Eo_circle_purple_checkmark.svg/2048px-Eo_circle_purple_checkmark.svg.png"
            alt=""
          />
          <h2>Personal Details</h2>
        </div>
        <hr />
        <div className="cgc1-block">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Eo_circle_purple_number-3.svg/2048px-Eo_circle_purple_number-3.svg.png"
            alt=""
          />
          <h2>Payment</h2>
        </div>
      </div>
      <div className="cg-col2">
        <div className="payment-header">
          <h2>Payment</h2>
        </div>
        <div className="payment-method">
          <h3>Payment Method</h3>
          <div className="pm-col">
            <label
              onClick={(e) => {
                setMethodcc(true);
                setMethodmp(false);
              }}
              className={methodcc ? "pm-radio-active" : "pm-radio"}
              htmlFor="method1"
            >
              <input type="radio" name="method" id="method1" checked />
              Credit Card
            </label>
            <label
              onClick={(e) => {
                setMethodmp(true);
                setMethodcc(false);
              }}
              className={methodmp ? "pm-radio-active" : "pm-radio"}
              htmlFor="method2"
            >
              <input type="radio" name="method" id="method2" />
              MercadoPago
            </label>
          </div>
        </div>
        <div>
          {methodcc ? (
            <div className="payment-cc">
              <div className="cc-col1">
                <fieldset>
                  <legend>Credit Card Number</legend>
                  <input type="text" />
                </fieldset>
                <fieldset>
                  <legend>Card Holder Name</legend>
                  <input type="text" />
                </fieldset>
                <div>
                  <fieldset className="half-dimsn">
                    <legend>Expiring Date</legend>
                    <input type="date" />
                  </fieldset>
                  <fieldset className="half-dimsn">
                    <legend>CVV</legend>
                    <input type="text" />
                  </fieldset>
                </div>
              </div>
              <div className="checkbox-saved">
                <label htmlFor="svc">
                  <input type="checkbox" name="svc" id="svc" /> Save my credit
                  card information for future purchases.
                </label>
              </div>
              <div className="end-purchase-cc">
                <button>Purchase ${price} CLP.</button>
              </div>
            </div>
          ) : (
            <div className="payment-cc">
              <div className="cc-col1">
                <fieldset>
                  <legend>Credit Card Number</legend>
                  <input type="text" />
                </fieldset>
                <fieldset>
                  <legend>Card Holder Name</legend>
                  <input type="text" />
                </fieldset>
                <div>
                  <fieldset className="half-dimsn">
                    <legend>Expiring Date</legend>
                    <input type="date" />
                  </fieldset>
                  <fieldset className="half-dimsn">
                    <legend>CVV</legend>
                    <input type="text" />
                  </fieldset>
                </div>
              </div>
              <div className="checkbox-saved">
                <label htmlFor="svc">
                  <input type="checkbox" name="svc" id="svc" /> Save my credit
                  card information for future purchases.
                </label>
              </div>
              <div className="end-purchase-cc">
                {theId === "happy" && key.newUser ? (
                  <button onClick={(e) => handleClick(e, planHappy)}>
                    Redirect to MercadoPago
                  </button>
                ) : theId === "happy" && !key.newUser ? (
                  <button onClick={(e) => handleClick(e, planHappy2)}>
                    Redirect to MercadoPago
                  </button>
                ):
                <button onClick={(e) => handleClick(e, planFull)}>
                    Redirect to MercadoPago
                  </button>}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="cg-col3">
        <div className="cgc3-header">
          <h2>Order</h2>
          <div className="line-header">
            <hr className="hr-class" />
            <hr className="hr2-class" />
          </div>
        </div>
        <div className="cgc3-order">
          <div className="img-order">
            <img src={planimg} alt="Trial" />
          </div>
          <div className="trial-desc">
            <h3>{plan} Suscription</h3>
          </div>
          <div className="trial-price">
            <h5>${price} CLP</h5>
          </div>
        </div>
        <div className="end-data-order">
          <div className="voucher">
            <fieldset>
              <legend>Have a Discount Code?</legend>
              <input type="text" placeholder="Example: MOOD-HAPPY-2023" />
            </fieldset>
          </div>
          <div className="total-row">
            <div>
              <h3>Sub-Total</h3>
              <h3>Discount</h3>
              <h3>
                <b>Total</b>
              </h3>
            </div>
            <div>
              <h3>${price} CLP</h3>
              <h3>$0 CLP</h3>
              <h3>
                <b>${price} CLP</b>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
