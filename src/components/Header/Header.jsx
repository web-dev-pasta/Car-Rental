import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { MdCarRental } from "react-icons/md";
import { BrowserRouter, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";

function Header() {
  const [openedMenu, setOpenedMenu] = useState(false);
  const Links = [
    "Home",
    "About",
    "Vehicle Models",
    "Testimonials",
    "Our Team",
    "Contact",
  ];
  const [scrolled, setScrolled] = useState(false);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 180) {
        setScrolled(true);
        setContact(true);
      } else {
        setScrolled(false);
        setContact(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        className={`${styles.header} ${scrolled ? styles.scrolled_header : ""}`}
      >
        <div className={`${styles.container} container`}>
          <div className={`${styles.logo}`}>
            <MdCarRental />
            <div className={`${styles.logo_text}`}>
              <p>CAR</p>
              <p>Rental</p>
            </div>
          </div>
          <div
            className={`${styles.rest_header} ${
              openedMenu ? styles.active : ""
            }`}
          >
            <div className={styles.links}>
              {Links.map((e, i) => {
                return (
                  <Link
                    to={e == "Home" ? "/" : e.toLowerCase()}
                    key={i}
                    onClick={() => setOpenedMenu(false)}
                    className={
                      e === "Contact" && contact ? styles.contact_toggle : ""
                    }
                  >
                    {e}
                  </Link>
                );
              })}
            </div>
            <div className={`${styles.member}`}>
              <p className="btn">Sign In</p>
              <p className="btn btn-red">Register</p>
            </div>
          </div>
          <div
            className={styles.burger_icon}
            onClick={() => setOpenedMenu(!openedMenu)}
          >
            {openedMenu ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Header;
