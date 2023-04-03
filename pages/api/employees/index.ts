import { SortOrder } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import Employee from '../../../models/Employee'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, method } = req  
  
  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const employees = await Employee
          .find(getFilter(query))
          .collation({locale: "en"})
          .sort(getSort(query));
        res.status(200).json(employees)
      } catch (error) {
        res.status(400).json("Error fetching employees.")
      }
      break
    case 'POST':
      try {
        const employee = await Employee.create(
          req.body
        )
        res.status(201).json(employee)
      } catch (error) {
        res.status(400).json(error)
      }
      break
    default:
      res.status(400).json("Unexpected error.")
      break
  }
}

const getFilter = (query: Partial<{[k: string]: string | string[]}>) => {
    let filter: {[k: string]: any} = {};
    if (query.name) {
      filter.$or = [
        {firstName : { $regex: new RegExp('^' +query.name + '*', 'i') }},
        {lastName : { $regex: new RegExp('^' +query.name + '*', 'i') }},
      ]
    }
    if (query.department) {
      filter.department = query.department as string
    }
  return filter;
}

const getSort = (query: Partial<{[k: string]: string | string[]}>): {[key: string]: SortOrder} => {
  if (!query.sort_by) return {}

  const sort_dir = (query.sort_dir ? query.sort_dir : "asc") as SortOrder
  switch (query.sort_by as string) {
    case "name":
      return {"firstName": sort_dir}
    default:
      return {}
  }
}