import React, { Fragment } from "react";
//
import { ChevronDown } from "./ChevronDown";
import { SubItemsList } from "./SubItemsList";
import type { tItem } from "./";

export const Item = ({
  item,
  subMenuActive,
  toggleSubMenu,
  arrowWithButton
}: {
  ...tItem,
  toggleSubMenu: (itemId: string) => void,
  subMenuActive: boolean,
  arrowWithButton: boolean
}) => {
  if (item.url && item.items && item.items.length) {
    return (
      <Fragment>
        <a href={item.url} className="item-has-children">
          {item.title}
        </a>
        <button onClick={() => toggleSubMenu(item.id)}>
          <ChevronDown />
        </button>
        {subMenuActive && <SubItemsList items={item.items} />}
      </Fragment>
    );
  } else if (!item.url && item.items && item.items.length) {
    return (
      <Fragment>
        <button
          className={`item-has-children ${
            arrowWithButton ? "button-has-icon" : ""
          }`}
          onClick={() => toggleSubMenu(item.id)}
        >
          {item.title}
          {arrowWithButton && <ChevronDown />}
        </button>
        {subMenuActive && <SubItemsList items={item.items} />}
      </Fragment>
    );
  } else {
    return <a href={item.url}>{item.title}</a>;
  }
};
