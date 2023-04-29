import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createTeam, updateTeam } from '../../api/teamData';

const initialState = {
  team_name: '',
  isPublic: false,
  firebaseKey: '',
};

function TeamForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTeam(formInput)
        .then(() => router.push(`/team/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeam(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTeam(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="mb-4">{obj.firebaseKey ? 'Edit' : 'Create'} Team</h2>
      <FloatingLabel controlId="floatingInput1" label="Team Name" className="mb-3">
        <Form.Control
          type="text"
          name="team_name"
          value={formInput.team_name}
          onChange={handleChange}
          placeholder="Team Name"
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingCheckbox" className="mb-3">
        <Form.Check
          type="checkbox"
          id="isPublic"
          name="isPublic"
          value={formInput.isPublic}
          onChange={handleChange}
          label="Public"
        />
      </FloatingLabel>

      <Button variant="primary" type="submit">
        {obj.firebaseKey ? 'Update' : 'Submit'}
      </Button>
    </Form>
  );
}

TeamForm.propTypes = {
  obj: PropTypes.shape({
    team_name: PropTypes.string,
    isPublic: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

TeamForm.defaultProps = { obj: initialState };

export default TeamForm;
