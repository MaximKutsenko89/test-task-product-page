import ProductCard from "@/components/ProductCard/ProductCard";
import { SkeletonLoader } from "@/components/SkeletonLoader/SkeletonLoader";
import { useProductsQuery } from "@/redux/api";
import useUser from "@/redux/hooks/useUser";
import { useSearchParams } from "react-router-dom";
import Pagination from "rc-pagination";
import { useState } from "react";
import clsx from "clsx";
import "rc-pagination/assets/index.css";
import "./ProductPage.scss";

export default function ProductPage() {
  const [asideActive, setAsideActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    from: "",
    to: "",
    price_from: "",
    price_to: "",
    title: "",
  });
  const page = Number(searchParams.get("page"));
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const price_from = searchParams.get("price_from");
  const price_to = searchParams.get("price_to");
  const title = searchParams.get("title");

  const { user } = useUser();
  const {
    data: products,
    error,
    isLoading,
    isFetching,
  } = useProductsQuery({
    page: page,
    token: user.token,
    from: from || "",
    to: to || "",
    price_from: price_from || "",
    price_to: price_to || "",
    title: title || "",
  });
  function setSearchParamsHandler(key: string, value: string) {
    setSearchParams(
      (prev) => {
        prev.set(key, value);
        return prev;
      },
      {
        replace: true,
      }
    );
  }
  function pageHandler(page: number) {
    setSearchParamsHandler("page", page.toString());
  }

  function filterHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "title") {
      setSearchParamsHandler("page", "1");
    }
    const { name, value } = e.target;
    setSearchParamsHandler(name, value);
  }

  function resetDate() {
    setSearchParamsHandler("from", "");
    setSearchParamsHandler("to", "");
    setSearchParamsHandler("title", "");
    setSearchParamsHandler("price_to", "");
    setSearchParamsHandler("price_from", "");
  }

  return (
    <>
      <header>
        <h1>Welcome back {user?.userName}</h1>
        <button
          className="btn filter-btn"
          onClick={() => setAsideActive((prev) => !prev)}
        >
          {asideActive ? "Hide" : "Show"} filters
        </button>
      </header>
      <main>
        <aside
          className={clsx("filters-inner", {
            ["active"]: asideActive,
          })}
        >
          <div>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Find by name"
              value={title || ""}
              onChange={filterHandler}
            />
          </div>
          <div className="price-wrap">
            <div>Price</div>
            <input
              type="text"
              name="price_from"
              id="price_from"
              placeholder="0"
              value={price_from || ""}
              onChange={filterHandler}
            />
            <span>to</span>
            <input
              type="text"
              name="price_to"
              id="price_to "
              placeholder="0"
              value={price_to || ""}
              onChange={filterHandler}
            />
          </div>
          <div className="date-wrap">
            <input
              type="date"
              name="from"
              id="from"
              value={from || ""}
              onChange={filterHandler}
            />

            <input
              type="date"
              name="to"
              id="to"
              value={to || ""}
              onChange={filterHandler}
            />

            <button className="btn" onClick={resetDate}>
              Reset all filters
            </button>
            <button
              className="btn filter-btn"
              onClick={() => setAsideActive((prev) => !prev)}
            >
              {asideActive ? "Hide" : "Show"} filters
            </button>
          </div>
        </aside>

        {isFetching || isLoading ? (
          <div className="card-wrapper">
            {[...Array(6).keys()].map((item) => (
              <SkeletonLoader key={item} />
            ))}
          </div>
        ) : (
          <div className="card-wrapper">
            {products?.data.map((product) => {
              return <ProductCard key={product.id} {...product} />;
            })}
            {products?.data.length === 0 && (
              <div className="no-results">No results</div>
            )}
            {error && <div>Internal server error. Please try again later</div>}
          </div>
        )}
      </main>

      <footer className="pagination-wrap">
        <Pagination
          total={products?.total}
          defaultPageSize={6}
          current={page}
          onChange={pageHandler}
          className="pagination"
        />
      </footer>
    </>
  );
}
