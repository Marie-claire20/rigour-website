"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "properties")
        );

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProperties(data);
      } catch (error) {
        console.error(
          "Error loading properties:",
          error
        );
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <main style={styles.loading}>
        <h2>Loading properties...</h2>
      </main>
    );
  }

  return (
    <main style={styles.page}>

      {/* HEADER */}

      <header style={styles.header}>

        <a href="/" style={styles.backLink}>
          ← Back to Home
        </a>

        <p style={styles.label}>
          RIGOUR ESTATE & CONSTRUCTION
        </p>

        <h1 style={styles.title}>
          Available Properties
        </h1>

        <p style={styles.subtitle}>
          Explore our available properties, view photos and
          watch property videos before making your decision.
        </p>

      </header>


      {/* PROPERTIES */}

      <section style={styles.propertiesSection}>

        <div style={styles.container}>

          {properties.length === 0 ? (

            <div style={styles.empty}>
              <h2>
                No properties available
              </h2>

              <p>
                Please check back later for available properties.
              </p>
            </div>

          ) : (

            <div style={styles.propertyGrid}>

              {properties.map((property) => (

                <article
                  key={property.id}
                  style={styles.propertyCard}
                >

                  {/* ================= PHOTO ================= */}

                  {property.images &&
                  property.images.length > 0 ? (

                    <div style={styles.photoSection}>

                      <img
                        src={getMediaUrl(
                          property.images[0]
                        )}
                        alt={`${property.name || "Property"} - ${
                          property.location || "Cameroon"
                        }`}
                        style={styles.propertyImage}
                      />

                    </div>

                  ) : (

                    <div style={styles.noPhoto}>
                      No property photo available
                    </div>

                  )}


                  {/* ================= VIDEO ================= */}

                  {property.videos &&
                  property.videos.length > 0 ? (

                    <div style={styles.videoSection}>

                      <div style={styles.videoHeading}>
                        🎥 Property Video
                      </div>

                      {property.videos.map(
                        (video, index) => {

                          const videoUrl =
                            getMediaUrl(video);

                          return (

                            <video
                              key={index}
                              src={videoUrl}
                              controls
                              playsInline
                              preload="metadata"
                              style={styles.propertyVideo}
                            />

                          );
                        }
                      )}

                    </div>

                  ) : (

                    <div style={styles.noVideo}>
                      Property video not available
                    </div>

                  )}


                  {/* ================= DESCRIPTION ================= */}

                  <div style={styles.propertyDetails}>

                    <span style={styles.propertyType}>
                      {property.type ||
                        "PROPERTY"}
                    </span>

                    <h2 style={styles.propertyName}>
                      {property.name ||
                        "Available Property"}
                    </h2>


                    <p style={styles.description}>
                      {property.description ||
                        "No description available for this property."}
                    </p>


                    {/* LOCATION */}

                    <div style={styles.detailRow}>

                      <span>
                        📍 Location
                      </span>

                      <strong>
                        {property.location ||
                          "Cameroon"}
                      </strong>

                    </div>


                    {/* PRICE */}

                    <div style={styles.detailRow}>

                      <span>
                        💰 Price
                      </span>

                      <strong>
                        {property.price ||
                          "Price on request"}
                      </strong>

                    </div>


                    {/* TYPE */}

                    <div style={styles.detailRow}>

                      <span>
                        🏠 Type
                      </span>

                      <strong>
                        {property.type ||
                          "Property"}
                      </strong>

                    </div>


                    {/* STATUS */}

                    <div style={styles.statusRow}>

                      <span
                        style={styles.status}
                      >
                        {property.status ||
                          "Available"}
                      </span>

                    </div>


                    {/* CONTACT */}

                    <div style={styles.contactButtons}>

                      <a
                        href="tel:+237652410607"
                        style={styles.callButton}
                      >
                        ☎ Call Us
                      </a>

                      <a
                        href="https://wa.me/237652410607"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.whatsappButton}
                      >
                        WhatsApp
                      </a>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>

      </section>


      {/* FOOTER */}

      <footer style={styles.footer}>

        <h3>
          RIGOUR ESTATE & CONSTRUCTION
        </h3>

        <p>
          Building Legacies, One Brick at a Time.
        </p>

        <p>
          © {new Date().getFullYear()} Rigour Estate &
          Construction. All rights reserved.
        </p>

      </footer>

    </main>
  );
}


/* =====================================================
   STYLES
===================================================== */

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f5f0e7",
    color: "#171717",
    fontFamily:
      "Arial, Helvetica, sans-serif",
  },


  loading: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f0e7",
  },


  /* HEADER */

  header: {
    background: "#171b1c",
    color: "#ffffff",
    textAlign: "center",
    padding: "70px 25px",
  },

  backLink: {
    color: "#d4af37",
    display: "inline-block",
    marginBottom: "30px",
    fontWeight: "700",
  },

  label: {
    color: "#d4af37",
    fontSize: "12px",
    letterSpacing: "3px",
    fontWeight: "800",
  },

  title: {
    fontFamily:
      "Georgia, 'Times New Roman', serif",
    fontSize: "clamp(40px, 6vw, 65px)",
    margin: "15px 0",
  },

  subtitle: {
    maxWidth: "650px",
    margin: "0 auto",
    color: "#cccccc",
    lineHeight: "1.7",
  },


  /* PROPERTIES */

  propertiesSection: {
    padding: "80px 25px",
  },

  container: {
    maxWidth: "1150px",
    margin: "0 auto",
  },

  propertyGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(330px, 1fr))",
    gap: "35px",
  },


  /* CARD */

  propertyCard: {
    background: "#ffffff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow:
      "0 15px 40px rgba(0,0,0,.10)",
  },


  /* PHOTO */

  photoSection: {
    width: "100%",
    background: "#111111",
  },

  propertyImage: {
    width: "100%",
    height: "270px",
    objectFit: "cover",
    display: "block",
  },

  noPhoto: {
    height: "270px",
    background: "#ded8cc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#777777",
  },


  /* VIDEO */

  videoSection: {
    background: "#111111",
    padding: "12px",
  },

  videoHeading: {
    color: "#d4af37",
    fontWeight: "700",
    fontSize: "13px",
    marginBottom: "10px",
  },

  propertyVideo: {
    width: "100%",
    maxHeight: "300px",
    display: "block",
    borderRadius: "5px",
    background: "#000000",
  },

  noVideo: {
    background: "#eeeeee",
    color: "#777777",
    textAlign: "center",
    padding: "15px",
    fontSize: "13px",
  },


  /* DETAILS */

  propertyDetails: {
    padding: "25px",
  },

  propertyType: {
    color: "#a37b13",
    fontSize: "11px",
    letterSpacing: "2px",
    fontWeight: "800",
  },

  propertyName: {
    fontFamily:
      "Georgia, 'Times New Roman', serif",
    fontSize: "28px",
    margin: "10px 0 15px",
  },

  description: {
    color: "#666666",
    lineHeight: "1.7",
    fontSize: "15px",
    marginBottom: "25px",
  },


  /* DETAILS ROWS */

  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    padding: "13px 0",
    borderTop: "1px solid #eeeeee",
    fontSize: "14px",
  },


  statusRow: {
    marginTop: "10px",
  },

  status: {
    display: "inline-block",
    background: "#e7efd9",
    color: "#557019",
    padding: "7px 13px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "800",
  },


  /* CONTACT BUTTONS */

  contactButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "25px",
  },

  callButton: {
    flex: 1,
    textAlign: "center",
    background: "#171717",
    color: "#ffffff",
    padding: "13px",
    borderRadius: "3px",
    fontWeight: "700",
  },

  whatsappButton: {
    flex: 1,
    textAlign: "center",
    background: "#d4af37",
    color: "#171717",
    padding: "13px",
    borderRadius: "3px",
    fontWeight: "700",
  },


  /* EMPTY */

  empty: {
    background: "#ffffff",
    padding: "70px 30px",
    textAlign: "center",
    borderRadius: "8px",
  },


  /* FOOTER */

  footer: {
    background: "#101314",
    color: "#ffffff",
    textAlign: "center",
    padding: "45px 25px",
  },

};
