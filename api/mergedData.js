import { getSingleMember } from './memberData';
import { getSingleTeam, getTeamMembers } from './teamData';

const getTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamMembers(teamFirebaseKey)])
    .then(([teamObject, teamMembersArray]) => {
      resolve({ ...teamObject, members: teamMembersArray });
    }).catch((error) => reject(error));
});

const viewMemberDetails = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey).then((memberObject) => {
    getSingleTeam(memberObject.teamId).then((teamObject) => {
      resolve({ ...memberObject, teamName: teamObject.team_name });
    });
  }).catch((error) => reject(error));
});

export { getTeamDetails, viewMemberDetails };
