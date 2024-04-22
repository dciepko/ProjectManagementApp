import classes from "./ProjectHeader.module.css";

import filters from "../../../assets/filters-icon.png";
import group from "../../../assets/group-icon.png";
import plus from "../../../assets/plus-icon.png";
import wrap from "../../../assets/wrap-down-button.png";

export default function ProjectHeader({ currentProject }) {
  return (
    <header className={classes.header}>
      <h1 className={classes.h1}>{currentProject.title}</h1>
      <button className={classes.unwrapButton}>
        <img src={wrap} alt="wrap header" />
      </button>
      <section className={classes.optionButtonsContainer}>
        <select className={classes.selectButton}>
          <option value="classic">Tablica</option>
          <option value="wide">Podłużny</option>
          <option value="table">Tabela</option>
        </select>
        <button className={classes.optionButton}>
          <img src={filters} alt="filter button" />
        </button>
        <button className={classes.optionButton}>
          <img src={group} alt="group button" />
        </button>
        <button className={classes.optionButton}>
          <img src={plus} alt="add button" />
        </button>
      </section>
    </header>
  );
}
