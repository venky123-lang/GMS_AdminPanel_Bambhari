## Making API Call Step by Step

- Open the Html
- Add Axios CDN in the header of the html
```
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```
- Add Cloudinary API CDN in the header of the html as well
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/cloudinary-core/2.10.3/cloudinary-core-shrinkwrap.min.js"></script>
```
- Change Input Type Submit button to a button
```
<button onclick="add_your_function_name()" id="submitbutton">Submit</button>
```
- Put proper ID names for each input field which will be later used to extract data from html in js. *Make sure that the ID names are unique*
- Create a javascript file and add it as a script in the html
- Create the function in javascript file and make necessary changes from the following template provided
```
async function add_your_function_name() {

    const cloudName = 'dm5ah9x1u';
    const preset_key = 'rtbdmr7e';

    const name = document.getElementById(<ID of the Title Input Field>).value;
    const description = document.getElementById(<ID of the Descriptionn Input Field>).value;
    const link = document.getElementById(<ID of the Link Input Field>).value;
    const fileInput = document.getElementById(<ID of the Image Input Field>);

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", preset_key);

    try {
        const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
        const image = cloudinaryResponse.data.secure_url;

        const url = "https://garden-management.onrender.com/";
        const apiUrl=url+<Endpoint Of the API>;

        const requestData = {
            title: name,
            description: description,
            link: link,
            image: image
        };

        console.log(requestData);
        const token=localStorage.getItem("token");
        console.log(token)
        const axiosOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }; 

        const apiResponse = await axios.post(apiUrl, requestData, axiosOptions);

        if (apiResponse.status === 201) {
            alert("Uploaded Properly");
        } else {
            throw new Error('API response was not OK');
        }
    } catch (error) {
        console.error('Error: ', error);
    }
}
```