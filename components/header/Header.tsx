import Search from "../search/Search"
import styles from "./header.module.css"
import Link from "next/link"

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        
        <div className={styles.headerRow}>
          <h2>Employee Directory</h2>
          <Link href={'/employee/new'}>
            Add Employee
          </Link>
        </div>
        
        <Search />
              
      </div>
    </div>
  )
}

export default Header