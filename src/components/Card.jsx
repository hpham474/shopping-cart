import PropTypes from "prop-types";

function Card({ item }) {
  return (
    <div>
      <h2>{item.title}</h2>
      <p>{item.price}</p>
      <p>{item.description}</p>
    </div>
  );
}

Card.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Card;
