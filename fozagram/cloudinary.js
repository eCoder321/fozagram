// this code is not being called cause LOL?
import React from 'react';
import API from "../adapters/API";

const imageForm = props => {

  const handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    API.submitImage(formData)
      .then(data => props.setImage(data.image))
      .catch(console.error);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="alt">
        alt
        <input type="text" name="alt" />
      </label>
      <label htmlFor="image" >
        Upload image
        <input type="file" name="image" accept="image/*" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
  
}

export default imageForm;