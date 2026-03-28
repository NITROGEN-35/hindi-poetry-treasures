import { categories } from "@/data/poems";

const CategoryBrowse = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 pb-20">
      <h2 className="text-xl font-bold text-foreground mb-6">Browse by Category</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-5 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryBrowse;
