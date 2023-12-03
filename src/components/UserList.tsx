import React, { useEffect, useState } from 'react'

const UserList = ({gender}: {gender:string}) => {

  const [users, setUsers] =  useState<string[]>([]);

  useEffect(() => {
    console.log('Loading the users of ', gender);
    setUsers(['Tair', 'Sagi', 'Barel', 'Moshe', 'Natalia']);
  },[gender])

  return (
    <div>UserList</div>
  )
}

export default UserList