import { useEffect, useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getMembers } from '../api/memberData';
import MemberCard from '../components/MemberCard';

function Home() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');

  const { user } = useAuth();

  const getAllMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredMembers = members.filter((member) => {
    const query = search.toLowerCase();
    return (
      member.name.toLowerCase().includes(query)
      || member.position.toLowerCase().includes(query)
      || member.role.toLowerCase().includes(query)
    );
  });

  return (
    <div className="text-center my-4">
      <h1>My Team</h1>
      <Form className="d-flex justify-content-center mb-3">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={handleSearch}
          value={search}
        />
      </Form>
      <div className="d-flex flex-wrap justify-content-center">
        {filteredMembers.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllMembers} />
        ))}
      </div>
    </div>
  );
}

export default Home;
