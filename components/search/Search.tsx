import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

const Search = () => {
  const router = useRouter()
  const [params, setParams] = useState({
    "name": (router.query.name !== undefined) ? router.query.name : "",
    "department": (router.query.department !== undefined) ? router.query.department : "",
  });

  
  const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    const changedParams = {...params, [name]: value}
    setParams(changedParams)
  }
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(`/?name=${params.name}&department=${params.department}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name </label> 
      <input 
        type="text"
        name="name"
        value={params.name}
        onChange={handleChange}
      />
      <label>Department </label> 
      <select
        name="department"
        value={params.department}
        onChange={handleChange}            
      >
        <option value="">--Any--</option>
        <option value="Engineering">Engineering</option>
        <option value="Marketing">Marketing</option>
        <option value="Product">Product</option>
        <option value="Sales">Sales</option>
      </select>
      <button type='submit'>
        Search
      </button>
    </form>
  )
}

export default Search