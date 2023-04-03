import Head from 'next/head'
import { Inter } from 'next/font/google'
import EmployeeEditForm from '@/components/employeeEditForm/EmployeeEditForm'

const inter = Inter({ subsets: ['latin'] })

export default function editEmployeePage() {
  return (
    <>
      <Head>
        <title>Employee Directory</title>
        <meta name="description" content="Employee directory demo app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={inter.className}>
        <EmployeeEditForm />
      </main>      
    </>
  )
}


