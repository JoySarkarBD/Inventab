const Test = () => {
    // ... (your existing code)
  
    // Define a function to handle input changes for each input field
    const handleInputChange = (event, leadPartId, field) => {
      const { value } = event.target;
      // Create a copy of the addAllParts array
      const updatedParts = addAllParts.map((part) => {
        if (part.lead_part_id === leadPartId) {
          // Update the specific field of the matching part object
          return { ...part, [field]: value };
        }
        return part;
      });
      setAddAllParts(updatedParts);
    };
  
    // Define a function to handle form submission
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Process the form data here
      console.log('Form Data:', addAllParts);
  
      // You can further handle the form data, like making API calls, saving to the server, etc.
    };
  
    return (
      <form onSubmit={handleSubmit}>
        {/* ... (your existing code) */}
        <tbody>
          {addAllParts.map((part) => {
            return (
              <tr key={part?.lead_part_id}>
                <td>
                  {/* ... (your existing code) */}
                </td>
                <td>
                  <input
                    className='new_input_class'
                    type='text'
                    placeholder='Short Description'
                    name='short_description'
                    value={part?.short_description} // Use `value` instead of `defaultValue`
                    onChange={(event) => handleInputChange(event, part?.lead_part_id, 'short_description')}
                  />
                </td>
  
                <td>
                  <input
                    className='new_input_class'
                    type='number'
                    placeholder='Total Quantity'
                    name='quantity'
                    value={part?.quantity} // Use `value` instead of `defaultValue`
                    onChange={(event) => handleInputChange(event, part?.lead_part_id, 'quantity')}
                  />
                </td>
  
                {/* ... (your existing code) */}
              </tr>
            );
          })}
        </tbody>
      </form>
    );
  };
  
  export default Test;
  






  import React, { useState } from 'react';

const MyForm = ({ allParts }) => {
  const [formParts, setFormParts] = useState(allParts);

  // Handle input changes and update the form data state
  const handleInputChange = (index, field, value) => {
    const updatedFormParts = [...formParts];
    updatedFormParts[index][field] = value;
    setFormParts(updatedFormParts);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Access the updated form data state here
    console.log('Form Data:', formParts);
    // You can perform any further processing or API calls with the data here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='table-responsive'>
        <table className='table table-bordered table-responsive'>
          <thead>
            {/* ... header rows ... */}
          </thead>
          <tbody>
            {formParts.map((part, index) => {
              return (
                <tr key={part?.lead_part_id}>
                  <td>
                    <div className='select-port'>
                      <Select
                        className='select'
                        placeholder='Select Port No'
                        value={{
                          label: part?.part_id?.part_number,
                          value: part?.part_id?.id,
                        }}
                        options={allParts}
                        isSearchable
                        isClearable
                        onChange={(selectedOption) => handleInputChange(index, 'part_id', selectedOption)}
                      />
                    </div>
                  </td>
                  <td>
                    <input
                      className='new_input_class'
                      type='text'
                      placeholder='Short Description'
                      name='short_description'
                      value={part?.short_description}
                      onChange={(e) => handleInputChange(index, 'short_description', e.target.value)}
                    />
                  </td>

                  {/* ... other input fields ... */}

                  <td>
                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => handleRemove(part.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default MyForm;
  
  
  