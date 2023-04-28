import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleTeam } from '../../api/teamData';

function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);

  return (
    <div className="text-center my-4">
      <h1>{teamDetails.team_name}</h1>
      <h2>Public: {teamDetails.isPublic ? 'Yes' : 'No'}</h2>
    </div>
  );
}

export default ViewTeam;
