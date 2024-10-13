function showContent(contentId) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => content.classList.remove('active'));

  // Show the selected tab content
  if (contentId) {
      document.getElementById(contentId).classList.add('active');
  }
}