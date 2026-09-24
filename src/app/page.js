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

      {/* ================= NAVBAR ================= */}
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>

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
            <a href="#home" style={styles.navLink}>
              Home
            </a>

            <a href="#about" style={styles.navLink}>
              About
            </a>

            <a href="#services" style={styles.navLink}>
              Services
            </a>

            <a href="#projects" style={styles.navLink}>
              Projects
            </a>

            <a href="/properties" style={styles.navLink}>
              Properties
            </a>

            <a href="#contact" style={styles.navLink}>
              Contact
            </a>

            <a
              href="https://wa.me/237652080691"
              target="_blank"
              rel="noopener noreferrer"
              className="navWhatsAppResponsive"
              style={styles.navWhatsApp}
            >
              WhatsApp
            </a>
          </div>

          <button
            className="menuButtonResponsive"
            style={styles.menuButton}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

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
              href="/properties"
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

            <a
              href="https://wa.me/237652080691"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.mobileWhatsApp}
              onClick={closeMobileMenu}
            >
              WhatsApp
            </a>
          </div>
        )}
      </nav>


      {/* ================= HERO ================= */}
      <section
        id="home"
        style={styles.hero}
      >
        <div style={styles.heroOverlay}>
          <div style={styles.heroContent}>

            <p style={styles.heroLabel}>
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
        </div>
      </section>


      {/* ================= ABOUT ================= */}
      <section
        id="about"
        style={styles.about}
      >
        <div style={styles.aboutContainer}>

          {/*<p style={styles.sectionLabel}>
            ABOUT US
          </p>*/}

          <h2 style={styles.sectionTitle}>
            ABOUT US
          </h2>

          <p style={styles.aboutText}>
            Rigour Estate & Construction is a multidisciplinary Company operating accross real estate, construction, Civil engineering, structural works, property development, renovation and remodelling and project
            Management.
            With a commitment to professionalism, quality and client satisfaction, we transform property and construction needs into practical, well managed and lasting solutions.
            Building Legacies, One Brick at a Time.
          </p>

          <div
            className="valuesGridResponsive"
            style={styles.valuesGrid}
          >

            <div style={styles.valueCard}>
              <div style={styles.valueIcon}>01</div>
              <h3>Quality</h3>
              <p>
                We focus on quality materials, workmanship, and
                reliable results.
              </p>
            </div>

            <div style={styles.valueCard}>
              <div style={styles.valueIcon}>02</div>
              <h3>Precision</h3>
              <p>
                Every project is approached with attention to
                detail and careful planning.
              </p>
            </div>

            <div style={styles.valueCard}>
              <div style={styles.valueIcon}>03</div>
              <h3>Reliability</h3>
              <p>
                We aim to provide dependable services and lasting
                value to our clients.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ================= WHAT WE OFFER================= */}
      <section
        id="solutions"
        style={styles.whatWeDo}
      >
        <div style={styles.aboutContainer}>

          <p style={styles.sectionLabel}>
            PROPERTY & CONSTRUCTION SOLUTIONS
          </p>

          <h2 style={styles.sectionTitle}>
            What We Offer
          </h2>

          <p style={styles.projectIntro}>
            Professional property and construction solutions designed
            to help you find, develop, build, and improve quality spaces.
          </p>

          <div
            className="solutionsGridResponsive"
            style={styles.solutionsGrid}
          >

            {/* BUY A HOME */}
            <div style={styles.solutionCard}>
              <img
                src="/images/buy-home.jpg"
                alt="Buy a Home"
                style={styles.solutionImage}
              />

              <div style={styles.solutionContent}>
                <h3 style={styles.solutionTitle}>
                  Buy a Home
                </h3>

                <p style={styles.solutionText}>
                  Find a quality home that fits your needs,
                  lifestyle, and future plans.
                </p>
              </div>
            </div>


            {/* RENT A PROPERTY */}
            <div style={styles.solutionCard}>
              <img
                src="/images/rent-property.jpg"
                alt="Rent a Property"
                style={styles.solutionImage}
              />

              <div style={styles.solutionContent}>
                <h3 style={styles.solutionTitle}>
                  Rent a Property
                </h3>

                <p style={styles.solutionText}>
                  Discover suitable rental properties in
                  convenient and desirable locations.
                </p>
              </div>
            </div>


            {/* BUY LAND */}
            <div style={styles.solutionCard}>
              <img
                src="/images/buy-land.jpg"
                alt="Buy Land"
                style={styles.solutionImage}
              />

              <div style={styles.solutionContent}>
                <h3 style={styles.solutionTitle}>
                  Buy Land
                </h3>

                <p style={styles.solutionText}>
                  Secure land for your home, investment,
                  development, or future construction project.
                </p>
              </div>
            </div>


            {/* BUILD A HOUSE */}
            <div style={styles.solutionCard}>
              <img
                src="/images/build-house.jpg"
                alt="Build a House"
                style={styles.solutionImage}
              />

              <div style={styles.solutionContent}>
                <h3 style={styles.solutionTitle}>
                  Build a House
                </h3>

                <p style={styles.solutionText}>
                  Turn your construction vision into a quality,
                  functional, and lasting home.
                </p>
              </div>
            </div>


            {/* ARCHITECTURAL DRAWINGS */}
            <div style={styles.solutionCard}>

              <img
              src="/images/architectural-drawing.jpg"
              alt="Architectural Drawings"
              style={styles.architecturalSolutionPhoto}
              />

              <div style={styles.solutionContent}>
                <h3 style={styles.solutionTitle}>
                  Architectural Drawings
                </h3>

                <p style={styles.solutionText}>
                  Bring your ideas to life with clear and
                  professional architectural drawings designed
                  for your construction needs.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ================= SERVICES ================= */}
      <section
        id="services"
        style={styles.services}
      >
        <div style={styles.aboutContainer}>

          <p style={styles.sectionLabel}>
            AND HAVE
          </p>

          <h2 style={styles.sectionTitleWhite}>
            More of Our Services
          </h2>

        </div>


        {/* ORIGINAL THREE SERVICE BOXES */}
        <div
          className="servicesGridResponsive"
          style={styles.servicesGrid}
        >

          <div style={styles.serviceCard}>
            <h3 style={styles.serviceTitle}>
              Building Construction
            </h3>

            <p>
              Professional construction services focused on quality
              workmanship and reliable delivery.
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


        {/* TWO PROFESSIONAL SERVICE LISTS */}
        <div
          className="serviceListsResponsive"
          style={styles.serviceLists}
        >

          {/* LEFT COLUMN */}
          <div style={styles.serviceListColumn}>

            <h3 style={styles.serviceListTitle}>
              Real Estate
            </h3>

            <ul style={styles.serviceList}>
              <li>Finding Properties</li>
              <li>Renting Properties</li>
              <li>Selling Properties</li>
              <li>Buying Properties</li>
              <li>Property Marketing</li>
              <li>Property Inspections</li>
              <li>Property Development</li>
            </ul>

          </div>


          {/* RIGHT COLUMN */}
          <div style={styles.serviceListColumn}>

            <h3 style={styles.serviceListTitle}>
              Construction & Engineering
            </h3>

            <ul style={styles.serviceList}>
              <li>Building Construction</li>
              <li>Civil Engineering Works</li>
              <li>Structural Works</li>
              <li>Renovation</li>
              <li>Project Management</li>
              <li>Construction Supervision</li>
              <li>Architectural Drawings</li>
            </ul>

          </div>

        </div>

      </section>
      {/* ================= FEATURED PROJECTS ================= */}
      <section
        id="projects"
        style={styles.projects}
      >
        <div style={styles.projectsContainer}>

          <p style={styles.sectionLabel}>
            OUR WORK
          </p>

          <h2 style={styles.sectionTitle}>
            Featured Projects
          </h2>

          <p style={styles.projectIntro}>
            Quality, precision, and professionalism in every project.
          </p>


          <div
            className="projectsGridResponsive"
            style={styles.projectsGrid}
          >

            {/* PROJECT 1 */}
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


            {/* PROJECT 2 */}
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


            {/* PROJECT 3 */}
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


      {/* ================= FEATURED PROPERTIES ================= */}
      <section
        id="properties"
        style={styles.properties}
      >

        <div style={styles.propertiesContainer}>

          <p style={styles.sectionLabel}>
            PROPERTY SHOWCASE
          </p>

          <h2 style={styles.sectionTitle}>
            Featured Properties
          </h2>

          <p style={styles.projectIntro}>
            Explore some of our available properties and property
            opportunities.
          </p>


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
                            alt={property.name || "Property"}
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


                        <div style={styles.propertyInfo}>

                          <h3 style={styles.propertyName}>
                            {property.name ||
                              "Rigour Property"}
                          </h3>

                          <p style={styles.propertyLocation}>
                            {property.location ||
                              "Limbe, Cameroon"}
                          </p>

                          <p style={styles.propertyDescription}>
                            {property.description ||
                              "Quality property available through Rigour Estate & Construction."}
                          </p>

                          <div style={styles.propertyBottom}>

                            <span style={styles.propertyPrice}>
                              {property.price ||
                                "Price on request"}
                            </span>

                            <span
                              style={
                                styles.propertyStatus
                              }
                            >
                              {property.status ||
                                "Available"}
                            </span>

                          </div>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            </div>

          ) : (

            <div style={styles.noProperties}>
              Quality properties are coming soon.
            </div>

          )}


          <div style={styles.propertiesButtonWrapper}>

            <a
              href="/properties"
              style={styles.primaryButtonDark}
            >
              View All Properties
            </a>

          </div>

        </div>
      </section>


      {/* ================= BOOKING ================= */}
      <section
        id="booking"
        style={styles.booking}
      >

        <div style={styles.bookingOverlay}>

          <div style={styles.bookingContainer}>

            <p style={styles.sectionLabel}>
              BOOK A CONSULTATION
            </p>

            <h2 style={styles.sectionTitleWhite}>
              Let's Discuss Your Project
            </h2>

            <p style={styles.bookingIntro}>
              Tell us what you need and our team will get in
              touch with you.
            </p>


            <form
              style={styles.bookingForm}
              onSubmit={(e) => {

                e.preventDefault();

                const formData =
                  new FormData(e.currentTarget);

                const name =
                  formData.get("name");

                const phone =
                  formData.get("phone");

                const service =
                  formData.get("service");

                const date =
                  formData.get("date");

                const time =
                  formData.get("time");

                const message =
                  formData.get("message");

                const whatsappMessage =
                  `Hello Rigour Estate & Construction.%0A%0A` +
                  `I would like to book a consultation.%0A%0A` +
                  `Name: ${name}%0A` +
                  `Phone: ${phone}%0A` +
                  `Service: ${service}%0A` +
                  `Preferred Date: ${date}%0A` +
                  `Preferred Time: ${time}%0A` +
                  `Message: ${message}`;

                window.open(
                  `https://wa.me/237652080691?text=${whatsappMessage}`,
                  "_blank"
                );
              }}
            >

              <div style={styles.formGrid}>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    required
                    style={styles.formInput}
                    placeholder="Your name"
                  />
                </div>


                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    required
                    style={styles.formInput}
                    placeholder="Your phone number"
                  />
                </div>


                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    Service
                  </label>

                  <select
                    name="service"
                    required
                    style={styles.formInput}
                  >
                    <option value="">
                      Select a service
                    </option>

                    <option value="Property Purchase">
                      Property Purchase
                    </option>

                    <option value="Rental">
                      Rental
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

                    <option value="Architectural Drawings">
                      Architectural Drawings
                    </option>
                  </select>
                </div>


                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    Preferred Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    required
                    style={styles.formInput}
                  />
                </div>


                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    Preferred Time
                  </label>

                  <input
                    type="time"
                    name="time"
                    required
                    style={styles.formInput}
                  />
                </div>

              </div>


              <div style={styles.formGroup}>
                <label style={styles.formLabel}>
                  Additional Message
                </label>

                <textarea
                  name="message"
                  rows="5"
                  style={styles.formTextarea}
                  placeholder="Tell us more about what you need..."
                ></textarea>
              </div>


              <button
                type="submit"
                style={styles.formButton}
              >
                Book Consultation on WhatsApp
              </button>

            </form>

          </div>

        </div>
      </section>


      {/* ================= CTA ================= */}
      <section style={styles.cta}>

        <div style={styles.ctaOverlay}>

          <div style={styles.ctaContent}>

            <p style={styles.sectionLabel}>
              BUILD WITH RIGOUR
            </p>

            <h2 style={styles.ctaTitle}>
              Ready to Build Your Future?
            </h2>

            <p style={styles.ctaText}>
              Let us help you turn your property and construction
              goals into reality.
            </p>

            <a
              href="#booking"
              style={styles.primaryButton}
            >
              Get Started
            </a>

          </div>

        </div>

      </section>
      {/* ================= CONTACT ================= */}
      <section
        id="contact"
        style={styles.contact}
      >

        <div style={styles.contactContainer}>

          <p style={styles.sectionLabel}>
            CONTACT US
          </p>

          <h2 style={styles.sectionTitle}>
            Let's Work Together
          </h2>

          <p style={styles.contactIntro}>
            Have a property question, construction project,
            or development idea? Get in touch with us.
          </p>


          <div
            className="contactGridResponsive"
            style={styles.contactGrid}
          >

            {/* PHONE */}
            <div style={styles.contactCard}>

              <div style={styles.contactIcon}>
                ☎
              </div>

              <h3>Phone</h3>

              <a
                href="tel:+237652080691"
                style={styles.contactLink}
              >
                +237 652 080 691
              </a>

            </div>


            {/* WHATSAPP */}
            <div style={styles.contactCard}>

              <div style={styles.contactIcon}>
                💬
              </div>

              <h3>WhatsApp</h3>

              <a
                href="https://wa.me/237652080691"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.contactLink}
              >
                Chat With Us
              </a>

            </div>


            {/* EMAIL */}
            <div style={styles.contactCard}>

              <div style={styles.contactIcon}>
                ✉
              </div>

              <h3>Email</h3>

              <a
                href="mailto:rigourestateandconstruction@gmail.com"
                style={styles.contactLink}
              >
                rigourestateandconstruction@gmail.com
              </a>

            </div>


            {/* LOCATION */}
            <div style={styles.contactCard}>

              <div style={styles.contactIcon}>
                📍
              </div>

              <h3>Location</h3>

              <p style={styles.contactLocation}>
                Karata, Limbe, Cameroon
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer style={styles.footer}>

        <div style={styles.footerContainer}>

          <img
            src="/images/logo2.jpg"
            alt="Rigour Estate & Construction"
            style={styles.footerLogo}
          />

          <p style={styles.footerText}>
            Building Legacies, One Brick at a Time.
          </p>

         <div style={styles.footerLinks}>

            <a
              href="#home"
              style={styles.footerLink}
            >
              Home
            </a>

            <a
              href="#about"
              style={styles.footerLink}
            >
              About
            </a>

            <a
              href="#services"
              style={styles.footerLink}
            >
              Services
            </a>

            <a
              href="#projects"
              style={styles.footerLink}
            >
              Projects
            </a>

            <a
              href="/properties"
              style={styles.footerLink}
            >
              Properties
            </a>

            <a
              href="#contact"
              style={styles.footerLink}
            >
              Contact
            </a>

          </div> 

          <div style={styles.footerBottom}>
            <p>
              © 2026 Rigour Estate & Construction. All rights reserved.
            </p>
          </div>

        </div>

      </footer>


      {/* ================= PROJECT IMAGE LIGHTBOX ================= */}
      {selectedProjectImage && (

        <div
          style={styles.lightbox}
          onClick={() => setSelectedProjectImage(null)}
        >

          <button
            style={styles.closeButton}
            onClick={() =>
              setSelectedProjectImage(null)
            }
          >
            ×
          </button>

          <img
            src={selectedProjectImage}
            alt="Project preview"
            style={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />

        </div>

      )}


      {/* ================= RESPONSIVE CSS ================= */}
      <style jsx>{`

        /* ---------- PROPERTY MOVEMENT ---------- */

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


        /* ---------- LARGE TABLETS ---------- */

        @media (max-width: 1024px) {

          .solutionsGridResponsive {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .servicesGridResponsive {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .projectsGridResponsive {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .valuesGridResponsive {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .contactGridResponsive {
            grid-template-columns: repeat(2, 1fr) !important;
          }

        }


        /* ---------- MOBILE ---------- */

        @media (max-width: 768px) {

          .navLinksResponsive {
            display: none !important;
          }

          .navWhatsAppResponsive {
            display: none !important;
          }

          .menuButtonResponsive {
            display: block !important;
          }

          .mobileMenuResponsive {
            display: flex !important;
          }


          .solutionsGridResponsive {
            grid-template-columns: 1fr !important;
          }

          .servicesGridResponsive {
            grid-template-columns: 1fr !important;
          }

          .projectsGridResponsive {
            grid-template-columns: 1fr !important;
          }

          .valuesGridResponsive {
            grid-template-columns: 1fr !important;
          }

          .contactGridResponsive {
            grid-template-columns: 1fr !important;
          }


          .serviceListsResponsive {
            grid-template-columns: 1fr !important;
          }


          .property-track {
            animation-duration: 28s;
          }


          .propertyCardResponsive {
            width: 300px !important;
          }


          .heroTitleResponsive {
            font-size: 42px !important;
          }


          .heroContentResponsive {
            padding: 40px 20px !important;
          }


          .navContainerResponsive {
            padding: 0 18px !important;
          }

        }


        /* ---------- SMALL PHONES ---------- */

        @media (max-width: 480px) {

          .architecturalSolutionPhoto {
            height: 230px !important;
          }

          .heroTitleResponsive {
            font-size: 34px !important;
          }

          .propertyCardResponsive {
            width: 280px !important;
          }

        }


        /* ---------- VERY SMALL PHONES ---------- */

        @media (max-width: 360px) {

          .architecturalSolutionPhoto {
            height: 210px !important;
          }

          .heroTitleResponsive {
            font-size: 30px !important;
          }

        }

      `}</style>

    </main>
  );
}
/* =========================================================
   PAGE STYLES
========================================================= */

const styles = {

  /* ================= PAGE ================= */

  page: {
    margin: 0,
    padding: 0,
    background: "#f7f5f0",
    color: "#171717",
    fontFamily: "Arial, Helvetica, sans-serif",
    overflowX: "hidden",
  },


  /* ================= NAVBAR ================= */

  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "#111111",
    color: "#ffffff",
    width: "100%",
  },

  navContainer: {
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "12px 25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "70px",
    width: "100%",
    boxSizing: "border-box",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexShrink: 0,
    margin: 0,
  },

  logoImage: {
    width: "48px",
    height: "48px",
    objectFit: "contain",
  },

  logoText: {
    color: "#ffffff",
    fontSize: "17px",
    fontWeight: "800",
    lineHeight: "1.1",
    letterSpacing: "1px",
    textAlign: "left",
  },

  logoTextSpan: {
    fontSize: "9px",
  },

  navLinks: {
    display: "flex",
    gap: "22px",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "0",
    justifyContent: "flex-end",
  },

  navLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },

  navWhatsApp: {
    display: "inline-block",
    background: "#25D366",
    color: "#ffffff",
    textDecoration: "none",
    padding: "10px 17px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "700",
    whiteSpace: "nowrap",
    marginLeft: "5px",
  },

  menuButton: {
    display: "none",
    background: "transparent",
    border: "none",
    color: "#ffffff",
    fontSize: "30px",
    cursor: "pointer",
    marginLeft: "auto",
  },

  mobileMenu: {
    display: "none",
    flexDirection: "column",
    padding: "18px 25px 25px",
    background: "#111111",
    gap: "14px",
  },

  mobileLink: {
    color: "#ffffff",
    textDecoration: "none",
    padding: "10px 0",
    fontSize: "16px",
  },

  mobileWhatsApp: {
    color: "#ffffff",
    background: "#25D366",
    textDecoration: "none",
    padding: "12px 15px",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "700",
    textAlign: "center",
    marginTop: "12px",
  },


  /* ================= HERO ================= */

  hero: {
    minHeight: "78vh",
    backgroundImage:
      "url('/images/hero-background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },

  heroOverlay: {
    minHeight: "78vh",
    background:
      "linear-gradient(90deg, rgba(0,0,0,0.78), rgba(0, 0, 0, 0.78))",
    display: "flex",
    alignItems: "center",
  },

  heroContent: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    padding: "80px 25px",
    color: "#ffffff",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
  },

  heroLabel: {
    color: "#c7a35a",
    fontSize: "14px",
    fontWeight: "700",
    letterSpacing: "2px",
    marginBottom: "18px",
  },

  heroTitle: {
    fontSize: "60px",
    lineHeight: "1.08",
    margin: "0 auto 25px",
    maxWidth: "800px",
    textAlign: "center",
  },

  heroText: {
    maxWidth: "650px",
    fontSize: "19px",
    lineHeight: "1.7",
    marginBottom: " 0 auto 35px",
    color: "#f1f1f1",
    textAlign: "center",
  },

  heroButtons: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },

  primaryButton: {
    display: "inline-block",
    background: "#c7a35a",
    color: "#111111",
    textDecoration: "none",
    padding: "14px 24px",
    borderRadius: "5px",
    fontWeight: "700",
  },

  secondaryButton: {
    display: "inline-block",
    background: "transparent",
    color: "#ffffff",
    textDecoration: "none",
    padding: "13px 24px",
    borderRadius: "5px",
    fontWeight: "700",
    border: "1px solid #ffffff",
  },


  /* ================= GENERAL ================= */

  sectionLabel: {
    color: "#c7a35a",
    fontSize: "13px",
    fontWeight: "800",
    letterSpacing: "2px",
    marginBottom: "12px",
    textTransform: "uppercase",
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: "42px",
    margin: "0 0 20px",
    lineHeight: "1.2",
    textAlign: "center",
  },

  sectionTitleWhite: {
    fontSize: "42px",
    margin: "0 0 20px",
    lineHeight: "1.2",
    color: "#ffffff",
    textAlign: "center",
  },

  projectIntro: {
    maxWidth: "700px",
    lineHeight: "1.7",
    color: "#555555",
    margin: "0 auto",
    textAlign: "center",
  },


  /* ================= ABOUT ================= */

  about: {
    background: "#f0eedc",
    padding: "90px 20px",
  },

  aboutContainer: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
  },

  aboutText: {
    maxWidth: "850px",
    lineHeight: "1.8",
    fontSize: "17px",
    color: "#444444",
    margin: "0 auto",
    textAlign: "center",
  },

  valuesGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "25px",
    marginTop: "45px",
  },

  valueCard: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
  },

  valueIcon: {
    color: "#c7a35a",
    fontWeight: "800",
    fontSize: "20px",
    marginBottom: "15px",
  },


  /* ================= WHAT WE DO ================= */

  whatWeDo: {
    background: "#b6b3ad",
    padding: "90px 20px",
  },

  solutionsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(5, minmax(0, 1fr))",
    gap: "18px",
    marginTop: "40px",
  },

  solutionCard: {
    background: "#ffffff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.10)",
  },

  solutionImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    display: "block",
  },

  architecturalSolutionPhoto: {
    width: "100%",
    height: "220px",
    background: "#eeeeee",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#777777",
    fontSize: "14px",
    textAlign: "center",
    padding: "20px",
    boxSizing: "border-box",
  },

  solutionContent: {
    padding: "24px",
  },

  solutionTitle: {
    margin: "0 0 12px",
    fontSize: "21px",
  },

  solutionText: {
    margin: 0,
    lineHeight: "1.6",
    color: "#555555",
    fontSize: "14px",
  },


  /* ================= SERVICES ================= */

  services: {
    background: "#171717",
    padding: "90px 20px",
    color: "#ffffff",
  },

  servicesGrid: {
    maxWidth: "1100px",
    width: "100%",
    margin: "40px auto 0",
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "25px",
  },

  serviceCard: {
    background: "#222222",
    border: "1px solid #333333",
    borderRadius: "10px",
    padding: "30px",
    lineHeight: "1.7",
    color: "#eeeeee",
  },

  serviceTitle: {
    color: "#dfd115",
    fontSize: "22px",
    margin: "0 0 15px",
  },

  serviceLists: {
    maxWidth: "1100px",
    width: "100%",
    margin: "45px auto 0",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "50px",
    padding: "0 10px",
    boxSizing: "border-box",
  },

  serviceListColumn: {
    background: "#222222",
    border: "1px solid #444444",
    borderRadius: "10px",
    padding: "30px",
  },

  serviceListTitle: {
    color: "#c7a35a",
    fontSize: "22px",
    margin: "0 0 20px",
    textTransform: "uppercase",
  },

  serviceList: {
    margin: 0,
    paddingLeft: "22px",
    color: "#ffffff",
    lineHeight: "1.9",
    fontSize: "16px",
  },


  /* ================= PROJECTS ================= */

  projects: {
    background: "#f4f5ec",
    padding: "90px 20px",
  },

  projectsContainer: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
  },

  projectsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "25px",
    marginTop: "40px",
  },

  projectCard: {
    background: "#ffffff",
    borderRadius: "10px",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.08)",
  },

  projectImage: {
    width: "100%",
    height: "280px",
    objectFit: "cover",
    display: "block",
  },

  projectText: {
    padding: "20px",
    fontSize: "18px",
    fontWeight: "700",
  },


  /* ================= PROPERTIES ================= */

  properties: {
    background: "#ebe4d6",
    padding: "90px 20px",
    overflow: "hidden",
  },

  propertiesContainer: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
  },

  propertyViewport: {
    width: "100%",
    overflow: "hidden",
    marginTop: "40px",
  },

  propertyCard: {
    width: "330px",
    flexShrink: 0,
    background: "#ffffff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.10)",
  },

  propertyImage: {
    width: "100%",
    height: "230px",
    objectFit: "cover",
    display: "block",
  },

  propertyVideo: {
    width: "100%",
    maxHeight: "260px",
    display: "block",
    background: "#000000",
  },

  propertyInfo: {
    padding: "22px",
  },

  propertyName: {
    margin: "0 0 8px",
    fontSize: "21px",
  },

  propertyLocation: {
    margin: "0 0 12px",
    color: "#777777",
    fontSize: "14px",
  },

  propertyDescription: {
    color: "#555555",
    lineHeight: "1.6",
    fontSize: "14px",
  },

  propertyBottom: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px",
    marginTop: "18px",
  },

  propertyPrice: {
    fontWeight: "800",
    color: "#222222",
  },

  propertyStatus: {
    background: "#c7a35a",
    color: "#111111",
    padding: "6px 10px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "700",
  },

  noProperties: {
    background: "#ffffff",
    padding: "40px",
    textAlign: "center",
    borderRadius: "10px",
    marginTop: "40px",
    color: "#555555",
  },

  propertiesButtonWrapper: {
    textAlign: "center",
    marginTop: "45px",
  },

  primaryButtonDark: {
    display: "inline-block",
    background: "#171717",
    color: "#ffffff",
    textDecoration: "none",
    padding: "14px 24px",
    borderRadius: "5px",
    fontWeight: "700",
  },


  /* ================= BOOKING ================= */

  booking: {
    backgroundImage:
      "url('/images/hero-background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
  },

  bookingOverlay: {
    background:
      "rgba(0,0,0,0.78)",
    padding: "90px 20px",
  },

  bookingContainer: {
    maxWidth: "1000px",
    width: "100%",
    margin: "0 auto",
  },

  bookingIntro: {
    color: "#eeeeee",
    lineHeight: "1.7",
    maxWidth: "700px",
    margin: "0 auto",
    textAlign: "center",
  },

  bookingForm: {
    marginTop: "40px",
    background: "#f1f7da",
    padding: "35px",
    borderRadius: "10px",
    boxSizing: "border-box",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.25)",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },

  formGroup: {
    marginBottom: "20px",
  },

  formLabel: {
    display: "block",
    marginBottom: "8px",
    color: "#222222",
    fontWeight: "600",
  },

  formInput: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    borderRadius: "5px",
    border: "1px solid #cccccc",
    fontSize: "15px",
    background: "#ffffff",
    color: "#111111",
  },

  formSelect: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    borderRadius: "5px",
    border: "1px solid #cccccc",
    fontSize: "15px",
    background: "#ffffff",
    color: "#111111",
  },

  formTextarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    borderRadius: "5px",
    border: "1px solid #cccccc",
    fontSize: "15px",
    background: "#ffffff",
    color: "#111111",
    resize: "vertical",
  },

  formButton: {
    background: "#25D366",
    color: "#ffffff",
    border: "none",
    padding: "15px 24px",
    borderRadius: "5px",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
  },


  /* ================= CTA ================= */

  cta: {
    backgroundImage:
      "url('/images/hero-background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  ctaOverlay: {
    background:
      "rgba(0,0,0,0.72)",
    padding: "90px 20px",
  },

  ctaContent: {
    maxWidth: "900px",
    margin: "0 auto",
    textAlign: "center",
    color: "#ffffff",
  },

  ctaTitle: {
    fontSize: "45px",
    margin: "0 0 20px",
  },

  ctaText: {
    fontSize: "17px",
    lineHeight: "1.7",
    marginBottom: "30px",
  },


  /* ================= CONTACT ================= */

  contact: {
    background: "#f1f5e6",
    padding: "90px 20px",
  },

  contactContainer: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
  },

  contactIntro: {
    maxWidth: "700px",
    lineHeight: "1.7",
    color: "#555555",
    margin: "0 auto",
    textAlign: "center",
  },

  contactGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, minmax(0, 1fr))",
    gap: "20px",
    marginTop: "45px",
  },

  contactCard: {
    background: "#74be77",
    padding: "28px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.06)",
  },

  contactIcon: {
    fontSize: "28px",
    marginBottom: "12px",
  },

  contactLink: {
    color: "#222222",
    textDecoration: "none",
    fontWeight: "600",
    wordBreak: "break-word",
  },

  contactLocation: {
    color: "#555555",
    margin: 0,
  },


  /* ================= FOOTER ================= */

  footer: {
    background: "#111111",
    color: "#ffffff",
    padding: "60px 20px 25px",
  },

  footerContainer: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    textAlign: "center",
  },

  footerLogo: {
    width: "130px",
    height: "auto",
    marginBottom: "20px",
  },

  footerText: {
    color: "#cccccc",
    lineHeight: "1.6",
  },

  footerLinks: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "25px",
    flexWrap: "wrap",
    marginTop: "25px",
  },

  footerLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "14px",
  },

  footerBottom: {
    borderTop: "1px solid #333333",
    marginTop: "35px",
    paddingTop: "20px",
    color: "#aaaaaa",
    fontSize: "13px",
  },


  /* ================= LIGHTBOX ================= */

  lightbox: {
    position: "fixed",
    inset: 0,
    zIndex: 2000,
    background: "rgba(0,0,0,0.92)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
  },

  lightboxImage: {
    maxWidth: "90%",
    maxHeight: "85vh",
    objectFit: "contain",
  },

  closeButton: {
    position: "absolute",
    top: "20px",
    right: "25px",
    background: "transparent",
    border: "none",
    color: "#ffffff",
    fontSize: "45px",
    cursor: "pointer",
    lineHeight: 1,
  },

};

