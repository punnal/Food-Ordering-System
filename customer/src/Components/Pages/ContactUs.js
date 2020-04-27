import React from "react";
// import Hero from "../containers/Hero";
import axios from "axios";
import Modal from "react-modal";
import Logo from "../../img/phone123.png";
import Logo2 from "../../img/email.png";
import * as emailjs from "emailjs-com";
Modal.setAppElement("div");

export default class Contact extends React.Component {
  state = {
    name: "",
    nameError: "",
    email: "",
    emailError: "",
    subject: "",
    subjectError: "",
    message: "",
    messageError: "",

    resData: "",

    modalIsOpen: false,
  };

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.name === "") {
      this.setState({
        nameError: "Please provide your name",
      });
    } else {
      this.setState({
        nameError: "",
      });
    }

    if (this.state.email === "") {
      this.setState({
        emailError: "Please provide an email address",
      });
    } else if (
      this.state.email === /^((?!@).)*$/ ||
      this.state.email.indexOf(".") === -1
    ) {
      this.setState({
        emailError: "Please provide a valid email address",
      });
    } else {
      this.setState({
        emailError: "",
      });
    }

    if (this.state.subject === "") {
      this.setState({
        subjectError: "Please provide a subject message",
      });
    } else {
      this.setState({
        subjectError: "",
      });
    }

    if (this.state.message === "") {
      this.setState({
        messageError: "Please leave a message",
      });
    } else {
      this.setState({
        messageError: "",
      });
    }

    setTimeout(() => {
      if (
        this.state.nameError === "" &&
        this.state.emailError === "" &&
        this.state.subjectError === "" &&
        this.state.messageError === ""
      ) {
        console.log(this.state.email, this.state.subject, this.state.message);
        let templateParams = {
          from_name: this.state.name,
          to_name: "Smoke&Grill",
          subject: this.state.subject,
          message_html: this.state.message,
          reply_to: this.state.email,
        };
        this.reset();

        emailjs
          .send(
            "gmail",
            "template_xW1eQQP8",
            templateParams,
            "user_lSnETOUHOBrk3eU8KOgWt"
          )
          .then(
            function (response) {
              console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
              console.log("FAILED...", error);
            }
          );
        // axios
        //   .post(
        //     "/send-email",
        //     {
        //       name: this.state.name,
        //       email: this.state.email,
        //       subject: this.state.subject,
        //       message: this.state.message,
        //     },
        //     {
        //       headers: {
        //         "content-type": "application/json",
        //       },
        //     }
        //   )
        //   .then((response) => {
        //     this.setState({
        //       resData: response.data,
        //     });
        //     this.setState({
        //       modalIsOpen: true,
        //     });
        //     this.setState({
        //       name: "",
        //       email: "",
        //       subject: "",
        //       message: "",
        //     });
        //   })
        //   .catch(function (error) {
        //     console.log(error.response);
        //   });
      } else {
        this.setState({
          resData: "Oops! Something went wrong!",
        });
      }
    }, 10);
  };

  reset = () => {
    this.state.name = "";
    this.state.email = "";
    this.state.message = "";
    this.state.subject = "";
    this.setState({
      name: "",
      email: "",
      message: "",
      subject: "",
    });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flex: "1",
        }}
      >
        <div>
          <div
            id="contactForm"
            style={{
              position: "relative",
              bottom: "-100px",
              right: "-100px",
              color: "White",
              border: "solid black 5px",
              borderRadius: "25px",
              backgroundColor: "grey",
              padding: "50px",
            }}
          >
            <div className="full-width-row cta-form--bg">
              <div className="row-container">
                <form className="cta-form">
                  <label className="cta-form__label" htmlFor="name">
                    <h4>Name: &nbsp;</h4>
                  </label>
                  <input
                    name="name"
                    value={this.state.name}
                    onChange={(e) => this.change(e)}
                    type="text"
                    className="cta-form__input"
                    id="name"
                    style={{
                      margin: `${this.state.nameError.length > 0 ? "0" : ""}`,
                    }}
                  />
                  <p className="form-error">{this.state.nameError}</p>
                  <label className="cta-form__label" htmlFor="email">
                    <h4>Email: &nbsp;</h4>
                  </label>
                  <input
                    name="email"
                    value={this.state.email}
                    onChange={(e) => this.change(e)}
                    type="text"
                    className="cta-form__input"
                    id="email"
                    style={{
                      margin: `${this.state.emailError.length > 0 ? "0" : ""}`,
                    }}
                  />
                  <p className="form-error">{this.state.emailError}</p>
                  <label className="cta-form__label" htmlFor="subject">
                    <h4>Subject: &nbsp;</h4>
                  </label>
                  <input
                    name="subject"
                    value={this.state.subject}
                    onChange={(e) => this.change(e)}
                    type="text"
                    className="cta-form__input"
                    id="subject"
                    style={{
                      margin: `${
                        this.state.subjectError.length > 0 ? "0" : ""
                      }`,
                    }}
                  />
                  <p className="form-error">{this.state.subjectError}</p>
                  <label className="cta-form__label" htmlFor="message">
                    <h4>Message: &nbsp;</h4>
                  </label>
                  <textarea
                    name="message"
                    onChange={(e) => this.change(e)}
                    value={this.state.message}
                    className="cta-form__textarea"
                    id="message"
                    style={{
                      margin: `${
                        this.state.messageError.length > 0 ? "0" : ""
                      }`,
                    }}
                  />
                  <p className="form-error">{this.state.messageError}</p>
                  <button
                    type="button"
                    style={{
                      backgroundColor: "Red",
                      width: "80px",
                      borderRadius: "8px",
                    }}
                    onClick={(e) => this.onSubmit(e)}
                  >
                    <h3 style={{ color: "white" }}>Send</h3>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            position: "relative",
            bottom: "-100px",
            right: "-200px",
            height: "600px",
            width: "1000px",
            color: "White",
            border: "solid black 5px",
            borderRadius: "25px",
            backgroundColor: "lightgrey",
            padding: "50px",
          }}
        >
          <h1
            style={{
              color: "purple",
              textAlignLast: "start",
              fontSize: "80px",
            }}
          >
            Don't Be a Stranger
          </h1>
          <h1
            style={{ color: "purple", textAlignLast: "end", fontSize: "100px" }}
          >
            Say Hello
          </h1>
          <h1
            style={{ color: "purple", textAlignLast: "end", fontSize: "50px" }}
          >
            ----Leave a message for us----
          </h1>
          <hr></hr> <br></br>
          <div className="footer-section contact-form">
            <span>
              <h3>Contact</h3>
              <img src={Logo} height="25" width="25" />
              &nbsp; 123-456-789 &nbsp;&nbsp;
              <img src={Logo2} height="25" width="25" />
              &nbsp; SMOKE&GRILL@somewhere.com
              <p>ADDRESS: MODEL TOWN</p>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
