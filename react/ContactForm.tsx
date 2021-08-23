import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import axios from 'axios'

import formValidation from './formValidation'

import './styles.css'

const CSS_HANDLES = [
  'inputName',
  'inputEmail',
  'inputButton',
  'container',
  'formLeads',
  'labelName',
  'labelEmail',
] as const

const ContactForm = (): JSX.Element => {
  const [inputs, setInputs] = useState({ name: '', email: '' })
  const handles = useCssHandles(CSS_HANDLES)

  const handleSubmit = async (e: {
    preventDefault: () => void
  }): Promise<void> => {
    e.preventDefault()
    const validation = formValidation(inputs.email)

    if (!validation) return

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }

    window.localStorage.setItem('Name', JSON.stringify(inputs.name))
    window.localStorage.setItem('E-mail', JSON.stringify(inputs.email))
    await axios
      .post(
        ` https://1841m6ur62.execute-api.sa-east-1.amazonaws.com/api/send`,
        {
          name: inputs.name,
          email: inputs.email,
        },
        options
      )
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
    <article className={`${handles.container}`}>
      <form onSubmit={handleSubmit} className={`${handles.formLeads}`}>
        <label htmlFor="name" className={`${handles.labelName}`}>
          Quer se manter informado sobre nossas promoções?
          <br />
          Preencha os dados abaixo e clique em Enviar!
          <br />
          <input
            type="text"
            name="name"
            className={`${handles.inputName}`}
            placeholder="Digite seu nome completo:"
            onChange={handleInputChange}
            value={inputs.name}
            onFocus={handleInputChange}
            onBlur={handleInputChange}
            title="Preencha este campo."
            required
          />
        </label>
        <label htmlFor="email" className={`${handles.labelEmail}`}>
          <br />

          <input
            type="email"
            name="email"
            className={`${handles.inputEmail}`}
            placeholder="Digite seu endereço de E-mail:"
            onChange={handleInputChange}
            value={inputs.email}
            onFocus={handleInputChange}
            onBlur={handleInputChange}
            title="Preencha este campo."
            required
          />
        </label>
        <button type="submit" className={`${handles.inputButton}`}>
          Enviar!
        </button>
      </form>
    </article>
  )
}

export default ContactForm
