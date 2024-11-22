import React from "react";
import styles from "./SearchBlock.module.scss";

const SearchBlock = () => {
  return (
    <section className={styles.SearchBlock}>
      <div className={styles.container}>
        <div className={styles.searchForm}>
          <div className={styles.icon}></div>
          <input
            name="search_field"
            type="text"
            placeholder="Search Over 200,000+ Premium Names"
          />
          <button aria-label="Search Domain" >
            <span></span>
          </button>
        </div>

        <div className={styles.listTags}>
          <span>Popular searches</span>
          <a href="https://www.atom.com/premium-domains-for-sale/for/technology">
            Tech
          </a>
          <a href="https://www.atom.com/premium-domains-for-sale/for/fashion-clothing">
            Clothing
          </a>
          <a href="https://www.atom.com/premium-domains-for-sale/for/finance">
            Finance
          </a>
          <a href="https://www.atom.com/premium-domains-for-sale/for/real-estate">
            Real Estate
          </a>
          <a href="https://www.atom.com/premium-domains-for-sale/for/cryptocurrency-blockchain">
            Crypto
          </a>
          <a href="https://www.atom.com/premium-domains-for-sale/all/length/Short">
            Short
          </a>
          <a href="https://www.atom.com/premium-domains-for-sale/all/type_of_name/One%20Word">
            One Word
          </a>
        </div>
      </div>
    </section>
  );
};

export default SearchBlock;
