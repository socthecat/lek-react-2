import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const FormikForm = () => (
  <Formik
    initialValues={{ username: '', email: '', password: '', confirmPassword: '', phone: '' }}
    validate={values => {
      const errors = {}
      if (!values.username) {
        errors.username = 'Required'
      } else if (
        !/^[a-zA-Z0-9-_\.]{3,32}$/i.test(values.username)
      ) {
        errors.username = 'Enter a valid username'
      }

      if (!values.email) {
        errors.email = 'Required'
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Enter a valid email'
      }

      if (!values.password) {
        errors.password = 'Required'
      } else if (
        !/^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i.test(values.password)
      ) {
        errors.password = 'Your password should be at least 8 characters long, contain uppercase and lowercase letters, numbers and special characters'
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password'
      } else if (
        values.password !== values.confirmPassword
      ) {
        errors.confirmPassword = 'Passwords should match'
      }

      if (!values.phone) {
        errors.phone = 'Please enter your phone number'
      } else if (
        !/^((\+380)+([0-9]){9})$/i.test(values.phone)
      ) {
        errors.phone = 'Enter a valid Ukrainian phone number'
      }

      return errors
    }}
    onSubmit={(values, { setSubmitting }) => {
      alert('You have successfully registered!')
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <h1>Formik Form</h1>
        <label htmlFor='username'>Username</label>
        <Field name='username' placeholder='Enter Username' />
        <ErrorMessage name='username' component='span' />
        <label htmlFor='email'>Email</label>
        <Field type='email' name='email' placeholder='Enter Email' />
        <ErrorMessage name='email' component='span' />
        <label htmlFor='password'>Password</label>
        <Field type='password' placeholder='Enter Password' name='password' />
        <ErrorMessage name='password' component='span' />
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <Field type='password' placeholder='Confirm Password' name='confirmPassword' />
        <ErrorMessage name='confirmPassword' component='span' />
        <label htmlFor='phone'>Enter Phone</label>
        <Field name='phone' placeholder='Enter Phone' />
        <ErrorMessage name='phone' component='span' />
        <button type='submit' disabled={isSubmitting}>
          Register
        </button>
      </Form>
    )}
  </Formik>
)

export default FormikForm
