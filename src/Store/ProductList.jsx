import { useEffect, useState } from "react"
import Product from "./Product"

export default function ProductList(){
    const [productList,setProductList]=useState([])
    const [categories,setCategoryList]=useState([])
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchInput,setSearchInput]=useState('')
   
    const getProducts = () =>{
         fetch('https://fakestoreapi.com/products')
        .then(response => response.json().then(response => console.log(setProductList(response))))
    }
    const getCategories = () =>{
         fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json().then(response => console.log(setCategoryList(response))))
    }
    useEffect(( )=> { getProducts()},[])
    useEffect(( )=> { getCategories()},[])
    const handleSearchCategory = (category) => {
        setSelectedCategory(category)
    }
    const displayCategories = ( ) => {
        return categories.map(category =>   <button
            key={category}
            onClick={() => handleSearchCategory(category)}
            className={`btn btn-secondary ${selectedCategory === category ? 'active' : ''}`}
        >
            {category}
        </button> )
    }
    const displayProducts = ( ) => {
        const productTemp = productList.filter(product => {
            console.log(product.id)
            return product.title.includes(searchInput) || product.id.toString().includes(searchInput)|| product.description.includes(searchInput)
        })
        return productTemp.map((product , key)=> {return <Product product={product} key={key}/>})
    }
     const handleSearch = (e) => {
        e.preventDefault()
        const searchValue = document.querySelector('#search').value
        setSearchInput(searchValue)
     }
    return <div className='container-fluix mx-auto w-75 my-3'>
        <h2>Search :</h2>
        <form>
        <div className="form-group">
        <label> Search </label>
        <input type="text " id="search" className="form-control " />
        </div>
        <input type="submit" className="btn btn-primary" value='Search' onClick={handleSearch}/>
        <h5> Categories: </h5>
        <div className="row g-3 align)items-center">   
            <div className="btn-group">  {displayCategories()} </div>
        </div>
        </form>
    <h1>Products:</h1>
    <table className="table">
    <thead>
    <tr> 
     <th> #ID </th>
     <th> Title </th>
     <th> Price </th>
     <th> Description </th>
     <th> Category </th>
     <th> Image </th>
     <th> Rating </th>
     
    </tr>
    </thead>
    <tbody>
   {displayProducts()}

    </tbody>
        </table>
    </div>
}
