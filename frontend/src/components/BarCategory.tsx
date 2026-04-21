function BarCategory({
  perCategory,
}: {
  perCategory: { categoryId: number; total: number }[];
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="text-lg font-semibold mb-4">Par catégorie</h3>
      <div className="space-y-3">
        {perCategory &&
          (() => {
            const max = Math.max(...perCategory.map((cat) => cat.total));

            return perCategory.map((cat) => {
              const percent = (cat.total / max) * 100;
              return (
                <div
                  key={cat.categoryId}
                  className="flex items-center justify-between gap-3"
                >
                  <p className="text-sm text-gray-700 w-24">{cat.categoryId}</p>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-800 transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="text-sm font-medium w-16 text-right">
                    {cat.total}
                  </div>
                </div>
              );
            });
          })()}
      </div>
    </div>
  );
}

export default BarCategory;
