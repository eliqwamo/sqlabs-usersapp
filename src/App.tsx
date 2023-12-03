import {useEffect, useState} from 'react'
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
    .then(results => {
      setUsers(results.data);
      setIsLoading(false);
    })
    .catch(err => {
      setErrorMsg(err.message)
      setIsLoading(false);
    })
  },[])

  //Optimistic update -> Update UI call server
  //Pessimistic update -> call server update UI

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter(x => x.id !== user.id))
    axios.delete('https://jsonplaceholder.typicode.com/users/' + user.id)
    .catch(err => {
      setErrorMsg(err.message)
      setUsers(originalUsers)
    })
  }


  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12 col-sm-12'>
            <h1>Hello Users App</h1>
            <br/>
            {errorMsg && <p className='text-danger'>{errorMsg}</p>}

            {isLoading && <div className='spinner-border'></div>}

            <ul className='list-group'>
            {
              users.map((user) => (
                <li key={user.id} className='list-group-item d-flex justify-content-between'>
                  {user.name}
                  <button onClick={() => deleteUser(user)} className='btn btn-outline-danger'>Delete</button>
                </li>
              ))
            }
            </ul>

          </div>
        </div>
      </div>
    </>
  )
}

export default App