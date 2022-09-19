import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ItemImage from "../ui/itemImage";
import Scale from "../common/scale";
import PriceItem from "../ui/priceItem";
import BuyButton from "../common/buttons/buyButton";
import SelectField from "../common/form/selectField";
import { useDispatch, useSelector } from "react-redux";
import {
  editItemBasket,
  getStore,
  storeAdding
} from "../../store/consumerBasket";

const CoffeeCardItem = ({ coffeeItem }) => {
  const dispatch = useDispatch();
  const basket = useSelector(getStore());

  const [name, setName] = useState();
  const [bean, setBean] = useState({ name: "beans", value: "Зерно" });
  const beans = [
    { _id: 1, value: "под чашку" },
    { _id: 2, value: "под фильтр" },
    { _id: 3, value: "под эспрессо" }
  ];
  useEffect(() => {
    if (!coffeeItem.price.quarter) {
      if (!coffeeItem.price.kg) {
        if (!coffeeItem.price.drip) {
          setName("");
        } else {
          setName("drip");
        }
      } else {
        setName("kg");
      }
    } else {
      setName("quarter");
    }
  }, []);

  const HandleChangeImg = (itemName) => {
    setName(itemName);
  };

  const handleChange = (item) => {
    setBean(item);
  };

  const handleSubmit = (item) => {
    let same = false;
    const order = {
      _id: coffeeItem._id + name,
      [bean.name]: bean.value,
      country: coffeeItem.country,
      sort: coffeeItem.sortName,
      quantity: item,
      price: coffeeItem.price[name]
    };
    basket.map((i) => {
      if (i._id === order._id) {
        same = true;
      }
      return i;
    });
    if (!same) {
      dispatch(storeAdding(order));
    } else {
      dispatch(editItemBasket(order));
    }
  };
  return (
    <>
      <div
        className="div m-2  text-center shadow p-2"
        style={{ width: "350px" }}
      >
        <h4>{coffeeItem.brand}</h4>
        <p>{coffeeItem.preparationMethod}</p>
        <h2>
          {coffeeItem.country} {coffeeItem.sortName}
        </h2>
        <p>{coffeeItem.method}</p>

        <ItemImage item={name} visibility={coffeeItem.price} />
        <p>{coffeeItem.kind}</p>

        <p>{coffeeItem.description}</p>

        <div className="d-flex justify-content-between">
          <Scale value={coffeeItem.acidity} name="Кислотность" />
          <Scale value={coffeeItem.density} name="Плотность" />
        </div>
        <div className="w-50">
          <SelectField
            label=""
            value="Зерно"
            defaultOption="Зерно"
            name="beans"
            options={beans}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <PriceItem item={coffeeItem} onChange={HandleChangeImg} />
          <BuyButton onChange={handleSubmit} />
        </div>
      </div>
    </>
  );
};

CoffeeCardItem.propTypes = {
  coffeeItem: PropTypes.object
};

export default CoffeeCardItem;
