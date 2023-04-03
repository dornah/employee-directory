import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './employeeCreateForm.module.css'
import headerStyles from '../header/header.module.css'
import axios from 'axios'


const EmployeeCreateForm = () => {
  const [employee, setEmployee] = useState({
    "firstName": "",
    "lastName": "",
    "department": "",
    "title": "",
  });
  const router = useRouter()
  
  const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    const changedEmployee = {...employee, [name]: value}
    setEmployee(changedEmployee)
  }
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      await axios.post('/api/employees', employee)

      router.push('/')
  }
  return (
    <>
      <div className={headerStyles.header}>
      <div className={headerStyles.headerContainer}>
        
        <div className={headerStyles.headerRow}>
          <h2>Create Employee</h2>
          <Link href={'/'}>
            Back to Directory
          </Link>
        </div>
                      
      </div>
    </div>
    <div className={styles.employeeForm}>
      <div className={styles.container}>  
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name</label>
            <input 
              type="text"
              name="firstName"
              value={employee.firstName} 
              onChange={handleChange}
              required
              maxLength={50}
            />
          </div>

          <div>          
            <label>Last Name</label>
            <input 
              type="text"
              name="lastName"
              value={employee.lastName}
              onChange={handleChange}
              required
              maxLength={50}
            />
          </div>

          <div>          
            <label>Department</label>
            <select
              name="department"
              value={employee.department}
              onChange={handleChange}            
            >
              <option value="">-- None --</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Product">Product</option>
              <option value="Sales">Sales</option>
            </select>             
          </div>

          <div>          
            <label>Title</label>
            <input 
              type="text"
              name="title"
              value={employee.title}
              onChange={handleChange}
              maxLength={50}
            />            
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default EmployeeCreateForm