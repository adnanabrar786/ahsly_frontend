import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, selectCategory } from "../../app/features/categorySlice";
import { fetchProducts, selectProducts } from "../../app/features/productSlice";

import FilterAccordion from "../../components/FilterAccordion";
import ProductCard from "../../components/ProductCard";

import product from "../../styles/ProductsNew.module.scss";

import bed from "../assets/bed.webp";
import Image from "next/image";
import iconone from "../assets/iconone.PNG";
import iconotwo from "../assets/iconotwo.PNG";
import iconthree from "../assets/iconthree.PNG";
import iconfour from "../assets/iconfour.PNG";

const Products = () => {
  const [productsByCat, setProductsByCat] = useState([]);

  // query params
  const router = useRouter();
  const { categorySlug } = router.query;

  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategory);

  const filteredProducts = products?.filter((fp) => {
    return fp.category_id.slug === categorySlug;
  });

  const currentCategory = categories?.find((cat) => cat.slug === categorySlug);
  const parentCategory = categories?.find((cat) => cat._id == currentCategory?.parent_id);

  const catClickHandler = (slug) => {
    const pros = products?.filter((fp) => {
      return fp.category_id.slug === slug;
    });

    setProductsByCat(pros);
  };

  const siblingCategories = categories?.filter((cat) => cat.parent_id === parentCategory._id);
  const topCategoriesExceptOne = siblingCategories?.filter((cat) => cat.slug !== categorySlug);


  // useEffect(() => {
  //   // dispatch(fetchCategory());
  //   // dispatch(fetchProducts());
  // }, [dispatch]);

  return (
    <div className={product.products_wrapper}>
      <div className={product.filter_products_wrapper}>
        <div className={product.filters_wrapper}>
          <div className={product.filter_heading}>
            <h3>{categorySlug?.replace(/-/g, " ")}</h3>
            {/* <p>N of Ns Products Showing</p> */}
          </div>
          <div className={product.filters_cat}>
            <h3>{parentCategory?.title}</h3>
            {siblingCategories?.map((siblingCats) => (
              <p
                key={siblingCats._id}
                onClick={() => catClickHandler(siblingCats.slug)}
              >
                {siblingCats.title}
              </p>
            ))}
          </div>
          <div className={product.filter_cats}>
            <FilterAccordion />
          </div>
        </div>
        {/* filters ends here  */}
        <div className={product.products_item_wrapper}>
          {/* new work start top sub categories */}
          <div className={product.images_fiter}>
            {topCategoriesExceptOne?.slice(0, 5).map((siblingCats) => (
              <div className={product.images_fiter_wrapper}
                key={siblingCats._id}>
                <div className={product.sub_categories_image_div}
                  onClick={() => catClickHandler(siblingCats.slug)}>
                  <div className={product.sub_categories_image}>
                    <Image
                      className={product.image}
                      src={iconone}
                      alt="Picture of the author"
                      layout="fill"
                      // width={50}
                      // height={50}
                      priority
                    />
                  </div>
                </div>
                <p
                  // key={siblingCats._id}
                  className={product.sub_categories_name}
                  onClick={() => catClickHandler(siblingCats.slug)}>
                  {siblingCats.title}
                </p>
              </div>
            ))}
          </div>
          {/* new work end  sub categories */}

          {/* sub_categories new work */}
          {/* <div className={product.sub_categories}>
            <div className={product.sub_categories_image_wrapper}>
              <div className={product.sub_categories_image_div}>
                <div className={product.sub_categories_image}>
                  <Image
                    className={product.image}
                    src={iconone}
                    alt="Picture of the author"
                    layout="fill"
                    priority
                  />
                </div>
              </div>
              <div className={product.sub_categories_name}>Standard</div>
            </div>


            <div className={product.sub_categories_image_wrapper}>
              <div className={product.sub_categories_image_div}>
                <div className={product.sub_categories_image}>
                  <Image
                    className={product.image}
                    src={iconotwo}
                    alt="Picture of the author"
                    layout="fill"
                    priority
                  />
                </div>
              </div>
              <div className={product.sub_categories_name}>Standard</div>
            </div>

            <div className={product.sub_categories_image_wrapper}>
              <div className={product.sub_categories_image_div}>
                <div className={product.sub_categories_image}>
                  <Image
                    className={product.image}
                    src={iconthree}
                    alt="Picture of the author"
                    layout="fill"
                    priority
                  />
                </div>
              </div>
              <div className={product.sub_categories_name}>Standard</div>
            </div>

            <div className={product.sub_categories_image_wrapper}>
              <div className={product.sub_categories_image_div}>
                <div className={product.sub_categories_image}>
                  <Image
                    className={product.image}
                    src={iconfour}
                    alt="Picture of the author"
                    layout="fill"
                    priority
                  />
                </div>
              </div>
              <div className={product.sub_categories_name}>Standard</div>
            </div>

            <div className={product.sub_categories_image_wrapper}>
              <div className={product.sub_categories_image_div}>
                <div className={product.sub_categories_image}>
                  <Image
                    className={product.image}
                    src={iconfour}
                    alt="Picture of the author"
                    layout="fill"
                    priority
                  />
                </div>
              </div>
              <div className={product.sub_categories_name}>Standard</div>
            </div>
          </div> */}
          <div>
          </div>

          {/* sub categories new work */}

          {/* <div className={product.categories_wrapper}>
            <CategoriesCard img={catchair} title="" />
            <CategoriesCard img={catchair} title="" />
            <CategoriesCard img={catchair} title="" />
            <CategoriesCard img={catchair} title="" />
            <CategoriesCard img={catchair} title="" />
          </div> */}
          {/* cats ends here  */}
          <div className={product.products_cards_wrapper}>
            {!filteredProducts ? (
              <h5 style={{ margin: "80px auto" }}>No Products Found</h5>
            ) : (
              (productsByCat.length > 0 ? productsByCat : filteredProducts)?.map(
                (product) => (
                  <ProductCard key={product._id} cardProduct={product} />
                )
              )
            )}
          </div>
          {/* products cards ends here  */}
        </div>
      </div>
    </div>
  );
};

export default Products;
