import styles from './Buttons.module.css'
import gIcon from '/google.svg'
import aIcon from '/apple.svg'

export default function Buttons({text, google, apple}) {
  return (
    <button className={styles.btn}>
        {google && <img src={gIcon} />}
        {apple && <img src={aIcon} id='app'/>}
        {text}

    </button>
  )
}
