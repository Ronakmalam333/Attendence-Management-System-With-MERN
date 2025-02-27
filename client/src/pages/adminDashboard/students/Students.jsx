
import React from 'react'
import './students.css'

function Students() {
  // Mock student data
  const students = [
    { id: 1, name: 'Ronak Malam', email: '24BTCSE025@raiuniversity.edu', status: 'Active' },
    { id: 2, name: 'Anmol Sinha', email: '24BTCSE107@raiuniversity.edu', status: 'Active' },
    { id: 3, name: 'Jugendra Kashyap', email: '24BTCSE079@raiuniversity.edu', status: 'Inactive' }
  ];

  return (
    <div className='students-contain'>
      <h1>Students</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


export default Students
