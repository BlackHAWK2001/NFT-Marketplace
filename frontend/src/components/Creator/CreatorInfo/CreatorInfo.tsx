import styles from './CreatorInfo.module.scss'

const CreatorInfo = () => {
  return (
    <section className={styles.creator__wrapper}>
      <div className={styles.creator__description}>
        <p className={styles.creator__topTitle}>CREATE, EXPLORE, & COLLECT DIGITAL ART NFTS..</p>
        <h1 className={styles.creator__title}>The new creative economy.</h1>
        <div className={styles.creator__button}>Start your search</div>
      </div>
    </section >
  )
}

export default CreatorInfo
