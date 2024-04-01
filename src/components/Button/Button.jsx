import styles from "./Button.module.css";
import React from 'react'

const Button = ( {style, onClick, children} ) => {
  return (
    <div onClick={onClick} style={style}>
        { children }
    </div>
  )
}

export default Button