const TripsListItem = function (props) {
  return (
    <tr>
      <td>{props.item}</td>
      <td>{props.from}</td>
      <td>{props.to}</td>
      <td>{props.plate}</td>
      <td>{props.driver}</td>
      <td>{props.passengers}</td>
    </tr>
  );
};

export default TripsListItem;
