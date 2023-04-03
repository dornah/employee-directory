import Head from 'next/head'
import { Inter } from 'next/font/google'
import EmployeeCreateForm from '@/components/employeeCreateForm/EmployeeCreateForm'

const inter = Inter({ subsets: ['latin'] })

export default function newEmployeePage() {
  return (
    <>
      <Head>
        <title>Employee Directory</title>
        <meta name="description" content="Employee directory demo app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={inter.className}>
        <EmployeeCreateForm />
      </main>      
    </>
  )
}
