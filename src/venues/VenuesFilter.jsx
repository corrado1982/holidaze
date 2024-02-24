import { useState } from "react";
import { Link } from "react-router-dom";

function VenuesFilter({ posts = [] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filterProducts = posts.filter((post) =>
    post.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );
  console.log("filter", filterProducts);

  console.log("tape: ", searchTerm);
  return (
    <div className="flex flex-col items-center">
      <input
        className=" w-2/3 xl:w-1/3 h-10 rounded-lg"
        placeholder="Search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value.trim())}
      ></input>
      {searchTerm && (
        <ul className="absolute bg-teal-50 p-2 mt-6 w-1/3">
          {filterProducts.map((post) => {
            return (
              <li key={post.id}>
                <Link to={"/venue/" + post.id}>{post.name}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
export default VenuesFilter;
