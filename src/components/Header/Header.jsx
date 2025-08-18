import React, { useState, useEffect, useMemo } from "react";
import styles from "./Header.module.css";
import { MdCarRental } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";

function Header() {
  const [openedMenu, setOpenedMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const Links = [
    "Home",
    "About",
    "Vehicle Models",
    "Testimonials",
    "Our Team",
    "Contact",
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 180;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderedLinks = useMemo(() => {
    return Links.map((e, i) => (
      <Link
        to={e === "Home" ? "/" : e.toLowerCase()}
        key={i}
        onClick={() => setOpenedMenu(false)}
        className={e === "Contact" && scrolled ? styles.contact_toggle : ""}
      >
        {e}
      </Link>
    ));
  }, [scrolled, openedMenu]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        className={`${styles.header} ${scrolled ? styles.scrolled_header : ""}`}
      >
        <div className={`${styles.container} container`}>
          <div className={styles.logo}>
            <MdCarRental />
            <div className={styles.logo_text}>
              <p>CAR</p>
              <p>Rental</p>
            </div>
          </div>

          <div
            className={`${styles.rest_header} ${
              openedMenu ? styles.active : ""
            }`}
          >
            <div className={styles.links}>{renderedLinks}</div>
            <div className={styles.member}>
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
