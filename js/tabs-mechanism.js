function openTab(event, tabId) {
    const tabContainer = event.currentTarget.closest('.tab-container');
    const tabLinks = tabContainer.querySelectorAll('.tab-link');
    const tabContents = tabContainer.querySelectorAll('.tab-content');
  
    // Remove active class from all tabs and hide content
    tabLinks.forEach(link => link.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
  
    // Add active class to clicked tab and show corresponding content
    event.currentTarget.classList.add('active');
    tabContainer.querySelector('#' + tabId).classList.add('active');
}
