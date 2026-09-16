"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [selectedProjectImage, setSelectedProjectImage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const snapshot = await getDocs(collection(db, "properties"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProperties(data);
      } catch (error) {
        console.error("Error loading properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const getMediaUrl = (media) => {
    if (!media) return null;

    if (typeof media === "string") {
      return media;
    }

    return media.url || null;
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  return (
    <main style={styles.page}>

      {/* =========================
          NAVBAR
      ========================= */}
      <nav style={styles.navbar}>

        <div style={styles.logo}>
          <img
            src="/logo.jpg"
            alt="Rigour Estate & Construction"
            style={styles.logoImage}
          />

          <div style={styles.logoText}>
            RIGOUR
            <br />
            <span>ESTATE & CONSTRUCTION</span>
          </div>
        </div>

        <div
          className="navLinksResponsive"
          style={styles.navLinks}
        >
          <a
            href="#home"
            style={styles.navLink}
            onClick={closeMobileMenu}
          >
            Home
          </a>

          <a
            href="#about"
            style={styles.navLink}
            onClick={closeMobileMenu}
          >
            About
          </a>

          <a
            href="#services"
            style={styles.navLink}
            onClick={closeMobileMenu}
          >
            Services
          </a>

          <a
            href="#projects"
            style={styles.navLink}
            onClick={closeMobileMenu}
          >
            Projects
          </a>

          <a
            href="#properties"
            style={styles.navLink}
            onClick={closeMobileMenu}
          >
            Properties
          </a>

          <a
            href="#contact"
            style={styles.navLink}
            onClick={closeMobileMenu}
          >
            Contact
          </a>
        </div>

        <button
          className="menuButtonResponsive"
          onClick={() => setMenuOpen(!menuOpen)}
          style={styles.menuButton}
          aria-label="Open navigation menu"
        >
          ☰
        </button>
      </nav>

      {menuOpen && (
        <div
          className="mobileMenuResponsive"
          style={styles.mobileMenu}
        >
          <a
            href="#home"
            style={styles.mobileLink}
            onClick={closeMobileMenu}
          >
            Home
          </a>

          <a
            href="#about"
            style={styles.mobileLink}
            onClick={closeMobileMenu}
          >
            About
          </a>

          <a
            href="#services"
            style={styles.mobileLink}
            onClick={closeMobileMenu}
          >
            Services
          </a>

          <a
            href="#projects"
            style={styles.mobileLink}
            onClick={closeMobileMenu}
          >
            Projects
          </a>

          <a
            href="#properties"
            style={styles.mobileLink}
            onClick={closeMobileMenu}
          >
            Properties
          </a>

          <a
            href="#contact"
            style={styles.mobileLink}
            onClick={closeMobileMenu}
          >
            Contact
          </a>
        </div>
      )}

      {/* =========================
          HERO
      ========================= */}
      <section id="home" style={styles.hero}>

        <div style={styles.heroContent}>

          <p style={styles.heroBrand}>
            RIGOUR ESTATE & CONSTRUCTION
          </p>

          <h1 style={styles.heroTitle}>
            Building Legacies,
            <br />
            One Brick at a Time.
          </h1>

          <p style={styles.heroText}>
            Building quality spaces, developing valuable properties,
            and creating lasting legacies.
          </p>

          <div style={styles.heroButtons}>

            <a
              href="#contact"
              style={styles.primaryButton}
            >
              Contact Us
            </a>

            <a
              href="#about"
              style={styles.secondaryButton}
            >
              Learn More
            </a>

          </div>

        </div>
      </section>

      {/* =========================
          INTRODUCTION
      ========================= */}
      <section id="about" style={styles.about}>

        <div style={styles.aboutContainer}>

          <p style={styles.sectionLabel}>
            WHO WE ARE
          </p>

          <h2 style={styles.sectionTitle}>
            Rigour Estate & Construction
          </h2>

          <p style={styles.sectionText}>
            Rigour Estate & Construction is a real estate and
            construction company committed to delivering quality
            properties, reliable construction services, and
            practical property solutions.
          </p>

          <p style={styles.sectionText}>
            From property development and land acquisition to
            construction, renovation, and property solutions,
            we focus on quality, precision, and reliability in
            every project we undertake.
          </p>

          <div
            className="valuesRowResponsive"
            style={styles.valuesRow}
          >

            <div style={styles.valueCard}>
              <h3 style={styles.valueTitle}>
                Quality
              </h3>

              <p>
                We are committed to delivering work that meets
                high standards.
              </p>
            </div>

            <div style={styles.valueCard}>
              <h3 style={styles.valueTitle}>
                Precision
              </h3>

              <p>
                We pay attention to the details that make every
                project successful.
              </p>
            </div>

            <div style={styles.valueCard}>
              <h3 style={styles.valueTitle}>
                Reliability
              </h3>

              <p>
                We work to build trust through dependable service
                and professional results.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================
          WHAT WE DO BEST
      ========================= */}
      <section style={styles.whatWeDo}>

        <div style={styles.aboutContainer}>

          <p style={styles.sectionLabel}>
            WHAT WE DO BEST
          </p>

          <h2 style={styles.sectionTitle}>
            Property & Construction Solutions
          </h2>

        </div>

        <div
          className="cardGridResponsive"
          style={styles.cardGrid}
        >

          <div style={styles.imageCard}>
            <img
              src="/images/buy-home.jpg"
              alt="Buy a home with Rigour Estate & Construction"
              style={styles.cardImage}
            />

            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>
                Buy a Home
              </h3>

              <p>
                Find a property that suits your needs and
                investment goals.
              </p>
            </div>
          </div>

          <div style={styles.imageCard}>
            <img
              src="/images/rent-property.jpg"
              alt="Rent a property"
              style={styles.cardImage}
            />

            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>
                Rent a Property
              </h3>

              <p>
                Explore available properties for comfortable
                living and business needs.
              </p>
            </div>
          </div>

          <div style={styles.imageCard}>
            <img
              src="/images/buy-land.jpg"
              alt="Buy land"
              style={styles.cardImage}
            />

            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>
                Buy Land
              </h3>

              <p>
                Secure land for your future development or
                investment.
              </p>
            </div>
          </div>

          <div style={styles.imageCard}>
            <img
              src="/images/build-house.jpg"
              alt="Build a house"
              style={styles.cardImage}
            />

            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>
                Build a House
              </h3>

              <p>
                Turn your construction vision into a quality
                finished project.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================
          SERVICES
      ========================= */}
      <section id="services" style={styles.services}>

        <div style={styles.aboutContainer}>

          <p style={styles.sectionLabel}>
            OUR SERVICES
          </p>

          <h2 style={styles.sectionTitleWhite}>
            Professional Services
          </h2>

        </div>

        <div
          className="servicesGridResponsive"
          style={styles.servicesGrid}
        >

          <div style={styles.serviceCard}>
            <h3 style={styles.serviceTitle}>
              Building Construction
            </h3>

            <p>
              Professional construction services focused on
              quality workmanship and reliable delivery.
            </p>
          </div>

          <div style={styles.serviceCard}>
            <h3 style={styles.serviceTitle}>
              Estate Development
            </h3>

            <p>
              Property development solutions designed to create
              valuable and functional spaces.
            </p>
          </div>

          <div style={styles.serviceCard}>
            <h3 style={styles.serviceTitle}>
              Renovation & Remodeling
            </h3>

            <p>
              Transform existing spaces through professional
              renovation and remodeling services.
            </p>
          </div>

        </div>
      </section>

      {/* =========================
          FUTURE PROJECTS
      ========================= */}
      <section id="projects" style={styles.projects}>

        <div style={styles.projectsContainer}>

          <p style={styles.sectionLabel}>
            OUR WORK
          </p>

          <h2 style={styles.sectionTitle}>
            Featured Projects
          </h2>

          <p style={styles.projectIntro}>
            Quality, precision, and professionalism in every
            project.
          </p>

          <div
            className="projectsGridResponsive"
            style={styles.projectsGrid}
          >

            <div
              style={styles.projectCard}
              onClick={() =>
                setSelectedProjectImage("/images/project1.jpg")
              }
            >
              <img
                src="/images/project1.jpg"
                alt="Rigour Estate & Construction project"
                style={styles.projectImage}
              />

              <div style={styles.projectText}>
                Quality Construction
              </div>
            </div>

            <div
              style={styles.projectCard}
              onClick={() =>
                setSelectedProjectImage("/images/project2.jpg")
              }
            >
              <img
                src="/images/project2.jpg"
                alt="Rigour Estate & Construction project"
                style={styles.projectImage}
              />

              <div style={styles.projectText}>
                Modern Development
              </div>
            </div>

            <div
              style={styles.projectCard}
              onClick={() =>
                setSelectedProjectImage("/images/project3.jpg")
              }
            >
              <img
                src="/images/project3.jpg"
                alt="Rigour Estate & Construction project"
                style={styles.projectImage}
              />

              <div style={styles.projectText}>
                Property Development
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================
          FEATURED PROPERTIES
      ========================= */}
      <section id="properties" style={styles.properties}>

        <div style={styles.aboutContainer}>

          <p style={styles.sectionLabel}>
            AVAILABLE PROPERTIES
          </p>

          <h2 style={styles.sectionTitle}>
            Featured Properties
          </h2>

          <p style={styles.sectionText}>
            Explore some of our available properties.
          </p>

        </div>

        {properties.length > 0 ? (
          <div
            className="propertyViewportResponsive"
            style={styles.propertyViewport}
          >

            <div className="property-track">

              {[...properties, ...properties].map(
                (property, index) => {

                  const firstImage =
                    property.images &&
                    property.images.length > 0
                      ? getMediaUrl(property.images[0])
                      : null;

                  return (
                    <div
                      key={`${property.id}-${index}`}
                      className="propertyCardResponsive"
                      style={styles.propertyCard}
                    >

                      {firstImage && (
                        <img
                          src={firstImage}
                          alt={`${property.name || "Property"} - ${
                            property.location || "Cameroon"
                          }`}
                          style={styles.propertyImage}
                        />
                      )}

                      {property.videos &&
                        property.videos.length > 0 && (
                          <div>
                            {property.videos.map(
                              (video, videoIndex) => {

                                const videoUrl =
                                  getMediaUrl(video);

                                return videoUrl ? (
                                  <video
                                    key={videoIndex}
                                    src={videoUrl}
                                    controls
                                    playsInline
                                    style={
                                      styles.propertyVideo
                                    }
                                  />
                                ) : null;
                              }
                            )}
                          </div>
                        )}

                      <div style={styles.propertyContent}>

                        <h3 style={styles.propertyName}>
                          {property.name || "Property"}
                        </h3>

                        <div style={styles.propertyDetails}>

                          <p>
                            <strong>Location:</strong>{" "}
                            {property.location || "Not specified"}
                          </p>

                          <p>
                            <strong>Price:</strong>{" "}
                            {property.price || "Contact us"}
                          </p>

                          <p>
                            <strong>Type:</strong>{" "}
                            {property.type || "Property"}
                          </p>

                          <p>
                            <strong>Status:</strong>{" "}
                            {property.status || "Available"}
                          </p>

                          {property.description && (
                            <p>
                              {property.description}
                            </p>
                          )}

                        </div>

                      </div>

                    </div>
                  );
                }
              )}

            </div>
          </div>
        ) : (
          <p style={styles.noProperties}>
            Quality properties are coming soon.
          </p>
        )}

        <div style={styles.viewAllContainer}>
          <a
            href="/properties"
            style={styles.viewAllButton}
          >
            View All Properties
          </a>
        </div>

      </section>

      {/* =========================
          BOOKING SECTION
      ========================= */}
      <section id="booking" style={styles.booking}>

        <div style={styles.bookingOverlay}>

          <div style={styles.bookingContainer}>

            <div style={styles.bookingHeading}>

              <p style={styles.sectionLabel}>
                BOOK A SESSION
              </p>

              <h2 style={styles.bookingTitle}>
                Let&apos;s Discuss Your Property Needs
              </h2>

              <p style={styles.bookingText}>
                Schedule a consultation with Rigour Estate &
                Construction to discuss your property,
                construction, renovation, land, or investment
                needs.
              </p>

            </div>

            <form
              style={styles.bookingForm}
              onSubmit={(e) => {
                e.preventDefault();

                const form = e.target;

                const name = form.name.value;
                const phone = form.phone.value;
                const service = form.service.value;
                const date = form.date.value;
                const time = form.time.value;
                const message = form.message.value;

                const whatsappMessage =
                  `Hello Rigour Estate & Construction,%0A%0A` +
                  `I would like to book a consultation.%0A%0A` +
                  `Name: ${name}%0A` +
                  `Phone: ${phone}%0A` +
                  `Service: ${service}%0A` +
                  `Preferred Date: ${date}%0A` +
                  `Preferred Time: ${time}%0A` +
                  `Message: ${message}`;

                window.open(
                  `https://wa.me/237652410607?text=${whatsappMessage}`,
                  "_blank"
                );
              }}
            >

              <div
                className="bookingRowResponsive"
                style={styles.bookingRow}
              >

                <div style={styles.bookingField}>
                  <label>Name</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    required
                    style={styles.bookingInput}
                  />
                </div>

                <div style={styles.bookingField}>
                  <label>Phone Number</label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your phone number"
                    required
                    style={styles.bookingInput}
                  />
                </div>

              </div>

              <div
                className="bookingRowResponsive"
                style={styles.bookingRow}
              >

                <div style={styles.bookingField}>
                  <label>Service</label>

                  <select
                    name="service"
                    required
                    style={styles.bookingInput}
                  >
                    <option value="">
                      Select a service
                    </option>

                    <option value="Property Purchase">
                      Property Purchase
                    </option>

                    <option value="Property Rental">
                      Property Rental
                    </option>

                    <option value="Land Purchase">
                      Land Purchase
                    </option>

                    <option value="House Construction">
                      House Construction
                    </option>

                    <option value="Renovation & Remodeling">
                      Renovation & Remodeling
                    </option>

                    <option value="Property Consultation">
                      Property Consultation
                    </option>
                  </select>
                </div>

                <div style={styles.bookingField}>
                  <label>Preferred Date</label>

                  <input
                    type="date"
                    name="date"
                    required
                    style={styles.bookingInput}
                  />
                </div>

              </div>

              <div style={styles.bookingField}>
                <label>Preferred Time</label>

                <input
                  type="time"
                  name="time"
                  required
                  style={styles.bookingInput}
                />
              </div>

              <div style={styles.bookingField}>
                <label>Additional Message</label>

                <textarea
                  name="message"
                  placeholder="Tell us briefly what you need..."
                  rows="5"
                  style={styles.bookingTextarea}
                />
              </div>

              <button
                type="submit"
                style={styles.bookingButton}
              >
                Book a Consultation on WhatsApp
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* =========================
          CTA
      ========================= */}
      <section style={styles.cta}>

        <div style={styles.ctaContent}>

          <h2 style={styles.ctaTitle}>
            Ready to Build Your Future?
          </h2>

          <p style={styles.ctaText}>
            Let Rigour Estate & Construction help turn your
            property vision into reality.
          </p>

          <a
            href="#booking"
            style={styles.primaryButton}
          >
            Book a Consultation
          </a>

        </div>

      </section>

      {/* =========================
          CONTACT
      ========================= */}
      <section id="contact" style={styles.contact}>

        <div style={styles.aboutContainer}>

          <p style={styles.sectionLabel}>
            GET IN TOUCH
          </p>

          <h2 style={styles.sectionTitle}>
            Contact Rigour Estate & Construction
          </h2>

        </div>

        <div
          className="contactGridResponsive"
          style={styles.contactGrid}
        >

          <div style={styles.contactCard}>

            <div style={styles.contactIcon}>
              📞
            </div>

            <h3 style={styles.contactTitle}>
              Phone
            </h3>

            <a
              href="tel:+237652410607"
              style={styles.contactLink}
            >
              +237 6 52 41 06 07
            </a>

          </div>

          <div style={styles.contactCard}>

            <div style={styles.contactIcon}>
              💬
            </div>

            <h3 style={styles.contactTitle}>
              WhatsApp
            </h3>

            <a
              href="https://wa.me/237652410607"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.contactLink}
            >
              Chat with us
            </a>

          </div>

          <div style={styles.contactCard}>

            <div style={styles.contactIcon}>
              ✉️
            </div>

            <h3 style={styles.contactTitle}>
              Email
            </h3>

            <a
              href="mailto:rigourestateandconstruction@gmail.com"
              style={styles.contactLink}
            >
              rigourestateandconstruction@gmail.com
            </a>

          </div>

          <div style={styles.contactCard}>

            <div style={styles.contactIcon}>
              📍
            </div>

            <h3 style={styles.contactTitle}>
              Location
            </h3>

            <p>
              Karata, Limbe, Cameroon
            </p>

          </div>

        </div>

      </section>

      {/* =========================
          FOOTER
      ========================= */}
      <footer style={styles.footer}>

        <img
          src="/images/logo2.jpg"
          alt="Rigour Estate & Construction"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
            borderRadius: "20%",
            marginBottom: "15px",
          }}
        />

        <p style={styles.footerText}>
          © {new Date().getFullYear()} Rigour Estate &
          Construction. All Rights Reserved.
        </p>

      </footer>

      {/* =========================
          PROJECT IMAGE LIGHTBOX
      ========================= */}
      {selectedProjectImage && (

        <div
          style={styles.lightbox}
          onClick={() => setSelectedProjectImage(null)}
        >

          <button
            onClick={() => setSelectedProjectImage(null)}
            style={styles.closeButton}
            aria-label="Close image"
          >
            ✕
          </button>

          <img
            src={selectedProjectImage}
            alt="Rigour project"
            style={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />

        </div>

      )}

      {/* =========================
          RESPONSIVE + PROPERTY CSS
      ========================= */}
      <style jsx>{`

        * {
          box-sizing: border-box;
        }

        html,
        body {
          max-width: 100%;
          overflow-x: hidden;
        }

        @keyframes propertyMove {
          from {
            transform: translateX(-50%);
          }

          to {
            transform: translateX(0);
          }
        }

        .property-track {
          display: flex;
          gap: 25px;
          width: max-content;
          animation: propertyMove 35s linear infinite;
        }

        .property-track:hover {
          animation-play-state: paused;
        }

        /* =========================
           TABLET
        ========================= */

        @media (max-width: 1024px) {

          .navLinksResponsive {
            gap: 15px !important;
          }

          .navLinksResponsive a {
            font-size: 13px !important;
          }

          .cardGridResponsive {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .contactGridResponsive {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .projectsGridResponsive {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .servicesGridResponsive {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .heroTitle {
            font-size: 48px !important;
          }

          .propertyCardResponsive {
            width: 320px !important;
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 768px) {

          .navLinksResponsive {
            display: none !important;
          }

          .menuButtonResponsive {
            display: block !important;
          }

          .mobileMenuResponsive {
            display: flex !important;
          }

          .heroTitle {
            font-size: clamp(36px, 10vw, 48px) !important;
            line-height: 1.08 !important;
            letter-spacing: 0 !important;
          }

          .heroBrand {
            font-size: 14px !important;
            letter-spacing: 2px !important;
          }

          .heroText {
            font-size: 16px !important;
            line-height: 1.6 !important;
          }

          .heroButtons {
            flex-direction: column !important;
            align-items: stretch !important;
            width: 100% !important;
            max-width: 350px !important;
            margin: 0 auto !important;
          }

          .heroButtons a {
            width: 100% !important;
            text-align: center !important;
          }

          .cardGridResponsive {
            grid-template-columns: 1fr !important;
            width: 100% !important;
          }

          .servicesGridResponsive {
            grid-template-columns: 1fr !important;
          }

          .projectsGridResponsive {
            grid-template-columns: 1fr !important;
          }

          .contactGridResponsive {
            grid-template-columns: 1fr !important;
          }

          .valuesRowResponsive {
            flex-direction: column !important;
            align-items: stretch !important;
          }

          .valuesRowResponsive > div {
            width: 100% !important;
          }

          .bookingRowResponsive {
            grid-template-columns: 1fr !important;
          }

          .bookingForm {
            padding: 22px !important;
          }

          .bookingTitle {
            font-size: 30px !important;
          }

          .bookingText {
            font-size: 15px !important;
          }

          .sectionTitle {
            font-size: 30px !important;
            line-height: 1.2 !important;
          }

          .sectionTitleWhite {
            font-size: 30px !important;
            line-height: 1.2 !important;
          }

          .propertyViewportResponsive {
            width: 100% !important;
          }

          .propertyCardResponsive {
            width: min(82vw, 330px) !important;
          }

          .propertyImage {
            height: 210px !important;
          }

          .propertyVideo {
            max-height: 220px !important;
          }

          .propertyContent {
            padding: 16px !important;
          }

          .propertyName {
            font-size: 20px !important;
          }

          .ctaTitle {
            font-size: 30px !important;
          }

          .ctaText {
            font-size: 16px !important;
            line-height: 1.6 !important;
          }

          .contactCard {
            padding: 22px !important;
          }

          .lightboxImage {
            max-width: 94vw !important;
            max-height: 80vh !important;
          }

          .property-track {
            animation-duration: 28s;
          }
        }

        /* =========================
           SMALL PHONES
        ========================= */

        @media (max-width: 480px) {

          .navbar {
            padding: 10px 15px !important;
          }

          .logoImage {
            width: 62px !important;
            height: 62px !important;
          }

          .logoText {
            font-size: 14px !important;
            line-height: 1.2 !important;
          }

          .logoText span {
            font-size: 7px !important;
            letter-spacing: 0.5px !important;
          }

          .menuButtonResponsive {
            font-size: 25px !important;
          }

          .mobileMenuResponsive {
            width: 210px !important;
            top: 72px !important;
          }

          .hero {
            min-height: 650px !important;
            padding: 55px 18px !important;
          }

          .heroTitle {
            font-size: 35px !important;
          }

          .heroBrand {
            font-size: 12px !important;
            letter-spacing: 1.5px !important;
          }

          .heroText {
            font-size: 15px !important;
          }

          .about,
          .whatWeDo,
          .services,
          .projects,
          .properties,
          .contact {
            padding-left: 15px !important;
            padding-right: 15px !important;
          }

          .about {
            padding-top: 65px !important;
            padding-bottom: 65px !important;
          }

          .whatWeDo {
            padding-top: 65px !important;
            padding-bottom: 65px !important;
          }

          .services {
            padding-top: 65px !important;
            padding-bottom: 65px !important;
          }

          .projects {
            padding-top: 65px !important;
            padding-bottom: 65px !important;
          }

          .properties {
            padding-top: 65px !important;
            padding-bottom: 65px !important;
          }

          .contact {
            padding-top: 65px !important;
            padding-bottom: 65px !important;
          }

          .cardImage {
            height: 210px !important;
          }

          .projectImage {
            height: 230px !important;
          }

          .propertyCardResponsive {
            width: 82vw !important;
          }

          .booking {
            padding: 65px 15px !important;
          }

          .bookingForm {
            padding: 18px !important;
            border-radius: 10px !important;
          }

          .bookingInput,
          .bookingTextarea {
            font-size: 16px !important;
          }

          .bookingButton {
            font-size: 14px !important;
            line-height: 1.4 !important;
          }

          .cta {
            padding: 70px 18px !important;
          }

          .footer {
            padding: 25px 15px !important;
          }
        }

        /* =========================
           VERY SMALL PHONES
        ========================= */

        @media (max-width: 360px) {

          .logoImage {
            width: 52px !important;
            height: 52px !important;
          }

          .logoText {
            font-size: 12px !important;
          }

          .logoText span {
            font-size: 6px !important;
          }

          .heroTitle {
            font-size: 31px !important;
          }

          .heroBrand {
            font-size: 11px !important;
          }

          .propertyCardResponsive {
            width: 84vw !important;
          }

          .sectionTitle,
          .sectionTitleWhite {
            font-size: 27px !important;
          }
        }

      `}</style>

    </main>
  );
}


/*
==================================================
                    STYLES
==================================================
*/

const styles = {

  page: {
    margin: 0,
    padding: 0,
    width: "100%",
    maxWidth: "100%",
    overflowX: "hidden",
    background: "#f7f5f0",
    color: "#222222",
    fontFamily: "Arial, Helvetica, sans-serif",
  },


  /* NAVBAR */

  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    width: "100%",
    background: "#111111",
    color: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 5%",
    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: 0,
  },

  logoImage: {
    width: "75px",
    height: "75px",
    objectFit: "contain",
    flexShrink: 0,
  },

  logoText: {
    fontSize: "18px",
    fontWeight: "700",
    letterSpacing: "1px",
    lineHeight: "1.2",
    whiteSpace: "nowrap",
  },

  navLinks: {
    display: "flex",
    gap: "22px",
    alignItems: "center",
  },

  navLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },

  menuButton: {
    display: "none",
    background: "transparent",
    border: "none",
    color: "#ffffff",
    fontSize: "28px",
    cursor: "pointer",
    padding: "5px",
    flexShrink: 0,
  },

  mobileMenu: {
    position: "fixed",
    top: "78px",
    right: 0,
    width: "230px",
    maxWidth: "85vw",
    background: "#111111",
    zIndex: 99,
    display: "flex",
    flexDirection: "column",
    padding: "15px 20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },

  mobileLink: {
    color: "#ffffff",
    textDecoration: "none",
    padding: "14px 5px",
    borderBottom: "1px solid #333333",
    fontSize: "15px",
  },


  /* HERO */

  hero: {
    minHeight: "85vh",
    width: "100%",
    backgroundImage:
      "linear-gradient(rgba(34, 32, 32, 0.95), rgba(18, 18, 19, 0.68)),url('/images/hero-background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#ffffff",
    padding: "70px 20px",
  },

  heroContent: {
    maxWidth: "950px",
    width: "100%",
  },

  heroBrand: {
    color: "#d4b36a",
    fontSize: "20px",
    fontWeight: "700",
    letterSpacing: "3px",
    marginBottom: "20px",
  },

  heroTitle: {
    fontSize: "58px",
    lineHeight: "1.1",
    margin: "0 0 25px",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  heroText: {
    fontSize: "20px",
    lineHeight: "1.7",
    color: "#eeeeee",
    maxWidth: "700px",
    margin: "0 auto 35px",
  },

  heroButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },

  primaryButton: {
    display: "inline-block",
    background: "#c7a35a",
    color: "#111111",
    padding: "14px 28px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
  },

  secondaryButton: {
    display: "inline-block",
    background: "transparent",
    color: "#ffffff",
    padding: "14px 28px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "700",
    border: "1px solid #ffffff",
  },


  /* INTRODUCTION */

  about: {
    padding: "85px 20px",
    background: "#f0eedc",
  },

  aboutContainer: {
    maxWidth: "1000px",
    width: "100%",
    margin: "auto",
    textAlign: "center",
  },

  sectionLabel: {
    color: "#b08a3e",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "10px",
  },

  sectionTitle: {
    fontSize: "38px",
    lineHeight: "1.2",
    margin: "0 0 20px",
    color: "#171717",
  },

  sectionTitleWhite: {
    fontSize: "38px",
    lineHeight: "1.2",
    margin: "0 0 20px",
    color: "#ffffff",
  },

  sectionText: {
    fontSize: "17px",
    lineHeight: "1.8",
    color: "#555555",
  },

  valuesRow: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
    marginTop: "40px",
  },

  valueCard: {
    width: "260px",
    padding: "25px",
    background: "#f7f3ea",
    borderRadius: "10px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
  },

  valueTitle: {
    fontSize: "20px",
    marginBottom: "10px",
  },


  /* WHAT WE DO */

  whatWeDo: {
    padding: "85px 20px",
    background: "#b6b3ad",
  },

  cardGrid: {
    maxWidth: "1200px",
    width: "100%",
    margin: "40px auto 0",
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "22px",
  },

  imageCard: {
    minWidth: 0,
    background: "#ffffff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },

  cardImage: {
    width: "100%",
    height: "230px",
    objectFit: "cover",
    display: "block",
  },

  cardContent: {
    padding: "20px",
  },

  cardTitle: {
    fontSize: "20px",
    margin: "0 0 10px",
  },


  /* SERVICES */

  services: {
    padding: "85px 20px",
    background: "#171717",
    color: "#ffffff",
  },

  servicesGrid: {
    maxWidth: "1100px",
    width: "100%",
    margin: "40px auto 0",
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "25px",
  },

  serviceCard: {
    minWidth: 0,
    padding: "30px",
    border: "1px solid #444444",
    borderRadius: "10px",
    background: "#222222",
  },

  serviceTitle: {
    color: "#c7a35a",
    fontSize: "21px",
    marginBottom: "12px",
  },


  /* PROJECTS */

  projects: {
    padding: "85px 20px",
    background: "#f4f5ec",
    textAlign: "center",
  },

  projectsContainer: {
    maxWidth: "1200px",
    width: "100%",
    margin: "auto",
  },

  projectIntro: {
    color: "#555555",
    fontSize: "16px",
  },

  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "25px",
    marginTop: "40px",
  },

  projectCard: {
    minWidth: 0,
    background: "#ffffff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    cursor: "pointer",
  },

  projectImage: {
    width: "100%",
    height: "280px",
    objectFit: "cover",
    display: "block",
  },

  projectText: {
    padding: "18px",
    fontSize: "17px",
    fontWeight: "600",
    textAlign: "center",
  },


  /* FEATURED PROPERTIES */

  properties: {
    padding: "85px 20px",
    background: "#ebe4d6",
    overflow: "hidden",
    width: "100%",
  },

  propertyViewport: {
    maxWidth: "1200px",
    width: "100%",
    margin: "40px auto 0",
    overflow: "hidden",
  },

  propertyCard: {
    width: "350px",
    maxWidth: "90vw",
    flexShrink: 0,
    background: "#ffffff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
  },

  propertyImage: {
    width: "100%",
    height: "230px",
    objectFit: "cover",
    display: "block",
  },

  propertyVideo: {
    width: "100%",
    maxHeight: "250px",
    objectFit: "cover",
    display: "block",
  },

  propertyContent: {
    padding: "20px",
  },

  propertyName: {
    fontSize: "22px",
    margin: "0 0 10px",
  },

  propertyDetails: {
    color: "#555555",
    lineHeight: "1.7",
    fontSize: "15px",
  },

  noProperties: {
    textAlign: "center",
    color: "#555555",
    marginTop: "35px",
  },

  viewAllContainer: {
    textAlign: "center",
  },

  viewAllButton: {
    display: "inline-block",
    marginTop: "35px",
    padding: "14px 30px",
    background: "#171717",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "700",
  },


  /* BOOKING */

  booking: {
    padding: "90px 20px",
    backgroundImage:
      "linear-gradient(rgba(17, 17, 17, 0.82), rgba(27, 26, 26, 0.9)), url('/images/hero-background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#ffffff",
  },

  bookingOverlay: {
    width: "100%",
  },

  bookingContainer: {
    maxWidth: "900px",
    width: "100%",
    margin: "auto",
  },

  bookingHeading: {
    textAlign: "center",
    marginBottom: "45px",
  },

  bookingTitle: {
    fontSize: "40px",
    lineHeight: "1.2",
    margin: "10px 0 15px",
    color: "#ffffff",
  },

  bookingText: {
    maxWidth: "700px",
    margin: "auto",
    lineHeight: "1.7",
    color: "#dddddd",
    fontSize: "16px",
  },

  bookingForm: {
    background: "rgba(241, 241, 228, 0.97)",
    padding: "35px",
    borderRadius: "14px",
    boxShadow: "0 15px 45px rgba(0,0,0,0.25)",
    color: "#171717",
    width: "100%",
  },

  bookingRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },

  bookingField: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "20px",
    minWidth: 0,
  },

  bookingInput: {
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    padding: "14px",
    border: "1px solid #d5d5d5",
    borderRadius: "7px",
    fontSize: "15px",
    background: "#ffffff",
    color: "#171717",
  },

  bookingTextarea: {
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    padding: "14px",
    border: "1px solid #d5d5d5",
    borderRadius: "7px",
    fontSize: "15px",
    resize: "vertical",
    fontFamily: "Arial, Helvetica, sans-serif",
    background: "#ffffff",
    color: "#171717",
  },

  bookingButton: {
    width: "100%",
    padding: "15px",
    background: "#c7a35a",
    color: "#171717",
    border: "none",
    borderRadius: "7px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },


  /* CTA */

  cta: {
    padding: "100px 20px",
    backgroundImage:
      "linear-gradient(rgba(22, 21, 22, 0.95), rgba(19, 19, 20, 0.72)), url('/images/hero-background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#ffffff",
    textAlign: "center",
  },

  ctaContent: {
    maxWidth: "800px",
    width: "100%",
    margin: "auto",
  },

  ctaTitle: {
    fontSize: "40px",
    lineHeight: "1.2",
    marginBottom: "15px",
  },

  ctaText: {
    fontSize: "18px",
    lineHeight: "1.7",
    marginBottom: "30px",
  },


  /* CONTACT */

  contact: {
    padding: "85px 20px",
    background: "#f3f7e8",
  },

  contactGrid: {
    maxWidth: "1100px",
    width: "100%",
    margin: "40px auto 0",
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "20px",
  },

  contactCard: {
    minWidth: 0,
    padding: "25px",
    background: "#c8e2d3",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 5px 18px rgba(0,0,0,0.05)",
    overflowWrap: "anywhere",
  },

  contactIcon: {
    fontSize: "28px",
    marginBottom: "12px",
  },

  contactTitle: {
    fontSize: "18px",
    marginBottom: "8px",
  },

  contactLink: {
    color: "#171717",
    textDecoration: "none",
    wordBreak: "break-word",
  },


  /* FOOTER */

  footer: {
    background: "#111111",
    color: "#ffffff",
    padding: "30px 20px",
    textAlign: "center",
    width: "100%",
  },

  footerText: {
    margin: 0,
    color: "#cccccc",
    fontSize: "14px",
  },


  /* LIGHTBOX */

  lightbox: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.92)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    boxSizing: "border-box",
  },

  lightboxImage: {
    maxWidth: "95%",
    maxHeight: "90%",
    width: "auto",
    height: "auto",
    objectFit: "contain",
  },

  closeButton: {
    position: "absolute",
    top: "20px",
    right: "25px",
    background: "transparent",
    border: "none",
    color: "#ffffff",
    fontSize: "32px",
    cursor: "pointer",
    zIndex: 1001,
  },
};