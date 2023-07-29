import { useEffect, useState } from "react";
import styles from"./FormPage.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { allTypes } from "../../redux/actions";

const validate = (form) => {
    let errors = {};
    if(!form.name){
        errors.name = "Please insert a valid name"
    }
    if(!form.image){
        errors.image = "Please insert a valid image"
    }
    if(!form.hp){
        errors.hp = "Please insert a valid hp"
    }
    if(!form.attack){
        errors.attack = "Please insert a valid attack"
    }
    if(!form.defense){
        errors.defense = "Please insert a valid defense"
    }
    if(!form.speed){
        errors.speed = "Please insert a valid speed"
    }
    if(!form.height){
        errors.height = "Please insert a valid height"
    }
    if(!form.weight){
        errors.weight = "Please insert a valid weight"
    }
    if(!form.types){
        errors.types = "Please insert a valid type"
    }
    return errors;
}

const FormPage = () => {
    const [form, setForm]= useState({
        name: "",
        image: "",
        hp: "",
        attack:"",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: [],
    })

    const[errors, setErrors] = useState({
        name: true,
        image: true,
        hp: true,
        attack: true,
        defense: true,
        speed: true,
        height: true,
        weight: true,
        types: true,
    })

    const handleSubmit = (e)=> {
        e.preventDefault();
        axios
            .post("http://localhost:3001/pokemons", form)
            .then((res) => alert("Pokemon created successfully"))
            .catch((err) => alert("please fill in all the fields"));
            setForm({
                name: "",
                image: "",
                hp: "",
                attack:"",
                defense: "",
                speed: "",
                height: "",
                weight: "",
                types: [],
            })
    };

    const handleImputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validate({
                ...form,
                [e.target.name]: e.target.value,
            })
        )
    }

    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);

    useEffect(() => {
        dispatch(allTypes())
    }, [dispatch])

    const handleTypes = (event) => {
        if(!form.types.includes(event.target.value)){
            setForm({
                ...form,
                types: [...form.types, event.target.value],
            })
            setErrors(
                validate({
                    ...form,
                    types: [...form.types, event.target.value]
                })
            )
        }
    }

    return(
        <div className={styles.formContainer}>
        <h1>Create your Pokemon</h1>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
            <section>
                <input
                placeholder="Name here..."
                type="text"
                name="name"
                value={form.name}
                onChange={handleImputChange}
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
                onChange={handleImputChange}
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
                onChange={handleImputChange}
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
                onChange={handleImputChange}
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
                onChange={handleImputChange}
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
                onChange={handleImputChange}
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
                onChange={handleImputChange}
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
                onChange={handleImputChange}
                />
            </section>
            {errors.weight && (
                <p className={styles["error-message"]}>{errors.weight}</p>
            )}

            <section>
                <select onChange={(e) => handleTypes(e)} value={form.types} multiple>
                <option value="default" disabled>
                    Select Types
                </option>
                {types.map((types, index) =>(
                    <option key={index} value={types}>
                        {types}
                    </option>
                ))}
                </select>
            </section>
            {errors.types && (
                <p className={styles["error-message"]}>{errors.types}</p>
            )}
            <button type="submit">Create Pokemon</button>

        </form>
        </div>
    )
}

export default FormPage;