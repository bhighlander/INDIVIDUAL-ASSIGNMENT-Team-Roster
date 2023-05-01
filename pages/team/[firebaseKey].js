import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getTeamMembers } from '../../api/teamData';
import MemberCard from '../../components/MemberCard';
import getTeamDetails from '../../api/mergedData';

function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const [members, setMembers] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getTeamDetails(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);

  useEffect(() => {
    getTeamMembers(firebaseKey).then(setMembers);
  }, [firebaseKey]);

  return (
    <div className="text-center my-4">
      <h1>{teamDetails.team_name}</h1>
      <h2>Public: {teamDetails.isPublic ? 'Yes' : 'No'}</h2>
      <h2>Members:</h2>
      {members.map((member) => (
        <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getTeamMembers} />
      ))}
    </div>
  );
}

export default ViewTeam;
