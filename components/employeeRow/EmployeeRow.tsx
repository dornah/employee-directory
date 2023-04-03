import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import styles from '../employeeList/employeeList.module.css'

export interface EmployeeRowProps {
    _id: string,
    firstName: string,
    lastName: string,
    department: string,
    title: string
}

const EmployeeRow = (props: EmployeeRowProps) => {
    const router = useRouter()
  
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/employees/${id}`)
            router.reload()
            
        } catch(error){
        }
    }
    return (
        <tr>
            <td>{props.firstName} {props.lastName}</td>
            <td>{props.department}</td>
            <td>{props.title}</td>
            <td>
                <Link href={`/employee/${props._id}`}>
                    Edit
                </Link>
                <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(props._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default EmployeeRow