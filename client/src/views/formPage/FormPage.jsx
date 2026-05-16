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
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(allTypes());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validate(form);

    if (Object.keys(formErrors).length === 0) {
      axios
        .post("http://localhost:3001/pokemons", form)
        .then(() => {
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

          setErrors({});
        })
        .catch(() => {
          alert("Error creating Pokemon");
        });
    } else {
      setErrors(formErrors);
    }
  };

  const handleInputChange = (e) => {
    const updatedForm = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(updatedForm);

    setErrors({
      ...errors,
      [e.target.name]: false,
    });
  };

  const handleDelete = (typeToDelete) => {
    setForm({
      ...form,
      types: form.types.filter((type) => type !== typeToDelete),
    });
  };

  const handleSelect = (e) => {
    const selected = e.target.value;

    if (selected === "default") return;

    if (form.types.length >= 2) {
      return alert("Cannot choose more than two types");
    }

    if (!form.types.includes(selected)) {
      setForm({
        ...form,
        types: [...form.types, selected],
      });

      setErrors({
        ...errors,
        types: false,
      });
    }
  };

  return (
    <main className={styles.formContainer}>
      <section className={styles.formCard}>
        <div className={styles.formInner}>
          <div className={styles.header}>
            <span className={styles.kicker}>Create section</span>
            <h1>Create your Pokémon</h1>
            <p>Complete the information to add a new Pokémon to your app.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputsGrid}>
              <label className={styles.inputGroup}>
                <span>Name</span>
                <input
                  className={errors.name ? styles.inputError : ""}
                  placeholder={errors.name ? errors.name : "Name here..."}
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                />
              </label>

              <label className={styles.inputGroup}>
                <span>Image URL</span>
                <input
                  className={errors.image ? styles.inputError : ""}
                  placeholder={errors.image ? errors.image : "Image link here..."}
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleInputChange}
                />
              </label>

              <label className={styles.inputGroup}>
                <span>HP</span>
                <input
                  className={errors.hp ? styles.inputError : ""}
                  placeholder={errors.hp ? errors.hp : "Hp here..."}
                  type="number"
                  name="hp"
                  value={form.hp}
                  onChange={handleInputChange}
                />
              </label>

              <label className={styles.inputGroup}>
                <span>Attack</span>
                <input
                  className={errors.attack ? styles.inputError : ""}
                  placeholder={errors.attack ? errors.attack : "Attack here..."}
                  type="number"
                  name="attack"
                  value={form.attack}
                  onChange={handleInputChange}
                />
              </label>

              <label className={styles.inputGroup}>
                <span>Defense</span>
                <input
                  className={errors.defense ? styles.inputError : ""}
                  placeholder={errors.defense ? errors.defense : "Defense here..."}
                  type="number"
                  name="defense"
                  value={form.defense}
                  onChange={handleInputChange}
                />
              </label>

              <label className={styles.inputGroup}>
                <span>Speed</span>
                <input
                  className={errors.speed ? styles.inputError : ""}
                  placeholder={errors.speed ? errors.speed : "Speed here..."}
                  type="number"
                  name="speed"
                  value={form.speed}
                  onChange={handleInputChange}
                />
              </label>

              <label className={styles.inputGroup}>
                <span>Height</span>
                <input
                  className={errors.height ? styles.inputError : ""}
                  placeholder={errors.height ? errors.height : "Height here..."}
                  type="number"
                  name="height"
                  value={form.height}
                  onChange={handleInputChange}
                />
              </label>

              <label className={styles.inputGroup}>
                <span>Weight</span>
                <input
                  className={errors.weight ? styles.inputError : ""}
                  placeholder={errors.weight ? errors.weight : "Weight here..."}
                  type="number"
                  name="weight"
                  value={form.weight}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <section className={styles.typesSection}>
              <div className={styles.typesHeader}>
                <div>
                  <span className={styles.typesLabel}>Select Types</span>
                  <p>Choose one or two Pokémon types.</p>
                </div>

                <select
                  className={errors.types ? styles.selectError : ""}
                  name="type"
                  onChange={handleSelect}
                  value="default"
                >
                  <option value="default">Choose a type</option>

                  {types.map((type) => (
                    <option key={type.id} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {errors.types && (
                <p className={styles.errorMessage}>{errors.types}</p>
              )}

              <div className={styles.selected}>
                {form.types.length > 0 ? (
                  form.types.map((type) => (
                    <span className={styles.typeSpan} key={type}>
                      {type}
                      <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(type)}
                      >
                        ×
                      </button>
                    </span>
                  ))
                ) : (
                  <p className={styles.emptyTypes}>
                    No types selected yet.
                  </p>
                )}
              </div>
            </section>

            <button className={styles.submit} type="submit">
              Create Pokémon
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default FormPage;