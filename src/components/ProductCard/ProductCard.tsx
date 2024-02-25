import { Product } from "@/types";
import React from "react";
import "./ProductCard.scss";

export default function ProductCard(props: Product) {
  const { price, thumbnail, title, id } = props;
  return (
    <div className="card">
      <div className="card__title">{title}</div>
      <div className="card__price">${Number(price)}</div>
      <img className="card__image" src={thumbnail} alt={title} />
      <div className="card__id">{id}</div>
    </div>
  );
}
