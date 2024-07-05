"use client";
import { FC, useState } from "react";

import "./Select.scss";

import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { TCategory } from "@/types/types";

type Props = {
  categories: TCategory[] | null;
  onSelect: (category: TCategory) => void;
};

export const Select: FC<Props> = ({ categories, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  if (!categories) return null;

  const handleSelect = (category: TCategory) => {
    setSelected(category.name);
    setIsOpen(false);
    onSelect(category);
  };

  return (
    <div className="select-wrapper">
      <button
        className={`select-button ${isOpen ? "select-button--open" : ""}`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={{ marginRight: "1rem" }}>
          {selected ?? "Select category"}
        </span>
        {selected ? null : isOpen ? <FiArrowUp /> : <FiArrowDown />}
      </button>

      {isOpen && (
        <div className="select-options">
          {categories.map((category) => (
            <button
              key={category.id}
              className="select-option"
              onClick={() => handleSelect(category)}
              type="button"
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
