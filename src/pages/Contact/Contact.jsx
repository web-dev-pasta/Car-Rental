import { useState, useRef } from "react";
import styles from "./Contact.module.css";
import emailjs from "@emailjs/browser";
import { motion } from "motion/react";

import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";
function Contact() {
  const form = useRef();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    message: "",
  });
  const validate = (e) => {
    let newErrors = {};

    const nameRegex = /^[A-Za-z\u0600-\u06FF]+$/;
    if (!formData.first_name) {
      newErrors.first_name = "First name is required";
    } else if (formData.first_name.trim().split(" ").length > 1) {
      newErrors.first_name = "First name must be only one word";
    } else if (!nameRegex.test(formData.first_name.trim())) {
      newErrors.first_name = "First name must contain only letters";
    }

    if (!formData.last_name) {
      newErrors.last_name = "Last name is required";
    } else if (formData.last_name.trim().split(" ").length > 1) {
      newErrors.last_name = "Last name must be only one word";
    } else if (!nameRegex.test(formData.last_name.trim())) {
      newErrors.last_name = "Last name must contain only letters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.message) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const sendEmail = (e) => {
    e.preventDefault();
    if (validate()) {
      emailjs.sendForm("service_2fdo74i", "template_6gh229r", form.current, {
        publicKey: "MVsnAatD8wzKw7dib",
      });
      window.alert("Message Sent Successfully!");
      clearData();
    }
  };
  function clearData() {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      message: "",
    });
  }
  const cld = new Cloudinary({ cloud: { cloudName: "dwcxvcjrr" } });

  const whatsApp = cld
    .image(`v1755446064/whatsapp_lwgxbm.png`)
    .format("auto")
    .quality("auto")
    .resize(auto().width(50));
  const to = "omarn9397@gmail.com";
  const subject = "Car Rental";
  const body = `Hello, Iam ${formData.first_name} ${formData.last_name}\nMy Email Is : ${formData.email}\nMy Message Is : ${formData.message}`;

  const gmailWeb = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    to
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const mailto = `mailto:${to}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const emailLink = isMobile ? mailto : gmailWeb;

  return (
    <motion.div
      className="contact"
      initial={{ opacity: 0.5, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0">
              <div className="card-body p-4 p-md-5">
                <form ref={form} onSubmit={sendEmail} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.first_name ? "is-invalid" : ""
                        }`}
                        id="firstName"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="John"
                      />
                      {errors.first_name && (
                        <div className="invalid-feedback">
                          {errors.first_name}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.last_name ? "is-invalid" : ""
                        }`}
                        id="lastName"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Doe"
                      />
                      {errors.last_name && (
                        <div className="invalid-feedback">
                          {errors.last_name}
                        </div>
                      )}
                    </div>

                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>

                    <div className="col-12">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        className={`form-control ${
                          errors.message ? "is-invalid" : ""
                        } ${styles.text_area}`}
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter Message Here"
                      ></textarea>
                      {errors.message && (
                        <div className="invalid-feedback">{errors.message}</div>
                      )}
                    </div>

                    <div className="col-12 d-flex flex-column flex-md-row gap-3">
                      <button type="submit" className="btn btn-red flex-fill">
                        Submit Via EmailJS
                      </button>
                      <a
                        href={emailLink}
                        target="_blank"
                        rel="noopener"
                        className="btn btn-black flex-fill"
                        onClick={(e) => {
                          e.preventDefault();
                          if (validate(e)) {
                            clearData();
                            window.open(emailLink, "_blank");
                          }
                        }}
                      >
                        Submit Via Gmail
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <p className="d-flex gap-3 align-items-center justify-content-center">
          Or Reach Us Via Whatsapp
          <a
            key="whatsapp-btn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            href="https://wa.me/201015843556?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%2C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A5%D9%8A%D8%AC%D8%A7%D8%B1%20%D8%B3%D9%8A%D8%A7%D8%B1%D8%A9%20%D8%AC%D8%AF%D9%8A%D8%AF%D8%A9%21"
            target="_blank"
          >
            <AdvancedImage className={styles.whatsApp} cldImg={whatsApp} alt="whatsapp_icon"/>
          </a>
        </p>
      </div>
    </motion.div>
  );
}

export default Contact;
