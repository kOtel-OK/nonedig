import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { signInWithPhoneThunk } from '../../store/auth-slice';
import { confirmPhoneNumberThunk } from '../../store/auth-slice';

import { Form, Button, InputGroup } from 'react-bootstrap';

const PhoneSignInForm = function () {
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const captchaStatus = useSelector(state => state.auth.captchaStatus);

  const btnsDisabled = !captchaStatus;

  const phoneRef = useRef();
  const confirmCodeFef = useRef();
  const formRef = useRef();

  const onPhoneNumberSentHandler = () => {
    const form = formRef.current;

    if (form.checkValidity() === true) {
      const phone = phoneRef.current.value;
      dispatch(signInWithPhoneThunk(phone));
    }
    setValidated(true);
  };

  const onConfirmCodeHandler = event => {
    event.preventDefault();
    const confirmCode = confirmCodeFef.current.value;
    dispatch(confirmPhoneNumberThunk(confirmCode));
  };
  return (
    <>
      <Form
        onSubmit={onConfirmCodeHandler}
        ref={formRef}
        noValidate
        validated={validated}
      >
        <InputGroup className="mb-3">
          <Form.Control
            ref={phoneRef}
            type="tel"
            pattern="^\+\d{12}$"
            required
            placeholder="Phone number (+380738857438)"
            aria-label="Phone number"
          />

          <Button variant="outline-primary" onClick={onPhoneNumberSentHandler}>
            Send
          </Button>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </InputGroup>

        <InputGroup className="mb-3">
          <Form.Control
            ref={confirmCodeFef}
            disabled={btnsDisabled}
            type="text"
            pattern="^\d{6}$"
            placeholder="Your code from SMS"
            aria-label="Your code from SMS"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </InputGroup>

        <Button
          variant="primary"
          className="w-100 mt-3"
          disabled={btnsDisabled}
          type="submit"
        >
          Send code
        </Button>
      </Form>
    </>
  );
};

export default PhoneSignInForm;
