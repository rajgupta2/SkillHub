"use Client";
import { useState } from "react";
import { Plus, X } from "lucide-react";

export function AddSidebarItem({set_Links}:{  set_Links:(linkName:string)=>void }) {
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="w-full">
      {/* PLUS BUTTON */}
      {!showInput && (
        <button
          title="Add new link"
          className="flex items-center justify-end gap-2 mb-4 w-full px-3 py-2 rounded-lg
           hover:bg-blue-700 text-white transition-all duration-300"
          onClick={() => setShowInput(true)}

        >
          <Plus className="w-5 h-5" />
        </button>
      )}

      {/* INPUT BOX + CROSS BUTTON */}
      {showInput && (
        <div
          className="flex items-center gap-2 mb-4 w-full bg-white/10 backdrop-blur-sm
          border border-blue-300 rounded-lg px-3 py-2 mt-1 transition-all duration-300
          shadow-md"
        >
            <input
              type="text"
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                 set_Links(value);
                 setShowInput(false);
                 setValue("");
                }
              }}
              placeholder="Enter link name..."
              className="flex-1 bg-transparent text-white placeholder-blue-200
              focus:outline-none text-sm"
            />
          <button
            onClick={() => {
              setShowInput(false);
              setValue("");
            }}

            className="p-1 rounded hover:bg-white/20 transition"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
