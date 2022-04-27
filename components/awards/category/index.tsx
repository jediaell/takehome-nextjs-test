import React, { useState } from 'react';
import { SelectedListData } from '..';
import styles from '../../../styles/Category.module.css';
import { Nominee, NomineeData } from '../nominee';

export type CategoryData = {
  id: string;
  items: NomineeData[];
};

declare type PageProps = {
  category: CategoryData;
  selected: SelectedListData;
  isLast?: boolean;
  handleSelect: (item: NomineeData, id: string) => void;
  handleSubmit: () => void;
};
export const Category = ({
  category,
  isLast,
  handleSelect,
  handleSubmit,
}: PageProps) => {
  const [selected, setSelected] = useState<string>('');
  return (
    <div className={styles.pageCategory}>
      <h3>{category.id}</h3>
      <div className={styles.categoryContent}>
        {category.items.map((item: NomineeData, index: number) => (
          <Nominee
            key={`${category.id}-${item.id}`}
            isSelected={selected === item.id}
            item={item}
            clickHandler={(item: NomineeData) => {
              setSelected(item.id);
              handleSelect(item, category.id);
            }}
          />
        ))}
        {isLast && (
          <button className={styles.submitBtn} onClick={handleSubmit}>
            SUBMIT BALLOT BUTTON
          </button>
        )}
      </div>
    </div>
  );
};
