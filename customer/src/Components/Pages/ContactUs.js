import React from "react";
// import Hero from "../containers/Hero";
import axios from "axios";
import * as emailjs from "emailjs-com";
import Loc from "../../img/location.png";
import Iframe from "react-iframe";

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
  };

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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
      <div className="ContactUsMain">
        <div>
          <div class="container text-white pt-3" id="contactForm">
            <h2 className="ContactUsTitle">Have some suggestions?</h2>
            <h4 className="ContactUsSubTitle">Send us your feedback</h4>
            <div className="full-width-row cta-form--bg">
              <div className="row-container">
                <div class="needs-validation">
                  <input
                    className="form-control"
                    placeholder="Enter Name"
                    name="name"
                    value={this.state.name}
                    onChange={(e) => this.change(e)}
                    type="text"
                    id="name"
                    required
                  />
                  <p className="form-error">{this.state.nameError}</p>
                  <input
                    className="form-control"
                    placeholder="Enter Email"
                    name="email"
                    value={this.state.email}
                    onChange={(e) => this.change(e)}
                    type="text"
                    id="email"
                    required
                  />
                  <p className="form-error">{this.state.emailError}</p>
                  <input
                    className="form-control"
                    placeholder="Subject"
                    name="subject"
                    value={this.state.subject}
                    onChange={(e) => this.change(e)}
                    type="text"
                    id="subject"
                    required
                  />
                  <p className="form-error">{this.state.subjectError}</p>
                  <textarea
                    className="form-control"
                    placeholder="Your feedback message"
                    name="message"
                    onChange={(e) => this.change(e)}
                    value={this.state.message}
                    id="message"
                    required
                  />
                  <p className="form-error">{this.state.messageError}</p>
                  <button
                    id="ContactUsSubmit"
                    class="btn btn-light"
                    type="button"
                    style={{ position: "relative", right: "-320px" }}
                    onClick={(e) => this.onSubmit(e)}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div id="ContactUsMessageBox" class="container bg-dark text-white pt-3">
          <div id="ContactUsContacts" className="footer-section contact-form">
            <h3>Contact</h3>
            <div className="ContactUsIcons">
              <a href="https://www.facebook.com/smoke.and.grill.modeltown.lahore">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
            <div>
              <i id="ContactUsPhone" className="fa fa-phone"></i>
              <span>+92 311 7210000</span>
            </div>
            <div>
              <i id="ContactUsPhone" class="fa fa-envelope"></i>
              <span>
                <a
                  className="ContactUsMail"
                  href="mailto:smokeandgrill123@gmail.com"
                >
                  smokeandgrill123@gmail.com
                </a>
              </span>
            </div>
            <div style={{ width: "100%", height: "500px" }}>
              <Iframe
                url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.5806055763965!2d74.30882415113054!3d31.480721156156484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903ef7eaa6e75%3A0x12c224a40a628cf1!2sSmoke%20%26%20Grill!5e0!3m2!1sen!2s!4v1588707825977!5m2!1sen!2s"
                width="100%"
                height="100%"
                id="myId"
                className="myClassname"
                display="final"
                position="relative"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/*style={{
                      width: "400px",
                      borderRadius: "8px",
                      margin: `${
                        this.state.messageError.length > 0 ? "0" : ""
                      }`
                    }}*/
