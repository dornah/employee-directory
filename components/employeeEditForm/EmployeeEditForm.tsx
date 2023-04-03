import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import styles from '../employeeCreateForm/employeeCreateForm.module.css'
import headerStyles from '../header/header.module.css'
import axios from 'axios'

interface Employee {
  _id: string,
  firstName: string,
  lastName: string,
  department: string,
  title: string,
}

const EmployeeEditForm = () => {
  const router = useRouter()
  const [employee, setEmployee] = useState<Employee>();

  useEffect(()=>{
    const getEmployee = async(url: string) => {
      try {
        const data = await axios.get(url).then(res => res.data)
        setEmployee(data)
      } catch (e) {
        router.push('/')
      }
    }
    getEmployee(`/api/employees/${router.query.id}`)
  }, [])  

  const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    if (!employee) return
    const name = e.target.name;
    const value = e.target.value;
    const changedEmployee = {...employee, [name]: value}
    setEmployee(changedEmployee)
  }
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      try {
        await axios.put(`/api/employees/${router.query.id}`, employee)
        router.push('/')
      } catch (e) {
        router.push('/')
      }
  }
  
  return (
    <>
    <div className={headerStyles.header}>
      <div className={headerStyles.headerContainer}>
        
        <div className={headerStyles.headerRow}>
          <h2>Edit Employee</h2>
          <Link href={'/'}>
            Back to Directory
          </Link>
        </div>
                      
      </div>
    </div>
    {employee !== undefined ?
      <div className={styles.employeeForm}>
        <div className={styles.container}>  
          <form onSubmit={handleSubmit}>            
            
            <div>
              <label>First Name</label>
              <input 
                type="text"
                id="firstName"
                name="firstName"
                value={employee.firstName} 
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Last Name</label>
              <input 
                type="text"
                id="lastName"
                name="lastName"
                value={employee.lastName}
                onChange={handleChange}
                required
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
      : <></>
    }
  </>
  )
}

export default EmployeeEditForm