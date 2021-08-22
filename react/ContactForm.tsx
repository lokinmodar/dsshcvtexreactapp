import React, { useState } from 'react'
import axios from 'axios'

import formValidation from './formValidation'

import './styles.css'

const ContactForm = (): JSX.Element => {
  const [inputs, setInputs] = useState({ name: '', email: '' })

  const handleSubmit = async (e: {
    preventDefault: () => void
  }): Promise<void> => {
    e.preventDefault()
    const validation = formValidation(inputs.email)

    if (!validation) return

    window.localStorage.setItem('E-mail', JSON.stringify(inputs.name))
    window.localStorage.setItem('E-mail', JSON.stringify(inputs.email))
    await axios
      .post(`https://1841m6ur62.execute-api.sa-east-1.amazonaws.com/api`, {
        name: inputs.name,
        email: inputs.email,
      })
      .then((/* res */) => {
        // console.log(res.data)
      })
      .catch((/* res */) => {
        // console.log('Message not sent', res.body)
      })
    setInputs({ name: '', email: '' })
  }

  const handleInputChange = (e: {
    persist: () => void
    target: { name: string; value: string }
  }): void => {
    e.persist()
    setInputs(() => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <article>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Insira seu endereço de e-mail para saber mais:
          <br />
          <input
            type="email"
            name="name"
            placeholder="Digite seu nome completo:"
            onChange={handleInputChange}
            value={inputs.name}
            onFocus={handleInputChange}
            onBlur={handleInputChange}
            title="Preencha este campo."
            required
          />
        </label>
        <label htmlFor="email">
          Insira seu endereço de e-mail para saber mais:
          <br />
          <input
            type="email"
            name="email"
            placeholder="Digite seu endereço de E-mail:"
            onChange={handleInputChange}
            value={inputs.email}
            onFocus={handleInputChange}
            onBlur={handleInputChange}
            title="Preencha este campo."
            required
          />
        </label>
        <button type="submit">Enviar!</button>
      </form>
    </article>
  )
}

export default ContactForm
