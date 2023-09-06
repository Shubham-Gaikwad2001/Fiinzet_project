import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useUserAuth } from "../context/UserAuthContext";
import "./css/phoneSignup.css";

const PhoneSignUp = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const { setUpRecaptha } = useUserAuth();
  const [resendCountdown, setResendCountdown] = useState(0);
 

  const navigate = useNavigate();

  useEffect(() => {
    async function put() {
      let result = await sessionStorage.getItem("phone");
      setNumber(result);
    }
    put();
  }, []);

  const getOtp = async (e, resend = false) => {
    e.preventDefault();
    console.log(number);
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
      setFlag(true);
      if (resend) {
        // Set countdown for resending OTP
        setResendCountdown(30); // Set your desired countdown duration (in seconds)
        const countdownInterval = setInterval(() => {
          setResendCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(countdownInterval);
          setResendCountdown(0);
        }, 30000); // Clear countdown after 30 seconds
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);

      let a = sessionStorage.getItem("name");
      let b = sessionStorage.getItem("email");
      let c = sessionStorage.getItem("phone");
      let d = sessionStorage.getItem("status");
      let e = sessionStorage.getItem("pincode");
      let f = sessionStorage.getItem("city");
      //let f=sessionStorage.getItem("")
      // console.log(a,b,c,d,e)

      async function add() {
        let prerequire = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: a,
            phone: c,
            email: b,
            status: d,
            pincode: e,
            city: f
          }),
        };
        // Function to handle OTP resend

      
        fetch("https://fiinzet.com/senduserinput", prerequire)
          .then((data) => {
            console.log(data);
          })
          .catch(() => {
            console.log("data not save ");
          });
        //console.log(name,email,phone,status,pincode)
      }
      add();
      navigate("/homebackend");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="main mt-5">
        <section className="section mt-5 pt-4 pb-5 contact-div">
          <div className="container mt-5">
            <div className="card shadow">
              <div className="card-body">
                <div className="p-4 box">
                  <h2 className="mb-3">Verification process </h2>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form
                    onSubmit={getOtp}
                    style={{ display: !flag ? "block" : "none" }}
                  >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <PhoneInput
                        defaultCountry="IN"
                        value={number}
                        onChange={setNumber}
                        placeholder="Enter Phone Number"
                      />
                      <div id="recaptcha-container"></div>
                    </Form.Group>
                    <div className="button-right">
                      <Link to="/">
                        <Button className="secBTN" variant="secondary">
                          Cancel
                        </Button>
                      </Link>
                      &nbsp;
                      <Button type="submit" variant="primary" style={{ justifyContent: 'space-between',marginLeft: '10px' }}>
                        Send Otp
                      </Button>
                      
                    </div>
                  </Form>

                  <Form
                    onSubmit={verifyOtp}
                    style={{ display: flag ? "block" : "none" }}
                  >
                    <Form.Group className="mb-3" controlId="formBasicOtp">
                      <Form.Control
                        type="otp"
                        defaultCountry="IN"
                        placeholder="Enter OTP"
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </Form.Group>
                    <div className="button-right">
                      <Link to="recaptcha-container">
                        <Button className="secBTN" variant="secondary">
                          Cancel
                        </Button>
                      </Link>
                      &nbsp;
                      <Button type="submit" variant="primary" style={{marginLeft:'20px'}}>
                        Verify
                      </Button>
                      <Button
                      type="button"
                      variant="primary"
                      style={{ marginLeft: '20px' }}
                      onClick={(e) => getOtp(e, true)}
                      disabled={resendCountdown > 0}
                    >
                      Resend Otp {resendCountdown > 0 ? `(${resendCountdown})` : ""}
                    </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PhoneSignUp;