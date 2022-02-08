import '../Styles/Styles.css';

/** Represente un écrans de chargement
 * 
 * @returns Un composent de chargement
 */
export const Loading = (() => {
  return (
    <div className="spinner">
      <span>Loading</span>
      <div className="half-spinner"></div>
    </div>
  );
});