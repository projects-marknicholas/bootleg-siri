async function generateText() {
    const prompt = document.getElementById('text_generate').value;
    const button = document.getElementById('text-gen-btn');
    button.disabled = true;
    button.textContent = 'Loading...';

    try {
        const response = await fetch('http://127.0.0.1:5000/generate_text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });
        const data = await response.json();
        document.getElementById('text_generate').value = '';
        console.log(data);

        // Storing conversation
        let existingContent = sessionStorage.getItem('content');

        if (!existingContent) {
            existingContent = []; 
        } else {
            try {
                existingContent = JSON.parse(existingContent);
                if (!Array.isArray(existingContent)) {
                    existingContent = [];
                }
            } catch (e) {
                console.error('Error parsing existing content:', e);
                existingContent = [];
            }
        }
        const newEntry = {
            user: prompt,
            user_image: '',
            ai: data.answer,
            image: ''
        };
        existingContent.push(newEntry);
        sessionStorage.setItem('content', JSON.stringify(existingContent));
        displaySessionStorageContent();
    } finally {
        button.disabled = false;
        button.textContent = 'Generate Text'; 
    }
}

async function generateImage() {
    const prompt = document.getElementById('image_generate').value;
    const button = document.getElementById('image-gen-btn');
    const imgElement = document.getElementById('generated-image');
    button.disabled = true;
    button.textContent = 'Generating...';

    try {
        const response = await fetch('http://127.0.0.1:5000/generate_image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });
        const data = await response.json();
        if (data.status === 'success') {
            document.getElementById('image_generate').value = '';
            // Storing conversation
            let existingContent = sessionStorage.getItem('content');

            if (!existingContent) {
                existingContent = []; 
            } else {
                try {
                    existingContent = JSON.parse(existingContent);
                    if (!Array.isArray(existingContent)) {
                        existingContent = [];
                    }
                } catch (e) {
                    console.error('Error parsing existing content:', e);
                    existingContent = [];
                }
            }
            const newEntry = {
                user: prompt,
                user_image: '',
                ai: '',
                image: 'data:image/jpeg;base64,' + data.image
            };
            existingContent.push(newEntry);
            sessionStorage.setItem('content', JSON.stringify(existingContent));
            displaySessionStorageContent();
        } else {
            alert('Image generation failed: ' + data.answer);
        }
    } catch (error) {
        console.error('Error generating image:', error);
        alert('An error occurred while generating the image.');
    } finally {
        button.disabled = false;
        button.textContent = 'Generate Image';
    }
}

async function analyzeImage() {
    const imageInput = document.getElementById('image');
    const prompt = document.getElementById('image_analyze').value;
    const button = document.getElementById('image-analysis-btn');
    button.disabled = true;
    button.textContent = 'Analyzing...';

    const imageFile = imageInput.files[0]; // Get the image file
    const reader = new FileReader(); // Create a FileReader instance

    reader.onloadend = async function () {
        // Once the file is read, we can make the fetch request
        const formData = new FormData();
        formData.append('image', imageFile); // Attach the image file
        formData.append('prompt', prompt); // Attach the prompt (optional)

        try {
            const response = await fetch('http://127.0.0.1:5000/analyze_image', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data.status === 'success') {
                document.getElementById('image_analyze').value = '';
                imageInput.value = '';

                // Storing conversation
                let existingContent = sessionStorage.getItem('content');

                if (!existingContent) {
                    existingContent = []; 
                } else {
                    try {
                        existingContent = JSON.parse(existingContent);
                        if (!Array.isArray(existingContent)) {
                            existingContent = [];
                        }
                    } catch (e) {
                        console.error('Error parsing existing content:', e);
                        existingContent = [];
                    }
                }
                const newEntry = {
                    user: prompt,
                    user_image: reader.result, // Store the Base64 image
                    ai: data.answer,
                    image: ''
                };
                existingContent.push(newEntry);
                sessionStorage.setItem('content', JSON.stringify(existingContent));
                displaySessionStorageContent();
            } else {
                alert('Image analysis failed: ' + data.answer);
            }
        } catch (error) {
            console.error('Error analyzing image:', error);
            alert('An error occurred while analyzing the image.');
        } finally {
            button.disabled = false;
            button.textContent = 'Analyze Image';
        }
    };

    // Start reading the image file as a Data URL (Base64)
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        alert('Please select an image file.');
        button.disabled = false;
        button.textContent = 'Analyze Image';
    }
}

// Function to display session storage content
function displaySessionStorageContent() {
    const contentDisplay = document.getElementById('content-display');
    const itemGrid = document.getElementById('item-grid');
    const header = document.getElementById('header');
    const storedContent = sessionStorage.getItem('content');
    const md = window.markdownit();
    
    if (storedContent) {
        let contentArray;
        try {
            contentArray = JSON.parse(storedContent);
        } catch (e) {
            console.error('Error parsing session storage content:', e);
            return;
        }

        // Clear existing content
        contentDisplay.innerHTML = '';

        // Hide the item grid and show content display
        itemGrid.style.display = 'none';
        header.style.display = 'none';
        contentDisplay.style.display = 'block';

        // Create and append elements for each entry
        contentArray.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('entry');
            entryDiv.innerHTML = `
                <div class="right">
                    <div class="user">
                        ${entry.user_image ? `<img src="${entry.user_image}"/><br>` : ''}
                        ${entry.user}
                    </div>
                </div>
                <div class="left">
                    <div class="ai">
                        <div class="ai-logo">
                            <img src="assets/img/logo.png">
                        </div>
                        <div class="ai-context">
                            ${md.render(entry.ai)}
                            ${entry.image ? `<img src="${entry.image}"/>` : ''}
                        </div>
                    </div>
                </div>
            `;
            contentDisplay.appendChild(entryDiv);
        });
        const entries = contentDisplay.getElementsByClassName('entry');
        if (entries.length > 0) {
            const lastEntry = entries[entries.length - 1];
            lastEntry.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else {
        // Show the item grid and hide content display
        itemGrid.style.display = 'block';
        contentDisplay.style.display = 'none';
        contentDisplay.innerHTML = '<p>No content found in session storage.</p>'; // Message for empty session storage
    }
}