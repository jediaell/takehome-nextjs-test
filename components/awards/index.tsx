import React, { useEffect, useState } from 'react';
import styles from '../../styles/Awards.module.css';
import { IconClose } from '../ui/Icon';
import { Category, CategoryData } from './category';
import { NomineeData } from './nominee';

export interface SelectedListData {
  [key: string]: NomineeData;
}

export const Awards: React.FC = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selectedList, setSelectedList] = useState<SelectedListData>({});
  const [showModal, setShowModal] = useState<boolean>(false);

  const updateList = (item: NomineeData, id: string) => {
    const newSelectedList = selectedList;
    newSelectedList[id] = item;
    setSelectedList(newSelectedList);
  };

  const submitList = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('api/ballots', { method: 'GET' });
      const data = await response.json();
      if (data.items) setCategories(data.items);
    };
    getData();
  }, []);
  return (
    <>
      <div className={styles.pageAwards}>
        <h1>Movie Awards 2021</h1>
        {categories.length > 0 &&
          categories.map((category: CategoryData, index: number) => (
            <div className={styles.categoryItem} key={`category-${index}`}>
              <Category
                selected={selectedList}
                isLast={index === categories.length - 1}
                category={category}
                handleSelect={updateList}
                handleSubmit={submitList}
              />
            </div>
          ))}
      </div>
      {showModal && (
        <div className={styles.modalBox}>
          <div className={styles.modalContent}>
            <div
              className={styles.btnClose}
              onClick={() => {
                setShowModal(false);
              }}
            >
              <IconClose />
            </div>
            <h3>SUCCESS</h3>
            {selectedList &&
              Object.keys(selectedList).map((id: string, index: number) => (
                <div className={styles.selectedItem} key={id}>
                  <h4>{id}:</h4>
                  <p>Title: {selectedList[id].title}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
