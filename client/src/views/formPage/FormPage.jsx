import React, { useEffect, useState } from "react";
import styles from "./FormPage.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { allTypes } from "../../redux/actions";

const validate = (form) => {
  
  let errors = {};
  if (!form.name) {
    errors.name = "Please insert a valid name";
  }
  if (!form.image) {
    errors.image = "Please insert a valid image";
  }
  if (!form.hp) {
    errors.hp = "Please insert a valid hp";
  }
  if (!form.attack) {
    errors.attack = "Please insert a valid attack";
  }
  if (!form.defense) {
    errors.defense = "Please insert a valid defense";
  }
  if (!form.speed) {
    errors.speed = "Please insert a valid speed";
  }
  if (!form.height) {
    errors.height = "Please insert a valid height";
  }
  if (!form.weight) {
    errors.weight = "Please insert a valid weight";
  }
  if (form.types.length === 0) {
    errors.types = "Please select at least one type";
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
            types: [], // Clear the types array
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
    if (form.types.length >= 2) return alert("Cannot choose more than two types");
    if (!form.types.includes(selected)) {
      setForm({
        ...form,
        types: [...form.types, selected],
      });
    }
  };
  

  return (
    <div className={styles.formContainer}>
      <h1>Create your Pokemon</h1>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <section>
          <input
            placeholder="Name here..."
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
          />
        </section>
        {errors.name && (
          <p className={styles["error-message"]}>{errors.name}</p>
        )}

        <section>
          <input
            placeholder="Image link here..."
            type="url"
            name="image"
            value={form.image}
            onChange={handleInputChange}
          />
        </section>
        {errors.image && (
          <p className={styles["error-message"]}>{errors.image}</p>
        )}

        <section>
          <input
            placeholder="Hp here..."
            type="text"
            name="hp"
            value={form.hp}
            onChange={handleInputChange}
          />
        </section>
        {errors.hp && (
          <p className={styles["error-message"]}>{errors.hp}</p>
        )}

        <section>
          <input
            placeholder="Attack here..."
            type="text"
            name="attack"
            value={form.attack}
            onChange={handleInputChange}
          />
        </section>
        {errors.attack && (
          <p className={styles["error-message"]}>{errors.attack}</p>
        )}

        <section>
          <input
            placeholder="Defense here..."
            type="text"
            name="defense"
            value={form.defense}
            onChange={handleInputChange}
          />
        </section>
        {errors.defense && (
          <p className={styles["error-message"]}>{errors.defense}</p>
        )}

        <section>
          <input
            placeholder="Speed here..."
            type="text"
            name="speed"
            value={form.speed}
            onChange={handleInputChange}
          />
        </section>
        {errors.speed && (
          <p className={styles["error-message"]}>{errors.speed}</p>
        )}

        <section>
          <input
            placeholder="Height here..."
            type="text"
            name="height"
            value={form.height}
            onChange={handleInputChange}
          />
        </section>
        {errors.height && (
          <p className={styles["error-message"]}>{errors.height}</p>
        )}

        <section>
          <input
            placeholder="Weight here..."
            type="text"
            name="weight"
            value={form.weight}
            onChange={handleInputChange}
          />
        </section>
        {errors.weight && (
          <p className={styles["error-message"]}>{errors.weight}</p>
        )}

<section>
      <h6>Select Types</h6>
      <div className="typesContainerCreate">           
            <select
              className="select-button"
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
          <div className="selected">
            {form.types?.map((type) => {
              return (
                <span className="typeSpan" key={type}>
                  {type}
                  <button
                    className="deleteBtn"
                    onClick={() => handleDelete(type)}
                  >
                    x
                  </button>
                </span>
              );
            })}
          </div>
</section>
{errors.types && (
  <p className={styles["error-message"]}>{errors.types}</p>
)}

        <button type="submit">Create Pokemon</button>
      </form>
    </div>
  );
};

export default FormPage;
