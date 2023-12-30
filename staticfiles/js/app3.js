document.addEventListener("DOMContentLoaded", function () {

const table = document.getElementById('myTable');

// Add mousedown event listeners to each header
const headers = Array.from(table.querySelectorAll('thead tr:first-child td'));
headers.forEach((header, index) => {
  header.addEventListener('click', (event) => {
    const iconUp = header.querySelector('.fa-caret-up');
    const iconDown = header.querySelector('.fa-caret-down');

    // Toggle feature-hidden class for the Font Awesome icons
    if (iconUp.classList.contains('feature-hidden')) {
      iconUp.classList.remove('feature-hidden');
      iconDown.classList.add('feature-hidden');
    } else {
      iconUp.classList.add('feature-hidden');
      iconDown.classList.remove('feature-hidden');
    }

    // Sorting
    const rows = Array.from(table.querySelectorAll('tbody tr'));

    rows.sort((a, b) => {
      const tdA = a.querySelectorAll('td')[index].textContent.trim();
      const tdB = b.querySelectorAll('td')[index].textContent.trim();

      // Check if the content is a number and sort accordingly
      const isNumber = !isNaN(parseFloat(tdA)) && isFinite(tdA) && !isNaN(parseFloat(tdB)) && isFinite(tdB);
      if (isNumber) {
        return parseFloat(tdA) - parseFloat(tdB);
      } else {
        return tdA.localeCompare(tdB);
      }
    });

    const isDescending = header.classList.contains('descending');

    if (isDescending) {
      rows.reverse();
      header.classList.remove('descending');
    } else {
      headers.forEach(header => header.classList.remove('descending'));
      header.classList.add('descending');
    }

    // Re-append sorted rows to the table
    const tbody = table.querySelector('tbody');
    rows.forEach(row => tbody.appendChild(row));
  });

  // Prevent sorting when clicking inside a td
  const tdChildren = header.querySelectorAll('td');
  tdChildren.forEach(td => {
    td.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });
});


// 

document.querySelectorAll('.filter-header').forEach(header => {
header.addEventListener('click', function() {
  // Toggle the feature-hidden class for the closest filter-data element
  this.nextElementSibling.classList.toggle('feature-hidden');

  // Toggle the classes for the Font Awesome icons
  const downIcon = this.querySelector('.fa-angle-down');
  const upIcon = this.querySelector('.fa-angle-up');

  downIcon.classList.toggle('feature-hidden');
  upIcon.classList.toggle('feature-hidden');
});
});
});