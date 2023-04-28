import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/memberData';
import { getTeams } from '../../api/teamData';

const initialState = {
  name: '',
  position: '',
  role: '',
  team: '',
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [team, setTeam] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeam);
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
      updateMember(formInput)
        .then(() => router.push(`/member/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="mb-4">{obj.firebaseKey ? 'Edit' : 'Create'} Member</h2>
      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control
          type="text"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Position" className="mb-3">
        <Form.Control
          type="text"
          name="position"
          value={formInput.position}
          onChange={handleChange}
          placeholder="Position"
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Role" className="mb-3">
        <Form.Control
          type="text"
          name="role"
          value={formInput.role}
          onChange={handleChange}
          placeholder="Role"
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Team" className="mb-3">
        <Form.Select
          aria-label="Team"
          name="team"
          value={formInput.team} // Change this line
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option value="">Select a Team</option>
          {team.map((teamObj) => (
            <option key={teamObj.firebaseKey} value={teamObj.firebaseKey}>
              {teamObj.team_name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <Button variant="primary" type="submit">
        {obj.firebaseKey ? 'Update' : 'Create'} Member
      </Button>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
    team: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

export default MemberForm;
