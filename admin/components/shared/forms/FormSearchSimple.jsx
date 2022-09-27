import React from 'react'

const FormSearchSimple = ({ onChange }) => {
  return (
    <form className='ps-form--search-simple' action='index.html' method='get'>
      <input
        className='form-control'
        type='text'
        placeholder='Search...'
        onChange={e => onChange(e.target.value)}
      />
      <button>
        <i className='icon icon-magnifier'></i>
      </button>
    </form>
  )
}

export default FormSearchSimple
