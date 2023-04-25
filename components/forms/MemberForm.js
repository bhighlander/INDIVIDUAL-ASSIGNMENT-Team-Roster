import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/memberData';

const initialState = {
  name: '',
  position: '',
  role: '',
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

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
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

export default MemberForm;
