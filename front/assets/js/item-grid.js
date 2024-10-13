// Function to populate the item grid with random items and appropriate tags
function populateItemGrid() {
    const items = [
        // Programming
        { content: "What are the latest advancements in machine learning?", tag: "Programming" },
        { content: "What is recursion?", tag: "Programming" },
        { content: "Techniques to find specific data in a data structure.", tag: "Programming" },
        { content: "How to optimize algorithms for better performance?", tag: "Programming" },
        { content: "What are the latest trends in web development?", tag: "Programming" },
        { content: "Explain the concept of Object-Oriented Programming.", tag: "Programming" },
        { content: "What is a REST API and how does it work?", tag: "Programming" },
        { content: "Introduction to functional programming.", tag: "Programming" },
        { content: "What is the difference between machine learning and deep learning?", tag: "Programming" },
        { content: "Explain the concept of asynchronous JavaScript.", tag: "Programming" },
        { content: "What are microservices and why are they useful?", tag: "Programming" },
        { content: "Explain the importance of unit testing in software development.", tag: "Programming" },

        // Art
        { content: "Make an image of a bustling marketplace in a historic town.", tag: "Art" },
        { content: "Create an image of a futuristic city with flying cars.", tag: "Art" },
        { content: "What are the key principles of modern art?", tag: "Art" },
        { content: "Describe the Baroque style of painting.", tag: "Art" },
        { content: "How has digital art changed the art world?", tag: "Art" },
        { content: "What are the different techniques used in watercolor painting?", tag: "Art" },
        { content: "Create a surreal image of a dreamlike landscape.", tag: "Art" },

        // Healthcare
        { content: "How does the human immune system fight off viruses?", tag: "Healthcare" },
        { content: "What are the differences between type 1 and type 2 diabetes?", tag: "Healthcare" },
        { content: "How does machine learning improve healthcare diagnosis?", tag: "Healthcare" },
        { content: "What are the key components of a healthy diet?", tag: "Healthcare" },
        { content: "Explain how vaccines work in the body.", tag: "Healthcare" },
        { content: "What are the symptoms of cardiovascular diseases?", tag: "Healthcare" },
        { content: "What are the benefits of regular physical exercise?", tag: "Healthcare" },

        // Travel
        { content: "Top 10 travel destinations for 2024.", tag: "Travel" },
        { content: "How to prepare for a long hiking trip?", tag: "Travel" },
        { content: "What are the cultural differences to consider when visiting Japan?", tag: "Travel" },
        { content: "How to pack efficiently for international travel.", tag: "Travel" },
        { content: "What are the most scenic road trips in Europe?", tag: "Travel" },
        { content: "Explain the significance of Machu Picchu in Peru.", tag: "Travel" },

        // Environment
        { content: "What are the effects of climate change on global weather patterns?", tag: "Environment" },
        { content: "What are the latest developments in renewable energy?", tag: "Environment" },
        { content: "How can individuals reduce their carbon footprint?", tag: "Environment" },
        { content: "Explain the process of recycling plastics.", tag: "Environment" },
        { content: "What are the benefits of sustainable farming practices?", tag: "Environment" },
        { content: "How does deforestation impact biodiversity?", tag: "Environment" },

        // Finance
        { content: "Explain the concept of blockchain technology.", tag: "Finance" },
        { content: "How has artificial intelligence impacted the financial industry?", tag: "Finance" },
        { content: "What are the benefits of cryptocurrency in modern finance?", tag: "Finance" },
        { content: "What is the difference between stocks and bonds?", tag: "Finance" },
        { content: "What are the key factors to consider when investing in real estate?", tag: "Finance" },
        { content: "Explain the role of central banks in a country’s economy.", tag: "Finance" },

        // History
        { content: "Explain the history behind the Great Wall of China.", tag: "History" },
        { content: "What caused the fall of the Roman Empire?", tag: "History" },
        { content: "Describe the significance of the Industrial Revolution.", tag: "History" },
        { content: "What were the causes of World War II?", tag: "History" },
        { content: "How did the Renaissance influence European culture?", tag: "History" },
        { content: "What was the impact of colonization on indigenous cultures?", tag: "History" },
        { content: "Explain the role of the Silk Road in ancient trade.", tag: "History" },

        // Design
        { content: "What are the key principles of design thinking?", tag: "Design" },
        { content: "What is the importance of user experience (UX) in product design?", tag: "Design" },
        { content: "Explain the concept of minimalism in design.", tag: "Design" },
        { content: "What are the best practices for web design?", tag: "Design" },
        { content: "What are the latest trends in graphic design?", tag: "Design" },
        { content: "Explain the role of typography in visual communication.", tag: "Design" },

        // Business
        { content: "What are the benefits of remote work?", tag: "Business" },
        { content: "The importance of emotional intelligence in leadership.", tag: "Business" },
        { content: "What are the key elements of a successful marketing strategy?", tag: "Business" },
        { content: "Explain the difference between B2B and B2C business models.", tag: "Business" },
        { content: "What are the benefits of corporate social responsibility?", tag: "Business" },
        { content: "What is the significance of company culture in employee retention?", tag: "Business" },
        { content: "How can businesses leverage data analytics for growth?", tag: "Business" },

        // Education
        { content: "What are the best practices for online education?", tag: "Education" },
        { content: "Explain the importance of critical thinking in education.", tag: "Education" },
        { content: "What are the benefits of project-based learning?", tag: "Education" },
        { content: "How can gamification be used to enhance learning?", tag: "Education" },
        { content: "What is the role of artificial intelligence in education?", tag: "Education" },
        { content: "What are the challenges in integrating technology in classrooms?", tag: "Education" },
        { content: "How does early childhood education impact lifelong learning?", tag: "Education" },

        // Bible
        { content: "What is the significance of the Sermon on the Mount?", tag: "Bible" },
        { content: "Explain the parable of the Good Samaritan.", tag: "Bible" },
        { content: "What are the key teachings of Jesus in the New Testament?", tag: "Bible" },
        { content: "What is the role of faith in the Bible?", tag: "Bible" },
        { content: "What are the Ten Commandments and their importance?", tag: "Bible" },
        { content: "Explain the significance of the Exodus story.", tag: "Bible" },
        { content: "What is the importance of prayer according to the Bible?", tag: "Bible" },

        // More Topics
        { content: "What are the benefits of mindfulness and meditation?", tag: "Wellness" },
        { content: "How to build a strong personal brand online.", tag: "Self-development" },
        { content: "What are the key differences between socialism and capitalism?", tag: "Politics" },
        { content: "What is the importance of mental health awareness?", tag: "Healthcare" },
        { content: "How does social media impact political discourse?", tag: "Social Media" },
        { content: "Explain the role of women in the early church.", tag: "History" },
        { content: "What is the significance of the First Amendment in the U.S. Constitution?", tag: "Law" },
        { content: "How has e-commerce transformed the retail industry?", tag: "Business" },
        { content: "What are the ethical implications of gene editing?", tag: "Science" },
        { content: "What is the importance of space exploration for humanity?", tag: "Science" },
        { content: "What are the effects of global inequality?", tag: "Economics" },
        { content: "How do natural disasters affect global economies?", tag: "Economics" },
        { content: "What are the potential risks of AI in the workplace?", tag: "Technology" },
        { content: "How to create a personal fitness plan.", tag: "Wellness" },
    ];
  
    const itemGrid = document.getElementById("item-grid");
    itemGrid.innerHTML = ""; // Clear existing items
  
    // Shuffle items and select the first 4 for display
    const shuffledItems = items.sort(() => 0.5 - Math.random()).slice(0, 4);
  
    // Create item elements and append to the grid
    shuffledItems.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
  
        // Add the content and tag dynamically
        itemElement.innerHTML = `${item.content} <span>${item.tag}</span>`;
        
        // Add click event to each item
        itemElement.addEventListener('click', () => {
            setTextAreaValue(item.content);
        });
  
        itemGrid.appendChild(itemElement);
    });
  }
  
  // Function to set the value of the active text area
  function setTextAreaValue(value) {
    const activeTabId = document.querySelector('.tab-content.active')?.id;
    
    if (activeTabId === "text-gen") {
        document.getElementById("text_generate").value = value;
    } else if (activeTabId === "image-gen") {
        document.getElementById("image_generate").value = value;
    } else if (activeTabId === "image-analysis") {
        document.getElementById("image_analyze").value = value;
    }
  }
  