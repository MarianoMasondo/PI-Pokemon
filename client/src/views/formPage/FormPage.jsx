import React, { useEffect, useState } from "react";
import styles from "./FormPage.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { allTypes } from "../../redux/actions";

const validate = (form) => {
  let errors = {};
  if (!form.name) {
    errors.name = "Please insert a valid name!";
  }
  if (!form.image) {
    errors.image = "Please insert a valid image!";
  }
  if (!form.hp) {
    errors.hp = "Please insert a valid hp!";
  }
  if (!form.attack) {
    errors.attack = "Please insert a valid attack!";
  }
  if (!form.defense) {
    errors.defense = "Please insert a valid defense!";
  }
  if (!form.speed) {
    errors.speed = "Please insert a valid speed!";
  }
  if (!form.height) {
    errors.height = "Please insert a valid height!";
  }
  if (!form.weight) {
    errors.weight = "Please insert a valid weight!";
  }
  if (form.types.length === 0) {
    errors.types = "Please select at least one type!";
  }
  return errors;
};

const FormPage = () => {
  const [form, setForm] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });

  const [errors, setErrors] = useState({
    name: false,
    image: false,
    hp: false,
    attack: false,
    defense: false,
    speed: false,
    height: false,
    weight: false,
    types: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate(form);
    if (Object.keys(formErrors).length === 0) {
      axios
        .post("http://localhost:3001/pokemons", form)
        .then((res) => {
          alert("Pokemon created successfully");
          setForm({
            name: "",
            image: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            types: [],
          });
          setErrors({
            name: false,
            image: false,
            hp: false,
            attack: false,
            defense: false,
            speed: false,
            height: false,
            weight: false,
            types: false,
          });
        })
        .catch((err) => {
          alert("Error creating Pokemon");
        });
    } else {
      setErrors(formErrors);
    }
  };

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: false,
    });
  };

  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(allTypes());
  }, [dispatch]);

  const handleDelete = (type) => {
    setForm({
      ...form,
      types: form.types.filter((types) => types !== type),
    });
  };

  const handleSelect = (e) => {
    const selected = e.target.value;
    if (form.types.length >= 2)
      return alert("Cannot choose more than two types");
    if (!form.types.includes(selected)) {
      setForm({
        ...form,
        types: [...form.types, selected],
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <h1 className={styles.title}>Create your Pokemon</h1>
        <section>
          <input
            className={`${styles.inputContainer} ${
              errors.name ? styles.error : ""
            }`}
            placeholder={errors.name ? errors.name : "Name here..."}
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
          />
        </section>

        <section>
          <input
            className={`${styles.inputContainer} ${
              errors.name ? styles.error : ""
            }`}
            placeholder={errors.image ? errors.image : "Image link here..."}
            type="url"
            name="image"
            value={form.image}
            onChange={handleInputChange}
          />
        </section>

        <section>
          <input
            className={`${styles.inputContainer} ${
              errors.name ? styles.error : ""
            }`}
            placeholder={errors.hp ? errors.hp : "Hp here..."}
            type="text"
            name="hp"
            value={form.hp}
            onChange={handleInputChange}
          />
        </section>

        <section>
          <input
            className={`${styles.inputContainer} ${
              errors.name ? styles.error : ""
            }`}
            placeholder={errors.attack ? errors.attack : "Attack here..."}
            type="text"
            name="attack"
            value={form.attack}
            onChange={handleInputChange}
          />
        </section>

        <section>
          <input
            className={`${styles.inputContainer} ${
              errors.name ? styles.error : ""
            }`}
            placeholder={errors.attack ? errors.attack : "Defense here..."}
            type="text"
            name="defense"
            value={form.defense}
            onChange={handleInputChange}
          />
        </section>

        <section>
          <input
            className={`${styles.inputContainer} ${
              errors.name ? styles.error : ""
            }`}
            placeholder={errors.attack ? errors.speed : "Speed here..."}
            type="text"
            name="speed"
            value={form.speed}
            onChange={handleInputChange}
          />
        </section>

        <section>
          <input
            className={`${styles.inputContainer} ${
              errors.name ? styles.error : ""
            }`}
            placeholder={errors.attack ? errors.height : "Height here..."}
            type="text"
            name="height"
            value={form.height}
            onChange={handleInputChange}
          />
        </section>

        <section>
          <input
            className={`${styles.inputContainer} ${
              errors.name ? styles.error : ""
            }`}
            placeholder={errors.attack ? errors.weight : "Weight here..."}
            type="text"
            name="weight"
            value={form.weight}
            onChange={handleInputChange}
          />
        </section>

        <section>
          <h3>Select Types</h3>
          <div className={styles.typesContainerCreate}>
            <select
              className={`${styles.select} ${errors.name ? styles.error : ""}`}
              name="type"
              onChange={handleSelect}
            >
              {types.map((type) => {
                return (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.selected}>
            {form.types?.map((type) => {
              return (
                <span className={styles.typeSpan} key={type}>
                  {type}
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(type)}
                  >
                    x
                  </button>
                </span>
              );
            })}
          </div>
        </section>

        <button className={styles.submit} type="text">
          Create Pokemon
        </button>
      </form>
    </div>
  );
};

export default FormPage;
