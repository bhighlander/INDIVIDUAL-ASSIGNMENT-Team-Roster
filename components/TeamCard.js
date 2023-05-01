import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deleteTeam } from '../api/teamData';

function TeamCard({ teamObj, onUpdate }) {
  const deleteThisTeam = () => {
    if (window.confirm(`Are you sure you want to delete ${teamObj.team_name}?`)) {
      deleteTeam(teamObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{teamObj.team_name}</Card.Title>
        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button variant="info">View</Button>
        </Link>
        <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="primary">Edit</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisTeam}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    team_name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamCard;
