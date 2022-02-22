import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { getCategories } from 'redux/slice/courseCategories';

const Submenu = () => {
  const { loading, categories } = useSelector(
    (state) => state.courseCategories
  );
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState(categories?.[0]?.subCategories);

  useEffect(() => {
    if (!loading && !categories.length) {
      dispatch(getCategories());
    }
  }, [dispatch]);

  const renderMenus = (menu, allowHover) => {
    if (!menu) return null;

    return (
      <div className='border border-border bg-bodyBg w-64 hidden group-hover:flex flex-col gap-4 mt-6 p-5'>
        {menu?.map((category, i) => (
          <Link href={category.url} key={i} passHref>
            <div
              onMouseOver={() => {
                if (allowHover) {
                  setActiveMenu(category?.subCategories);
                }
              }}
              className='flex justify-between item-center'
            >
              <p className='hover:text-primary'>{category.title}</p>
              <p>{allowHover && <NavigateNextIcon fontSize='small' />}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className='md:mx-3 lg:mx-8 py-6 cursor-pointer group'>
      <h3>Categories</h3>
      <div
        className='grid grid-cols-2 absolute drop-shadow-md z-10 h-96'
        style={{ fontSize: '0.95rem' }}
      >
        {renderMenus(categories, true)}
        {renderMenus(activeMenu)}
      </div>
    </div>
  );
};

export default Submenu;
