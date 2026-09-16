"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function TestPage() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function getProperties() {
      const snapshot = await getDocs(collection(db, "properties"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProperties(data);
    }

    getProperties();
  }, []);

  return (
    <div>
      <h1>Rigour Properties</h1>

      {properties.map((property) => (
        <div key={property.id}>
          <h2>{property.name}</h2>
          <p>{property.location}</p>
          <p>{property.price} FCFA</p>
        </div>
      ))}
    </div>
  );
}
