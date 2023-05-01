import { useEffect, useState } from 'react';
import { getTeams } from '../api/teamData';
import { useAuth } from '../utils/context/authContext';
import TeamCard from '../components/TeamCard';

function Teams() {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();

  const getAllTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  return (
    <div className="text-center my-4">
      <h1>My Teams</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {teams.map((team) => (
          <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTeams} />
        ))}
      </div>
    </div>
  );
}

export default Teams;
