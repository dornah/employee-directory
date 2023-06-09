import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/header/Header'
import EmployeeList from '@/components/employeeList/EmployeeList'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Employee Directory</title>
        <meta name="description" content="Employee directory demo app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={inter.className}>
        <Header />
        <EmployeeList />
      </main>      
    </>
  )
}
