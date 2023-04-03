import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import Employee from '../../../models/Employee'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query, method } = req    
    
    await dbConnect()

    switch (method) {
        case 'GET':
            try {
              const employee = await Employee.findById(query.id)
              res.status(200).json(employee)
            } catch (error) {
              res.status(400).json("Error fetching the employee.")
            }
            break
        case 'PUT':
            try {
                const employee = await Employee.findByIdAndUpdate(query.id, {$set: req.body}, {new: true})
                res.status(200).json(employee)
            } catch (error) {
                res.status(400).json("Error fetching the employee.")
            }
            break
        case 'DELETE':
            try {
                await Employee.findByIdAndDelete(query.id)
                res.status(200).json("Employee deleted.")
            } catch (error) {
                res.status(400).json("Error deleting employee.")
            }
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}