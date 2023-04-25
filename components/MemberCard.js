import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteMember } from '../api/memberData';

function MemberCard({ memberObj, onUpdate }) {
  const deleteThisMember = () => {
    if (window.confirm(`Are you sure you want to delete ${memberObj.name}?`)) {
      deleteMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{memberObj.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{memberObj.position}</Card.Subtitle>
        <Card.Text>
          {memberObj.role}
        </Card.Text>
        <Link href={`/member/view/${memberObj.firebaseKey}`} passHref>
          <Button variant="info">View</Button>
        </Link>
        <Link href={`/member/edit/${memberObj.firebaseKey}`} passHref>
          <Button variant="primary">Edit</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisMember}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MemberCard;
