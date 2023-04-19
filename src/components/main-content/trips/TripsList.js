import TripsListItem from './TripsListItem';
import Table from 'react-bootstrap/Table';

const TripsList = function (props) {
  console.log(props.trips.length);

  return (
    <Table className="text-center" striped bordered responsive hover size="xs">
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
          const randomKey = Date.now() + Math.trunc(Math.random() * 1000 + 1);

          return (
            <>
              <TripsListItem
                item={idx + 1}
                id={el.driver.id}
                from={el.from}
                to={el.to}
                plate={el.plate}
                driver={el.driver.name}
                passengers={el.passengers}
                key={randomKey}
              />
            </>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TripsList;
