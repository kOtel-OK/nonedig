import { useSelector, useDispatch } from 'react-redux';
import TripsList from './TripsList';
import PopUpWindow from '../../ui/PopUpWindow';
import AddTripForm from './AddTripForm';
import { getAvailableDriversThunk } from '../../../store/admin-slice';
import { authActions } from '../../../store/auth-slice';

import { Row, Button } from 'react-bootstrap';

const Trips = function () {
  const trips = useSelector(state => state.admin.trips);
  const dispatch = useDispatch();

  const addTripClickHandler = () => {
    dispatch(authActions.openModal());
    dispatch(getAvailableDriversThunk());
  };

  return (
    <>
      <PopUpWindow heading="Provide trip details">
        <AddTripForm />
      </PopUpWindow>
      <TripsList trips={trips} />
      {trips.length === 0 && (
        <div className="text-center mb-3">
          No any trips yet, you can add some :)
        </div>
      )}
      <Row>
        <Button onClick={addTripClickHandler}>Add Trip</Button>
      </Row>
    </>
  );
};

export default Trips;
