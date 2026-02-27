export default function JobFilters({ filters, categories, locations, onChange, onApply, onReset }) {
  return (
    <form onSubmit={onApply} className="panel mb-6 space-y-4 p-4 sm:p-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input
          type="text"
          name="search"
          placeholder="Search title, company, keyword"
          className="input lg:col-span-2"
          value={filters.search}
          onChange={onChange}
        />

        <select name="category" className="input" value={filters.category} onChange={onChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select name="location" className="input" value={filters.location} onChange={onChange}>
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button type="submit" className="button-primary">
          Apply Filters
        </button>
        <button type="button" className="button-secondary" onClick={onReset}>
          Reset
        </button>
      </div>
    </form>
  );
}