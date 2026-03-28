import { Link } from "react-router-dom";
import { Constants } from "@/integrations/supabase/types";

const categories = Constants.public.Enums.poem_category;

const CategoryBrowse = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 pb-20">
      <h2 className="text-xl font-bold text-foreground mb-6">Browse by Category</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/poems?category=${cat.toLowerCase()}`}
            className="px-5 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {cat}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryBrowse;
