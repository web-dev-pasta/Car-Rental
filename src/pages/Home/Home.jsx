import React, { useState } from "react";
import styles from "./Home.module.css";
import { VscVerifiedFilled } from "react-icons/vsc";
import { FaArrowRight } from "react-icons/fa6";
import { FaCarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
import { RiCustomerService2Fill } from "react-icons/ri";
import { PiTireLight } from "react-icons/pi";
import { FaBusAlt } from "react-icons/fa";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import HTMLReactParser from "html-react-parser/lib/index";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "motion/react";
import { useEffect } from "react";
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";
function Home() {
  const [posts, setPosts] = useState(null);
  const [cars, setCars] = useState(null);
  const [selectedCar, setSelectedCar] = useState(1);
  const carImgs = [];

  useEffect(() => {
    fetchData();
    fetchCars();

    const handleOnline = () => {
      fetchData();
      fetchCars();
    };
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  const fetchData = async () => {
    try {
      await axios
        .get(`${import.meta.env.BASE_URL}/data/posts.json`)
        .then((res) => setPosts(res.data));
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCars = async () => {
    try {
      await axios
        .get(`${import.meta.env.BASE_URL}/data/cars.json`)
        .then((res) => setCars(res.data));
    } catch (error) {
      console.error(error);
    }
  };

  const heroData = posts?.find((e) => e.title.rendered === "Hero");
  const accordionData = posts?.find(
    (e) => e.title.rendered === "Accordion"
  ).acf;

  const carRentalOne = posts?.find((e) => {
    return e.title.rendered.startsWith("Car Rental 1");
  });
  const carRentalTwo = posts?.find((e) => {
    return e.title.rendered.startsWith("Car Rental 2");
  });
  const carRentalThree = posts?.find((e) => {
    return e.title.rendered.startsWith("Car Rental 3");
  });

  const faqs = [
    {
      answer: accordionData?.accordion_one_text,
      question: accordionData?.accordion_one_title,
    },
    {
      answer: accordionData?.accordion_two_text,
      question: accordionData?.accordion_two_title,
    },
    {
      answer: accordionData?.accordion_three_text,
      question: accordionData?.accordion_three_title,
    },
  ];
  const downloadContent = posts?.find(
    (e) => e.title.rendered === "Download Content"
  );

  // motion
  const isTablet = useMediaQuery({ maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isLessThan450 = useMediaQuery({ maxWidth: 450 });

  const parentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const boxVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.3 },
    }),
  };

  const cld = new Cloudinary({ cloud: { cloudName: "dwcxvcjrr" } });
  const car8 = cld
    .image(`v1755032605/car8_jwxrdv.png`)
    .format("auto")
    .quality("auto")
    .resize(auto().width(800));
  const faqImg = cld
    .image(`v1755032605/13_onmc6q.png`)
    .format("auto")
    .quality("auto")
    .resize(auto().width(800));
  const app = cld
    .image(`v1755032605/app_i4kfot.png`)
    .format("auto")
    .quality("auto")
    .resize(auto().width(800));
  const google = cld
    .image(`v1755032605/google-2_bfcqhd.png`)
    .format("auto")
    .quality("auto")
    .resize(auto().width(800));

  const hamada = cld
    .image(`v1755032605/hamada_hqndpf.png`)
    .format("auto")
    .quality("auto")
    .resize(auto().width(800));

  const bg = cld
    .image(`v1755032605/background_lxs2e1.png`)
    .format("auto")
    .quality("auto")
    .resize(auto().width(1210));

  const images = [
    "car11_ol2rlv.png",
    "car5_yh1ibc.png",
    "car13_xaousc.png",
    "car7_jjdriy.png",
    "car9_ldghhj.png",
    "car10_comemu.png",
  ];
  const bestImgs = [];
  const bestImages = ["10_skvrqk.png", "11_zlu230.png", "12_nbz5f9.png"];

  images.map((image) => {
    const cldImg = cld
      .image(`v1755032605/${image}`)
      .format("auto")
      .quality("auto")
      .resize(auto().width(800));
    carImgs.push(<AdvancedImage key={image} cldImg={cldImg} />);
  });
  bestImages.map((image, i) => {
    const cldImg = cld
      .image(`v1755032605/${image}`)
      .format("auto")
      .quality("auto")
      .resize(auto().width(800));
    bestImgs.push(
      <AdvancedImage
        key={image}
        cldImg={cldImg}
        className={`${i === bestImages.length - 1 ? styles.removed : ""}`}
      />
    );
  });

  return (
    <div className={styles.home}>
      <div className={`${styles.landing}`}>
        <div className={styles.bg}>
          <AdvancedImage cldImg={bg} />
        </div>

        {heroData ? (
          <div className={`${styles.container} container`}>
            <motion.div
              variants={parentVariants}
              initial="hidden"
              animate="show"
              className={`${styles.text}`}
            >
              <motion.p variants={childVariants} className={styles.plan}>
                {heroData.acf.plans}
              </motion.p>
              <motion.h1 variants={childVariants}>
                {HTMLReactParser(heroData.acf.hero_title)}
              </motion.h1>
              <motion.p variants={childVariants} className={styles.desc}>
                {heroData.acf.hero_description}
              </motion.p>
              <motion.div variants={childVariants} className={styles.ride}>
                <p className="btn btn-red">
                  {heroData.acf.first_button_text} <VscVerifiedFilled />
                </p>
                <p
                  className="btn btn-black"
                  onClick={() =>
                    document
                      .getElementById("book")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {heroData.acf.second_button_text} <FaArrowRight />
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={
                isTablet ? { delay: 0 } : { delay: 0.7, duration: 0.5 }
              }
              className={styles.image}
            >
              <AdvancedImage cldImg={car8} />
            </motion.div>
          </div>
        ) : (
          <SkeletonTheme baseColor="#ecececff" highlightColor="#dcdbdbff">
            <div
              className={`${styles.container} container d-flex ${
                isMobile ? "text-center" : ""
              }`}
              style={{ gap: `100px` }}
            >
              <div
                className={`${styles.text} ${isTablet ? "align-self-start" : ""}
                ${isMobile ? "align-self-center" : ""}`}
              >
                <Skeleton
                  width={200}
                  height={20}
                  style={{ marginBottom: 20 }}
                  className="text-center"
                />
                <Skeleton
                  width="80%"
                  height={25}
                  style={{ marginBottom: 10 }}
                  className="text-center"
                />
                <Skeleton
                  width="40%"
                  height={25}
                  style={{ marginBottom: 50 }}
                  className="text-center"
                />
                <Skeleton width={"75%"} style={{ marginBottom: 5 }} />
                <Skeleton width={"50%"} style={{ marginBottom: 10 }} />

                <div className={styles.ride}>
                  <Skeleton
                    width={120}
                    height={40}
                    style={{ marginRight: 10 }}
                  />
                  <Skeleton width={120} height={40} />
                </div>
              </div>
              <div className={styles.image}>
                <Skeleton
                  width={isLessThan450 ? 200 : 400}
                  height={isLessThan450 ? 200 : 300}
                />
              </div>
            </div>
          </SkeletonTheme>
        )}
      </div>
      <div className={styles.book}>
        <div className={styles.abs_id} id="book"></div>
        <div className={`${styles.container} container`}>
          <p>Book a car</p>
          <div className={styles.grid}>
            <div className={styles.div_item}>
              <p>
                <FaCarAlt /> Select Your Car Type
              </p>
              <input type="text" placeholder="Select your car type" />
            </div>
            <div className={styles.div_item}>
              <p>
                <FaLocationDot /> Pick-up
              </p>
              <input type="text" placeholder="Select pick up location" />
            </div>
            <div className={styles.div_item}>
              <p>
                <FaLocationDot /> Drop-of
              </p>
              <input type="text" placeholder="Select drop off location" />
            </div>
            <div className={styles.div_item}>
              <p>
                <FaRegCalendarCheck /> Pick-up
              </p>
              <input type="date" />
            </div>
            <div className={styles.div_item}>
              <p>
                <FaRegCalendarCheck /> Drop-of
              </p>
              <input type="date" />
            </div>
            <p className="btn btn-red">Search</p>
          </div>
        </div>
      </div>
      <div className={styles.plan}>
        <p>Plan your trip now</p>
        <p>Quick & easy car rental</p>
        {carRentalOne ? (
          <div className={`${styles.container} container`}>
            {carRentalOne && (
              <motion.div
                className={styles.box}
                custom={0}
                variants={boxVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className={styles.image}>
                  <IoCarSportOutline />
                </div>
                <div className={styles.text}>
                  <p>{carRentalOne.acf.title}</p>
                  <p>{carRentalOne.acf.description}</p>
                </div>
              </motion.div>
            )}

            {carRentalTwo && (
              <motion.div
                className={styles.box}
                custom={1}
                variants={boxVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className={styles.image}>
                  <RiCustomerService2Fill />
                </div>
                <div className={styles.text}>
                  <p>{carRentalTwo.acf.title}</p>
                  <p>{carRentalTwo.acf.description}</p>
                </div>
              </motion.div>
            )}

            {carRentalThree && (
              <motion.div
                className={styles.box}
                custom={2}
                variants={boxVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className={styles.image}>
                  <PiTireLight />
                </div>
                <div className={styles.text}>
                  <p>{carRentalThree.acf.title}</p>
                  <p>{carRentalThree.acf.description}</p>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <img
            src={`${import.meta.env.BASE_URL}/assets/load.gif`}
            style={{ marginInline: `auto` }}
            alt=""
          />
        )}
      </div>
      <div className={styles.models}>
        <p>Vechile Models</p>
        <p>Our rental fleet</p>
        <p>
          Choose from a variety of our amazing vehicles to rent for your next
          adventure or business trip
        </p>
        {cars ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className={`${styles.container} container`}
          >
            <div className={styles.car_names}>
              {cars.map(({ meta: { name: name } }, i) => {
                return (
                  <p
                    key={i}
                    className={`${i === selectedCar ? `${styles.active}` : ""}`}
                    onClick={() => setSelectedCar(i)}
                  >
                    {name}
                  </p>
                );
              })}
            </div>
            <motion.div
              key={selectedCar}
              initial={{ opacity: 0.25, y: 5, x: -2 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.4 }}
              className={styles.car_image}
            >
              {carImgs[selectedCar]}
            </motion.div>

            <div className={styles.car_data}>
              <div className={styles.header}>
                <p>
                  <span>{cars[selectedCar].meta.price_per_day}</span> /rent per
                  day
                </p>
              </div>
              <div className={`${styles.data} ${styles.first}`}>
                <p>Model</p>
                <p>{cars[selectedCar].meta.model}</p>
              </div>
              <div className={styles.data}>
                <p>Mark</p>
                <p>{cars[selectedCar].meta.mark}</p>
              </div>
              <div className={styles.data}>
                <p>Year</p>
                <p>{cars[selectedCar].meta.year}</p>
              </div>
              <div className={styles.data}>
                <p>Doors</p>
                <p>{cars[selectedCar].meta.doors}</p>
              </div>
              <div className={styles.data}>
                <p>AC</p>
                <p>{cars[selectedCar].meta.ac}</p>
              </div>
              <div className={styles.data}>
                <p>Transmission</p>
                <p>{cars[selectedCar].meta.transmission}</p>
              </div>
              <div className={`${styles.data} ${styles.last}`}>
                <p>Fuel</p>
                <p>{cars[selectedCar].meta.fuel}</p>
              </div>
              <div className={styles.reserve}>
                <p>RESERVE NOW</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <img
            src={`${import.meta.env.BASE_URL}/assets/load.gif`}
            style={{ marginInline: `auto` }}
            alt=""
          />
        )}
      </div>
      <div className={styles.savings}>
        <p>Save big with our cheap car rental!</p>
        <p>
          Top Airports. Local Suppliers. <span>24/7</span> Support
        </p>
      </div>
      <div className={styles.best}>
        <div className={`${styles.container} container`}>
          <div className={styles.images}>{bestImgs.map((e, i) => e)}</div>
          <div className={styles.choose_container}>
            <div className={styles.choose}>
              <p>Why Choose Us</p>
              <p>Best valued deals you will ever find</p>
              <p>
                Discover the best deals you'll ever find with our unbeatable
                offers.
                <br />
                We're dedicated to providing you with the best value for your
                <br /> money, so you can enjoy top-quality services and products
                without
                <br /> breaking the bank. Our deals are designed to give you the
                ultimate
                <br />
                renting experience, so don't miss out on your chance to save
                big.
              </p>
              <p className="btn btn-red">
                Find Details <FaArrowRight />
              </p>
            </div>
            <div className={styles.details}>
              <div className={styles.box}>
                <div className={styles.image}>
                  <FaBusAlt />
                </div>
                <div className={styles.text}>
                  <p>Cross Country Drive</p>
                  <p>
                    Take your driving experience to the next level with our
                    top-notch vehicles for your cross-country adventures.
                  </p>
                </div>
              </div>
              <div className={styles.box}>
                <div className={styles.image}>
                  <FaRegMoneyBill1 />
                </div>
                <div className={styles.text}>
                  <p>All Inclusive Pricing</p>
                  <p>
                    Get everything you need in one convenient. transparent price
                    with our all-inclusive pricing policy
                  </p>
                </div>
              </div>
              <div className={styles.box}>
                <div className={styles.image}>
                  <GiReceiveMoney />
                </div>
                <div className={styles.text}>
                  <p>No Hidden Charges</p>
                  <p>
                    Enjoy peace of mind with our no hidden charges policy. We
                    believe in transparent and honest pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.testimonials}>
        <p>Reviewed by People</p>
        <p>Client's Testimonials</p>
        <p>
          Discover the positive impact we've made on our clients by reading
          through their testimonials. Our clients have experienced our service
          and results. And they're eager to share their positive experiences
          with you.
        </p>
        <div className={`${styles.container} container`}>
          <div className={styles.parry}>
            <div className={styles.text}>
              <p>
                &quot;We rented a car from this website and had an amazing
                experience! The booking was easy and the rental rates were very
                affordable. &quot;
              </p>
            </div>
            <div className={styles.personal_data}>
              <div className={styles.user}>
                <img
                  src="https://randomuser.me/api/portraits/women/11.jpg"
                  alt=""
                />
                <div className={styles.name}>
                  <p>Parry Hotter</p>
                  <p>Belgrade.</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.ron}>
            <div className={styles.text}>
              <p>
                &quot;The car was in great condition and made our trip even
                better. Highly recomment for this car rental website!&quot;
              </p>
            </div>
            <div className={styles.personal_data}>
              <div className={styles.user}>
                <img
                  src="https://randomuser.me/api/portraits/men/7.jpg"
                  alt=""
                />
                <div className={styles.name}>
                  <p>Ron Rizzly</p>
                  <p>Navi Sad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.faq}>
        <div className={styles.bg_img}>
          <AdvancedImage cldImg={faqImg} />
        </div>
        <div className={styles.text}>
          <p>FAQ</p>
          <p>Frequently Asked Questions</p>
          <p>
            Frequently Asked Questions About the Car Renta Bokking Process on
            Our Website: Answers to Common Concerns and Inquiries.
          </p>
          {accordionData ? (
            <div
              className={`accordion container ${styles.container}`}
              id="accordion"
            >
              {faqs.map(({ question, answer }, index) => {
                return (
                  <div key={index} className="accordion-item">
                    <h2 className="accordion-header" id={`heading${index}`}>
                      <button
                        className={`accordion-button ${
                          index !== 0 ? "collapsed" : ""
                        }`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`}
                        aria-expanded="true"
                        aria-controls={`collapse${index}`}
                      >
                        {question}
                      </button>
                    </h2>
                    <div
                      id={`collapse${index}`}
                      className={`accordion-collapse collapse ${
                        index === 0 ? "show" : ""
                      }`}
                      data-bs-parent="#accordion"
                    >
                      <div className="accordion-body">{answer}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <img
              src={`${import.meta.env.BASE_URL}/assets/load.gif`}
              style={{ marginInline: `auto` }}
              alt=""
            />
          )}
        </div>
      </div>
      <div className={styles.download}>
        {downloadContent ? (
          <div className={`${styles.container} container`}>
            <div className={styles.text}>
              <p className={styles.head}>{downloadContent.acf.header}</p>
              <p className={styles.desc}>{downloadContent.acf.description}</p>
              <div className={styles.images}>
                <div className={styles.img_wrapper}>
                  <AdvancedImage cldImg={app} />
                </div>
                <div className={styles.img_wrapper}>
                  <AdvancedImage cldImg={google} />
                </div>
              </div>
            </div>

            <div className={styles.img}>
              <AdvancedImage cldImg={hamada} />
            </div>
          </div>
        ) : (
          <img
            src={`${import.meta.env.BASE_URL}/assets/load.gif`}
            style={{ marginInline: `auto` }}
            alt=""
          />
        )}
      </div>
      <div className={styles.footer}>
        <div className={`${styles.container} container`}>
          <div className={`${styles.box} `}>
            <p>
              <span className={`${styles.bold}`}>CAR</span> Rental
            </p>
            <p className={styles.desc}>
              We offer a big range of vehicles for all your driving needs. We
              have the perfect car to meet your needs.
            </p>
            <div className={styles.contact}>
              <p>
                <FaPhone /> (123)-456-789
              </p>
              <p>
                <IoMdMail /> carrental@gmail.com
              </p>
            </div>
          </div>
          <div
            className={`${styles.box} d-flex align-items-center flex-column`}
          >
            <p className={`${styles.bold}`}>FIND US HERE</p>
            <img
              src={`${import.meta.env.BASE_URL}/assets/qr.png`}
              style={{ width: `200px` }}
              alt=""
            />
          </div>
          <div className={styles.box}>
            <p className={`${styles.bold}`}>WORKING HOURS</p>
            <p>Mon - Fri: 9:00AM - 9:00PM</p>
            <p>Sat: 9:00AM - 19:00PM</p>
            <p>Sum: Closed</p>
          </div>

          <div className={styles.box}>
            <p className={`${styles.bold}`}>SUBSCRIPTION</p>
            <p>Subscribe your Email address for latest news & updates.</p>
            <div className={styles.contact}>
              <div className={styles.input_wrapper}>
                <input type="text" placeholder="Enter your email" />
              </div>
              <button className="btn btn-red">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
