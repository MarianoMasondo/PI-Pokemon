import styles from "./OrderPokemons.module.css";

const OrderPokemons = ({ handleOrderAscDesc, handleOrderAttack}) => {
    return (
        <div>
            <div className={`${styles.orderAscDesc}`}>
                <select onChange={(e) => handleOrderAscDesc(e)}>
                    <option value="default">Order alphabetically</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <div className={`${styles.orderByAttack}`}>
                <select onChange={(e) => handleOrderAttack(e)}>
                    <option value="default">Sort by attack</option>
                    <option value="asc">Best</option>
                    <option value="desc">Worst</option>
                </select>
            </div>
        </div>
    )
}
export default OrderPokemons;