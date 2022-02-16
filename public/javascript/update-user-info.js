async function updateFormHandler(event) {
    event.preventDefault();
  
  const firstname = document.querySelector('#firstname').value.trim();
  const lastname = document.querySelector('#lastname').value.trim();
  const description = document.querySelector('#description').value.trim();
  const link_url_facebook = document.querySelector('#facebook').value.trim();
  const link_url_twitter = document.querySelector('#twitter').value.trim();
  const link_url_linkedin = document.querySelector('#linkedin').value.trim();
  const link_url_github = document.querySelector('#github').value.trim();
  const link_url_intagram = document.querySelector('#instagram').value.trim();
  const link_url_youtube = document.querySelector('#youtube').value.trim();
  var id = document.getElementById('user-id').innerHTML;
console.log(id);
   
  // profiles
    const response = await fetch(`/api/profiles/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
         firstname ,
         lastname ,
         description,
         
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

//  links
    const response1 = await fetch(`/api/links/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
         link_url_facebook,
         link_url_twitter,
         link_url_linkedin,
         link_url_github ,
         link_url_intagram ,
         link_url_youtube 
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok && response1.ok ) {
      document.location.replace('/user_profile');
    } else {
      alert(response.statusText);
    }
}
  
  document.querySelector('#update-profile-form').addEventListener('submit', updateFormHandler);