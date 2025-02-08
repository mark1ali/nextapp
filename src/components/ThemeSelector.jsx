"use client"
import { useTheme } from "@/context/ThemeContext";

const ThemeSelector = () => {
  const { themeColor, setThemeColor } = useTheme();

  // Color palette options
  const colors = ["#4F46E5", "#E11D48", "#10B981", "#F59E0B", "#6366F1"];

  return (
    <div className="p-4 flex gap-3">
      {colors.map((color) => (
        <button
          key={color}
          className="w-50 h-2220 rounded-full border-2"
          style={{ backgroundColor: color, borderColor: themeColor === color ? "#000" : "transparent" }}
          onClick={() => setThemeColor(color)}
        />
      ))}
    </div>
  );
};

export default ThemeSelector;
