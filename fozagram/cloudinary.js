import React from 'react';
import API from "../adapters/API";

const PostForm = props => {

  const handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    API.submitPost(formData)
      .then(data => props.setPost(data.post))
      .catch(console.error);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="caption">
        Caption
        <input type="text" name="caption" />
      </label>
      <label htmlFor="image" >
        Upload image
        <input type="file" name="image" accept="image/*" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
  
}

export default PostForm;