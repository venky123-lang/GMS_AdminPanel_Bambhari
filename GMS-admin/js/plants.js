async function addplants() {
    const cloudName = 'dm5ah9x1u';
    const preset_key = 'rtbdmr7e';
    const name = document.getElementById('plantsName').value;
    const serviceType = document.getElementById('plantsType').value;
    const description = document.getElementById('plantsdescription').value;
    const link = document.getElementById('plantslink').value;
    const fileInput = document.getElementById('plantsimage');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", preset_key);

    try {
        const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
        const image = cloudinaryResponse.data.secure_url;

        const apiUrl = "https://garden-management.onrender.com/api/v1/admin/plants";
        const requestData = {
            title: name,
            type: serviceType,
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
