document.getElementById("loanForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const loanAmount = parseFloat(document.getElementById("loanAmount").value);
    const yearlyInterest = parseFloat(document.getElementById("yearlyInterest").value);
    const term = parseInt(document.getElementById("term").value);

    const requestBody = {
      loanAmount: loanAmount,
      yearlyInterest: yearlyInterest,
      term: term
    };

    fetch('http://127.0.0.1:8080/api/noviti/generate-loan-schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
      const loanSchedule = data.loanSchedule;
      
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = `
        <h2>Loan Schedule</h2>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Remaining Credit Amount</th>
              <th scope="col">Principal Part</th>
              <th scope="col">Interest</th>
              <th scope="col">Total Payment</th>
            </tr>
          </thead>
          <tbody>
            ${loanSchedule
              .map(
                (entry) => `
              <tr>
                <td>${entry.no}</td>
                <td>${entry.remainingAmount} EUR</td>
                <td>${entry.principal} EUR</td>
                <td>${entry.interest} EUR</td>
                <td>${entry.totalPayment} EUR</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <p>Total: ${loanAmount.toFixed(2)} EUR</p>
      `;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  });
  

  document.addEventListener('DOMContentLoaded', function () {
    const fetchButton = document.getElementById('fetchButton');

    fetchButton.addEventListener('click', function () {
        const url = '/path/to/your/symfony/function';
        const data = {
            key: 'value'
        };

        fetch('127.0.0.1:8080/api/v1/getsimple', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
