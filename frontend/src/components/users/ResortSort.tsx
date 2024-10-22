
const SortResorts = () => {
  return (
    <div className="flex justify-end mb-4 ">
      <select >
        <option value="price">Sort by Price</option>
        <option value="rating">Sort by Rating</option>
        <option value="name">Sort by Name</option>
      </select>
    </div>
  );
};

export default SortResorts;
// { sortBy, setSortBy }
// value={sortBy} onChange={(e) => setSortBy(e.target.value)}