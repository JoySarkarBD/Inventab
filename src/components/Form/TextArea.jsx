/* eslint-disable react/prop-types */
export default function TextArea({ title, ...attributes }) {
    return (
        <>
      <label className='mb-2 text-dark text-capitalize'>{title}</label>
      <br/>
      <textarea {...attributes} className='new_input_class' />
    </>
    )
}