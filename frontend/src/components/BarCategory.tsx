function BarCategory() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="text-lg font-semibold mb-4">Par catégorie</h3>

      <div className="space-y-3">
        {["Logement", "Alimentation", "Transport", "Santé", "Loisirs"].map(
          (cat) => (
            <div key={cat} className="flex items-center justify-between">
              <p className="text-sm text-gray-700">{cat}</p>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-gray-800"></div>
              </div>
              <div>$345</div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default BarCategory;
