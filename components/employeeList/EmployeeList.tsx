import EmployeeRow, { EmployeeRowProps } from "../employeeRow/EmployeeRow"
import styles from "./employeeList.module.css"
import useSWR from "swr"
import axios from "axios"
import { useRouter } from "next/router"
import Link from "next/link"

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const EmployeeList = () => {
  const {asPath} = useRouter()
  const { data, error, isLoading } = useSWR(`/api/employees${asPath}`, fetcher)
  
  if (error) return error
  
  return (
    isLoading?
    <></>
    :
    <div className={styles.employeeList}>
      <div className={styles.employeeListContainer}>
        <table className={styles.employeeListTable}>
          <thead>
            <tr>
              <th className={styles.sortable} >
                Name
                <Sort sort_by="name"></Sort>
              </th>
              <th>Department</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee: EmployeeRowProps) => <EmployeeRow key={employee._id} {...employee} />)}
          </tbody>
        </table>
      </div>
    </div>

  )
}

const Sort = (props: {sort_by: string}) => {
  const {query} = useRouter()
  let sortUrl = "/?"
  let resetUrl = "/"
  if (query.name !== undefined) {
    sortUrl = `/?name=${query.name}&department=${query.department}&`
    resetUrl = `/?name=${query.name}&department=${query.department}` 
  }

  return (
    <span>
      Sort(
        <Link href={`${sortUrl}sort_by=${props.sort_by}&sort_dir=asc`}>asc</Link>,
        <Link href={`${sortUrl}sort_by=${props.sort_by}&sort_dir=desc`}>desc</Link>,
        <Link href={`${resetUrl}`}>none</Link>
      )
    </span>

  )
}

export default EmployeeList