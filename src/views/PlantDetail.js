import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import "../styles/style.css";

const PlantDetail = () => {
  const { id } = useParams(); //get plant ID from URL params
  const { user } = useContext(UserContext); //get current user context

  const [plant, setPlant] = useState(null); //plant data state
  const [error, setError] = useState(null); //error message state
  const [hasSubscribed, setHasSubscribed] = useState(false); //local subscription state (fake purchase)

  //fetch plant details on component mount or when id changes
  useEffect(() => {
    fetch(`/plants/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch plant details');
        return res.json();
      })
      .then(setPlant)
      .catch((err) => setError(err.message));
  }, [id]);

  //show error if fetch failed
  if (error) return <p className="text-danger">{error}</p>;

  //show loading while plant data is not ready
  if (!plant) return <p>Loading...</p>;

  //check if plant info is locked based on subscription, admin status, and sample flag
  const isLocked =
    !plant.is_sample && !user?.has_subscription && !user?.is_admin && !hasSubscribed;

  //fake subscription handler to unlock content for demonstration
  const handleFakeSubscribe = () => {
    alert(`Fake subscription purchased!`);
    setHasSubscribed(true);
  };

  //fields to show in the detail table (label => value)
  const fieldsToDisplay = {
    'Common Name': plant.common_name,
    'Scientific Name': plant.scientific_name,
    'Family': plant.family,
    'Description': plant.description,
    'Growing & Harvesting': plant.growing_harvesting,
    'Parts Used': plant.parts_used,
    'Physiological Actions': plant.physiological_actions,
    'Energetics': plant.energetics,
    'Ways to Use': plant.ways_to_use,
    'Uses': plant.uses,
    'Cautions': plant.cautions,
    'History': plant.history,
    'Magical': plant.magical,
  };

  return (
    <div className="container my-4">
      {/* back button to plant list */}
      <Link to="/plants" className="btn custom-btn mb-3">
        ← Back to Healing Plants
      </Link>

      {/* plant common name as title */}
      <h2>{plant.common_name}</h2>

      {/* plant image banner */}
      {plant.photo_url && (
        <img
          src={plant.photo_url}
          alt={plant.common_name}
          className="img-fluid w-100 mb-4 blog-post-banner"
        />
      )}

      {/* show subscription prompt if content is locked */}
      {isLocked ? (
        <div className="alert alert-warning">
          <p>This plant is part of the premium collection. Subscribe to access it.</p>
          <button onClick={handleFakeSubscribe} className="btn custom-btn">
            Fake Subscribe (€35/year)
          </button>
        </div>
      ) : (
        /* display plant info in a bordered table */
        <table className="table table-bordered">
          <tbody>
            {Object.entries(fieldsToDisplay).map(([label, value]) =>
              value ? (
                <tr key={label}>
                  <th className="plant-field-label">{label}</th>
                  <td>{value}</td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PlantDetail;

