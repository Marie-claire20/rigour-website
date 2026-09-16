"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { auth, db } from "../../../lib/firebase";

const CLOUD_NAME = "wm3xmrrl";
const UPLOAD_PRESET = "rigour_properties";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Available");
  const [type, setType] = useState("House");

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [videos, setVideos]= useState([]);

  // -----------------------------
  // CHECK LOGIN
  // -----------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // -----------------------------
  // LOAD PROPERTIES
  // -----------------------------
  const loadProperties = async () => {
    try {
      const snapshot = await getDocs(collection(db, "properties"));

      const propertyList = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      setProperties(propertyList);
    } catch (error) {
      console.error(error);
      alert("Could not load properties.");
    }
  };

  useEffect(() => {
    if (user) {
      loadProperties();
    }
  }, [user]);

  // -----------------------------
  // SELECT IMAGES
  // -----------------------------
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files || []);

    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // -----------------------------
  // UPLOAD IMAGE TO CLOUDINARY
  // -----------------------------
  const uploadImage = async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Cloudinary upload failed.");
    }

    const data = await response.json();

    return {
      url: data.secure_url,
      publicId: data.public_id,
    };
  };

  const uploadVideo = async (file) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await
    response.json();
    console.log("Cloudinary video error:", errorData);
    throw new Error(errorData.error?.message ||"Cloudinary video upload failed.");
  }

  const data = await response.json();

  return {
    url: data.secure_url,
    publicId: data.public_id,
  };
};


  // -----------------------------
  // UPLOAD ALL SELECTED IMAGES
  // -----------------------------
  const uploadImages = async () => {
    const uploadedImages = [];

    for (const image of images) {
      const uploaded = await uploadImage(image);
      uploadedImages.push(uploaded);
    }

    return uploadedImages;
  };

  const uploadVideos = async () => {
  const uploadedVideos=[];

  for (const video of videos){
    const uploaded = await uploadVideo(video);
    uploadedVideos.push(uploaded);
  }
  return uploadedVideos;
};

  

  // -----------------------------
  // RESET FORM
  // -----------------------------
  const resetForm = () => {
    setName("");
    setDescription("");
    setLocation("");
    setPrice("");
    setStatus("Available");
    setType("House");

    setImages([]);
    setImagePreviews([]);
    setExistingImages([]);

    setEditingId(null);
    setShowForm(false);
  };

  // -----------------------------
  // SAVE PROPERTY
  // -----------------------------
  const saveProperty = async () => {
    if (
      !name.trim() ||
      !description.trim() ||
      !location.trim() ||
      !price.trim() ||
      !status.trim() ||
      !type.trim()
    ) {
      alert("Please fill in all property fields.");
      return;
    }

    try {
      setLoading(true);

      let newImages = [];

      if (images.length > 0) {
        newImages = await uploadImages();

      }
      let newVideos =[];
      if (videos.length > 0){
        newVideos = await uploadVideos();
        console.log("Uploaded videos:", newVideos);
        console.log("Selected videos:", videos);
      }

      if (editingId) {
        const propertyRef = doc(db, "properties", editingId);

        await updateDoc(propertyRef, {
          name: name.trim(),
          description: description.trim(),
          location: location.trim(),
          price: price.trim(),
          status,
          type,
          images: [...existingImages, ...newImages],
          videos: newVideos,
        });

        alert("Property updated successfully!");
      } else {
        await addDoc(collection(db, "properties"), {
          name: name.trim(),
          description: description.trim(),
          location: location.trim(),
          price: price.trim(),
          status,
          type,
          images: newImages,
          videos: newVideos,
        });

        alert("Property added successfully!");
      }

      resetForm();
      await loadProperties();
    } catch (error) {
      console.error("Save error:", error);
      alert(
        "Could not save the property. Check your internet connection and Firebase permissions."
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // EDIT PROPERTY
  // -----------------------------
  const editProperty = (property) => {
    setEditingId(property.id);

    setName(property.name || "");
    setDescription(property.description || "");
    setLocation(property.location || "");
    setPrice(property.price || "");
    setStatus(property.status || "Available");
    setType(property.type || "House");

    setExistingImages(property.images || []);

    setImages([]);
    setVideos([]);
    setImagePreviews([]);

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // -----------------------------
  // REMOVE AN EXISTING PICTURE
  // -----------------------------
  const removeExistingImage = (index) => {
    const updatedImages = existingImages.filter(
      (_, imageIndex) => imageIndex !== index
    );

    setExistingImages(updatedImages);
  };

  // -----------------------------
  // DELETE PROPERTY
  // -----------------------------
  const deleteProperty = async (property) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${property.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      await deleteDoc(doc(db, "properties", property.id));

      alert("Property deleted successfully!");

      await loadProperties();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Could not delete the property.");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // SIGN OUT
  // -----------------------------
  const handleSignOut = async () => {
    await signOut(auth);
  };

  // -----------------------------
  // NOT LOGGED IN
  // -----------------------------
  if (!user) {
    return (
      <main style={styles.center}>
        <h2>Please sign in to access the admin dashboard.</h2>

        <a href="/login" style={styles.loginLink}>
          Go to Login
        </a>
      </main>
    );
  }

  // -----------------------------
  // DASHBOARD
  // -----------------------------
  return (
    <main style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Rigour Group</h1>
          <p style={styles.subtitle}>Admin Dashboard</p>
          <p>Logged in as: {user.email}</p>
        </div>

        <button onClick={handleSignOut} style={styles.signOutButton}>
          Sign Out
        </button>
      </header>

      <hr />

      {/* PROPERTY TITLE + ADD BUTTON */}
      <div style={styles.sectionHeader}>
        <h2>Properties</h2>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={styles.primaryButton}
          >
            + Add Property
          </button>
        )}
      </div>

      {/* FORM */}
      {showForm && (
        <section style={styles.formCard}>
          <h2>{editingId ? "Edit Property" : "Add New Property"}</h2>

          <label style={styles.label}>Property Name</label>

          <input
            type="text"
            placeholder="Example: Modern Family House"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Description</label>

          <textarea
            placeholder="Describe the property..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            style={styles.input}
          />

          <label style={styles.label}>Location</label>

          <input
            type="text"
            placeholder="Example: Limbe, Cameroon"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Price</label>

          <input
            type="text"
            placeholder="Example: 75 million"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Status</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={styles.input}
          >
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Rented">Rented</option>
          </select>

          <label style={styles.label}>Property Type</label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={styles.input}
          >
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Land">Land</option>
            <option value="Office">Office</option>
            <option value="Shop">Shop</option>
            <option value="Building">Building</option>
          </select>

          {/* EXISTING IMAGES */}
          {editingId && existingImages.length > 0 && (
            <div style={styles.imageSection}>
              <h3>Current Pictures</h3>

              <div style={styles.imageGrid}>
                {existingImages.map((image, index) => (
                  <div key={index} style={styles.imageBox}>
                    <img
                      src={typeof image === "string" ? image : image.url}
                      alt="Property"
                      style={styles.image}
                    />

                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      style={styles.removeButton}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NEW IMAGES */}
          <label style={styles.label}>
            {editingId
              ? "Add New Pictures"
              : "Property Pictures"}
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            style={styles.input}
          />

          {imagePreviews.length > 0 && (
            <div>
              <h3>New Pictures</h3>

              <div style={styles.imageGrid}>
                {imagePreviews.map((preview, index) => (
                  <div key={index} style={styles.imageBox}>
                    <img
                      src={preview}
                      alt="New property"
                      style={styles.image}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/*PROPERTY VIDEO*/}
          <label style={styles.label}>Property Video</label>
          
          <input
          type="file" accept="video/*"
          multiple onChange={(e) =>
            setVideos(Array.from(e.target.files || []))
          }
          style={styles.input}/>
          {videos.length>0 && (
            <p>{videos.length} video selected</p>
          )}

          {/* BUTTONS */}
          <div style={styles.buttonRow}>
            <button
              onClick={saveProperty}
              disabled={loading}
              style={styles.primaryButton}
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update Property"
                : "Save Property"}
            </button>

            <button
              onClick={resetForm}
              disabled={loading}
              style={styles.cancelButton}
            >
                Cancel`
              </button>
            </div>
          </section>
        )}
`
      {/* PROPERTY LIST */}
      {properties.length === 0 ? (
        <div style={styles.empty}>
          <h3>No properties found.</h3>

          <p>
            Click <strong>+ Add Property</strong> to add your first property.
          </p>
        </div>
      ) : (
        <div style={styles.propertyGrid}>
          {properties.map((property) => {
            const propertyImages = property.images || [];

            return (
              <article key={property.id} style={styles.propertyCard}>
                {/* MAIN IMAGE */}
                {propertyImages.length > 0 ? (
                  <img
                    src={
                      typeof propertyImages[0] === "string"
                        ? propertyImages[0]
                        : propertyImages[0].url
                    }
                    alt={property.name}
                    style={styles.propertyImage}
                  />
                ) : (
                  <div style={styles.noImage}>
                    No picture
                  </div>
                )}

                <div style={styles.propertyContent}>
                  <h3>{property.name}</h3>

                  <p>{property.description}</p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {property.location}
                  </p>

                  <p>
                    <strong>Price:</strong>{" "}
                    {property.price}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {property.status}
                  </p>

                  <p>
                    <strong>Type:</strong>{" "}
                    {property.type}
                  </p>

                  {propertyImages.length > 0 && (
                    <p>
                      🖼️ {propertyImages.length} picture
                      {propertyImages.length !== 1
                        ? "s"
                        : ""}
                    </p>
                  )}

                  {property.videos &&
                  property.videos.length > 0 &&
                  (
                    <div style={{marginTop:
                      "10px"
                    }}>
                      <p>{property.videos.length} video(s)</p>

                      {property.videos.map((video, index) =>(
                        <video
                        key={index}
                        src={typeof video === "string"? video : video.url}
                        controls
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          marginTop: "8px",
                        }}
                        />
                      ))}
                      </div>
                  )
                  }

                  <div style={styles.buttonRow}>
                    <button
                      onClick={() => editProperty(property)}
                      style={styles.editButton}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => deleteProperty(property)}
                      disabled={loading}
                      style={styles.deleteButton}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

/* ---------------------------------
   STYLES
--------------------------------- */

const styles = {
  page: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "30px 20px",
    fontFamily: "Arial, sans-serif",
  },

  center: {
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },

  loginLink: {
    marginTop: "10px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  title: {
    margin: "0",
  },

  subtitle: {
    margin: "5px 0",
    fontSize: "20px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginTop: "25px",
    flexWrap: "wrap",
  },

  formCard: {
    marginTop: "20px",
    marginBottom: "30px",
    padding: "25px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    background: "#fafafa",
  },

  label: {
    display: "block",
    fontWeight: "bold",
    marginTop: "15px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "7px",
    border: "1px solid #ccc",
    borderRadius: "7px",
    boxSizing: "border-box",
    fontSize: "16px",
    background: "#fff",
  },

  primaryButton: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
    background: "#111",
    color: "#fff",
    fontSize: "15px",
  },

  signOutButton: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
    background: "#222",
    color: "#fff",
  },

  cancelButton: {
    padding: "12px 20px",
    border: "1px solid #ccc",
    borderRadius: "7px",
    cursor: "pointer",
    background: "#fff",
    fontSize: "15px",
  },

  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
    flexWrap: "wrap",
  },

  propertyGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  propertyCard: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    overflow: "hidden",
    background: "#fff",
  },

  propertyImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    display: "block",
  },

  noImage: {
    height: "220px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eee",
  },

  propertyContent: {
    padding: "18px",
  },

  editButton: {
    padding: "9px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    background: "#ddd",
  },

  deleteButton: {
    padding: "9px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    background: "#b00020",
    color: "#fff",
  },

  imageSection: {
    marginTop: "20px",
  },

  imageGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "15px",
    marginTop: "10px",
  },

  imageBox: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    background: "#fff",
  },

  image: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    display: "block",
  },

  removeButton: {
    width: "100%",
    padding: "8px",
    border: "none",
    cursor: "pointer",
    background: "#b00020",
    color: "#fff",
  },

  empty: {
    marginTop: "30px",
    padding: "30px",
    textAlign: "center",
    border: "1px dashed #ccc",
    borderRadius: "10px",
  },
};
