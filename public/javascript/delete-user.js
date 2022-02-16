async function deleteFormHandler(event) {
    event.preventDefault();
  
    var id = document.getElementById('user-id').innerHTML;

    console.log(id);
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
      
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
  