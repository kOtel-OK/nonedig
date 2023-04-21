import TripsListItem from './TripsListItem';
import Table from 'react-bootstrap/Table';

import classes from './Trips.module.css';

const TripsList = function (props) {
  console.log(props.trips.length);

  return (
    <Table
      className={['text-center', classes['trip-list']]}
      striped
      bordered
      responsive
      hover
      size="xs"
    >
      <thead>
        <tr>
          <th>#</th>
          <th>From</th>
          <th>To</th>
          <th>Plate</th>
          <th>Driver</th>
          <th>Passengers</th>
        </tr>
      </thead>
      <tbody>
        {props.trips.map((el, idx) => {
          return (
            <TripsListItem
              item={idx + 1}
              id={el.id}
              from={el.from}
              to={el.to}
              plate={el.plate}
              driver={el.driver.name}
              passengers={el.passengers}
              key={el.id}
            />
          );
        })}
      </tbody>
    </Table>
  );
};

export default TripsList;
